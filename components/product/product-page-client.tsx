"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

import { getWhatsAppLink } from "@/lib/site-config";
import { waEntryNotifyStock, waOrderFormBody } from "@/lib/whatsapp-sales";
import type { PricingOption, ProductRow } from "@/lib/supabase/types";
import { NIGERIAN_STATES } from "@/lib/nigeria-states";
import {
  trackInitiateCheckout,
  trackPurchase,
} from "@/lib/analytics";

import { UrgencyBar } from "@/components/product/urgency-bar";
import { FadeInView } from "@/components/fade-in-view";
import { featureBlurbFor } from "@/lib/feature-blurb";

function youtubeId(url: string): string | null {
  const m = url.match(/(?:youtu\.be\/|v=)([^&?]+)/);
  return m?.[1] ?? null;
}

function digitsFromPrice(raw: string): number {
  const n = Number.parseInt(raw.replace(/[^\d]/g, ""), 10);
  return Number.isFinite(n) && n > 0 ? n : 0;
}

function validateNigerianPhone(phone: string): boolean {
  const d = phone.replace(/\D/g, "");
  if (d.length === 11 && d.startsWith("0")) return true;
  if (d.length === 13 && d.startsWith("234")) return true;
  if (d.length === 10 && /^[789]/.test(d)) return true;
  return false;
}

type FormState = {
  fullName: string;
  phone: string;
  whatsapp: string;
  address: string;
  state: string;
};

const initialForm: FormState = {
  fullName: "",
  phone: "",
  whatsapp: "",
  address: "",
  state: "",
};

const trustCards = [
  { emoji: "✅", title: "Quality Inspected", desc: "Every item checked before dispatch" },
  { emoji: "💵", title: "Pay on Arrival", desc: "No upfront payment required" },
  { emoji: "🏢", title: "Registered Business", desc: "CAC-registered Nigerian company" },
  { emoji: "🚀", title: "Nationwide Shipping", desc: "Lagos same/next day. All 36 states covered." },
];

