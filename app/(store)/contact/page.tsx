import { Mail, MapPin } from "@/components/icons";
import { WhatsAppIcon } from "@/components/icons";
import type { Metadata } from "next";
import Link from "next/link";

import { SocialMediaIcons } from "@/components/SocialMediaIcons";
import { WhatsAppOrderButton } from "@/components/whatsapp-order-button";
import { brand, contact, siteUrl } from "@/lib/site-config";
import { storeCta, storePage, storeSurface, storeType } from "@/lib/store-ui";
import { waEntryQuestion } from "@/lib/whatsapp-sales";

export const metadata: Metadata = {
  title: "Contact",
  description:
    `Contact ${brand.shortName} in Lagos via WhatsApp, Instagram, email, or contact form.`,
  openGraph: {
    title: `Contact | ${brand.shortName}`,
    description:
      "Contact our team for product inquiries, support, and checkout help.",
    url: `${siteUrl}/contact`,
    images: ["/og-default.svg"]
  }
};

export default function ContactPage() {
  return (
    <div className={`${storePage.wide} bg-rgr-surface`}>
      <h1 className={storeType.h1}>Contact</h1>
      <p className={`${storeType.muted} mt-3 max-w-md`}>
        WhatsApp is fastest. Email works too.
      </p>
      <div className="mt-12 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        <article className={storeSurface.cardSm}>
          <p className="flex items-center gap-2 text-sm font-semibold text-rgr-navy">
            <WhatsAppIcon size={20} className="text-[#25D366]" />
            WhatsApp
          </p>
          <p className="mt-2 text-sm text-rgr-gray700">
            Order or ask questions — same-day replies.
          </p>
          <p className="mt-3 text-lg font-semibold tabular-nums text-rgr-navy">
            +{contact.whatsappNumber}
          </p>
          <WhatsAppOrderButton
            label="Message us on WhatsApp"
            productName="Contact Page Inquiry"
            sourcePage="/contact"
            message={waEntryQuestion()}
            price=""
            className="mt-4 w-full rounded-lg py-3 text-sm font-semibold sm:w-auto"
          />
        </article>

        <article
          className={`${storeSurface.cardSm} text-sm text-rgr-gray700`}
        >
          <p className="flex items-center gap-2 font-semibold text-rgr-navy">
            <Mail className="h-5 w-5 text-rgr-gray600" aria-hidden />
            Email
          </p>
          <p className="mt-2">{contact.email}</p>
          <p className="mt-4 font-semibold text-rgr-navy">Instagram</p>
          <Link
            href={contact.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`${storeCta.link} mt-1 inline-flex`}
          >
            {contact.instagramHandle}
          </Link>
          <p className="mt-4 flex items-center gap-2">
            <MapPin className="h-5 w-5 shrink-0 text-rgr-gray600" />
            Lagos, Nigeria
          </p>
        </article>

        <article className={storeSurface.cardSm}>
          <h2 className={storeType.h3}>Social</h2>
          <div className="mt-4">
            <SocialMediaIcons variant="contact" />
          </div>
        </article>
      </div>
    </div>
  );
}
