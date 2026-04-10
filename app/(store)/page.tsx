import {
  BadgeCheck,
  Building2,
  Car,
  Camera,
  Crown,
  Home,
  MessageCircle,
  RefreshCw,
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
    tagline: "Upgrade your ride",
    Icon: Car,
    href: "/auto",
    available: true,
    bgClass: "bg-gradient-to-br from-rgr-navy to-[#0c1e3d]",
  },
  {
    name: "SMART HOME",
    tagline: "Upgrade your space",
    Icon: Home,
    href: "/home",
    available: false,
    badge: "COMING SOON",
    bgClass: "bg-gradient-to-br from-[#1a2744] to-rgr-navy",
  },
  {
    name: "CREATOR TOOLS",
    tagline: "Build your setup",
    Icon: Camera,
    href: "#",
    available: false,
    badge: "COMING SOON",
    bgClass: "bg-gradient-to-br from-[#162038] to-rgr-navy",
  },
  {
    name: "REQUIRE HAIR",
    tagline: "Your crown, verified",
    Icon: Crown,
    href: "#",
    available: false,
    badge: "COMING SOON",
    bgClass: "bg-gradient-to-br from-[#1c2a48] to-rgr-navy",
  },
];

/* ─── How-It-Works steps ─── */
const steps = [
  {
    num: "01",
    emoji: "🔍",
    title: "Choose Your Product",
    desc: "Browse our verified product catalogue and select what you need. Every product is real and quality-checked.",
  },
  {
    num: "02",
    emoji: "📝",
    title: "Place Your Order",
    desc: "Fill your details on the product page or message us on WhatsApp. Takes less than 2 minutes.",
  },
  {
    num: "03",
    emoji: "💬",
    title: "We Confirm via WhatsApp",
    desc: "Our team confirms your order within 30 minutes and gives you a delivery timeline.",
  },
  {
    num: "04",
    emoji: "🚀",
    title: "Delivered to Your Door",
    desc: "Your order arrives in 2–5 days. You pay only when it's in your hands. Zero risk.",
  },
];

/* ─── Why-Choose-Us cards (6) ─── */
const whyCards = [
  {
    emoji: "🔍",
    title: "Product Verification",
    desc: "Every item inspected before shipping. What you see is what you get.",
    Icon: Search,
  },
  {
    emoji: "💵",
    title: "Pay on Delivery",
    desc: "Pay only when your order arrives at your door. Absolutely zero risk.",
    Icon: Wallet,
  },
  {
    emoji: "🏢",
    title: "CAC Registered",
    desc: "Registered Nigerian company under Require Trading Limited. Not a random vendor.",
    Icon: Building2,
  },
  {
    emoji: "💬",
    title: "WhatsApp Support",
    desc: "Real humans available to answer your questions any time of day.",
    Icon: MessageCircle,
  },
  {
    emoji: "🚀",
    title: "Fast Delivery",
    desc: "Nationwide delivery in 2–5 days. Lagos often same day or next day.",
    Icon: Rocket,
  },
  {
    emoji: "🔄",
    title: "Easy Returns",
    desc: "If it is not right, we make it right. No stress. No argument.",
    Icon: RefreshCw,
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
            <p className="mt-3 text-base text-rgr-gray500">
              Every product carefully selected and verified before it reaches you.
            </p>
          </FadeInView>

          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
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
            <p className="mt-3 text-base text-white/60">
              Ordering from Require Global Resources is simple and completely safe.
            </p>
          </FadeInView>

          <div className="relative mt-14">
            <div className="absolute left-6 top-0 hidden h-full w-0.5 bg-gradient-to-b from-rgr-blue to-rgr-gold md:block" aria-hidden />
            <div className="grid gap-8 md:gap-10">
              {steps.map(({ num, emoji, title, desc }, i) => (
                <FadeInView key={num} delay={i * 120}>
                  <div className="flex gap-6">
                    <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-rgr-blue text-lg font-bold text-white shadow-lg">
                      {num}
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{emoji}</span>
                        <h3 className="font-display text-lg uppercase tracking-wider text-white">
                          {title}
                        </h3>
                      </div>
                      <p className="mt-3 text-sm leading-relaxed text-white/70">
                        {desc}
                      </p>
                    </div>
                  </div>
                </FadeInView>
              ))}
            </div>
          </div>
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
              THE REQUIRE DIFFERENCE
            </h2>
            <p className="mt-3 max-w-lg text-base text-rgr-gray500">
              We&apos;re not just another Instagram vendor. Here&apos;s what makes us genuinely different.
            </p>
          </FadeInView>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {whyCards.map(({ emoji, title, desc, Icon }, i) => (
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
                Real Nigerians. Real orders. Real experiences. No fake reviews.
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
              READY TO ORDER?
            </h2>
            <p className="mt-4 text-base text-white/65 md:text-lg">
              Join Nigerians already enjoying verified quality products at their door.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-10 py-4 font-display text-sm uppercase tracking-wider text-white shadow-lg transition duration-200 hover:bg-[#20bd5a] active:scale-[0.98]"
              >
                <MessageCircle className="h-5 w-5" />
                Chat Us on WhatsApp Now
              </a>
              <Link
                href="/#products"
                className="inline-flex items-center justify-center rounded-xl border-2 border-white/30 px-10 py-4 font-display text-sm uppercase tracking-wider text-white transition duration-200 hover:border-white/60 hover:bg-white/10 active:scale-[0.98]"
              >
                🛒 Browse All Products
              </Link>
            </div>
            <p className="mt-8 text-xs text-white/50">
              Pay on Delivery · No Upfront Payment · Verified Products · CAC Registered
            </p>
          </FadeInView>
        </div>
      </section>
    </div>
  );
}
