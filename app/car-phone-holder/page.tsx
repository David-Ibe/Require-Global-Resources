import {
  BadgeCheck,
  CircleGauge,
  Hand,
  Smartphone,
  Sparkles,
  Target,
  Wrench
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { ProductImageRotator } from "@/components/product-image-rotator";
import { ProductViewTracker } from "@/components/product-view-tracker";
import { StickyMobileWhatsappCTA } from "@/components/sticky-mobile-whatsapp-cta";
import { TestimonialCard } from "@/components/testimonial-card";
import { WhatsAppOrderButton } from "@/components/whatsapp-order-button";
import { formatNaira } from "@/lib/currency";
import { productCatalog, testimonials } from "@/lib/site-config";

const product = productCatalog.carPhoneHolder;

export const metadata: Metadata = {
  title: "Magnetic Car Phone Holder Nigeria | Require Global Resources",
  description:
    "Buy premium magnetic car phone holder in Nigeria with fast delivery and secure WhatsApp ordering.",
  openGraph: {
    title: "Magnetic Car Phone Holder Nigeria | Require Global Resources",
    description:
      "Buy premium magnetic car phone holder in Nigeria with fast delivery and secure WhatsApp ordering.",
    url: "https://requireglobalresources.com/car-phone-holder",
    images: [product.ogImage]
  }
};

const benefits = [
  { icon: Smartphone, text: "Works with all smartphones including iPhone and Android" },
  { icon: CircleGauge, text: "360-degree rotation for perfect viewing angle" },
  { icon: Target, text: "Strong magnetic grip - stays firm on rough Lagos roads" },
  { icon: Sparkles, text: "Fits any car air vent - universal fit" },
  { icon: Hand, text: "Easy one-hand installation and removal" },
  { icon: Wrench, text: "No cables, no cradles, no hassle" }
];

const trustItems = [
  "Registered Nigerian Business",
  "Quality Verified Product",
  "Fast Nationwide Delivery",
  "Easy Returns if Damaged on Arrival",
  "Bank Transfer | Pay on Delivery Available"
];

export default function CarPhoneHolderPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-24 pt-12 md:px-8">
      <ProductViewTracker productName={product.name} price={product.price} />

      <section className="grid gap-8 md:grid-cols-2 md:items-center">
        <div>
          <h1 className="text-4xl font-bold leading-tight text-brand-navy md:text-5xl">
            {product.heroTitle}
          </h1>
          <p className="mt-4 text-lg text-slate-700">{product.heroSubtitle}</p>
          <p className="mt-6 text-3xl font-extrabold text-brand-dark">₦{formatNaira(product.price)}</p>
          <p className="mt-3 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm font-semibold text-amber-700">
            Low stock available - order today for guaranteed delivery this week.
          </p>
          <p className="mt-2 text-sm text-slate-600">
            Lagos delivery within 24-48 hours of payment
          </p>
          <p className="mt-2 text-sm text-slate-600">
            We deliver to Lagos Island, Lekki, Victoria Island, Ikeja, Surulere, Yaba,
            Ajah, and all Lagos areas. Nationwide delivery via courier.
          </p>
          <WhatsAppOrderButton
            label="Order on WhatsApp"
            productName={product.name}
            sourcePage="/car-phone-holder"
            message={product.prefilledMessage}
            price={product.price}
            className="mt-6"
          />
          <p className="mt-2 flex items-center gap-1.5 text-xs text-slate-400">
            <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-[#22C55E]" />
            Typically replies in under 2 minutes
          </p>
        </div>
        <div className="relative h-[460px] overflow-hidden rounded-2xl border border-slate-100 bg-slate-50 md:h-[560px]">
          <ProductImageRotator
            images={product.images ?? [product.image]}
            alt="Magnetic Car Phone Holder product image"
            priority
          />
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-bold text-brand-navy">Why You Need This</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {benefits.map(({ icon: Icon, text }) => (
            <div key={text} className="flex gap-3 rounded-lg border border-slate-100 p-4">
              <Icon className="mt-1 h-5 w-5 text-brand-electric" />
              <p className="text-sm text-slate-700">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-bold text-brand-navy">Product Specifications</h2>
        <div className="mt-6 overflow-hidden rounded-xl border border-slate-200">
          <table className="w-full text-left text-sm">
            <tbody>
              {[
                ["Compatibility", "All smartphones"],
                ["Mount type", "Magnetic air vent"],
                ["Rotation", "360 degrees"],
                ["Installation", "Tool-free"],
                ["Material", "Premium ABS plastic and strong magnet"]
              ].map(([label, value]) => (
                <tr key={label} className="border-b border-slate-200 last:border-b-0">
                  <th className="w-1/3 bg-slate-50 px-4 py-3 font-semibold text-brand-navy">
                    {label}
                  </th>
                  <td className="px-4 py-3 text-slate-700">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-bold text-brand-navy">How To Order</h2>
        <ol className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            "Click the WhatsApp button below",
            "Confirm your order and delivery address",
            "Make payment and receive within 24-48 hours"
          ].map((item, index) => (
            <li key={item} className="rounded-xl border border-slate-100 p-5">
              <p className="mb-3 text-2xl font-bold text-brand-electric">0{index + 1}</p>
              <p className="text-sm text-slate-700">{item}</p>
            </li>
          ))}
        </ol>
        <WhatsAppOrderButton
          label="Order Now on WhatsApp"
          productName={product.name}
          sourcePage="/car-phone-holder"
          message={product.prefilledMessage}
          price={product.price}
          className="mt-6"
        />
      </section>

      <section className="mt-14 grid gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-6 md:grid-cols-2">
        {trustItems.map((item) => (
          <p key={item} className="flex items-center gap-2 text-sm font-medium text-brand-dark">
            <BadgeCheck className="h-5 w-5 text-brand-electric" />
            {item}
          </p>
        ))}
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-bold text-brand-navy">What Customers Say</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {testimonials.carPhoneHolder.map((item) => (
            <TestimonialCard key={item.name} {...item} />
          ))}
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-bold text-brand-navy">You Might Also Need</h2>
        <div className="mt-6 max-w-sm rounded-xl border border-slate-100 p-5">
          <p className="text-lg font-semibold text-brand-navy">
            {productCatalog.bloodPressureMonitor.name}
          </p>
          <p className="mt-2 text-sm text-slate-600">
            Monitor your heart health accurately at home with fast Lagos delivery.
          </p>
          <Link
            href="/blood-pressure-monitor"
            className="mt-4 inline-flex rounded-md bg-brand-electric px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-navy"
          >
            View Product
          </Link>
        </div>
      </section>

      <StickyMobileWhatsappCTA
        productName={product.name}
        sourcePage="/car-phone-holder"
        message={product.prefilledMessage}
        price={product.price}
      />
    </div>
  );
}
