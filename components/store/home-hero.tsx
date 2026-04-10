"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

import { brand, getWhatsAppLink } from "@/lib/site-config";

const whatsappHref = getWhatsAppLink(
  `Hi ${brand.shortName}, I'd like to place an order.`
);

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

function getSecondsUntilMidnightWAT(): number {
  const now = new Date();
  const watOffset = 1 * 60;
  const localOffset = now.getTimezoneOffset();
  const watTime = new Date(now.getTime() + (watOffset + localOffset) * 60000);
  const midnight = new Date(watTime);
  midnight.setHours(24, 0, 0, 0);
  return Math.max(0, Math.floor((midnight.getTime() - watTime.getTime()) / 1000));
}

function CountdownTimer() {
  const [seconds, setSeconds] = useState(getSecondsUntilMidnightWAT);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(getSecondsUntilMidnightWAT());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-white/60">OFFER ENDS IN:</span>
      <div className="flex gap-1.5">
        {[pad(hrs), pad(mins), pad(secs)].map((v, i) => (
          <span key={i}>
            <span className="inline-block min-w-[2.2rem] rounded-lg bg-rgr-gold px-2 py-1.5 text-center font-display text-lg tabular-nums text-rgr-navy">
              {v}
            </span>
            {i < 2 && <span className="mx-0.5 font-display text-lg text-white/40">:</span>}
          </span>
        ))}
      </div>
    </div>
  );
}

const HERO_H = "h-[calc(100vh-6.5rem)]";
const HERO_FLEX = "flex items-center";

