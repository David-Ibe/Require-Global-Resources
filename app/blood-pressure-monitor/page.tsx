import {
  Activity,
  BadgeCheck,
  BatteryCharging,
  BookHeart,
  HeartPulse,
  Monitor,
  ScanHeart
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

const product = productCatalog.bloodPressureMonitor;

export const metadata: Metadata = {
  title: "Digital Blood Pressure Monitor Nigeria | Require Global Resources",
  description:
    "Buy accurate digital blood pressure monitor in Nigeria with fast delivery and secure WhatsApp ordering.",
  openGraph: {
    title: "Digital Blood Pressure Monitor Nigeria | Require Global Resources",
    description:
      "Buy a clinically accurate digital blood pressure monitor in Nigeria with fast delivery and secure WhatsApp ordering.",
    url: "https://requireglobalresources.com/blood-pressure-monitor",
    images: [product.ogImage]
  }
};

const benefits = [
  { icon: Activity, text: "One-button operation - instant reading in seconds" },
  { icon: Monitor, text: "Clinically accurate digital display" },
  { icon: BookHeart, text: "Stores up to 60 readings - track your progress over time" },
  { icon: BatteryCharging, text: "Rechargeable battery - no constant battery replacement" },
  { icon: ScanHeart, text: "Compact wrist design - use at home, work, or travel" },
  { icon: HeartPulse, text: "Suitable for the whole family" }
];

export default function BloodPressureMonitorPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-24 pt-12 md:px-8">
      <ProductViewTracker productName={product.name} price={product.price} />

      <section className="grid gap-8 md:grid-cols-2 md:items-center">
        <div>
          <h1 className="text-4xl font-bold leading-tight text-brand-navy md:text-5xl">
            {product.heroTitle}
          </h1>
          <p className="mt-4 text-lg text-slate-700">{product.heroSubtitle}</p>
          <p className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-700">
            Hypertension affects 1 in 3 Nigerian adults. Most do not know they have it.
          </p>
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
            sourcePage="/blood-pressure-monitor"
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
            alt="Digital blood pressure monitor product image"
            priority
          />
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-bold text-brand-navy">Take Control of Your Health</h2>
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
        <h2 className="text-3xl font-bold text-brand-navy">This Is For You If...</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {[
            "You have been told you have high blood pressure",
            "Your parents or family have hypertension history",
            "You want to monitor your health without hospital visits",
            "You are managing stress and want to track its effect on your heart"
          ].map((item) => (
            <article key={item} className="rounded-xl border border-slate-100 p-5">
              <p className="text-sm font-medium text-brand-dark">{item}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-bold text-brand-navy">Product Specifications</h2>
        <div className="mt-6 overflow-hidden rounded-xl border border-slate-200">
          <table className="w-full text-left text-sm">
            <tbody>
              {[
                ["Measurement type", "Wrist"],
                ["Display", "Digital LCD"],
                ["Memory", "60 readings"],
                ["Power", "Rechargeable USB"],
                ["Accuracy", "Clinical grade"],
                ["Suitable for", "All adults"]
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
          sourcePage="/blood-pressure-monitor"
          message={product.prefilledMessage}
          price={product.price}
          className="mt-6"
        />
      </section>

      <section className="mt-6">
        <p className="text-sm italic text-slate-600">
          This device is for personal health monitoring purposes. Consult your
          doctor for medical diagnosis and treatment.
        </p>
      </section>

      <section className="mt-14 grid gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-6 md:grid-cols-2">
        {[
          "Registered Nigerian Business",
          "Quality Verified",
          "Fast Delivery",
          "Easy Returns",
          "Bank Transfer | Pay on Delivery Available"
        ].map((item) => (
          <p key={item} className="flex items-center gap-2 text-sm font-medium text-brand-dark">
            <BadgeCheck className="h-5 w-5 text-brand-electric" />
            {item}
          </p>
        ))}
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-bold text-brand-navy">What Customers Say</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {testimonials.bloodPressureMonitor.map((item) => (
            <TestimonialCard key={item.name} {...item} />
          ))}
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-bold text-brand-navy">You Might Also Need</h2>
        <div className="mt-6 max-w-sm rounded-xl border border-slate-100 p-5">
          <p className="text-lg font-semibold text-brand-navy">
            {productCatalog.carPhoneHolder.name}
          </p>
          <p className="mt-2 text-sm text-slate-600">
            Stay safer while driving with our magnetic 360-degree phone holder.
          </p>
          <Link
            href="/car-phone-holder"
            className="mt-4 inline-flex rounded-md bg-brand-electric px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-navy"
          >
            View Product
          </Link>
        </div>
      </section>

      <StickyMobileWhatsappCTA
        productName={product.name}
        sourcePage="/blood-pressure-monitor"
        message={product.prefilledMessage}
        price={product.price}
      />
    </div>
  );
}
