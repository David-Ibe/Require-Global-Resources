import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { formatNgn, type Listing } from "@/lib/electronics-listings";
import { getFeaturedHeroTagline } from "@/lib/featured-listing";
import { getListingFallbackImage } from "@/lib/listing-placeholders";

type Props = {
  listing: Listing;
};

export function FeaturedProductHero({ listing }: Props) {
  const hero = listing.images[0] ?? getListingFallbackImage(listing.category);
  const href = `/listings/${listing.slug}`;
  const tagline = getFeaturedHeroTagline(listing);

  return (
    <section
      className="animate-fade-in relative overflow-hidden bg-surface pt-10 pb-20 md:pt-14 md:pb-28"
      aria-label="Featured product"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute -right-[15%] top-[5%] h-[85%] w-[50%] rotate-[32deg] rounded-[2.5rem] bg-gradient-to-br from-accent/[0.07] via-accent/[0.03] to-transparent" />
        <div className="absolute -left-[8%] bottom-[-10%] h-[50%] w-[35%] -rotate-[28deg] rounded-[2rem] bg-gradient-to-tr from-neutral-900/[0.025] to-transparent" />
        <div className="absolute right-[18%] top-[15%] h-24 w-24 rotate-45 rounded-xl bg-accent/[0.05]" />
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/80 to-neutral-50/60" />
      </div>

      <Container className="relative">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-12 xl:gap-16">
          <div className="order-2 lg:order-1">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">
              Featured
            </p>
            <h1 className="mt-3 text-[clamp(2rem,5vw,3rem)] font-bold leading-[1.1] tracking-[-0.03em] text-navy">
              {listing.name}
            </h1>
            <p className="mt-5 max-w-md text-[16px] leading-relaxed text-neutral-600 md:text-[17px]">
              {tagline}
            </p>
            <p className="mt-7 text-[1.5rem] font-semibold leading-tight tracking-[-0.02em] tabular-nums text-navy md:text-[1.625rem]">
              {formatNgn(listing.askingPriceNGN)}
            </p>
            <p className="mt-3 text-[12px] font-medium uppercase tracking-wide text-success">
              In Stock
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Button
                href={href}
                variant="navy"
                className="min-h-[52px] rounded-xl px-8 text-[15px] font-semibold"
              >
                Explore →
              </Button>
              <Link
                href="/listings"
                className="text-[14px] font-medium text-accent transition-colors hover:text-accent-hover"
              >
                View all products →
              </Link>
            </div>
          </div>

          <Link
            href={href}
            className="product-image-zoom group relative order-1 mx-auto block w-full lg:order-2"
            aria-label={`View ${listing.name}`}
          >
            <div
              className="pointer-events-none absolute left-1/2 top-1/2 h-[78%] w-[88%] -translate-x-1/2 -translate-y-[42%] rounded-full bg-gradient-to-b from-accent/[0.06] via-neutral-200/35 to-transparent blur-3xl"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute bottom-[6%] left-1/2 h-7 w-[68%] -translate-x-1/2 rounded-[100%] bg-neutral-900/[0.08] blur-2xl"
              aria-hidden
            />
            <Image
              src={hero}
              alt={listing.name}
              width={1400}
              height={1050}
              className="relative z-10 mx-auto h-auto w-full max-h-[min(600px,68vh)] object-contain lg:max-h-[min(640px,72vh)]"
              sizes="(max-width:768px) 92vw, (max-width:1280px) 50vw, 700px"
              priority
            />
          </Link>
        </div>
      </Container>
    </section>
  );
}
