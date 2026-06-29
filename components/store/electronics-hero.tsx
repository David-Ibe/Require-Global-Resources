import { Container } from "@/components/ui/container";

import { Button } from "@/components/ui/button";

import { CheckCircle2 } from "@/components/icons";

import { brand, getWhatsAppLink } from "@/lib/site-config";

const whatsappHref = getWhatsAppLink(
  `Hi ${brand.shortName}, I'd like help finding the right product.`
);

const TRUST_ITEMS = [
  "Genuine Products",
  "Nationwide Delivery",
  "CAC Registered",
] as const;

export function ElectronicsHero() {
  return (
    <section
      className="animate-fade-in bg-highlight pt-14 pb-[3.75rem] md:pt-[4.5rem] md:pb-[4.5rem]"
      aria-label="Hero"
    >
      <Container className="max-w-3xl text-center">
        <h1 className="text-hero-title text-navy">
          Genuine Electronics.
          <br />
          Delivered.
        </h1>

        <p className="mx-auto mt-5 max-w-lg text-[15px] leading-relaxed text-neutral-700 md:text-base">
          Computers, smartphones, audio and accessories from the brands you know.
        </p>

        <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {TRUST_ITEMS.map((item) => (
            <li
              key={item}
              className="inline-flex items-center gap-2 text-[13px] text-neutral-700"
            >
              <CheckCircle2 className="h-4 w-4 shrink-0 text-accent" aria-hidden />
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <Button
            href="/listings"
            variant="navy"
            className="min-h-[48px] min-w-[200px] rounded-lg px-6 py-3 font-semibold"
          >
            Browse Products
          </Button>
          <Button
            href={whatsappHref}
            variant="secondary"
            className="min-h-[48px] min-w-[200px] rounded-lg px-6 py-3 font-medium"
          >
            Chat on WhatsApp
          </Button>
        </div>
      </Container>
    </section>
  );
}
