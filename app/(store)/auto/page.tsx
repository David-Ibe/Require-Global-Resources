import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

import { FadeInView } from "@/components/fade-in-view";
import { ProductCardHome } from "@/components/store/product-card-home";
import { AutoSortBar } from "@/components/store/auto-sort-bar";
import { brand, getWhatsAppLink, siteUrl } from "@/lib/site-config";
import { createClient } from "@/lib/supabase/server";
import type { ProductRow } from "@/lib/supabase/types";

export const revalidate = 60;

export const metadata: Metadata = {
  title: `Car Accessories | ${brand.shortName}`,
  description:
    "Premium verified car accessories for the modern Nigerian driver. Delivered in 2–5 days. Pay on delivery.",
  openGraph: {
    title: `Car Accessories | ${brand.shortName}`,
    description:
      "Premium verified car accessories for the modern Nigerian driver. Delivered in 2–5 days.",
    url: `${siteUrl}/auto`,
  },
};

function priceDigits(product: ProductRow): number {
  const opts = Array.isArray(product.pricing_options)
    ? (product.pricing_options as { price?: string }[])
    : [];
  const raw = opts[0]?.price ?? product.current_price;
  const n = Number.parseInt(raw.replace(/[^\d]/g, ""), 10);
  return Number.isFinite(n) ? n : 0;
}

async function fetchCarProducts(
  sort: string
): Promise<ProductRow[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("active", true)
      .order("created_at", { ascending: false });

    if (error || !data) return [];

    const filtered = (data as ProductRow[]).filter(
      (p) =>
        p.category === "Car Accessories" || p.category === "Bundle Deal"
    );

    if (sort === "price-asc")
      return filtered.sort((a, b) => priceDigits(a) - priceDigits(b));
    if (sort === "price-desc")
      return filtered.sort((a, b) => priceDigits(b) - priceDigits(a));
    return filtered;
  } catch {
    return [];
  }
}

const whatsappLink = getWhatsAppLink(
  "Hi, I'm interested in your car accessories. What do you have available?"
);

const trustBadges = [
  { icon: "✅", label: "Verified Products" },
  { icon: "💵", label: "Pay on Delivery" },
  { icon: "🏢", label: "CAC Registered" },
  { icon: "🚀", label: "2–5 Day Delivery" },
];

const whyReasons = [
  {
    icon: "🔍",
    title: "Physically Verified",
    desc: "Every product inspected before it ships to you.",
  },
  {
    icon: "💵",
    title: "Pay on Delivery",
    desc: "You pay only when your order arrives at your door.",
  },
  {
    icon: "🏢",
    title: "CAC Registered",
    desc: "Legitimate Nigerian business you can trust.",
  },
  {
    icon: "💬",
    title: "Real WhatsApp Support",
    desc: "Chat with a real person, not a bot.",
  },
];

type Props = { searchParams: { sort?: string } };

export default async function AutoPage({ searchParams }: Props) {
  const sort = searchParams.sort ?? "newest";
  const products = await fetchCarProducts(sort);

  return (
    <div>
      {/* Hero — compact */}
      <section className="bg-rgr-navy py-8 md:py-10">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <FadeInView>
            <nav className="text-sm text-white/50">
              <Link href="/" className="hover:text-white">
                Home
              </Link>
              <span className="mx-2">→</span>
              <span className="text-rgr-gold">Car Accessories</span>
            </nav>
            <h1 className="mt-4 font-display text-3xl uppercase tracking-tight text-white md:text-4xl lg:text-5xl">
              Verified &amp; Built for Nigerian&nbsp;Roads.
            </h1>
            <p className="mt-2 max-w-xl text-sm text-white/60 md:text-base">
              Premium, quality-checked car accessories that actually work on our
              roads. Pay on delivery&nbsp;&mdash;&nbsp;no fakes, no&nbsp;stories.
            </p>
          </FadeInView>
        </div>
      </section>

      {/* Trust strip */}
      <div className="border-b border-rgr-gray300/40 bg-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-6 gap-y-2 px-5 py-3 md:px-10">
          {trustBadges.map((b) => (
            <span
              key={b.label}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-rgr-gray700"
            >
              {b.icon} {b.label}
            </span>
          ))}
        </div>
      </div>

      {/* Products */}
      <section className="bg-[#F8F9FC] py-8 md:py-10">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          {products.length > 0 && (
            <Suspense>
              <AutoSortBar count={products.length} />
            </Suspense>
          )}
          {products.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {products.map((p, i) => (
                <ProductCardHome key={p.id} product={p} index={i} />
              ))}
            </div>
          ) : (
            <FadeInView>
              <div className="py-16 text-center">
                <p className="font-display text-2xl text-rgr-navy">
                  More car accessories coming soon.
                </p>
                <p className="mt-3 text-rgr-gray500">
                  Follow{" "}
                  <a
                    href="https://instagram.com/requireglobalresources"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-rgr-blue underline"
                  >
                    @requireglobalresources
                  </a>{" "}
                  to be the first to know.
                </p>
                <Link
                  href="/"
                  className="mt-6 inline-flex rounded-xl bg-rgr-gold px-8 py-3.5 font-display text-sm uppercase tracking-wider text-rgr-navy transition hover:bg-amber-400"
                >
                  ← Back to Store
                </Link>
              </div>
            </FadeInView>
          )}
        </div>
      </section>

      {/* Why Buy From Us */}
      <section className="border-t border-rgr-gray300/40 bg-white py-10 md:py-14">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <FadeInView>
            <h2 className="text-center font-display text-2xl uppercase tracking-tight text-rgr-navy md:text-3xl">
              Why Buy From Require&nbsp;Global?
            </h2>
          </FadeInView>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {whyReasons.map((r) => (
              <FadeInView key={r.title}>
                <div className="rounded-2xl border border-rgr-gray300/40 bg-[#fafafa] p-5 text-center">
                  <span className="text-2xl">{r.icon}</span>
                  <p className="mt-2 font-display text-sm uppercase tracking-wider text-rgr-navy">
                    {r.title}
                  </p>
                  <p className="mt-1 text-xs text-rgr-gray500">{r.desc}</p>
                </div>
              </FadeInView>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-rgr-navy py-10 md:py-12">
        <div className="mx-auto max-w-7xl px-5 text-center md:px-10">
          <FadeInView>
            <h2 className="font-display text-2xl uppercase tracking-tight text-white md:text-3xl">
              Ready to Upgrade Your&nbsp;Ride?
            </h2>
            <p className="mt-2 text-sm text-white/60">
              Chat with us or browse more products.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-8 py-3.5 font-display text-sm uppercase tracking-wider text-white transition hover:bg-[#20bd5a]"
              >
                💬 Chat on WhatsApp
              </a>
              <Link
                href="/"
                className="inline-flex rounded-xl border-2 border-white/20 px-8 py-3.5 font-display text-sm uppercase tracking-wider text-white transition hover:border-white/40"
              >
                ← Browse All Products
              </Link>
            </div>
          </FadeInView>
        </div>
      </section>
    </div>
  );
}
