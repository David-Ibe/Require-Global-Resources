"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { getWhatsAppLink } from "@/lib/site-config";
import {
  waEntryNotifyStock
} from "@/lib/whatsapp-sales";
import type { PricingOption, ProductRow } from "@/lib/supabase/types";

import { UrgencyBar } from "@/components/product/urgency-bar";
import { featureBlurbFor } from "@/lib/feature-blurb";
function youtubeId(url: string): string | null {
  const m = url.match(/(?:youtu\.be\/|v=)([^&?]+)/);
  return m?.[1] ?? null;
}

function digitsFromPrice(raw: string): number {
  const n = Number.parseInt(raw.replace(/[^\d]/g, ""), 10);
  return Number.isFinite(n) && n > 0 ? n : 0;
}

const trustMini = [
  "Verified products",
  "Manual payment verification",
  "CAC registered",
  "Fast delivery"
] as const;

export function ProductPageClient({
  product
}: {
  product: ProductRow;
}) {
  const options = useMemo(() => {
    const raw = product.pricing_options;
    if (Array.isArray(raw)) return raw as PricingOption[];
    return [] as PricingOption[];
  }, [product.pricing_options]);

  const [selectedIdx, setSelectedIdx] = useState(0);
  const selected = options[selectedIdx] ?? options[0];
  const [orderQty, setOrderQty] = useState(1);

  const images = product.images.length ? product.images : ["/og-default.svg"];
  const [imgIdx, setImgIdx] = useState(0);
  const mainImg = images[imgIdx] ?? images[0];

  const soldOut = product.stock_count <= 0;
  const yt = product.youtube_url ? youtubeId(product.youtube_url) : null;

  const unitPriceDigits = useMemo(() => {
    const raw = selected?.price ?? product.current_price;
    return digitsFromPrice(raw);
  }, [selected, product.current_price]);

  const lineEstimate = unitPriceDigits * orderQty;

  useEffect(() => {
    const max = Math.max(1, product.stock_count);
    setOrderQty((q) => Math.min(Math.max(1, q), max));
  }, [product.stock_count, selectedIdx]);

  function bumpOrderQty(delta: number) {
    const max = Math.max(1, product.stock_count);
    setOrderQty((q) => Math.min(Math.max(1, q + delta), max));
  }

  return (
    <div className="bg-rgr-surface">
      {product.stock_count > 0 ? <UrgencyBar stockCount={product.stock_count} /> : null}

      <div className="border-b border-rgr-gray300/40 bg-[#fcfcfc]">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-5 md:px-10">
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-[0.14em] text-rgr-gray500">
              Home / {product.category}
            </p>
            <Link
              href="/"
              className="text-sm font-medium text-rgr-gray700 underline decoration-rgr-gray300 underline-offset-4 transition hover:text-rgr-navy hover:decoration-rgr-navy"
            >
              ← Back to store
            </Link>
          </div>
          <a
            href={`/order/${product.slug}`}
            className="inline-flex items-center justify-center rounded-lg bg-rgr-navy px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-rgr-charcoal"
          >
            Continue to checkout
          </a>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 py-8 md:px-10 md:py-10">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)] lg:items-start">
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
                  className="object-contain"
                  priority
                  sizes="(max-width:1024px) 100vw, 50vw"
                />
                {product.badge ? (
                  <span className="absolute left-4 top-4 rounded-md bg-rgr-navy/90 px-2.5 py-1 text-xs font-medium text-white">
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
          </div>

          <div className="space-y-6 lg:sticky lg:top-24 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto lg:pr-2">
            <div className="rounded-2xl border border-rgr-gray300/50 bg-rgr-surface p-5 shadow-soft md:p-6">
              <p className="text-sm text-rgr-gray500">{product.category}</p>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight text-rgr-navy md:text-[2.05rem]">
                {product.name}
              </h1>
              <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
                <span
                  className={`rounded-full px-3 py-1 font-medium ${
                    soldOut
                      ? "bg-rgr-gray200 text-rgr-gray700"
                      : "bg-rgr-success/15 text-rgr-success"
                  }`}
                >
                  {soldOut ? "Out of stock" : "In stock"}
                </span>
                <span className="text-rgr-gray500">SKU: {product.slug}</span>
              </div>
              <p className="mt-4 text-base leading-relaxed text-rgr-gray700">
                {product.description}
              </p>
              <div className="mt-6 rounded-xl border border-rgr-gray300/50 bg-[#fafafa] px-4 py-3">
                <p className="text-sm text-rgr-gray600">Current price</p>
                <p className="mt-1 text-3xl font-bold tracking-tight text-rgr-navy">
                  {selected?.price ?? product.current_price}
                </p>
                {product.old_price ? (
                  <p className="mt-1 text-sm text-rgr-gray500">
                    <span className="line-through">{product.old_price}</span>
                    <span className="ml-2 font-medium text-rgr-navy">Promo</span>
                  </p>
                ) : null}
              </div>

              <h2 className="mt-6 text-base font-semibold uppercase tracking-[0.08em] text-rgr-gray600">
                Choose package
              </h2>
              <p className="mt-2 text-sm text-rgr-gray500">Choose what fits your need best.</p>
              <div className="mt-4 space-y-2.5">
                {options.map((opt, i) => (
                  <button
                    key={opt.label + i}
                    type="button"
                    onClick={() => setSelectedIdx(i)}
                    className={`w-full rounded-xl border p-4 text-left transition ${
                      selectedIdx === i
                        ? "border-rgr-navy bg-[#fafafa] ring-1 ring-rgr-navy"
                        : "border-rgr-gray300/60 bg-rgr-surface hover:border-rgr-gray300"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-base font-semibold text-rgr-navy">{opt.label}</p>
                        <p className="text-xs text-rgr-gray500">Qty: {opt.qty}</p>
                        {opt.savings ? (
                          <p className="mt-1 text-sm font-medium text-rgr-gray700">
                            {opt.savings}
                          </p>
                        ) : null}
                      </div>
                      <span className="text-lg font-bold tabular-nums text-rgr-navy">{opt.price}</span>
                    </div>
                  </button>
                ))}
              </div>

              <ul className="mt-6 space-y-2 text-sm text-rgr-gray700">
                {product.features.slice(0, 3).map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-rgr-navy" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {!soldOut ? (
                <div className="mt-6 rounded-xl border border-rgr-gray300/60 bg-[#fafafa] p-4">
                  <p className="text-sm font-medium text-rgr-gray700">Quantity</p>
                  <div className="mt-2 flex max-w-[220px] items-center gap-2">
                    <button
                      type="button"
                      onClick={() => bumpOrderQty(-1)}
                      disabled={orderQty <= 1}
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-rgr-gray300 bg-white text-lg font-semibold text-rgr-navy transition hover:bg-rgr-gray100 disabled:cursor-not-allowed disabled:opacity-40"
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span className="min-w-[2.5rem] text-center text-lg font-semibold tabular-nums text-rgr-navy">
                      {orderQty}
                    </span>
                    <button
                      type="button"
                      onClick={() => bumpOrderQty(1)}
                      disabled={orderQty >= product.stock_count}
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-rgr-gray300 bg-white text-lg font-semibold text-rgr-navy transition hover:bg-rgr-gray100 disabled:cursor-not-allowed disabled:opacity-40"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                  {unitPriceDigits > 0 ? (
                    <p className="mt-3 text-sm font-semibold text-rgr-navy">
                      Estimated total: ₦{lineEstimate.toLocaleString()}
                    </p>
                  ) : null}
                </div>
              ) : null}

              <button
                type="button"
                disabled={soldOut}
                onClick={() => {
                  if (soldOut) return;
                  window.location.href = `/order/${product.slug}?qty=${orderQty}`;
                }}
                className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-rgr-navy px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-rgr-charcoal disabled:cursor-not-allowed disabled:opacity-50"
              >
                Continue to secure checkout
              </button>
            </div>
          </div>
        </div>

        {yt ? (
          <div className="mt-16">
            <h2 className="text-xl font-semibold tracking-tight text-rgr-navy md:text-2xl">
              Video
            </h2>
            <p className="mt-2 text-sm text-rgr-gray600">
              See what you get before you order.
            </p>
            <div className="mt-4 aspect-video overflow-hidden rounded-2xl bg-black shadow-soft">
              <iframe
                title="Product video"
                src={`https://www.youtube.com/embed/${yt}`}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        ) : null}

        <div className="mt-16">
          <h2 className="text-xl font-semibold tracking-tight text-rgr-navy md:text-2xl">
            Details
          </h2>
          <ul className="mt-6 space-y-4 text-rgr-gray700">
            {product.features.map((f) => (
              <li key={f} className="flex gap-3 border-b border-rgr-gray300/40 pb-4 last:border-0">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-rgr-navy" aria-hidden />
                <div>
                  <p className="font-medium text-rgr-navy">{f}</p>
                  <p className="mt-1 text-sm leading-relaxed text-rgr-gray700">
                    {featureBlurbFor(f)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {soldOut ? (
          <div className="mt-16 rounded-2xl border border-rgr-gray300/60 bg-[#fafafa] p-8 text-center">
            <p className="text-xl font-semibold text-rgr-navy">Out of stock</p>
            <p className="mt-2 text-sm text-rgr-gray700">
              Message us to get notified when it is back.
            </p>
            <a
              href={getWhatsAppLink(waEntryNotifyStock(product.name))}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex rounded-lg bg-rgr-whatsapp px-8 py-3.5 text-sm font-semibold text-white transition hover:brightness-110"
            >
              Notify me on WhatsApp
            </a>
          </div>
        ) : (
          <div className="mx-auto mt-16 max-w-3xl rounded-2xl border border-rgr-gray300/40 bg-rgr-surface p-6 text-center shadow-soft md:p-8">
            <h2 className="text-2xl font-semibold tracking-tight text-rgr-navy md:text-3xl">
              Ready to order?
            </h2>
            <p className="mt-2 text-sm text-rgr-gray600">
              Continue on WhatsApp and we will confirm your order details there.
            </p>
            <div className="mt-5 rounded-xl border border-rgr-gray300/50 bg-[#fafafa] px-4 py-3 text-sm text-rgr-gray700">
              Selected package:{" "}
              <span className="font-semibold text-rgr-navy">
                {selected?.label ?? "Choose a package"} - {selected?.price ?? product.current_price}
              </span>
            </div>
            <a
              href={`/order/${product.slug}?qty=${orderQty}`}
              className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-rgr-navy px-6 py-4 text-base font-semibold text-white transition hover:bg-rgr-charcoal"
            >
              Continue to secure checkout
            </a>
          </div>
        )}

        <div className="mt-16 border-t border-rgr-gray300/40 pt-10">
          <p className="text-center text-sm font-medium text-rgr-gray600">
            {trustMini.join(" · ")}
          </p>
        </div>

        <div className="mt-10 text-center">
          <Link href="/" className="text-sm font-medium text-rgr-navy underline decoration-rgr-gray300 underline-offset-4 hover:decoration-rgr-navy">
            ← Back to store
          </Link>
        </div>
      </div>

    </div>
  );
}
