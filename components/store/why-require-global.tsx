import { Container } from "@/components/ui/container";

import { CheckCircle2 } from "@/components/icons";



const TRUST_POINTS = [

  "Genuine Products",

  "Require Certified",

  "Verified Listings",

  "Nationwide Delivery",

] as const;



export function WhyRequireGlobal() {

  return (

    <section className="py-14 md:py-20" aria-labelledby="why-require-global">

      <Container>

        <div className="mx-auto max-w-2xl text-center">

          <h2 id="why-require-global" className="text-section-title text-neutral-900">

            Why Require Global

          </h2>

          <p className="mt-5 text-lg leading-relaxed text-muted">

            Buying genuine technology should be simple.

          </p>

          <p className="mt-4 text-base leading-relaxed text-neutral-700">

            Every product is sourced through verified suppliers and backed by our

            commitment to authenticity, warranty, and dependable support.

          </p>

          <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">

            {TRUST_POINTS.map((point) => (

              <li

                key={point}

                className="inline-flex items-center gap-2 text-sm text-neutral-700"

              >

                <CheckCircle2 className="h-4 w-4 shrink-0 text-success" aria-hidden />

                {point}

              </li>

            ))}

          </ul>

        </div>

      </Container>

    </section>

  );

}

