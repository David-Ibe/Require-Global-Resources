import Link from "next/link";

import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/store/section-header";
import { BUYING_GUIDES } from "@/lib/home-content";

export function BuyingGuides() {
  return (
    <section className="bg-page py-section-sm md:py-section" aria-labelledby="buying-guides">
      <Container>
        <SectionHeader
          title="Buying guides"
          subtitle="Expert advice to help you choose the right technology."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {BUYING_GUIDES.map((guide) => (
            <Link
              key={guide.slug}
              href={guide.href}
              className="group card-hover block rounded-xl border border-border bg-white p-6"
            >
              <span className="text-xs font-medium text-muted">{guide.readTime}</span>
              <h3 className="mt-2 text-base font-semibold text-neutral-900 group-hover:text-navy">
                {guide.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{guide.description}</p>
              <span className="mt-4 inline-block text-sm font-medium text-navy group-hover:text-accent">
                Read guide →
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
