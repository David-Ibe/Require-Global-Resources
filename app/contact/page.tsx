import { Mail, MapPin, MessageCircle } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { ContactForm } from "@/components/contact-form";
import { SocialMediaIcons } from "@/components/SocialMediaIcons";
import { WhatsAppOrderButton } from "@/components/whatsapp-order-button";
import { contact } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact Us | Require Global Resources",
  description:
    "Contact Require Global Resources in Lagos via WhatsApp, Instagram, email, or contact form.",
  openGraph: {
    title: "Contact Us | Require Global Resources",
    description:
      "Contact our team for product inquiries, support, and WhatsApp ordering.",
    url: "https://requireglobalresources.com/contact",
    images: ["/og-default.svg"]
  }
};

const instagramUrl = `https://instagram.com/${contact.instagramHandle.replace("@", "")}`;

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 md:px-8">
      <h1 className="text-4xl font-bold text-brand-navy">Get In Touch</h1>
      <div className="mt-8 grid gap-8 md:grid-cols-2">
        <div className="space-y-5">
          <article className="rounded-xl border border-slate-100 bg-white p-6">
            <p className="flex items-center gap-2 text-sm font-semibold text-brand-navy">
              <MessageCircle className="h-5 w-5 text-brand-electric" />
              WhatsApp
            </p>
            <p className="mt-2 text-sm text-slate-700">
              Chat directly with our sales team to place your order quickly.
            </p>
            <p className="mt-3 text-lg font-bold text-brand-dark">+{contact.whatsappNumber}</p>
            <WhatsAppOrderButton
              label="Chat on WhatsApp"
              productName="Contact Page Inquiry"
              sourcePage="/contact"
              message="Hi, I need help with a product inquiry."
              price=""
              className="mt-4"
            />
          </article>

          <article className="rounded-xl border border-slate-100 bg-white p-6 text-sm text-slate-700">
            <p className="flex items-center gap-2 font-semibold text-brand-navy">
              <Mail className="h-5 w-5 text-brand-electric" />
              Email
            </p>
            <p className="mt-2">{contact.email}</p>
            <p className="mt-4 font-semibold text-brand-navy">Instagram</p>
            <Link
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex text-brand-electric hover:text-brand-navy"
            >
              {contact.instagramHandle}
            </Link>
            <p className="mt-4 flex items-center gap-2">
              <MapPin className="h-5 w-5 text-brand-electric" />
              Lagos, Nigeria
            </p>
          </article>

          <article className="rounded-xl border border-slate-100 bg-white p-6">
            <h2 className="text-sm font-semibold text-brand-navy">Find Us On Social Media</h2>
            <div className="mt-4">
              <SocialMediaIcons variant="contact" />
            </div>
          </article>
        </div>

        <ContactForm />
      </div>
    </div>
  );
}
