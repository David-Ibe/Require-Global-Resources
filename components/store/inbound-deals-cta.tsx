import Link from "next/link";

import { ArrowRight, WhatsAppIcon } from "@/components/icons";
import { FadeInView } from "@/components/fade-in-view";
import { brand, getWhatsAppLink } from "@/lib/site-config";

const whatsappHref = getWhatsAppLink(
  `Hi ${brand.shortName}, I have an item to sell. Here are the details:\n\nProduct: \nCondition: \nAsking price: \n\nPhotos coming in this chat.`
);

/**
 * v2 "inbound deals" CTA — converts diaspora / returning traveller / upgrader
 * traffic into consignment supply. Direct, sales-led tone. Matches Pillar 4
 * of the v2 content strategy.
 */
export function InboundDealsCta() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-rgr-blue to-rgr-navy py-12 md:py-16">
      <div
        className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-rgr-gold/15 blur-3xl"
        aria-hidden
      />
      <div
        className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-rgr-gold/10 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto flex max-w-6xl flex-col items-start gap-8 px-5 md:flex-row md:items-center md:justify-between md:px-10">
        <FadeInView>
          <p className="font-display text-sm uppercase tracking-[0.25em] text-rgr-gold">
            Inbound deals
          </p>
          <h2 className="mt-2 font-display text-3xl uppercase leading-[1.05] tracking-tight text-white md:text-4xl">
            Have a genuine laptop or phone to sell?
          </h2>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-white/70 md:text-lg">
            We list it, market it on Meta and Jiji, and close the buyer for
            you. Commission agreed up front. Zero capital risk.
          </p>
        </FadeInView>

        <FadeInView delay={120}>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-7 py-4 font-display text-sm uppercase tracking-wider text-white shadow-lg transition hover:bg-[#20bd5a]"
            >
              <WhatsAppIcon size={18} />
              WhatsApp us
            </a>
            <Link
              href="/sell"
              className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white/30 px-7 py-4 font-display text-sm uppercase tracking-wider text-white transition hover:border-white hover:bg-white/10"
            >
              See the process
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </FadeInView>
      </div>
    </section>
  );
}