export function HomeHero() {
  const [current, setCurrent] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const totalSlides = 3;

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
      className="relative w-full overflow-hidden"
      aria-label="Hero"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className={`relative ${HERO_H}`}>
        {/* SLIDE 1 — Brand Hero */}
        <div
          className={`absolute inset-0 transition-opacity duration-600 ${current === 0 ? "z-10 opacity-100" : "z-0 opacity-0"}`}
        >
          <Image
            src="/hero-woman-car-new.png"
            alt="Confident Nigerian woman in premium car"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[65%_30%]"
          />
          <div className="absolute inset-0 bg-rgr-navy/50" />
          <div className="absolute inset-0 bg-gradient-to-r from-rgr-navy/90 via-rgr-navy/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-rgr-navy/60 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-rgr-gold/[0.06] blur-[100px]" />

          <div className={`relative z-10 mx-auto ${HERO_FLEX} ${HERO_H} w-full max-w-7xl px-5 md:px-10`}>
            {current === 0 && (
              <div key={`s1-${animKey}`} className="hero-slide-enter mx-auto max-w-3xl text-center md:mx-0 md:max-w-2xl md:text-left">
                <p className="font-display text-sm uppercase tracking-[0.2em] text-rgr-gold/90 md:text-base">
                  Verified Smart Upgrades for Your Car &amp; Home
                </p>

                <h1 className="mt-3 font-display text-[3.2rem] uppercase leading-[0.92] tracking-tight sm:text-6xl md:text-7xl lg:text-[5.5rem]">
                  <span className="block text-white">Real Products.</span>
                  <span className="block text-rgr-gold">Zero Fakes.</span>
                </h1>

                <p className="mt-4 max-w-lg text-base font-medium leading-relaxed text-white/75 md:text-xl">
                  Premium car accessories and smart home solutions
                  for the modern Nigerian.
                </p>

                <p className="mt-2 max-w-md text-sm leading-relaxed text-white/55 md:text-base">
                  Pay only when it arrives. No wahala.
                </p>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center md:justify-start">
                  <Link
                    href="/#products"
                    className="inline-flex items-center justify-center rounded-xl bg-rgr-gold px-8 py-3.5 font-display text-base uppercase tracking-wider text-rgr-navy shadow-lg transition duration-200 hover:-translate-y-0.5 hover:bg-amber-400 hover:shadow-xl active:scale-[0.98]"
                  >
                    SHOP NOW
                  </Link>
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border-[1.5px] border-white/30 px-8 py-3.5 font-display text-base uppercase tracking-wider text-white transition duration-200 hover:border-white hover:bg-white hover:text-rgr-navy active:scale-[0.98]"
                  >
                    Chat on WhatsApp
                  </a>
                </div>

                <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 md:justify-start">
                  {["100% Verified", "2–5 Day Delivery", "Pay on Delivery"].map((stat, i) => (
                    <span key={stat} className="flex items-center gap-2 text-sm font-bold text-white">
                      <span className="h-1.5 w-1.5 rounded-full bg-rgr-gold" />
                      {stat}
                      {i < 2 && <span className="ml-4 hidden h-4 w-px bg-white/20 sm:block" />}
                    </span>
                  ))}
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
              alt="Car accessories lifestyle shot"
              fill
              className="object-cover object-center"
              sizes="45vw"
            />
            <div className="absolute inset-0 bg-rgr-navy/15" />
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-rgr-navy to-transparent" />
            <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-rgr-navy/40 to-transparent" />
          </div>

          <div className={`relative z-10 mx-auto ${HERO_FLEX} ${HERO_H} w-full max-w-7xl px-5 md:px-10`}>
            {current === 1 && (
              <div key={`s2-${animKey}`} className="hero-slide-enter max-w-2xl">
                <h1 className="font-display text-[3rem] uppercase leading-[0.92] tracking-tight sm:text-6xl md:text-7xl lg:text-[5.2rem]">
                  <span className="block text-white">Lagos Traffic</span>
                  <span className="block text-rgr-gold">Just Got Easier.</span>
                </h1>

                <p className="mt-4 max-w-lg text-base font-medium leading-relaxed text-white/75 md:text-lg">
                  Smart car accessories for the modern Nigerian driver. Verified. Delivered fast.
                </p>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/auto"
                    className="inline-flex items-center justify-center rounded-xl bg-rgr-gold px-8 py-3.5 font-display text-base uppercase tracking-wider text-rgr-navy shadow-lg transition duration-200 hover:-translate-y-0.5 hover:bg-amber-400 hover:shadow-xl active:scale-[0.98]"
                  >
                    SHOP CAR ACCESSORIES
                  </Link>
                </div>

                <Link
                  href="/products/lagos-driver-bundle"
                  className="mt-3 inline-block text-sm font-medium text-white underline-offset-4 transition hover:underline"
                >
                  View The Lagos Driver Bundle →
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* SLIDE 3 — Free Delivery */}
        <div
          className={`absolute inset-0 transition-opacity duration-600 ${current === 2 ? "z-10 opacity-100" : "z-0 opacity-0"}`}
        >
          <Image
            src="/hero-home-driver.png"
            alt="Nigerian driver enjoying a smooth drive"
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-rgr-blue/60 to-rgr-navy/70" />
          <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-rgr-gold/[0.12] blur-[100px]" />

          <div className={`relative z-10 mx-auto ${HERO_FLEX} ${HERO_H} w-full max-w-7xl px-5 md:px-10`}>
            {current === 2 && (
              <div key={`s3-${animKey}`} className="hero-slide-enter mx-auto max-w-3xl text-center md:mx-0 md:max-w-2xl md:text-left">
                <span className="inline-block animate-pulse rounded-full bg-rgr-gold px-5 py-1.5 font-display text-xs uppercase tracking-widest text-rgr-navy">
                  Limited Offer
                </span>

                <h1 className="mt-4 font-display text-[3rem] uppercase leading-[0.92] tracking-tight sm:text-6xl md:text-7xl lg:text-[5rem]">
                  <span className="block text-white">Free Delivery.</span>
                  <span className="block text-rgr-gold">Next 5 Orders Only.</span>
                </h1>

                <p className="mt-4 max-w-lg text-base font-medium leading-relaxed text-white/75 md:text-lg">
                  Verified car accessories and smart home upgrades. Delivered anywhere in Nigeria.
                </p>

                <p className="mt-2 max-w-md text-sm leading-relaxed text-white/55">
                  Order before the timer runs out.
                </p>

                <div className="mt-5">
                  <CountdownTimer />
                </div>

                <div className="mt-5">
                  <Link
                    href="/#products"
                    className="inline-flex items-center justify-center rounded-xl bg-rgr-gold px-8 py-3.5 font-display text-base uppercase tracking-wider text-rgr-navy shadow-lg transition duration-200 hover:-translate-y-0.5 hover:bg-amber-400 hover:shadow-xl active:scale-[0.98]"
                  >
                    ORDER NOW — FREE DELIVERY
                  </Link>
                </div>

                <p className="mt-3 text-sm italic text-white/50">
                  Only 5 free delivery slots remaining today
                </p>
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
