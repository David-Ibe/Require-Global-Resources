import type { Metadata } from "next";
import type { LucideIcon } from "lucide-react";
import {
  BadgeCheck,
  Landmark,
  MessageCircle,
  ShieldCheck,
  Truck
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

import { FadeInView } from "@/components/fade-in-view";
import {
  HomeProductsGrid,
  HomeProductsHeading,
  HomeProductsSkeleton
} from "@/components/store/home-products-section";
import { ReviewCard } from "@/components/store/review-card";
import { TrustMarquee } from "@/components/store/trust-marquee";
import { brand, siteUrl } from "@/lib/site-config";
import { fetchHomeReviews } from "@/lib/home-data";
import { mergeReviewsForHome } from "@/lib/reviews-display";

const pageTitleShort = "Original car accessories for Nigerian drivers";
const pageTitleFull = `${brand.shortName} | ${pageTitleShort}`;
const pageDesc =
  "Verified car accessories, secure checkout, fast support, and nationwide delivery across Nigeria.";

export const metadata: Metadata = {
  title: pageTitleShort,
  description: pageDesc,
  openGraph: {
    title: pageTitleFull,
    description: pageDesc,
    url: siteUrl,
    images: [
      {
        url: "/og-default.svg",
        width: 1200,
        height: 630,
        alt: `${brand.shortName} — ${brand.tagline}`
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitleFull,
    description: pageDesc,
    images: ["/og-default.svg"]
  }
};

const trustBadges = [
  { label: "CAC Registered", Icon: Landmark },
  { label: "Pay on Delivery", Icon: ShieldCheck },
  { label: "2-5 Days Delivery", Icon: Truck }
] as const;

const whyCards: {
  title: string;
  desc: string;
  Icon: LucideIcon;
}[] = [
  {
    title: "Fit-tested for Nigerian roads",
    desc: "Products selected to hold up on rough roads, traffic, and daily use.",
    Icon: BadgeCheck
  },
  {
    title: "Support from browse to delivery",
    desc: "Fast replies from order placement to delivery confirmation.",
    Icon: MessageCircle
  },
  {
    title: "Fast Lagos dispatch",
    desc: "Quick dispatch from Lagos with delivery to major states nationwide.",
    Icon: Truck
  },
  {
    title: "Transparent pricing",
    desc: "Clear prices, clear savings, and no hidden fees or surprises.",
    Icon: ShieldCheck
  },
  {
    title: "CAC-registered business",
    desc: "A registered Nigerian business you can verify and trust.",
    Icon: Landmark
  }
];

const stepsMinimal = [
  "Choose a product",
  "Checkout securely",
  "We confirm your details",
  "Receive and pay"
] as const;

export default async function HomePage() {
  const rawReviews = await fetchHomeReviews();
  const displayReviews = mergeReviewsForHome(rawReviews);

  const heroImageSrc = "/hero-home-driver.png";

  return (
    <div className="bg-rgr-surface">
      <section className="border-b border-rgr-gray300/40 bg-rgr-surface bg-hero-radial">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 pb-12 pt-2 md:grid-cols-2 md:gap-12 md:px-10 md:pb-14 md:pt-6 lg:gap-16 lg:pb-16 lg:pt-8">
          <div className="hero-stagger max-w-xl">
            <h1 className="text-[2.75rem] font-semibold leading-[1.05] tracking-tight text-rgr-navy sm:text-5xl lg:text-[3.5rem]">
              Verified Smart Upgrades for Your Car & Home
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-rgr-gray700 md:text-xl md:leading-relaxed">
              No fakes • Pay on Delivery • Nationwide
            </p>
            <ul className="mt-7 flex flex-wrap gap-2.5 text-sm font-medium text-rgr-gray700">
              <li className="rounded-full border border-rgr-gray300/70 bg-[#fafafa] px-3.5 py-1.5">
                No fakes
              </li>
              <li className="rounded-full border border-rgr-gray300/70 bg-[#fafafa] px-3.5 py-1.5">
                Pay on Delivery
              </li>
              <li className="rounded-full border border-rgr-gray300/70 bg-[#fafafa] px-3.5 py-1.5">
                Nationwide delivery
              </li>
            </ul>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-5">
              <a
                href="#products"
                className="inline-flex items-center justify-center rounded-lg bg-rgr-navy px-9 py-4 text-center text-base font-semibold text-white shadow-sm transition hover:bg-rgr-charcoal"
              >
                Browse products
              </a>
            </div>
            <div className="mt-8 grid gap-2.5 sm:grid-cols-3">
              {trustBadges.map(({ label, Icon }) => (
                <p
                  key={label}
                  className="inline-flex items-center gap-2 rounded-lg border border-rgr-gray300/70 bg-white px-3 py-2 text-xs font-semibold text-rgr-gray700 shadow-sm"
                >
                  <Icon className="h-4 w-4 text-rgr-gold" />
                  <span>{label}</span>
                </p>
              ))}
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-md md:max-w-none">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-[#f4f4f5] shadow-soft ring-1 ring-rgr-gray300/30 md:aspect-[5/4]">
              <Image
                src={heroImageSrc}
                alt="Split scene showing smart upgrades for car and home"
                fill
                priority
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 45vw"
              />
            </div>
          </div>
        </div>
      </section>

      <TrustMarquee />

      <section
        id="products"
        className="mx-auto max-w-7xl px-5 py-12 md:px-10 md:py-16"
      >
        <HomeProductsHeading />
        <Suspense fallback={<HomeProductsSkeleton />}>
          <HomeProductsGrid />
        </Suspense>
      </section>

      <section
        id="how-it-works"
        className="border-y border-rgr-gray300/40 bg-[#fafafa] py-14 md:py-16"
      >
        <div className="mx-auto max-w-lg px-5 md:px-10">
          <FadeInView>
            <h2 className="text-2xl font-semibold tracking-tight text-rgr-navy md:text-3xl">
              How it works
            </h2>
            <ol className="mt-10 space-y-5 text-lg leading-snug text-rgr-navy md:text-xl">
              {stepsMinimal.map((line, i) => (
                <li key={line} className="flex gap-4">
                  <span className="w-6 shrink-0 tabular-nums text-rgr-gray500">
                    {i + 1}.
                  </span>
                  <span>{line}</span>
                </li>
              ))}
            </ol>
            <p className="mt-8 text-sm text-rgr-gray600 md:text-base">
              Simple, safe, and stress-free.
            </p>
          </FadeInView>
        </div>
      </section>

      <section className="border-b border-rgr-gray300/40 bg-rgr-surface py-14 md:py-16">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <FadeInView>
            <h2 className="text-2xl font-semibold tracking-tight text-rgr-navy md:text-3xl">
              Why choose us
            </h2>
            <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {whyCards.map(({ title, desc, Icon }) => (
                <article
                  key={title}
                  className="rounded-xl border border-rgr-gray300/50 bg-[#fafafa] p-5"
                >
                  <Icon className="h-5 w-5 text-rgr-gold" />
                  <h3 className="mt-3 text-base font-semibold text-rgr-navy">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-rgr-gray700">{desc}</p>
                </article>
              ))}
            </div>
          </FadeInView>
        </div>
      </section>

      <section className="bg-[#fafafa] py-14 md:py-16">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <FadeInView>
            <h2 className="text-2xl font-semibold tracking-tight text-rgr-navy md:text-3xl">
              Real reviews from verified customers
            </h2>
            <p className="mt-3 max-w-md text-[15px] text-rgr-gray600 md:text-base">
              {rawReviews.length > 0
                ? "Detailed feedback from verified customers across Nigeria."
                : "Real buyer stories from actual deliveries."}
            </p>
          </FadeInView>
          <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {displayReviews.map((r) => (
              <ReviewCard key={r.id} review={r} productName={r.product_name} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-rgr-gray300/40 bg-rgr-navy py-14 md:py-16">
        <div className="mx-auto max-w-xl px-5 text-center md:px-10">
          <FadeInView>
            <h2 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
              Ready to upgrade your car?
            </h2>
            <p className="mt-3 text-sm text-white/80 md:text-base">
              Shop the store, checkout online, then confirm payment details on
              WhatsApp if needed. {brand.phoneDisplay}
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/#products"
                className="inline-flex w-full max-w-sm items-center justify-center rounded-lg bg-white px-10 py-4 text-base font-semibold text-rgr-navy shadow-sm transition hover:bg-white/90 sm:w-auto"
              >
                Browse products
              </Link>
              <Link
                href="/contact"
                className="inline-flex w-full max-w-sm items-center justify-center rounded-lg border border-white/40 bg-transparent px-10 py-4 text-base font-semibold text-white transition hover:bg-white/10 sm:w-auto"
              >
                Contact us
              </Link>
            </div>
          </FadeInView>
        </div>
      </section>
    </div>
  );
}
