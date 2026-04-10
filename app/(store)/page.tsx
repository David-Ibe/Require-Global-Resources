import {
  Building2,
  Car,
  Home,
  MessageCircle,
  Rocket,
  Search,
  Wallet,
} from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

import { FadeInView } from "@/components/fade-in-view";
import { HomeHero } from "@/components/store/home-hero";
import {
  HomeProductsGrid,
  HomeProductsHeading,
  HomeProductsSkeleton,
} from "@/components/store/home-products-section";
import { ReviewCard } from "@/components/store/review-card";
import { TrustMarquee } from "@/components/store/trust-marquee";
import { brand, getWhatsAppLink } from "@/lib/site-config";
import { fetchHomeReviews } from "@/lib/home-data";
import { mergeReviewsForHome } from "@/lib/reviews-display";

/* ─── Shop-by-Category cards ─── */
const shopCategories = [
  {
    name: "CAR ACCESSORIES",
    tagline: "Upgrade Your Ride",
    Icon: Car,
    href: "/auto",
    available: true,
    bgClass: "bg-gradient-to-br from-rgr-navy to-[#0c1e3d]",
  },
  {
    name: "SMART HOME",
    tagline: "Coming Soon",
    Icon: Home,
    href: "/home",
    available: false,
    badge: "COMING SOON",
    bgClass: "bg-gradient-to-br from-[#1a2744] to-rgr-navy",
  },
];

/* ─── How-It-Works steps ─── */
const steps = [
  {
    num: "01",
    title: "Choose your product",
    desc: "Browse our verified catalogue.",
  },
  {
    num: "02",
    title: "Order via WhatsApp or website",
    desc: "Takes under 2 minutes.",
  },
  {
    num: "03",
    title: "We confirm in 30 minutes",
    desc: "Your order is locked in.",
  },
  {
    num: "04",
    title: "Receive & pay on delivery",
    desc: "Arrives in 2\u20135 days.",
  },
];

/* ─── Why-Choose-Us cards (5) ─── */
const whyCards = [
  {
    title: "Product Verification",
    desc: "Every product physically verified before shipping.",
    Icon: Search,
  },
  {
    title: "Pay on Delivery",
    desc: "Zero risk \u2014 pay only when it arrives.",
    Icon: Wallet,
  },
  {
    title: "CAC Registered",
    desc: "Legitimate Nigerian company you can trust.",
    Icon: Building2,
  },
  {
    title: "Real Support",
    desc: "Real human support on WhatsApp.",
    Icon: MessageCircle,
  },
  {
    title: "Fast Delivery",
    desc: "Nationwide in 2\u20135 days. Lagos often same/next day.",
    Icon: Rocket,
  },
];

const whatsappHref = getWhatsAppLink(
  `Hi ${brand.shortName}, I'd like to place an order.`
);

