import type { Metadata } from "next";
import Link from "next/link";

import { WhatsAppIcon } from "@/components/icons";
import { Container } from "@/components/ui/container";
import { brand, getWhatsAppLink, siteUrl } from "@/lib/site-config";
import { storeCta } from "@/lib/store-ui";
import { waEntryQuestion } from "@/lib/whatsapp-sales";

export const metadata: Metadata = {
  title: { absolute: "About — Require Global" },
  description:
    "Require Global is a Lagos-based marketplace for genuine computers, smartphones, audio, accessories and consumer goods — fair prices and nationwide delivery.",
  alternates: { canonical: `${siteUrl}/about` },
  openGraph: {
    title: "About — Require Global",
    description:
      "Require Global is a Lagos-based marketplace for genuine computers, smartphones, audio, accessories and consumer goods — fair prices and nationwide delivery.",
    url: `${siteUrl}/about`,
    images: ["/og-default.svg"],
  },
};

const whatsappHref = getWhatsAppLink(waEntryQuestion());

const differentiators = [
  {
    title: "100% Genuine Products",
    description: "Full manufacturer warranty on every item we sell.",
  },
  {
    title: "Full Transparency",
    description: "Real specs, real condition, real pricing — no inflated figures.",
  },
  {
    title: "Rigorous Inspection",
    description: "Every item is carefully checked before dispatch.",
  },
  {
    title: "Nationwide Delivery",
    description: "Fast, reliable shipping with tracking across Nigeria.",
  },
  {
    title: "No Surprises",
    description: "What you see on the website is exactly what gets delivered.",
  },
] as const;

export default function AboutPage() {
  return (
    <div className="bg-rgr-surface">
      <Container className="flex min-h-[calc(100dvh-4.75rem)] max-w-6xl flex-col justify-center px-5 py-8 md:px-8 md:py-10">
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-10 xl:gap-12">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-rgr-navy md:text-3xl lg:text-[2rem] lg:leading-tight">
              Genuine Products. Fair Prices. Delivered Across Nigeria.
            </h1>

            <div className="mt-4 space-y-3 text-sm leading-relaxed text-rgr-gray700 md:text-[15px]">
              <p>
                At {brand.shortName}, we believe shopping online in Nigeria should
                be simple, transparent, and stress-free.
              </p>
              <p>
                We are a Lagos-based marketplace offering premium computers,
                smartphones, audio devices, accessories, and carefully selected
                high-quality consumer goods — all at fair prices.
              </p>
              <p>
                We started {brand.shortName} because too many Nigerians pay premium
                money for questionable quality or unclear specifications. Whether
                you&apos;re spending ₦200,000 or ₦3,000,000, you deserve to know
                exactly what you&apos;re getting.
              </p>
            </div>
          </div>

          <section>
            <h2 className="text-lg font-semibold text-rgr-navy md:text-xl">
              What Sets Us Apart
            </h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {differentiators.map(({ title, description }) => (
                <li key={title} className="flex gap-2.5">
                  <span
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                    aria-hidden
                  />
                  <p className="text-sm leading-snug text-rgr-gray700 md:text-[15px]">
                    <span className="font-semibold text-rgr-navy">{title}</span>
                    {" — "}
                    {description}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="mt-6 border-t border-border pt-6 lg:mt-8 lg:pt-7">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl space-y-2 text-sm leading-relaxed text-rgr-gray700 md:text-[15px]">
              <p>
                From powerful laptops for work and studies, to smartphones,
                earbuds, smart accessories, and other essential consumer goods
                — we bring you quality products you can trust.
              </p>
              <p>
                We&apos;re not just another online store. We&apos;re building
                Nigeria&apos;s most trusted marketplace — one honest transaction
                at a time.
              </p>
              <p className="font-semibold text-rgr-navy">
                Ready to shop with confidence?
              </p>
            </div>

            <div className="flex shrink-0 flex-wrap gap-3">
              <Link href="/listings" className={`${storeCta.navy} px-6 py-2.5`}>
                Shop Now
              </Link>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className={`${storeCta.whatsapp} gap-2 px-6 py-2.5`}
              >
                <WhatsAppIcon size={18} />
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
