import type { Metadata } from "next";
import Link from "next/link";

import { FadeInView } from "@/components/fade-in-view";
import { brand, siteUrl } from "@/lib/site-config";
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
        <h1 className={storeType.h1}>About</h1>
        <p className={storeType.lead}>
          {brand.name} is a Lagos-based trading brand under {brand.legalName}{" "}
          (CAC registered). We sell smart car accessories today — with smart home
          upgrades on the roadmap — for people who are tired of fake products and
          empty promises.
        </p>
        <p className={storeType.body}>
          We are not the cheapest option on the market. We are the one you pick when
          you want the real thing: inspected before dispatch, delivered to your door,
          and you pay when it arrives.
        </p>
        <p className={storeType.body}>
          Our team is on WhatsApp because that is how Nigerians actually shop — fast
          questions, fast answers, no ticket numbers and no runaround.
        </p>
        <div className={`mt-12 ${storeSurface.card}`}>
          <p className="text-lg font-semibold text-rgr-navy">{brand.tagline}</p>
          <p className="mt-2 text-rgr-gray700">{brand.oneLiner}</p>
        </div>
        <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
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
