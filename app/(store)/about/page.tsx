import type { Metadata } from "next";
import Link from "next/link";

import { FadeInView } from "@/components/fade-in-view";
import { brand, contact, siteUrl } from "@/lib/site-config";
import { storeCta, storePage, storeSurface, storeType } from "@/lib/store-ui";

export const metadata: Metadata = {
  title: "About",
  description: `Learn about ${brand.name} — verified car and home upgrades for Nigerians. ${brand.tagline}`,
  openGraph: {
    title: `About | ${brand.shortName}`,
    description: brand.oneLiner,
    url: `${siteUrl}/about`,
    images: ["/og-default.svg"]
  }
};

export default function AboutPage() {
  return (
    <div className={`${storePage.narrow} bg-rgr-surface`}>
      <FadeInView>
        {/* ── WHY WE EXIST ── */}
        <h1 className={storeType.h1}>Why We Exist</h1>
        <p className={storeType.lead}>
          {brand.name} is a Lagos-based company specialising in verified smart
          car accessories and home upgrades.
        </p>
        <p className={storeType.body}>
          We built this business to solve a real problem in Nigeria — fake and
          low-quality products sold online to people who deserved better. That
          stops here.
        </p>

        {/* ── WHO WE ARE ── */}
        <h2 className={`mt-14 ${storeType.h2}`}>Who We Are</h2>
        <p className={storeType.lead}>
          We are a CAC-registered Nigerian company operating under{" "}
          {brand.legalName}. Every product is physically verified before it ships
          to you. What you see is exactly what you get.
        </p>
        <p className={`mt-4 font-medium text-rgr-navy`}>Our focus is simple:</p>
        <ul className="mt-4 space-y-3 text-rgr-gray700">
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-green-600">✅</span>
            Sell only genuine, verified products
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-green-600">✅</span>
            Pay on Delivery — nationwide
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-green-600">✅</span>
            Real WhatsApp support from real people
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-green-600">✅</span>
            Fast delivery — 2 to 5 days anywhere in Nigeria
          </li>
        </ul>

        {/* ── OUR PROMISE ── */}
        <h2 className={`mt-14 ${storeType.h2}`}>Our Promise</h2>
        <p className={storeType.lead}>
          We are not the cheapest option on the market. We are the most reliable.
        </p>
        <p className={`mt-4 text-lg font-semibold text-rgr-navy`}>
          No fakes. No upfront payment. No disappointment.
        </p>
        <p className={storeType.body}>
          Whether you are upgrading your car or your home — shop with confidence
          at {brand.name}.
        </p>

        {/* ── CTA ── */}
        <div className={`mt-14 ${storeSurface.card} text-center`}>
          <p className="text-lg font-semibold text-rgr-navy">
            Ready to experience the difference?
          </p>
          <div className="mt-6">
            <a
              href={contact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={storeCta.whatsapp}
            >
              Chat with us on WhatsApp →
            </a>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-center sm:gap-6">
          <Link href="/#products" className={storeCta.navy}>
            Browse products
          </Link>
          <Link href="/contact" className={storeCta.ghost}>
            Contact us
          </Link>
        </div>
      </FadeInView>
    </div>
  );
}
