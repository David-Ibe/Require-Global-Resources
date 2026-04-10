"use client";

import { useMemo, useState } from "react";
import { Lock, ShieldCheck, Truck } from "lucide-react";

import { NIGERIAN_STATES } from "@/lib/nigeria-states";

import { HowItWorks } from "@/components/HowItWorks";
import { SuccessCard } from "@/components/SuccessCard";

type OrderFormProps = {
  productSlug: string;
  productName: string;
  unitPrice: number;
  stockCount: number;
  initialQuantity: number;
};

type FormState = {
  fullName: string;
  phone: string;
  whatsapp: string;
  address: string;
  state: string;
};

type ApiResponse = {
  success?: boolean;
  orderId?: string;
  error?: string;
  fieldErrors?: Partial<
    Record<keyof FormState | "productSlug" | "quantity", string>
  >;
};

const initialState: FormState = {
  fullName: "",
  phone: "",
  whatsapp: "",
  address: "",
  state: ""
};

function validateNigerianPhone(phone: string): boolean {
  const d = phone.replace(/\D/g, "");
  if (d.length === 11 && d.startsWith("0")) return true;
  if (d.length === 13 && d.startsWith("234")) return true;
  if (d.length === 10 && /^[789]/.test(d)) return true;
  return false;
}

function inferStep(state: FormState): 1 | 2 | 3 {
  const hasContact = Boolean(
    state.fullName.trim() && state.phone.trim() && state.whatsapp.trim()
  );
  if (!hasContact) return 1;
  const hasDelivery = Boolean(state.address.trim() && state.state.trim());
  if (!hasDelivery) return 2;
  return 3;
}

function clampQuantity(n: number, max: number): number {
  const cap = Math.max(1, max);
  if (!Number.isFinite(n) || n < 1) return 1;
  return Math.min(Math.floor(n), cap);
}

