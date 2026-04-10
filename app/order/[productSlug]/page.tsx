import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { OrderForm } from "@/components/OrderForm";
import { brand, siteUrl } from "@/lib/site-config";
import { createClient } from "@/lib/supabase/server";
import type { PricingOption } from "@/lib/supabase/types";

type Props = {
  params: {
    productSlug: string;
  };
  searchParams?: Record<string, string | string[] | undefined>;
};

function extractPriceAmount(raw: string): number {
  const amount = Number.parseInt(raw.replace(/[^\d]/g, ""), 10);
  if (!Number.isFinite(amount) || amount <= 0) return 0;
  return amount;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const title = `Order | ${brand.shortName}`;
  return {
    title,
    description: "Secure manual WhatsApp payment flow for your order.",
    openGraph: {
      title,
      description: "Submit details, receive account details on WhatsApp, pay and send receipt.",
      url: `${siteUrl}/order/${params.productSlug}`,
      images: ["/og-default.svg"]
    }
  };
}

function parseInitialQty(
  raw: string | string[] | undefined
): number | undefined {
  const s = Array.isArray(raw) ? raw[0] : raw;
  if (!s) return undefined;
  const n = Number.parseInt(s, 10);
  return Number.isFinite(n) ? n : undefined;
}

export default async function ProductOrderPage({
  params,
  searchParams
}: Props) {
  const supabase = await createClient();
  const { data: product, error } = await supabase
    .from("products")
    .select("id, slug, name, current_price, pricing_options, stock_count, active")
    .eq("slug", params.productSlug)
    .eq("active", true)
    .maybeSingle();

  if (error || !product) {
    notFound();
  }

  const options = Array.isArray(product.pricing_options)
    ? (product.pricing_options as PricingOption[])
    : [];
  const firstOptionPrice = options[0]?.price?.trim() || product.current_price;
  const priceAmount = extractPriceAmount(firstOptionPrice);
  const fallbackAmount = extractPriceAmount(product.current_price);
  const finalPrice = priceAmount > 0 ? priceAmount : fallbackAmount;
  const stockCount = typeof product.stock_count === "number" ? product.stock_count : 0;
  const initialQtyRaw = parseInitialQty(searchParams?.qty);
  const initialQuantity =
    initialQtyRaw !== undefined
      ? Math.min(Math.max(1, initialQtyRaw), Math.max(1, stockCount))
      : 1;

  return (
    <div className="min-h-screen bg-[#f8fafc] px-4 py-8">
      <div className="mx-auto w-full max-w-[480px]">
        <header className="mb-5 rounded-2xl border border-rgr-gray300/40 bg-white p-4 shadow-sm">
          <Link href="/" className="inline-flex items-center gap-3">
            <Image
              src="/logo-mark.png"
              alt={`${brand.shortName} logo`}
              width={36}
              height={36}
            />
            <div>
              <p className="text-sm font-semibold text-rgr-navy">{brand.shortName}</p>
              <p className="text-xs text-rgr-gray600">Verified. Delivered. Trusted.</p>
            </div>
          </Link>
        </header>

        {stockCount <= 0 ? (
          <section className="rounded-2xl border border-rgr-gray300/50 bg-white p-6 text-center shadow-sm">
            <p className="text-lg font-semibold text-rgr-navy">Out of stock</p>
            <p className="mt-2 text-sm text-rgr-gray700">
              This product is not available to order right now.
            </p>
            <Link
              href="/"
              className="mt-6 inline-block text-sm font-medium text-rgr-navy underline underline-offset-4"
            >
              Back to store
            </Link>
          </section>
        ) : (
          <OrderForm
            productSlug={product.slug}
            productName={product.name}
            unitPrice={finalPrice}
            stockCount={stockCount}
            initialQuantity={initialQuantity}
          />
        )}
      </div>
    </div>
  );
}
