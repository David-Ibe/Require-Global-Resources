import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "@/components/icons";
import { brand, getWhatsAppLink } from "@/lib/site-config";

const FEATURES = [
  "Dedicated account manager",
  "Volume pricing",
  "Official quotations",
  "CAC-registered invoices",
  "Nationwide logistics",
  "After-sales support",
] as const;

const whatsappHref = getWhatsAppLink(
  `Hi ${brand.shortName}, I'd like to discuss business procurement.`
);

export function BusinessProcurement() {
  return (
    <section className="py-section-sm md:py-section" aria-labelledby="business-procurement">
      <Container>
        <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-soft">
          <div className="grid lg:grid-cols-2">
            <div className="p-8 md:p-12 lg:p-14">
              <p className="text-sm font-medium uppercase tracking-widest text-accent">
                Business procurement
              </p>
              <h2
                id="business-procurement"
                className="mt-4 text-section-title text-neutral-900"
              >
                Buying for your company?
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted">
                We help businesses, schools, startups, NGOs and government organizations
                procure genuine technology at scale.
              </p>
              <ul className="mt-8 space-y-3">
                {FEATURES.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm text-neutral-700">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-success" aria-hidden />
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Button href="/business" variant="primary" className="min-h-[52px]">
                  Talk to Our Procurement Team
                </Button>
                <Button href={whatsappHref} variant="secondary" className="min-h-[52px]">
                  WhatsApp Us
                </Button>
              </div>
            </div>
            <div className="hidden bg-navy p-12 lg:flex lg:flex-col lg:justify-center">
              <blockquote className="text-xl font-medium leading-relaxed text-white/90">
                &ldquo;We procured 12 ThinkPads for our office. Official quotation, CAC invoice,
                and all units arrived within 48 hours.&rdquo;
              </blockquote>
              <footer className="mt-6 text-sm text-white/60">
                — Emeka N., IT Manager, Abuja
              </footer>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