export default async function HomePage() {
  const rawReviews = await fetchHomeReviews();
  const displayReviews = mergeReviewsForHome(rawReviews);

  return (
    <div>
      {/* 1. Hero Banner Slider */}
      <HomeHero />

      {/* 2. Scrolling Trust Bar */}
      <TrustMarquee />

      {/* 3. Shop By Category */}
      <section className="bg-[#F8F9FC] py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <FadeInView>
            <p className="font-display text-sm uppercase tracking-[0.2em] text-rgr-blue">
              Browse
            </p>
            <h2 className="mt-2 font-display text-3xl uppercase tracking-tight text-rgr-navy md:text-4xl">
              SHOP BY CATEGORY
            </h2>
          </FadeInView>

          <div className="mt-10 grid grid-cols-2 gap-4 md:gap-6">
            {shopCategories.map(({ name, tagline, Icon, href, available, badge, bgClass }, i) => (
              <FadeInView key={name} delay={i * 80}>
                <Link
                  href={available ? href : href === "#" ? "#" : href}
                  className={`group relative flex flex-col items-center justify-center overflow-hidden rounded-2xl p-8 text-center shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-lift md:p-10 ${bgClass}`}
                >
                  {!available && (
                    <div className="absolute inset-0 z-10 flex items-start justify-center bg-black/40 pt-4">
                      <span className="rounded-full bg-rgr-gray700/90 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
                        {badge}
                      </span>
                    </div>
                  )}
                  <div className="rounded-xl bg-white/10 p-4 transition duration-300 group-hover:bg-rgr-gold/20">
                    <Icon className="h-8 w-8 text-rgr-gold md:h-10 md:w-10" />
                  </div>
                  <h3 className="mt-4 font-display text-base tracking-wider text-white md:text-lg">
                    {name}
                  </h3>
                  <p className="mt-1 text-xs text-white/60">{tagline}</p>
                  {available && (
                    <span className="mt-3 text-xs font-medium text-rgr-gold opacity-0 transition group-hover:opacity-100">
                      Shop Now →
                    </span>
                  )}
                </Link>
              </FadeInView>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Featured Products */}
      <section id="products" className="bg-white py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <HomeProductsHeading />
          <Suspense fallback={<HomeProductsSkeleton />}>
            <HomeProductsGrid />
          </Suspense>
        </div>
      </section>

      {/* 5. How It Works (navy) */}
      <section id="how-it-works" className="bg-rgr-navy py-12 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <FadeInView>
            <p className="font-display text-sm uppercase tracking-[0.2em] text-rgr-gold">
              The Process
            </p>
            <h2 className="mt-2 font-display text-3xl uppercase tracking-tight text-white md:text-4xl">
              HOW IT WORKS
            </h2>
          </FadeInView>

          <div className="relative mt-14">
            <div className="absolute left-6 top-0 hidden h-full w-0.5 bg-gradient-to-b from-rgr-blue to-rgr-gold md:block" aria-hidden />
            <div className="grid gap-8 md:gap-10">
              {steps.map(({ num, title, desc }, i) => (
                <FadeInView key={num} delay={i * 120}>
                  <div className="flex gap-6">
                    <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-rgr-blue text-lg font-bold text-white shadow-lg">
                      {num}
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                      <h3 className="font-display text-lg uppercase tracking-wider text-white">
                        {title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-white/70">
                        {desc}
                      </p>
                    </div>
                  </div>
                </FadeInView>
              ))}
            </div>
          </div>

          <FadeInView delay={500}>
            <p className="mt-12 text-center font-display text-lg uppercase tracking-wider text-white/60">
              Simple. Safe. Stress-free.
            </p>
          </FadeInView>
        </div>
      </section>

      {/* 6. Why Choose Us */}
      <section className="bg-[#F8F9FC] py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <FadeInView>
            <p className="font-display text-sm uppercase tracking-[0.2em] text-rgr-blue">
              Our Promise
            </p>
            <h2 className="mt-2 font-display text-3xl uppercase tracking-tight text-rgr-navy md:text-4xl">
              BUILT ON TRUST
            </h2>
          </FadeInView>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {whyCards.map(({ title, desc, Icon }, i) => (
              <FadeInView key={title} delay={i * 60}>
                <article className="rounded-2xl border border-rgr-gray300/50 bg-white p-6 shadow-soft transition duration-300 hover:-translate-y-0.5 hover:border-l-4 hover:border-l-rgr-blue hover:shadow-lift">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rgr-navy/5">
                    <Icon className="h-6 w-6 text-rgr-gold" />
                  </div>
                  <h3 className="mt-4 font-display text-base uppercase tracking-wider text-rgr-navy">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-rgr-gray700">
                    {desc}
                  </p>
                </article>
              </FadeInView>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Customer Reviews */}
      {displayReviews.length > 0 && (
        <section className="bg-rgr-gray100 py-12 md:py-20">
          <div className="mx-auto max-w-7xl px-5 md:px-10">
            <FadeInView>
              <p className="font-display text-sm uppercase tracking-[0.2em] text-rgr-blue">
                What They Say
              </p>
              <h2 className="mt-2 font-display text-3xl uppercase tracking-tight text-rgr-navy md:text-4xl">
                HAPPY CUSTOMERS
              </h2>
              <p className="mt-3 text-base text-rgr-gray500">
                Real Nigerians. Real orders. Real experiences.
              </p>
            </FadeInView>

            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {displayReviews.slice(0, 6).map((r) => (
                <FadeInView key={r.id} delay={80}>
                  <ReviewCard review={r} productName={r.product_name} />
                </FadeInView>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 8. CTA Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-rgr-blue to-rgr-navy py-16 md:py-24">
        <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-rgr-gold/10 blur-3xl" aria-hidden />
        <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-rgr-gold/10 blur-3xl" aria-hidden />
        <div className="relative mx-auto max-w-2xl px-5 text-center md:px-10">
          <FadeInView>
            <h2 className="font-display text-4xl uppercase tracking-tight text-white md:text-5xl lg:text-6xl">
              READY TO UPGRADE?
            </h2>
            <p className="mt-4 text-base text-white/65 md:text-lg">
              Chat with us on WhatsApp or browse our verified products.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-10 py-4 font-display text-sm uppercase tracking-wider text-white shadow-lg transition duration-200 hover:bg-[#20bd5a] active:scale-[0.98]"
              >
                <MessageCircle className="h-5 w-5" />
                Chat With Us on WhatsApp Now
              </a>
              <Link
                href="/#products"
                className="inline-flex items-center justify-center rounded-xl border-2 border-white/30 px-10 py-4 font-display text-sm uppercase tracking-wider text-white transition duration-200 hover:border-white/60 hover:bg-white/10 active:scale-[0.98]"
              >
                Browse All Products
              </Link>
            </div>
          </FadeInView>
        </div>
      </section>
    </div>
  );
}
