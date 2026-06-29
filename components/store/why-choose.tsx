import {
  Shield,
  Link2,
  Truck,
  FileCheck,
  Building2,
  Headphones,
} from "lucide-react";

import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/store/section-header";
import { WHY_CHOOSE, type WhyChooseItem } from "@/lib/home-content";

const iconMap: Record<WhyChooseItem["icon"], React.ComponentType<{ className?: string }>> = {
  shield: Shield,
  link: Link2,
  truck: Truck,
  warranty: FileCheck,
  building: Building2,
  headphones: Headphones,
};

export function WhyChoose() {
  return (
    <section className="bg-page py-section-sm md:py-section" aria-labelledby="why-choose">
      <Container>
        <SectionHeader
          title="Why choose Require Global"
          subtitle="Six reasons customers trust us for genuine technology."
          align="center"
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {WHY_CHOOSE.map((item) => {
            const Icon = iconMap[item.icon];
            return (
              <article
                key={item.title}
                className="rounded-xl border border-border bg-white p-6 md:p-7"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-navy">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-base font-semibold text-neutral-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