export function ProductPageClient({
  product,
  localVideoUrl,
}: {
  product: ProductRow;
  localVideoUrl?: string;
}) {
  const options = useMemo(() => {
    const raw = product.pricing_options;
    if (Array.isArray(raw)) return raw as PricingOption[];
    return [] as PricingOption[];
  }, [product.pricing_options]);

  const [selectedIdx, setSelectedIdx] = useState(0);
  const selected = options[selectedIdx] ?? options[0];

  const images = product.images.length ? product.images : ["/og-default.svg"];
  const [imgIdx, setImgIdx] = useState(0);
  const mainImg = images[imgIdx] ?? images[0];

  const soldOut = product.stock_count <= 0;
  const yt = product.youtube_url ? youtubeId(product.youtube_url) : null;

  const unitPriceDigits = useMemo(() => {
    const raw = selected?.price ?? product.current_price;
    return digitsFromPrice(raw);
  }, [selected, product.current_price]);

  // Order form state
  const [form, setForm] = useState<FormState>(initialForm);
  const [sameAsPhone, setSameAsPhone] = useState(true);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [successName, setSuccessName] = useState("");

  const formRef = useRef<HTMLFormElement>(null);

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setFieldErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function validateForm(): boolean {
    const nextErrors: Partial<Record<keyof FormState, string>> = {};
    if (!form.fullName.trim()) nextErrors.fullName = "Full name is required.";
    if (!form.phone.trim()) nextErrors.phone = "Phone is required.";
    else if (!validateNigerianPhone(form.phone)) nextErrors.phone = "Enter a valid Nigerian number.";
    if (!form.whatsapp.trim()) nextErrors.whatsapp = "WhatsApp number is required.";
    else if (!validateNigerianPhone(form.whatsapp)) nextErrors.whatsapp = "Enter a valid Nigerian number.";
    if (!form.address.trim()) nextErrors.address = "Address is required.";
    if (!form.state.trim()) nextErrors.state = "State is required.";
    setFieldErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  const isFormValid = useMemo(() => {
    return (
      form.fullName.trim() !== "" &&
      form.phone.trim() !== "" &&
      form.whatsapp.trim() !== "" &&
      form.address.trim() !== "" &&
      form.state.trim() !== ""
    );
  }, [form]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validateForm()) return;

    trackInitiateCheckout(unitPriceDigits);
    trackPurchase({
      value: unitPriceDigits,
      transactionId: crypto.randomUUID(),
      contentName: product.name,
    });

    const msg = waOrderFormBody({
      productName: product.name,
      packageLabel: selected?.label ?? "Standard",
      price: selected?.price ?? product.current_price,
      paymentLabel: "Pay on Delivery",
      name: form.fullName,
      phone: form.phone,
      whatsapp: form.whatsapp,
      address: form.address,
      state: form.state,
    });
    window.open(getWhatsAppLink(msg), "_blank", "noopener,noreferrer");

    setSuccessName(form.fullName);
    setShowSuccess(true);
  }

  // Auto dismiss success after 8 seconds
  useEffect(() => {
    if (!showSuccess) return;
    const timer = setTimeout(() => setShowSuccess(false), 8000);
    return () => clearTimeout(timer);
  }, [showSuccess]);

  return (
    <div className="bg-rgr-surface">
      {product.stock_count > 0 ? <UrgencyBar stockCount={product.stock_count} /> : null}

      {/* Header breadcrumb */}
      <div className="border-b border-rgr-gray300/40 bg-[#fcfcfc]">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-4 md:px-10">
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-[0.14em] text-rgr-gray500">
              Home / {product.category}
            </p>
            <Link
              href="/"
              className="text-sm font-medium text-rgr-blue underline underline-offset-4 transition hover:text-rgr-navy"
            >
              ← Back to All Products
            </Link>
          </div>
          <span className="hidden items-center gap-1.5 rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1.5 text-xs font-semibold text-green-600 md:inline-flex">
            ✅ CAC Registered
          </span>
        </div>
      </div>

      {/* Hero section */}
      <section className="bg-rgr-navy py-8 md:py-12">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <FadeInView>
            <span className="inline-block rounded-full bg-rgr-blue/20 px-4 py-1.5 text-sm font-medium text-rgr-gold">
              {product.category}
            </span>
            <h1 className="mt-4 font-display text-3xl uppercase tracking-tight text-white md:text-4xl lg:text-5xl">
              {product.name}
            </h1>
            <p className="mt-4 max-w-2xl text-base text-white/70">
              {product.description}
            </p>
            {product.features.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-2">
                {product.features.slice(0, 4).map((f) => (
                  <span key={f} className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/80">
                    {f}
                  </span>
                ))}
              </div>
            )}
          </FadeInView>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-5 py-8 md:px-10 md:py-12">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)] lg:items-start">
          {/* Left: Image gallery */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="flex gap-3">
              <div className="hidden shrink-0 gap-2 lg:flex lg:w-20 lg:flex-col">
                {images.map((src, i) => (
                  <button
                    key={src + i}
                    type="button"
                    onClick={() => setImgIdx(i)}
                    className={`relative h-20 w-20 overflow-hidden rounded-lg border-2 transition ${
                      i === imgIdx
                        ? "border-rgr-navy"
                        : "border-transparent ring-1 ring-rgr-gray300/50"
                    }`}
                  >
                    <Image src={src} alt="" fill className="object-cover" sizes="80px" />
                  </button>
                ))}
              </div>
              <div className="relative h-[48vh] min-h-[320px] flex-1 overflow-hidden rounded-2xl bg-[#f4f4f5] shadow-soft ring-1 ring-rgr-gray300/30 sm:h-[56vh] lg:h-[calc(100vh-11rem)] lg:max-h-[680px]">
                <Image
                  src={mainImg}
                  alt={product.name}
                  fill
                  className="object-contain transition-opacity duration-300"
                  priority
                  sizes="(max-width:1024px) 100vw, 50vw"
                />
                {product.badge ? (
                  <span className={`absolute left-4 top-4 rounded-md px-2.5 py-1 text-xs font-bold uppercase tracking-wider shadow-sm ${
                    product.badge === "HOT SELLER" ? "bg-red-500 text-white" :
                    product.badge === "NEW" ? "bg-rgr-blue text-white" :
                    product.badge === "BEST VALUE" ? "bg-rgr-gold text-rgr-navy" :
                    "bg-rgr-navy/90 text-white"
                  }`}>
                    {product.badge}
                  </span>
                ) : null}
              </div>
            </div>
            <div className="mt-4 flex gap-2 overflow-x-auto pb-2 lg:hidden">
              {images.map((src, i) => (
                <button
                  key={src + i}
                  type="button"
                  onClick={() => setImgIdx(i)}
                  className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition ${
                    i === imgIdx ? "border-rgr-navy" : "border-transparent ring-1 ring-rgr-gray300/50"
                  }`}
                >
                  <Image src={src} alt="" fill className="object-cover" sizes="80px" />
                </button>
              ))}
            </div>

            {/* Product video (below images) */}
            {(localVideoUrl || yt) && (
              <div className="mt-8">
                <h2 className="font-display text-xl uppercase tracking-wider text-rgr-navy">
                  SEE IT IN ACTION
                </h2>
                {localVideoUrl ? (
                  <div className="mt-4 overflow-hidden rounded-2xl bg-black shadow-soft">
                    <video
                      src={localVideoUrl}
                      controls
                      playsInline
                      preload="metadata"
                      className="w-full"
                      poster=""
                    >
                      Your browser does not support the video tag.
                    </video>
                  </div>
                ) : yt ? (
                  <div className="mt-4 aspect-video overflow-hidden rounded-2xl bg-black shadow-soft">
                    <iframe
                      title="Product video"
                      src={`https://www.youtube.com/embed/${yt}`}
                      className="h-full w-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      loading="lazy"
                    />
                  </div>
                ) : null}
              </div>
            )}

            {/* Why you need this — feature cards */}
            {product.features.length > 0 && (
              <div className="mt-10">
                <h2 className="font-display text-xl uppercase tracking-wider text-rgr-navy">
                  WHY YOU NEED THIS
                </h2>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {product.features.map((f) => (
                    <FadeInView key={f}>
                      <div className="rounded-xl border border-rgr-gray300/40 bg-white p-4 shadow-sm">
                        <p className="font-semibold text-rgr-navy">{f}</p>
                        <p className="mt-1 text-sm text-rgr-gray500">{featureBlurbFor(f)}</p>
                      </div>
                    </FadeInView>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right: Order form */}
          <div className="space-y-6 lg:sticky lg:top-24">
            {/* Free delivery offer banner */}
            <div className="rounded-2xl border border-green-200 bg-green-50 p-5">
              <p className="font-display text-sm uppercase tracking-wider text-green-800">
                🎁 FREE DELIVERY OFFER
              </p>
              <p className="mt-2 text-sm text-green-700">
                Next 5 customers who order get FREE delivery anywhere in Nigeria.
              </p>
            </div>

            {/* Package selector */}
            <div className="rounded-2xl border border-rgr-gray300/50 bg-white p-5 shadow-soft md:p-6">
              <h2 className="font-display text-lg uppercase tracking-wider text-rgr-navy">
                SELECT YOUR PACKAGE
              </h2>
              <div className="mt-4 space-y-2.5">
                {options.map((opt, i) => (
                  <button
                    key={opt.label + i}
                    type="button"
                    onClick={() => setSelectedIdx(i)}
                    className={`w-full rounded-xl border p-4 text-left transition ${
                      selectedIdx === i
                        ? "border-l-4 border-l-rgr-blue border-rgr-blue bg-[#EFF6FF] ring-1 ring-rgr-blue"
                        : "border-rgr-gray300/60 bg-white hover:border-rgr-gray300"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold text-rgr-navy">{opt.label}</p>
                        <p className="text-xs text-rgr-gray500">Qty: {opt.qty}</p>
                        {opt.savings ? (
                          <span className="mt-1 inline-block rounded-full bg-green-50 px-2 py-0.5 text-xs font-semibold text-green-700">
                            {opt.savings}
                          </span>
                        ) : null}
                      </div>
                      <span className="font-display text-xl tabular-nums text-rgr-navy">{opt.price}</span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Price summary */}
              <div className="mt-5 rounded-xl border border-rgr-gray300/50 bg-[#fafafa] px-4 py-3">
                <div className="flex items-baseline justify-between">
                  <span className="text-sm text-rgr-gray600">Price</span>
                  <div className="flex items-baseline gap-2">
                    {product.old_price ? (
                      <span className="text-sm text-rgr-gray500 line-through">{product.old_price}</span>
                    ) : null}
                    <span className="font-display text-2xl tabular-nums text-rgr-blue">
                      {selected?.price ?? product.current_price}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Order form */}
            {soldOut ? (
              <div className="rounded-2xl border border-rgr-gray300/60 bg-[#fafafa] p-8 text-center">
                <p className="font-display text-xl uppercase text-rgr-navy">SOLD OUT</p>
                <p className="mt-2 text-sm text-rgr-gray700">
                  Join the waitlist to be notified when it&apos;s back.
                </p>
                <a
                  href={getWhatsAppLink(waEntryNotifyStock(product.name))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex rounded-xl bg-[#25D366] px-8 py-3.5 font-display text-sm uppercase tracking-wider text-white transition hover:brightness-110"
                >
                  📲 Notify Me When Back in Stock
                </a>
              </div>
            ) : (
              <div className="rounded-2xl border border-rgr-gray300/50 bg-white p-5 shadow-soft md:p-6">
                <h2 className="font-display text-lg uppercase tracking-wider text-rgr-navy">
                  📦 PLACE YOUR ORDER NOW
                </h2>
                <p className="mt-1 text-sm text-rgr-gray500">
                  Only serious buyers — fill the form below
                </p>

                {/* Pay on delivery badge */}
                <div className="mt-4 rounded-xl border border-green-200 bg-green-50 p-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🚚</span>
                    <div>
                      <p className="font-display text-sm uppercase tracking-wider text-green-800">
                        💵 PAY ON DELIVERY
                      </p>
                      <p className="text-xs text-green-700">
                        You pay ONLY when your order arrives. Zero upfront risk.
                      </p>
                    </div>
                  </div>
                </div>

                <form ref={formRef} className="mt-5 space-y-4" onSubmit={handleSubmit} noValidate>
                  <label className="block">
                    <span className="text-sm font-medium text-rgr-gray700">Full Name</span>
                    <input
                      value={form.fullName}
                      onChange={(e) => updateField("fullName", e.target.value)}
                      className={`mt-1 w-full rounded-lg border px-4 py-3 text-sm outline-none transition ${
                        fieldErrors.fullName
                          ? "border-red-400 focus:ring-2 focus:ring-red-200"
                          : "border-rgr-gray300 focus:border-rgr-blue focus:ring-2 focus:ring-rgr-blue/20"
                      }`}
                      placeholder="Your full name"
                    />
                    {fieldErrors.fullName && (
                      <p className="mt-1 text-xs text-red-600">{fieldErrors.fullName}</p>
                    )}
                  </label>

                  <label className="block">
                    <span className="text-sm font-medium text-rgr-gray700">Phone Number</span>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => {
                        updateField("phone", e.target.value);
                        if (sameAsPhone) updateField("whatsapp", e.target.value);
                      }}
                      className={`mt-1 w-full rounded-lg border px-4 py-3 text-sm outline-none transition ${
                        fieldErrors.phone
                          ? "border-red-400 focus:ring-2 focus:ring-red-200"
                          : "border-rgr-gray300 focus:border-rgr-blue focus:ring-2 focus:ring-rgr-blue/20"
                      }`}
                      placeholder="080..."
                    />
                    {fieldErrors.phone && (
                      <p className="mt-1 text-xs text-red-600">{fieldErrors.phone}</p>
                    )}
                  </label>

                  <div>
                    <label className="block">
                      <span className="text-sm font-medium text-rgr-gray700">WhatsApp Number</span>
                      <input
                        type="tel"
                        value={form.whatsapp}
                        onChange={(e) => updateField("whatsapp", e.target.value)}
                        disabled={sameAsPhone}
                        className={`mt-1 w-full rounded-lg border px-4 py-3 text-sm outline-none transition ${
                          fieldErrors.whatsapp
                            ? "border-red-400 focus:ring-2 focus:ring-red-200"
                            : "border-rgr-gray300 focus:border-rgr-blue focus:ring-2 focus:ring-rgr-blue/20"
                        } disabled:bg-rgr-gray100`}
                        placeholder="080..."
                      />
                    </label>
                    <label className="mt-2 flex items-center gap-2 text-xs text-rgr-gray700">
                      <input
                        type="checkbox"
                        checked={sameAsPhone}
                        onChange={(e) => {
                          setSameAsPhone(e.target.checked);
                          if (e.target.checked) updateField("whatsapp", form.phone);
                        }}
                        className="rounded"
                      />
                      Same as phone number
                    </label>
                    {fieldErrors.whatsapp && (
                      <p className="mt-1 text-xs text-red-600">{fieldErrors.whatsapp}</p>
                    )}
                  </div>

                  <label className="block">
                    <span className="text-sm font-medium text-rgr-gray700">Delivery Address</span>
                    <input
                      value={form.address}
                      onChange={(e) => updateField("address", e.target.value)}
                      className={`mt-1 w-full rounded-lg border px-4 py-3 text-sm outline-none transition ${
                        fieldErrors.address
                          ? "border-red-400 focus:ring-2 focus:ring-red-200"
                          : "border-rgr-gray300 focus:border-rgr-blue focus:ring-2 focus:ring-rgr-blue/20"
                      }`}
                      placeholder="Street address, estate, landmark"
                    />
                    {fieldErrors.address && (
                      <p className="mt-1 text-xs text-red-600">{fieldErrors.address}</p>
                    )}
                  </label>

                  <label className="block">
                    <span className="text-sm font-medium text-rgr-gray700">Delivery State</span>
                    <select
                      value={form.state}
                      onChange={(e) => updateField("state", e.target.value)}
                      className={`mt-1 w-full rounded-lg border px-4 py-3 text-sm outline-none transition ${
                        fieldErrors.state
                          ? "border-red-400 focus:ring-2 focus:ring-red-200"
                          : "border-rgr-gray300 focus:border-rgr-blue focus:ring-2 focus:ring-rgr-blue/20"
                      }`}
                    >
                      <option value="">Select state</option>
                      {NIGERIAN_STATES.map((state) => (
                        <option key={state} value={state}>{state}</option>
                      ))}
                    </select>
                    {fieldErrors.state && (
                      <p className="mt-1 text-xs text-red-600">{fieldErrors.state}</p>
                    )}
                  </label>

                  {/* Selected package display */}
                  <div className="rounded-lg border border-rgr-gray300/50 bg-[#fafafa] p-3 text-sm text-rgr-gray700">
                    Selected: <span className="font-semibold text-rgr-navy">{selected?.label}</span>
                    {" — "}
                    <span className="font-semibold text-rgr-blue">{selected?.price ?? product.current_price}</span>
                  </div>

                  <button
                    type="submit"
                    disabled={!isFormValid}
                    className="w-full rounded-xl bg-rgr-gold px-6 py-4 font-display text-base uppercase tracking-wider text-rgr-navy shadow-lg transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    🛒 ORDER NOW — PAY ON DELIVERY
                  </button>

                  <p className="text-center text-xs text-rgr-gray500">
                    You&apos;ll be redirected to WhatsApp to send your order details
                  </p>
                </form>

              </div>
            )}
          </div>
        </div>

        {/* Trust signals */}
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
          {trustCards.map(({ emoji, title, desc }) => (
            <FadeInView key={title}>
              <div className="rounded-2xl border border-rgr-gray300/40 bg-white p-5 text-center shadow-sm">
                <span className="text-2xl">{emoji}</span>
                <p className="mt-2 font-display text-sm uppercase tracking-wider text-rgr-navy">
                  {title}
                </p>
                <p className="mt-1 text-xs text-rgr-gray500">{desc}</p>
              </div>
            </FadeInView>
          ))}
        </div>

        {/* Product footer */}
        <div className="mt-8 border-t border-rgr-gray300/40 pt-6 text-center">
          <Link
            href="/"
            className="font-display text-sm uppercase tracking-wider text-rgr-gold underline underline-offset-4 hover:text-amber-500"
          >
            ← Back to Main Store
          </Link>
        </div>
      </div>

      {/* Success overlay */}
      {showSuccess && (
        <div className="fixed inset-0 z-[400] flex items-center justify-center bg-black/75 p-4">
          <div className="w-full max-w-md animate-fade-in-up rounded-2xl bg-white p-8 text-center shadow-2xl">
            <div className="text-5xl">🎉</div>
            <h2 className="mt-4 font-display text-3xl uppercase text-green-600">
              ALMOST DONE!
            </h2>
            <p className="mt-3 text-sm text-rgr-gray700">
              Thank you {successName}! Send the message on WhatsApp to complete
              your order. Our team will confirm within 30 minutes.
            </p>
            <a
              href={getWhatsAppLink(`Hi, I just placed an order for ${product.name}. Please confirm.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-8 py-3.5 font-display text-sm uppercase tracking-wider text-white transition hover:bg-[#20bd5a]"
            >
              💬 Confirm on WhatsApp
            </a>
            <div className="mt-4">
              <Link
                href="/"
                className="text-sm font-medium text-rgr-blue underline underline-offset-4"
                onClick={() => setShowSuccess(false)}
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
