import { Container } from "@/components/ui/container";
import { cn } from "@/lib/cn";
import type { Listing } from "@/lib/electronics-listings";
import { getListingDocumentation } from "@/lib/listing-spec-parser";

type Props = {
  listing: Listing;
  className?: string;
};

function SpecTable({ specs }: { specs: { label: string; value: string }[] }) {
  if (specs.length === 0) return null;

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
      <div className="border-b border-border bg-page px-5 py-4 md:px-6">
        <h3 className="text-sm font-semibold uppercase tracking-[0.08em] text-quiet">
          Technical specifications
        </h3>
      </div>
      <dl className="divide-y divide-border">
        {specs.map((spec) => (
          <div
            key={spec.label}
            className="grid gap-2 px-5 py-4 md:grid-cols-[minmax(9rem,34%)_1fr] md:gap-6 md:px-6"
          >
            <dt className="text-[13px] font-medium text-muted">{spec.label}</dt>
            <dd className="text-[14px] leading-relaxed text-navy">{spec.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export function ListingSpecifications({ listing, className }: Props) {
  const { overview, idealFor, highlights, specs } = getListingDocumentation(listing);

  return (
    <div className={cn("space-y-0", className)}>
      <section className="bg-page py-8 md:py-10">
        <Container className="max-w-3xl">
          <h2 className="text-section-title text-navy no-underline">Overview</h2>
          <div className="mt-4 space-y-3">
            {overview.map((paragraph) => (
              <p
                key={paragraph}
                className="text-[15px] leading-7 text-neutral-700"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </Container>
      </section>

      {(highlights.length > 0 || idealFor) && (
        <section className="bg-page py-8 md:py-10">
          <Container className="max-w-3xl">
            <h2 className="text-section-title text-navy no-underline">
              Key highlights
            </h2>

            {highlights.length > 0 && (
              <ul className="mt-4 space-y-2.5">
                {highlights.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-[14px] leading-relaxed text-neutral-700"
                  >
                    <span
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                      aria-hidden
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}

            {idealFor && (
              <div className="mt-5 rounded-2xl border border-border bg-surface p-4 shadow-sm md:p-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-quiet">
                  Ideal for
                </p>
                <p className="mt-3 text-[15px] leading-relaxed text-navy">
                  {idealFor}
                </p>
              </div>
            )}
          </Container>
        </section>
      )}

      {specs.length > 0 && (
        <section className="bg-surface py-8 md:py-10">
          <Container className="max-w-3xl">
            <h2 className="text-section-title text-navy no-underline">
              Specifications
            </h2>
            <div className="mt-5">
              <SpecTable specs={specs} />
            </div>
          </Container>
        </section>
      )}
    </div>
  );
}
