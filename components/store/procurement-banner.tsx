import Link from "next/link";

import { Container } from "@/components/ui/container";

export function ProcurementBanner() {
  return (
    <section className="py-14 md:py-16" aria-label="Business procurement">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 rounded-xl border border-border bg-white px-8 py-8 md:flex-row md:items-center md:px-10 md:py-9">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-neutral-900 md:text-2xl">
              Buying for your company?
            </h2>
            <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted md:text-base">
              Official quotations, volume pricing and nationwide procurement.
            </p>
          </div>
          <Link
            href="/business"
            className="shrink-0 text-sm font-medium text-navy transition hover:text-accent"
          >
            Talk to Procurement →
          </Link>
        </div>
      </Container>
    </section>
  );
}
