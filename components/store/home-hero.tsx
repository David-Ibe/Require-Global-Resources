"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

import { WhatsAppIcon } from "@/components/icons";
import { brand, getWhatsAppLink } from "@/lib/site-config";

const whatsappHref = getWhatsAppLink(
  `Hi ${brand.shortName}, I'd like to place an order.`
);

export function HomeHero() {
  const [current, setCurrent] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const totalSlides = 2;

  const goTo = useCallback((idx: number) => {
    setCurrent(idx);
    setAnimKey((k) => k + 1);
  }, []);

  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(() => {
      setCurrent((prev) => {
        const next = (prev + 1) % totalSlides;
        setAnimKey((k) => k + 1);
        return next;
      });
    }, 5000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [paused]);

  return (
    <section
      className="relative flex min-h-0 w-full flex-1 flex-col overflow-hidden"
      aria-label="Hero"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative min-h-0 flex-1 overflow-hidden">
        {/* SLIDE 1 — Brand Hero */}
        <div
          className={`absolute inset-0 transition-opacity duration-600 ${current === 0 ? "z-10 opacity-100" : "z-0 opacity-0"}`}
        >
          <Image
            src="/hero-woman-car-new.png"
            alt="Woman stepping out of a premium car in Lagos"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[65%_30%]"
          />
          <div className="absolute inset-0 bg-rgr-navy/50" />
          <div className="absolute inset-0 bg-gradient-to-r from-rgr-navy/90 via-rgr-navy/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-rgr-navy/60 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-rgr-gold/[0.06] blur-[100px]" />

          <div className="relative z-10 mx-auto flex h-full min-h-0 w-full max-w-7xl items-center px-5 py-8 pb-16 md:px-10 md:py-10 md:pb-20">
            {current === 0 && (
              <div key={`s1-${animKey}`} className="hero-slide-enter mx-auto max-w-3xl text-center md:mx-0 md:max-w-2xl md:text-left">
                <p className="font-display text-xs uppercase tracking-[0.2em] text-rgr-gold/90 sm:text-sm md:text-base">
                  Premium Upgrades for Your Car &amp; Home
                </p>

                <h1 className="mt-2 font-display text-[clamp(1.75rem,5.5vw,3.5rem)] uppercase leading-[0.95] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                  <span className="block text-white">Real Products.</span>
                  <span className="block text-rgr-gold">Zero Fakes.</span>
                </h1>

                <p className="mt-3 max-w-lg text-sm font-medium leading-relaxed text-white/75 sm:text-base md:text-lg">
                  Premium car accessories and smart home solutions
                  for the modern Nigerian.
                </p>

                <p className="mt-1.5 max-w-md text-xs leading-relaxed text-white/55 sm:text-sm md:text-base">
                  Pay only when it arrives. No wahala.
                </p>

                <div className="mt-4 flex flex-col gap-2.5 sm:flex-row sm:justify-center sm:gap-3 md:mt-5 md:justify-start">
                  <Link
                    href="/#products"
                    className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 font-display text-sm uppercase tracking-wider text-rgr-navy shadow-lg transition duration-200 hover:-translate-y-0.5 hover:shadow-xl active:scale-[0.98] sm:px-8 sm:py-3.5 sm:text-base"
                  >
                    SHOP NOW
                  </Link>
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-3 font-display text-sm uppercase tracking-wider text-white shadow-lg transition duration-200 hover:-translate-y-0.5 hover:bg-[#20bd5a] hover:shadow-xl active:scale-[0.98] sm:px-8 sm:py-3.5 sm:text-base"
                  >
                    <WhatsAppIcon size={18} />
                    Chat on WhatsApp
                  </a>
                </div>

              </div>
            )}
          </div>
        </div>

        {/* SLIDE 2 — Car Accessories (Split Layout) */}
        <div
          className={`absolute inset-0 transition-opacity duration-600 ${current === 1 ? "z-10 opacity-100" : "z-0 opacity-0"}`}
        >
          <div className="absolute inset-0 bg-rgr-navy" />
          <div className="absolute inset-0 md:hidden">
            <Image
              src="/hero-woman-car.png"
              alt=""
              fill
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-rgr-navy/75" />
          </div>
          <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-rgr-blue/20 blur-[120px]" />

          <div className="absolute right-0 top-0 hidden h-full w-[45%] md:block">
            <Image
              src="/hero-rgr-twilight.png"
              alt="RGR car accessories showcase at twilight"
              fill
              className="object-cover object-center"
              sizes="45vw"
            />
            <div className="absolute inset-0 bg-rgr-navy/15" />
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-rgr-navy to-transparent" />
            <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-rgr-navy/40 to-transparent" />
          </div>

          <div className="relative z-10 mx-auto flex h-full min-h-0 w-full max-w-7xl items-center px-5 py-8 pb-16 md:px-10 md:py-10 md:pb-20">
            {current === 1 && (
              <div key={`s2-${animKey}`} className="hero-slide-enter max-w-2xl">
                <h1 className="font-display text-[clamp(1.75rem,5vw,3.25rem)] uppercase leading-[0.95] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                  <span className="block text-white">Lagos Traffic</span>
                  <span className="block text-rgr-gold">Just Got Easier.</span>
                </h1>

                <p className="mt-3 max-w-lg text-sm font-medium leading-relaxed text-white/75 sm:text-base md:text-lg">
                  Smart car accessories for the modern Nigerian driver. Quality you can see and feel.
                </p>

                <div className="mt-4 flex flex-col gap-2.5 sm:flex-row md:mt-5">
                  <Link
                    href="/auto"
                    className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 font-display text-sm uppercase tracking-wider text-rgr-navy shadow-lg transition duration-200 hover:-translate-y-0.5 hover:shadow-xl active:scale-[0.98] sm:px-8 sm:py-3.5 sm:text-base"
                  >
                    SHOP CAR ACCESSORIES
                  </Link>
                </div>

                <Link
                  href="/products/lagos-driver-bundle"
                  className="mt-2 inline-block text-xs font-medium text-white underline-offset-4 transition hover:underline sm:text-sm"
                >
                  View The Lagos Driver Bundle →
                </Link>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Navigation dots */}
      <div className="absolute bottom-4 left-0 z-20 flex w-full justify-center gap-2 md:bottom-6">
        {Array.from({ length: totalSlides }).map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => goTo(i)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              i === current
                ? "w-10 bg-rgr-gold"
                : "w-2.5 bg-white/30 hover:bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
