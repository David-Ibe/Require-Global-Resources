import { Container } from "@/components/ui/container";
import { RequireCertifiedBadge } from "@/components/store/require-certified-badge";
import { CheckCircle2 } from "@/components/icons";

const CERTIFIED_POINTS = [
  "Sourced from verified suppliers",
  "Authenticated before listing",
  "Quality checked on arrival",
  "Backed by warranty",
] as const;

export function BrandStory() {
  return (
    <section className="py-section-sm md:py-section" aria-labelledby="brand-story">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2 id="brand-story" className="text-section-title text-neutral-900">
            Why Require Global
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted">
            Buying genuine technology should be simple.
          </p>
          <p className="mt-4 text-base leading-relaxed text-neutral-700">
            At Require Global, every product is sourced through verified suppliers and
            carefully selected for authenticity, reliability, and long-term value.
          </p>
          <p className="mt-4 text-base leading-relaxed text-neutral-700">
            Whether you&apos;re buying a single laptop or equipping an entire organization,
            we make purchasing technology simple, transparent, and dependable.
          </p>
        </div>
      </Container>
    </section>
  );
}

export function RequireCertifiedProgram() {
  return (
    <section className="bg-navy py-section-sm md:py-section" aria-labelledby="require-certified">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex justify-center">
            <RequireCertifiedBadge size="lg" className="bg-white/10 text-white" />
          </div>
          <h2 id="require-certified" className="mt-6 text-section-title text-white">
            Our trust guarantee
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/70">
            Every product carrying the Require Certified badge has been verified end-to-end.
          </p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {CERTIFIED_POINTS.map((point) => (
              <li
                key={point}
                className="flex items-center gap-3 rounded-xl bg-white/5 px-5 py-4 text-left text-sm text-white/90"
              >
                <CheckCircle2 className="h-5 w-5 shrink-0 text-accent" aria-hidden />
                {point}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