export function OrderForm({
  productSlug,
  productName,
  unitPrice,
  stockCount,
  initialQuantity
}: OrderFormProps) {
  const [form, setForm] = useState<FormState>(initialState);
  const [quantity, setQuantity] = useState(() =>
    clampQuantity(initialQuantity, stockCount)
  );
  const [sameAsPhone, setSameAsPhone] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<keyof FormState, string>>
  >({});
  const [submitted, setSubmitted] = useState<{
    fullName: string;
    phone: string;
    address: string;
    state: string;
    quantity: number;
  } | null>(null);

  const step = useMemo(() => inferStep(form), [form]);
  const lineTotal = unitPrice * quantity;

  function bumpQuantity(delta: number) {
    setQuantity((q) => clampQuantity(q + delta, stockCount));
  }

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setFieldErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setApiError("");

    const nextErrors: Partial<Record<keyof FormState, string>> = {};
    if (!form.fullName.trim()) nextErrors.fullName = "Full name is required.";
    if (!form.phone.trim()) nextErrors.phone = "Phone is required.";
    if (!form.whatsapp.trim()) nextErrors.whatsapp = "WhatsApp number is required.";
    if (!form.address.trim()) nextErrors.address = "Address is required.";
    if (!form.state.trim()) nextErrors.state = "State is required.";

    if (Object.keys(nextErrors).length > 0) {
      setFieldErrors(nextErrors);
      return;
    }

    if (!validateNigerianPhone(form.phone) || !validateNigerianPhone(form.whatsapp)) {
      setFieldErrors({
        phone: "Enter a valid Nigerian number.",
        whatsapp: "Enter a valid Nigerian number."
      });
      return;
    }

    const qty = clampQuantity(quantity, stockCount);
    if (qty !== quantity) setQuantity(qty);

    setSubmitting(true);
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: form.fullName,
          phone: form.phone,
          whatsapp: form.whatsapp,
          address: form.address,
          state: form.state,
          productSlug,
          quantity: qty
        })
      });

      const data = (await response.json()) as ApiResponse;

      if (!response.ok) {
        if (response.status === 400 && data.fieldErrors) {
          setFieldErrors({
            fullName: data.fieldErrors.fullName,
            phone: data.fieldErrors.phone,
            whatsapp: data.fieldErrors.whatsapp,
            address: data.fieldErrors.address,
            state: data.fieldErrors.state
          });
          setApiError(data.error ?? "Please fix the highlighted fields.");
          return;
        }

        if (response.status >= 500) {
          setSubmitted({
            fullName: form.fullName,
            phone: form.phone,
            address: form.address,
            state: form.state,
            quantity: qty
          });
          return;
        }

        setApiError(data.error ?? "Could not save order.");
        return;
      }

      setSubmitted({
        fullName: form.fullName,
        phone: form.phone,
        address: form.address,
        state: form.state,
        quantity: qty
      });
    } catch {
      setSubmitted({
        fullName: form.fullName,
        phone: form.phone,
        address: form.address,
        state: form.state,
        quantity: qty
      });
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <SuccessCard
        fullName={submitted.fullName}
        productName={productName}
        unitPrice={unitPrice}
        quantity={submitted.quantity}
        phone={submitted.phone}
        address={submitted.address}
        state={submitted.state}
      />
    );
  }

  return (
    <section className="rounded-2xl border border-rgr-gray300/50 bg-white p-5 shadow-sm sm:p-6">
      <div className="inline-flex items-center rounded-full border border-[#bbf7d0] bg-[#f0fdf4] px-3 py-1 text-xs font-semibold text-[#166534]">
        Verified seller
      </div>

      <h1 className="mt-3 text-2xl font-semibold tracking-tight text-rgr-navy">
        Complete your order
      </h1>
      <p className="mt-2 text-sm text-rgr-gray700">
        Submit your details and we will send payment account details on WhatsApp.
      </p>

      <div className="mt-5">
        <div className="mb-2 flex items-center justify-between text-xs font-medium text-rgr-gray600">
          <span>Contact</span>
          <span>Delivery</span>
          <span>Review</span>
        </div>
        <div className="h-2 rounded-full bg-rgr-gray200">
          <div
            className="h-full rounded-full bg-[#16a34a] transition-all"
            style={{
              width: step === 1 ? "33%" : step === 2 ? "66%" : "100%"
            }}
          />
        </div>
      </div>

      <div className="mt-5 rounded-xl border border-rgr-gray300/60 bg-[#fafafa] p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.08em] text-rgr-gray600">
          Your order
        </p>
        <p className="mt-1 text-base font-semibold text-rgr-navy">{productName}</p>
        <p className="mt-1 text-sm text-rgr-gray600">
          ₦{unitPrice.toLocaleString()} each · {stockCount} in stock
        </p>
        <div className="mt-4">
          <span className="text-sm font-medium text-rgr-gray700">Quantity</span>
          <div className="mt-2 flex max-w-[220px] items-center gap-2">
            <button
              type="button"
              onClick={() => bumpQuantity(-1)}
              disabled={quantity <= 1}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-rgr-gray300 bg-white text-lg font-semibold text-rgr-navy transition hover:bg-rgr-gray100 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Decrease quantity"
            >
              −
            </button>
            <span className="min-w-[2.5rem] text-center text-lg font-semibold tabular-nums text-rgr-navy">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => bumpQuantity(1)}
              disabled={quantity >= stockCount}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-rgr-gray300 bg-white text-lg font-semibold text-rgr-navy transition hover:bg-rgr-gray100 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
        </div>
        <p className="mt-4 border-t border-rgr-gray300/60 pt-3 text-base font-semibold text-rgr-navy">
          Subtotal: ₦{lineTotal.toLocaleString()}
        </p>
      </div>

      <form className="mt-5 space-y-4" onSubmit={handleSubmit} noValidate>
        <label className="block">
          <span className="text-sm font-medium text-rgr-gray700">Full name</span>
          <input
            value={form.fullName}
            onChange={(e) => updateField("fullName", e.target.value)}
            className={`mt-1 w-full rounded-lg border px-4 py-3 outline-none transition ${
              fieldErrors.fullName
                ? "border-red-400 focus:ring-2 focus:ring-red-200"
                : "border-rgr-gray300 focus:border-[#16a34a] focus:ring-2 focus:ring-[#dcfce7]"
            }`}
          />
          {fieldErrors.fullName ? (
            <p className="mt-1 text-xs text-red-600">{fieldErrors.fullName}</p>
          ) : null}
        </label>

        <label className="block">
          <span className="text-sm font-medium text-rgr-gray700">Phone number</span>
          <input
            value={form.phone}
            onChange={(e) => {
              const value = e.target.value;
              updateField("phone", value);
              if (sameAsPhone) updateField("whatsapp", value);
            }}
            placeholder="080..."
            className={`mt-1 w-full rounded-lg border px-4 py-3 outline-none transition ${
              fieldErrors.phone
                ? "border-red-400 focus:ring-2 focus:ring-red-200"
                : "border-rgr-gray300 focus:border-[#16a34a] focus:ring-2 focus:ring-[#dcfce7]"
            }`}
          />
          {fieldErrors.phone ? (
            <p className="mt-1 text-xs text-red-600">{fieldErrors.phone}</p>
          ) : null}
        </label>

        <label className="block">
          <span className="text-sm font-medium text-rgr-gray700">WhatsApp number</span>
          <input
            value={form.whatsapp}
            onChange={(e) => updateField("whatsapp", e.target.value)}
            disabled={sameAsPhone}
            placeholder="080..."
            className={`mt-1 w-full rounded-lg border px-4 py-3 outline-none transition ${
              fieldErrors.whatsapp
                ? "border-red-400 focus:ring-2 focus:ring-red-200"
                : "border-rgr-gray300 focus:border-[#16a34a] focus:ring-2 focus:ring-[#dcfce7]"
            } disabled:bg-rgr-gray100`}
          />
          <label className="mt-2 flex items-center gap-2 text-xs text-rgr-gray700">
            <input
              type="checkbox"
              checked={sameAsPhone}
              onChange={(e) => {
                const checked = e.target.checked;
                setSameAsPhone(checked);
                if (checked) {
                  updateField("whatsapp", form.phone);
                }
              }}
            />
            Same as phone number
          </label>
          {fieldErrors.whatsapp ? (
            <p className="mt-1 text-xs text-red-600">{fieldErrors.whatsapp}</p>
          ) : null}
        </label>

        <label className="block">
          <span className="text-sm font-medium text-rgr-gray700">Delivery address</span>
          <textarea
            value={form.address}
            onChange={(e) => updateField("address", e.target.value)}
            rows={3}
            className={`mt-1 w-full rounded-lg border px-4 py-3 outline-none transition ${
              fieldErrors.address
                ? "border-red-400 focus:ring-2 focus:ring-red-200"
                : "border-rgr-gray300 focus:border-[#16a34a] focus:ring-2 focus:ring-[#dcfce7]"
            }`}
          />
          {fieldErrors.address ? (
            <p className="mt-1 text-xs text-red-600">{fieldErrors.address}</p>
          ) : null}
        </label>

        <label className="block">
          <span className="text-sm font-medium text-rgr-gray700">Delivery state</span>
          <select
            value={form.state}
            onChange={(e) => updateField("state", e.target.value)}
            className={`mt-1 w-full rounded-lg border px-4 py-3 outline-none transition ${
              fieldErrors.state
                ? "border-red-400 focus:ring-2 focus:ring-red-200"
                : "border-rgr-gray300 focus:border-[#16a34a] focus:ring-2 focus:ring-[#dcfce7]"
            }`}
          >
            <option value="">Select state</option>
            {NIGERIAN_STATES.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
          {fieldErrors.state ? (
            <p className="mt-1 text-xs text-red-600">{fieldErrors.state}</p>
          ) : null}
        </label>

        {apiError ? <p className="text-sm text-red-600">{apiError}</p> : null}

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-xl bg-[#16a34a] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#15803d] disabled:opacity-70"
        >
          {submitting ? "Saving your order..." : "Submit order"}
        </button>
      </form>

      <p className="mt-3 text-center text-xs text-rgr-gray500">
        We confirm on WhatsApp shortly after you submit.
      </p>

      <div className="mt-6">
        <HowItWorks />
      </div>

      <div className="mt-6 border-t border-rgr-gray300/50 pt-4">
        <p className="flex flex-wrap items-center gap-2 text-xs font-medium text-rgr-gray600">
          <span className="inline-flex items-center gap-1">
            <ShieldCheck className="h-3.5 w-3.5" aria-hidden />
            Verified seller
          </span>
          <span className="inline-flex items-center gap-1">
            <Lock className="h-3.5 w-3.5" aria-hidden />
            Secure
          </span>
          <span className="inline-flex items-center gap-1">
            <Truck className="h-3.5 w-3.5" aria-hidden />
            Fast delivery
          </span>
        </p>
      </div>
    </section>
  );
}
