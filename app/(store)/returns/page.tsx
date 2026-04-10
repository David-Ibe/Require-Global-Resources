import type { Metadata } from "next";

import { FadeInView } from "@/components/fade-in-view";
import { brand, contact, getWhatsAppLink, siteUrl } from "@/lib/site-config";
import { storeCta, storePage, storeType } from "@/lib/store-ui";
import { waEntryReturnOrExchange } from "@/lib/whatsapp-sales";

export const metadata: Metadata = {
  title: "Returns",
  description:
    `Returns and exchanges policy for ${brand.shortName} — fair, simple, WhatsApp-first.`,
  openGraph: {
    title: `Returns | ${brand.shortName}`,
    url: `${siteUrl}/returns`,
    images: ["/og-default.svg"]
  }
};

export default function ReturnsPage() {
  const wa = getWhatsAppLink(waEntryReturnOrExchange());

  return (
    <div className={`${storePage.narrow} bg-rgr-surface`}>
      <FadeInView>
        <h1 className={storeType.h1}>Returns</h1>
        <p className={storeType.lead}>
          We want you happy with every order. If something is wrong with what you
          received — wrong item, damaged in transit, or not what you expected based
          on what we described — message us on WhatsApp within{" "}
          <strong>48 hours</strong> of delivery. We will sort it: replacement,
          exchange, or refund where it applies.
        </p>
        <ul className={storeType.list}>
          <li>Keep the product and packaging as received when possible.</li>
          <li>Share clear photos on WhatsApp so we can move quickly.</li>
          <li>Refunds for eligible cases are processed after we confirm the issue.</li>
        </ul>
        <p className={`${storeType.body} mt-10`}>
          Start on{" "}
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className={storeCta.link}
          >
            WhatsApp (+{contact.whatsappNumber})
          </a>
        </p>
      </FadeInView>
    </div>
  );
}
