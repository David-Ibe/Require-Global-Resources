import type { Metadata } from "next";
import Link from "next/link";

import { PurchaseTracker } from "@/components/purchase-tracker";
import { contact, getWhatsAppLink } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Order Confirmation",
  description:
    "Thank you for your order from Require Global Resources. Our team will confirm details on WhatsApp quickly.",
  openGraph: {
    title: "Order Confirmation | Require Global Resources",
    description:
      "Your order has been received. Our team will contact you on WhatsApp within 30 minutes.",
    url: "https://requireglobalresources.com/order-confirmation",
    images: ["/og-default.svg"]
  }
};

const instagramUrl = `https://instagram.com/${contact.instagramHandle.replace("@", "")}`;

export default function OrderConfirmationPage() {
  return (
    <div className="mx-auto flex min-h-[65vh] w-full max-w-3xl items-center px-4 py-16 md:px-8">
      <PurchaseTracker />
      <section className="w-full rounded-2xl border border-slate-100 bg-white p-8 shadow-soft">
        <h1 className="text-4xl font-bold text-brand-navy">Thank You For Your Order!</h1>
        <p className="mt-4 text-slate-700">
          Your order has been received. Our team will contact you on WhatsApp
          within 30 minutes to confirm your delivery details and payment
          information.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href={getWhatsAppLink("Hi, I just completed my order and need confirmation.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-md bg-brand-electric px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-navy"
          >
            Chat With Us Now
          </Link>
          <Link
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-md border border-brand-navy px-5 py-3 text-sm font-semibold text-brand-navy transition hover:bg-brand-navy hover:text-white"
          >
            Follow on Instagram
          </Link>
        </div>
      </section>
    </div>
  );
}
