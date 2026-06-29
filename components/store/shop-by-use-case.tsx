import Link from "next/link";
import {
  GraduationCap,
  Briefcase,
  Building2,
  Camera,
  Gamepad2,
  Home,
} from "lucide-react";

import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/store/section-header";
import { USE_CASES, type UseCase } from "@/lib/use-cases";
import { cn } from "@/lib/cn";

const iconMap: Record<UseCase["icon"], React.ComponentType<{ className?: string }>> = {
  graduation: GraduationCap,
  briefcase: Briefcase,
  building: Building2,
  camera: Camera,
  gamepad: Gamepad2,
  home: Home,
};

export function ShopByUseCase() {
  return (
    <section className="py-section-sm md:py-section" aria-labelledby="shop-by-use-case">
      <Container>
        <SectionHeader
          title="Shop by use case"
          subtitle="Find technology curated for how you work, study and create."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {USE_CASES.map((useCase) => {
            const Icon = iconMap[useCase.icon];
            return (
              <Link
                key={useCase.slug}
                href={useCase.href}
                className="group card-hover block rounded-xl border border-border bg-white p-6 md:p-7"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-navy/5 text-navy transition group-hover:bg-navy group-hover:text-white">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-lg font-semibold text-neutral-900">{useCase.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{useCase.description}</p>
                <span className="mt-4 inline-flex items-center text-sm font-medium text-navy group-hover:text-accent">
                  Explore collection →
                </span>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
