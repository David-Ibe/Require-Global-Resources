"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

import { brand, getWhatsAppLink } from "@/lib/site-config";

const whatsappHref = getWhatsAppLink(
  `Hi ${brand.shortName}, I'd like to place an order.`
);

type Slide = {
  badge: string;
  headlineTop: string;
  headlineBottom: string;
  sub: string;
  cta1: { label: string; href: string; external?: boolean };
  cta2?: { label: string; href: string; external?: boolean };
  stats?: string[];
  bgClass: string;
  image?: string;
};

const slides: Slide[] = [
  {
    badge: "🇳🇬 Verified Nigerian Store",
    headlineTop: "Verified Smart",
    headlineBottom: "Car & Home Upgrades.",
    sub: "Every product verified before it ships to you. No wahala. No disappointment.",
    cta1: { label: "🛒 SHOP NOW", href: "/#products" },
    cta2: { label: "💬 Chat on WhatsApp", href: whatsappHref, external: true },
    stats: ["100% Verified", "2–5 Day Delivery", "Pay on Delivery"],
    bgClass: "bg-rgr-navy",
    image: "/hero-woman-car-new.png",
  },
  {
    badge: "NEW ARRIVALS",
    headlineTop: "Upgrade Your Ride.",
    headlineBottom: "Drive Smarter.",
    sub: "Premium car accessories for the modern Nigerian driver.",
    cta1: { label: "🚗 SHOP CAR ACCESSORIES", href: "/auto" },
    bgClass: "bg-rgr-navy",
    image: "/hero-rgr-twilight.png",
  },
  {
    badge: "LIMITED OFFER",
    headlineTop: "Free Delivery",
    headlineBottom: "On Next 5 Orders.",
    sub: "Order now and get your products delivered free anywhere in Nigeria.",
    cta1: { label: "🛒 ORDER NOW", href: "/#products" },
    bgClass: "bg-rgr-navy",
    image: "/hero-home-driver.png",
  },
];

export function HomeHero() {
  const [current, setCurrent] = useState(0);
  const [key, setKey] = useState(0);

  const goTo = useCallback(
    (idx: number) => {
      setCurrent(idx);
      setKey((k) => k + 1);
    },
    []
  );

  useEffect(() => {
    const timer = setInterval(() => {
      goTo((current + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [current, goTo]);

  const slide = slides[current];

  return (
    <section
      className={`relative flex min-h-[85vh] w-full items-center overflow-hidden transition-colors duration-700 md:min-h-[90vh] ${slide.bgClass}`}
      aria-label="Hero"
    >
      {/* Background image for slides that have one */}
      {slide.image && (
        <>
          <Image
            src={slide.image}
            alt="Happy customer inside a car"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[65%_30%]"
          />
          <div className="absolute inset-0 bg-rgr-navy/40" aria-hidden />
          <div
            className="absolute inset-0 bg-gradient-to-r from-rgr-navy/85 via-rgr-navy/50 to-transparent"
            aria-hidden
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-rgr-navy/50 via-transparent to-transparent"
            aria-hidden
          />
        </>
      )}

      {/* Geometric pattern overlay for non-image slides */}
      {!slide.image && (
        <>
          <div className="absolute inset-0 bg-hero-radial" aria-hidden />
          <div className="absolute inset-0 opacity-[0.03]" aria-hidden>
            <svg width="100%" height="100%">
              <defs>
                <pattern id="hero-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#hero-grid)" />
            </svg>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" aria-hidden />
        </>
      )}

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 py-20 md:px-10 md:py-28">
        <div key={key} className="hero-slide-enter max-w-2xl">
          <span className="inline-block rounded-full bg-rgr-gold/20 px-4 py-1.5 font-display text-xs uppercase tracking-widest text-rgr-gold">
            {slide.badge}
          </span>

          <h1 className="mt-5 font-display text-[3.2rem] uppercase leading-[0.92] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-[5rem]">
            {slide.headlineTop}
            <br />
            <span className="text-rgr-gold">{slide.headlineBottom}</span>
          </h1>

          <p className="mt-5 max-w-md text-base font-medium leading-relaxed text-white/80 md:text-lg">
            {slide.sub}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            {slide.cta1.external ? (
              <a
                href={slide.cta1.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl bg-rgr-gold px-8 py-4 font-display text-sm uppercase tracking-wider text-rgr-navy shadow-lg transition duration-200 hover:bg-amber-400 hover:shadow-xl active:scale-[0.98]"
              >
                {slide.cta1.label}
              </a>
            ) : (
              <Link
                href={slide.cta1.href}
                className="inline-flex items-center justify-center rounded-xl bg-rgr-gold px-8 py-4 font-display text-sm uppercase tracking-wider text-rgr-navy shadow-lg transition duration-200 hover:bg-amber-400 hover:shadow-xl active:scale-[0.98]"
              >
                {slide.cta1.label}
              </Link>
            )}
            {slide.cta2 ? (
              <a
                href={slide.cta2.href}
                target={slide.cta2.external ? "_blank" : undefined}
                rel={slide.cta2.external ? "noopener noreferrer" : undefined}
                className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white/30 px-8 py-4 font-display text-sm uppercase tracking-wider text-white transition duration-200 hover:border-white/60 hover:bg-white/10 active:scale-[0.98]"
              >
                {slide.cta2.label}
              </a>
            ) : null}
          </div>

          {slide.stats ? (
            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-white/20 pt-6">
              {slide.stats.map((stat) => (
                <span
                  key={stat}
                  className="inline-flex items-center gap-2 text-sm font-medium text-white/70"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-rgr-gold" />
                  {stat}
                </span>
              ))}
            </div>
          ) : null}
        </div>

        <div className="mt-10 flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => goTo(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === current
                  ? "w-8 bg-rgr-gold"
                  : "w-2 bg-white/30 hover:bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
