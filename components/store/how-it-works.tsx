import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/store/section-header";
import { HOW_IT_WORKS } from "@/lib/home-content";

export function HowItWorks() {
  return (
    <section className="bg-page py-section-sm md:py-section" aria-labelledby="how-it-works">
      <Container>
        <SectionHeader
          title="How it works"
          subtitle="From browsing to delivery — a simple, transparent process."
          align="center"
        />

        <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {HOW_IT_WORKS.map((step, index) => (
            <li key={step.step} className="relative flex flex-col items-center text-center">
              {index < HOW_IT_WORKS.length - 1 && (
                <span
                  className="absolute left-[calc(50%+2rem)] top-6 hidden h-px w-[calc(100%-4rem)] bg-border lg:block"
                  aria-hidden
                />
              )}
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-white text-lg font-semibold text-navy shadow-soft">
                {step.step}
              </span>
              <h3 className="mt-5 text-base font-semibold text-neutral-900">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{step.description}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
