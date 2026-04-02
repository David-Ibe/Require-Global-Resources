import { BadgeCheck, ShieldCheck, Truck } from "lucide-react";
import type { Metadata } from "next";

import { CTAButton } from "@/components/cta-button";
import { HeroImage } from "@/components/hero-image";
import { ProductCard } from "@/components/product-card";
import { TestimonialCard } from "@/components/testimonial-card";
import { WhatsAppOrderButton } from "@/components/whatsapp-order-button";
import { productCatalog, testimonials } from "@/lib/site-config";

export const metadata: Metadata = {
  title:
    "Require Global Resources | Trusted Gadgets & Home Essentials Delivered Across Nigeria",
  description:
    "Buy verified gadgets and home essentials with fast delivery across Nigeria. No fake products. Order easily via WhatsApp.",
  openGraph: {
    title:
      "Require Global Resources | Trusted Gadgets & Home Essentials Delivered Across Nigeria",
    description:
      "Buy verified gadgets and home essentials with fast delivery across Nigeria. No fake products. Order easily via WhatsApp.",
    images: ["/og-default.svg"]
  }
};

const whyChooseUs = [
  {
    icon: ShieldCheck,
    title: "Quality Guaranteed",
    text: "Every product is carefully selected and quality-checked before it reaches you."
  },
  {
    icon: Truck,
    title: "Fast Delivery & Easy Ordering",
    text: "Lagos delivery within 24–48 hours. Other states within 2–5 business days. Order easily via WhatsApp — we typically reply in under 2 minutes."
  }
];

export default function HomePage() {
  return (
    <div>
      <section className="relative min-h-[min(75vh,620px)] overflow-hidden bg-gradient-to-br from-[#0A2463] to-[#3E92CC]">
        <HeroImage />
        <div
          className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/65 to-black/40"
          aria-hidden="true"
        />

        <div className="relative mx-auto flex min-h-[min(75vh,620px)] max-w-6xl items-center px-4 md:px-8">
          <div className="hero-stagger max-w-2xl py-20">
            <h1 className="text-[2.25rem] font-extrabold leading-[1.1] tracking-tight text-white sm:text-[2.75rem] md:text-[3.75rem]">
              Buy Trusted Gadgets &amp; Home Essentials
              <span className="text-[#22C55E]">
                {" — Delivered Fast "}
              </span>
              Across Nigeria
            </h1>

            <p className="mt-3 text-base font-medium tracking-wide text-white/70 sm:text-lg">
              Quality Products. Delivered Across Nigeria.
            </p>

            <p className="mt-4 max-w-xl text-lg leading-relaxed text-brand-muted md:text-xl">
              No fake products. No delays.
              <br className="hidden sm:block" />
              Order easily via WhatsApp or shop directly.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <WhatsAppOrderButton
                label="Order on WhatsApp"
                productName="Homepage Inquiry"
                sourcePage="/"
                message="Hi, I want to place an order. Please share available products and delivery details."
                price=""
                className="shadow-lg shadow-[#22C55E]/20"
              />
              <CTAButton
                href="#products"
                className="border border-brand-muted/30 bg-transparent hover:bg-white/10 hover:border-white/50"
              >
                Shop Products
              </CTAButton>
            </div>

            <p className="mt-2.5 flex items-center gap-1.5 text-xs text-white/50">
              <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-[#22C55E]" />
              Typically replies in under 2 minutes
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-brand-muted/70">
              <span className="flex items-center gap-1.5">
                <Truck className="h-4 w-4" />
                24–72hr Delivery
              </span>
              <span className="flex items-center gap-1.5">
                <BadgeCheck className="h-4 w-4" />
                Pay on Delivery
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4" />
                Verified Products
              </span>
            </div>
          </div>
        </div>
      </section>

      <section id="products" className="mx-auto max-w-6xl px-4 py-20 md:px-8">
        <h2 className="text-3xl font-bold text-brand-navy">Popular Products</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <ProductCard
            name={productCatalog.carPhoneHolder.name}
            description={productCatalog.carPhoneHolder.benefit}
            price={productCatalog.carPhoneHolder.price}
            image={productCatalog.carPhoneHolder.image}
            images={productCatalog.carPhoneHolder.images}
            href="/car-phone-holder"
          />
          <ProductCard
            name={productCatalog.bloodPressureMonitor.name}
            description={productCatalog.bloodPressureMonitor.benefit}
            price={productCatalog.bloodPressureMonitor.price}
            image={productCatalog.bloodPressureMonitor.image}
            images={productCatalog.bloodPressureMonitor.images}
            href="/blood-pressure-monitor"
          />
        </div>
      </section>

      <section id="about" className="bg-slate-50 py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <h2 className="text-3xl font-bold text-brand-navy">
            Why Choose Require?
          </h2>
          <div className="mx-auto mt-8 grid max-w-4xl gap-8 md:grid-cols-2">
            {whyChooseUs.map(({ icon: Icon, title, text }) => (
              <article
                key={title}
                className="rounded-xl border border-slate-100 bg-white p-10"
              >
                <Icon className="h-7 w-7 text-brand-electric" />
                <h3 className="mt-4 text-xl font-semibold text-brand-navy">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  {text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 md:px-8">
        <h2 className="text-3xl font-bold text-brand-navy">
          What Our Customers Say
        </h2>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {testimonials.homepage.map((item) => (
            <TestimonialCard key={item.name} {...item} />
          ))}
        </div>
      </section>

      <section className="bg-brand-dark py-20">
        <div className="mx-auto max-w-2xl px-4 text-center md:px-8">
          <h2 className="text-3xl font-bold text-white">Ready to Order?</h2>
          <p className="mt-4 text-lg leading-relaxed text-brand-muted/75">
            Get verified products delivered to your doorstep without stress.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <WhatsAppOrderButton
              label="Order on WhatsApp"
              productName="Homepage CTA"
              sourcePage="/"
              message="Hi, I want to place an order. Please share available products and delivery details."
              price=""
            />
            <CTAButton
              href="#products"
              className="border border-brand-muted/30 bg-transparent hover:bg-white/10 hover:border-white/50"
            >
              Shop Products
            </CTAButton>
          </div>
          <p className="mx-auto mt-3 flex items-center justify-center gap-1.5 text-xs text-brand-muted/50">
            <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-[#22C55E]" />
            Typically replies in under 2 minutes
          </p>
        </div>
      </section>
    </div>
  );
}
