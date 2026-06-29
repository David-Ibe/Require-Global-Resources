import type { Metadata } from "next";
import Link from "next/link";

import { ArrowRight, BadgeCheck, ShieldCheck } from "@/components/icons";
import { FadeInView } from "@/components/fade-in-view";
import { GRADES } from "@/lib/grading";
import { brand, siteUrl } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Condition Grading Guide",
  description: `Exactly what New Sealed and New Open Box mean at ${brand.shortName} — what you get, what you won't, and what proof we show.`,
  alternates: { canonical: `${siteUrl}/grading` },
};

export default function GradingPage() {
  return (
    <div className="bg-page">
      <header className="bg-rgr-navy py-14 md:py-20">
        <div className="mx-auto max-w-4xl px-5 md:px-10">
          <FadeInView>
            <p className="font-display text-sm uppercase tracking-[0.25em] text-rgr-gold">
              No softening, no surprises
            </p>
            <h1 className="mt-2 font-display text-4xl uppercase tracking-tight text-white md:text-5xl">
              Condition grading
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
              We use exactly two condition labels. Every listing on the site
              fits cleanly into one. Below is what each one means — what you
              get, what you won&rsquo;t, and what proof we show.
            </p>
          </FadeInView>
        </div>
      </header>

      <div className="mx-auto max-w-5xl space-y-10 px-5 py-14 md:px-10 md:py-20">
        {GRADES.map((g) => (
          <FadeInView key={g.key}>
            <article
              id={g.key}
              className="overflow-hidden rounded-2xl border border-rgr-gray300/40 bg-white shadow-soft"
            >
              <header
                className={`flex flex-wrap items-center justify-between gap-3 border-b border-rgr-gray300/40 px-6 py-5 ${g.chip} border-x-0 border-t-0`}
              >
                <div>
                  <p className="font-display text-[11px] uppercase tracking-[0.25em] opacity-70">
                    Condition
                  </p>
                  <h2 className="mt-1 font-display text-2xl uppercase tracking-tight md:text-3xl">
                    {g.label}
                  </h2>
                  <p className="mt-1 text-sm">{g.oneLine}</p>
                </div>
              </header>

              <div className="grid gap-8 px-6 py-6 md:grid-cols-3 md:gap-6">
                <div>
                  <p className="flex items-center gap-2 font-display text-sm uppercase tracking-wider text-emerald-700">
                    <BadgeCheck className="h-4 w-4" aria-hidden /> What you get
                  </p>
                  <ul className="mt-3 space-y-2 text-sm text-rgr-gray700">
                    {g.whatYouGet.map((line) => (
                      <li key={line} className="flex items-start gap-2">
                        <span className="mt-0.5 text-emerald-600">✓</span>
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="flex items-center gap-2 font-display text-sm uppercase tracking-wider text-amber-700">
                    What you won&rsquo;t
                  </p>
                  <ul className="mt-3 space-y-2 text-sm text-rgr-gray700">
                    {g.whatYouWontGet.map((line) => (
                      <li key={line} className="flex items-start gap-2">
                        <span className="mt-0.5 text-amber-600">!</span>
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="flex items-center gap-2 font-display text-sm uppercase tracking-wider text-rgr-blue">
                    <ShieldCheck className="h-4 w-4" aria-hidden /> Proof we show
                  </p>
                  <ul className="mt-3 space-y-2 text-sm text-rgr-gray700">
                    {g.proofShown.map((line) => (
                      <li key={line} className="flex items-start gap-2">
                        <span className="mt-0.5 text-rgr-blue">▸</span>
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          </FadeInView>
        ))}

        <FadeInView>
          <section className="rounded-2xl border border-rgr-navy/10 bg-[#F8F9FC] p-8 text-center shadow-soft md:p-10">
            <h2 className="font-display text-2xl uppercase tracking-tight text-rgr-navy md:text-3xl">
              Want to see grading in practice?
            </h2>
            <p className="mt-3 text-base leading-relaxed text-rgr-gray700">
              Every listing on the site is tagged with one of the two labels
              above — and the detail page spells out the condition note,
              accessories and any disclosures up front.
            </p>
            <div className="mt-6 flex justify-center">
              <Link
                href="/listings"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-rgr-navy px-7 py-3.5 font-display text-sm uppercase tracking-wider text-white transition hover:bg-rgr-blue"
              >
                See live listings
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </section>
        </FadeInView>
      </div>
    </div>
  );
}
