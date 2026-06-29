import Link from "next/link";



import { Container } from "@/components/ui/container";

import { ListingCard } from "@/components/store/listing-card";

import type { Listing } from "@/lib/electronics-listings";



type Props = {

  listings: Listing[];

  limit?: number;

  showHeading?: boolean;

  heading?: string;

  subtitle?: string;

  ctaHref?: string;

  ctaLabel?: string;

  id?: string;

};



export function ElectronicsListingsGrid({

  listings,

  limit,

  showHeading = true,

  heading = "Featured Products",

  subtitle,

  ctaHref = "/listings",

  ctaLabel = "View all",

  id = "listings",

}: Props) {

  const items = (limit ? listings.slice(0, limit) : listings).filter(

    (l) => l.status !== "sold"

  );



  if (items.length === 0) {

    return (

      <section className="py-section-sm md:py-section">

        <Container className="text-center">

          {showHeading && (

            <h2 className="text-section-title text-neutral-900">{heading}</h2>

          )}

          <p className="mt-6 text-muted">No listings available right now.</p>

        </Container>

      </section>

    );

  }



  return (

    <section id={id} className="animate-fade-in py-14 md:py-16">

      <Container>

        {showHeading && (

          <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between md:mb-14">

            <div>

              <h2 className="text-section-title text-neutral-900">{heading}</h2>

              {subtitle && (

                <p className="mt-2 max-w-xl text-base text-muted">{subtitle}</p>

              )}

            </div>

            {ctaHref && (

              <Link

                href={ctaHref}

                className="shrink-0 text-sm font-medium text-navy hover:text-accent"

              >

                {ctaLabel} →

              </Link>

            )}

          </div>

        )}



        <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-y-16">

          {items.map((listing, index) => (

            <ListingCard key={listing.slug} listing={listing} index={index} />

          ))}

        </div>

      </Container>

    </section>

  );

}

