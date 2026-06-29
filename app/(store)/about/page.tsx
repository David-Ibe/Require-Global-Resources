import type { Metadata } from "next";
import Link from "next/link";

import { getWhatsAppLink, siteUrl } from "@/lib/site-config";
import { storeCta } from "@/lib/store-ui";
import { waEntryQuestion } from "@/lib/whatsapp-sales";

export const metadata: Metadata = {
  title: { absolute: "About — Require Global" },
  description:
    "Require Global is a consumer marketplace based in Lagos, Nigeria. Genuine products, fair prices, delivered across Nigeria.",
  alternates: { canonical: `${siteUrl}/about` },
  openGraph: {
    title: "About — Require Global",
    description:
      "Require Global is a consumer marketplace based in Lagos, Nigeria. Genuine products, fair prices, delivered across Nigeria.",
    url: `${siteUrl}/about`,
    images: ["/og-default.svg"],
  },
};

const whatsappHref = getWhatsAppLink(waEntryQuestion());

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-[680px] bg-rgr-surface px-5 py-20 md:px-10 md:py-24">
      <h1 className="text-3xl font-bold tracking-tight text-rgr-navy md:text-4xl">
        Genuine products. Fair prices. Delivered across Nigeria.
      </h1>

      <div className="mt-10 space-y-6 text-base font-normal leading-[1.7] text-rgr-gray700">
        <p>
          Require Global is a consumer marketplace based in Lagos, Nigeria. We
          sell computers, smartphones, audio devices, accessories, and selected
          consumer goods — with full transparency on what you&apos;re buying and
          what you&apos;re paying.
        </p>
        <p>
          We started because buying in Nigeria shouldn&apos;t require a risk
          assessment. Whether you&apos;re spending ₦200,000 or ₦3,000,000, you
          deserve to know exactly what you&apos;re getting.
        </p>
        <p>
          Every product on Require Global is genuine. Every listing shows you the
          real spec, the real condition, and the real price. No inflated numbers,
          no vague descriptions, no surprises on delivery day.
        </p>
      </div>

      <div className="mt-12 flex flex-wrap gap-3">
        <Link href="/shop" className={storeCta.navy}>
          Shop Now
        </Link>
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className={storeCta.ghost}
        >
          WhatsApp Us
        </a>
      </div>
    </div>
  );
}
