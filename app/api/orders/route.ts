import { NextResponse } from "next/server";

import { getSupabaseServiceRole } from "@/lib/supabase/admin";
import type { PricingOption } from "@/lib/supabase/types";

type Body = {
  fullName?: string;
  productId?: string;
  productSlug?: string;
  productName?: string;
  packageLabel?: string;
  packagePrice?: string;
  customerName?: string;
  phone?: string;
  whatsapp?: string;
  address?: string;
  state?: string;
  /** Number of units (default 1). */
  quantity?: number;
  paymentMethod?: "cod" | "card";
  paystackReference?: string | null;
};

function validateNigerianPhone(phone: string): boolean {
  const d = phone.replace(/\D/g, "");
  if (d.length === 11 && d.startsWith("0")) return true;
  if (d.length === 13 && d.startsWith("234")) return true;
  if (d.length === 10 && /^[789]/.test(d)) return true;
  return false;
}

type FieldErrors = Partial<
  Record<
    "fullName" | "phone" | "whatsapp" | "address" | "state" | "productSlug" | "quantity",
    string
  >
>;

function toStringOrUndefined(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function buildFieldErrors(input: {
  fullName?: string;
  phone?: string;
  whatsapp?: string;
  address?: string;
  state?: string;
  hasProductIdentifier: boolean;
}): FieldErrors {
  const errors: FieldErrors = {};
  if (!input.fullName) errors.fullName = "Full name is required.";
  if (!input.phone) errors.phone = "Phone number is required.";
  if (!input.whatsapp) errors.whatsapp = "WhatsApp number is required.";
  if (!input.address) errors.address = "Delivery address is required.";
  if (!input.state) errors.state = "Delivery state is required.";
  if (!input.hasProductIdentifier) errors.productSlug = "Product is required.";
  return errors;
}

export async function POST(request: Request) {
  try {
    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return NextResponse.json(
        { error: "Server configuration error." },
        { status: 500 }
      );
    }

    const body = (await request.json()) as Body;
    const fullName = toStringOrUndefined(body.fullName ?? body.customerName);
    const phone = toStringOrUndefined(body.phone);
    const whatsapp = toStringOrUndefined(body.whatsapp);
    const address = toStringOrUndefined(body.address);
    const state = toStringOrUndefined(body.state);
    const productSlug = toStringOrUndefined(body.productSlug);
    const providedProductId = toStringOrUndefined(body.productId);

    const fieldErrors = buildFieldErrors({
      fullName,
      phone,
      whatsapp,
      address,
      state,
      hasProductIdentifier: Boolean(productSlug || providedProductId)
    });

    if (Object.keys(fieldErrors).length > 0) {
      return NextResponse.json(
        {
          error: "Please complete all required fields.",
          fieldErrors
        },
        { status: 400 }
      );
    }

    const safeFullName = fullName as string;
    const safePhone = phone as string;
    const safeWhatsapp = whatsapp as string;
    const safeAddress = address as string;
    const safeState = state as string;

    if (!validateNigerianPhone(safePhone) || !validateNigerianPhone(safeWhatsapp)) {
      return NextResponse.json(
        {
          error: "Enter a valid Nigerian phone number (e.g. 080... or 234...).",
          fieldErrors: {
            phone: "Invalid Nigerian phone number.",
            whatsapp: "Invalid Nigerian phone number."
          }
        },
        { status: 400 }
      );
    }

    const supabase = getSupabaseServiceRole();

    let fetch = supabase
      .from("products")
      .select("id, slug, name, stock_count, current_price, pricing_options, active")
      .eq("active", true);

    if (productSlug) {
      fetch = fetch.eq("slug", productSlug);
    } else if (providedProductId) {
      fetch = fetch.eq("id", providedProductId);
    }

    const { data: product, error: fetchErr } = await fetch.maybeSingle();

    if (fetchErr || !product) {
      return NextResponse.json({ error: "Product not found." }, { status: 404 });
    }

    if (product.stock_count <= 0) {
      return NextResponse.json({ error: "This product is sold out." }, { status: 400 });
    }

    const rawQty = body.quantity;
    const qty =
      typeof rawQty === "number" && Number.isFinite(rawQty)
        ? Math.floor(rawQty)
        : typeof rawQty === "string"
          ? Math.floor(Number.parseInt(rawQty, 10))
          : 1;
    if (qty < 1 || qty > product.stock_count) {
      return NextResponse.json(
        {
          error: `Choose between 1 and ${product.stock_count} item(s).`,
          fieldErrors: { quantity: "Invalid quantity." }
        },
        { status: 400 }
      );
    }

    if (body.paymentMethod === "card") {
      return NextResponse.json(
        { error: "Card payment is currently unavailable. Please continue via WhatsApp." },
        { status: 400 }
      );
    }

    const options = Array.isArray(product.pricing_options)
      ? (product.pricing_options as PricingOption[])
      : [];
    const legacyPackageLabel = toStringOrUndefined(body.packageLabel);
    const legacyPackagePrice = toStringOrUndefined(body.packagePrice);
    const firstOption = options[0];
    const matchedOption =
      legacyPackageLabel && legacyPackagePrice
        ? options.find(
            (option) =>
              option?.label?.trim() === legacyPackageLabel &&
              option?.price?.trim() === legacyPackagePrice
          )
        : null;
    const packageLabel =
      matchedOption?.label?.trim() ??
      firstOption?.label?.trim() ??
      "Selected package";
    const packagePrice =
      matchedOption?.price?.trim() ??
      firstOption?.price?.trim() ??
      product.current_price;

    const { data: order, error: orderErr } = await supabase
      .from("orders")
      .insert({
        product_id: product.id,
        product_name: product.name,
        package_label: packageLabel,
        package_price: packagePrice,
        quantity: qty,
        customer_name: safeFullName,
        phone: safePhone,
        whatsapp: safeWhatsapp,
        address: safeAddress,
        state: safeState,
        payment_method: "cod",
        status: "pending",
        paystack_reference: null
      })
      .select("id")
      .single();

    if (orderErr || !order) {
      if (orderErr) {
        console.error("[orders.insert] failed", {
          message: orderErr.message,
          details: orderErr.details,
          hint: orderErr.hint,
          code: orderErr.code
        });
      }
      return NextResponse.json(
        {
          error:
            "Could not save your order. Please message us directly on WhatsApp."
        },
        { status: 500 }
      );
    }

    const { data: updated, error: stockErr } = await supabase
      .from("products")
      .update({ stock_count: product.stock_count - qty })
      .eq("id", product.id)
      .eq("stock_count", product.stock_count)
      .select("stock_count")
      .maybeSingle();

    if (stockErr || !updated) {
      if (stockErr) {
        console.error("[products.stock_update] failed", {
          message: stockErr.message,
          details: stockErr.details,
          hint: stockErr.hint,
          code: stockErr.code
        });
      }
      await supabase.from("orders").delete().eq("id", order.id);
      return NextResponse.json(
        {
          error: "Product availability changed. Please refresh and try again."
        },
        { status: 409 }
      );
    }

    return NextResponse.json({
      success: true,
      orderId: order.id
    });
  } catch (error) {
    console.error("[orders.post] unexpected", error);
    return NextResponse.json(
      { error: "Unexpected error while placing order." },
      { status: 500 }
    );
  }
}
