import type { Metadata } from "next";
import { Home } from "lucide-react";
import Link from "next/link";

import { FadeInView } from "@/components/fade-in-view";
import { brand, getWhatsAppLink, siteUrl } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `Smart Home | ${brand.shortName}`,
  description:
    "Smart home upgrade products coming soon. Follow @requireglobalresources to be notified.",
  openGraph: {
    title: `Smart Home | ${brand.shortName}`,
    description: "Smart home upgrade products coming soon to Require Global Resources.",
    url: `${siteUrl}/home`,
  },
};

const whatsappNotify = getWhatsAppLink(
  "Hi, I'd like to be notified when your Smart Home products launch."
);

export default function SmartHomePage() {
  return (
    <div>
      <section className="bg-rgr-navy py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <FadeInView>
            <nav className="text-sm text-white/50">
              <Link href="/" className="hover:text-white">
                Home
              </Link>
              <span className="mx-2">→</span>
              <span className="text-rgr-gold">Smart Home</span>
            </nav>
            <span className="mt-6 inline-block rounded-full bg-rgr-blue/20 px-4 py-1.5 text-sm font-medium text-rgr-gold">
              🏠 Smart Home
            </span>
            <h1 className="mt-4 font-display text-4xl uppercase tracking-tight text-white md:text-5xl lg:text-6xl">
              Upgrade Your Space.
            </h1>
            <p className="mt-4 max-w-lg text-base text-white/70 md:text-lg">
              Smart home upgrade products for the modern Nigerian household.
            </p>
          </FadeInView>
        </div>
      </section>

      <section className="bg-[#F8F9FC] py-20 md:py-32">
        <div className="mx-auto max-w-2xl px-5 text-center md:px-10">
          <FadeInView>
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-rgr-navy/5">
              <Home className="h-10 w-10 text-rgr-gold" />
            </div>
            <span className="mt-6 inline-block rounded-full bg-rgr-gray700/90 px-4 py-1.5 font-display text-xs uppercase tracking-widest text-white">
              COMING SOON
            </span>
            <h2 className="mt-6 font-display text-3xl uppercase tracking-tight text-rgr-navy md:text-4xl">
              Smart Home Products
            </h2>
            <p className="mt-4 text-base text-rgr-gray500">
              We&apos;re carefully selecting and verifying the best smart home products
              for Nigerian homes. Follow us to be the first to know when we launch.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <a
                href={whatsappNotify}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-8 py-4 font-display text-sm uppercase tracking-wider text-white transition hover:bg-[#20bd5a]"
              >
                📲 Notify Me on WhatsApp
              </a>
              <a
                href="https://instagram.com/requireglobalresources"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl border-2 border-rgr-navy/20 px-8 py-4 font-display text-sm uppercase tracking-wider text-rgr-navy transition hover:border-rgr-navy/40"
              >
                📸 Follow on Instagram
              </a>
            </div>
            <Link
              href="/"
              className="mt-10 inline-block text-sm font-medium text-rgr-blue underline underline-offset-4"
            >
              ← Back to Store
            </Link>
          </FadeInView>
        </div>
      </section>
    </div>
  );
}
