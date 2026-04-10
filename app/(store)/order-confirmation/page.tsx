import type { Metadata } from "next";
import Link from "next/link";

import { TrackedWhatsAppLink } from "@/components/store/tracked-whatsapp-link";
import { brand, contact, getWhatsAppLink, siteUrl } from "@/lib/site-config";
import { storeCta, storePage, storeSurface, storeType } from "@/lib/store-ui";
import { waEntryOrderConfirmation } from "@/lib/whatsapp-sales";

export const metadata: Metadata = {
  title: "Order confirmation",
  description:
    `Thank you for your order from ${brand.shortName}. Our team will confirm details on WhatsApp quickly.`,
  openGraph: {
    title: `Order confirmation | ${brand.shortName}`,
    description:
      "Your order has been received. Our team will contact you on WhatsApp within 30 minutes.",
    url: `${siteUrl}/order-confirmation`,
    images: ["/og-default.svg"]
  }
};

export default function OrderConfirmationPage() {
  const wa = getWhatsAppLink(waEntryOrderConfirmation());

  return (
    <div className={`${storePage.center} bg-rgr-surface md:max-w-xl`}>
      <section className={`w-full ${storeSurface.card}`}>
        <h1 className={storeType.h1}>Thank you</h1>
        <p className={`${storeType.body} mt-4`}>
          Your order has been received. Our team will contact you on WhatsApp
          shortly to confirm delivery details.
        </p>

        <div className="mt-10 flex flex-col gap-4">
          <TrackedWhatsAppLink
            href={wa}
            eventLabel="Order confirmation — WhatsApp"
            className={`${storeCta.whatsapp} w-full justify-center`}
          >
            Message us on WhatsApp
          </TrackedWhatsAppLink>
          <Link
            href="/#products"
            className={`${storeCta.navy} w-full justify-center`}
          >
            Browse products
          </Link>
          <Link
            href={contact.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`${storeCta.ghost} w-full justify-center`}
          >
            Instagram
          </Link>
        </div>
      </section>
    </div>
  );
}
