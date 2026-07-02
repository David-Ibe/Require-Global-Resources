import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { formatNgn, type Listing } from "@/lib/electronics-listings";
import { getListingFallbackImage } from "@/lib/listing-placeholders";
import {
  getListingProcessor,
  getListingRam,
  getListingStorage,
} from "@/lib/listing-search";

type Props = {
  listing: Listing;
};

function buildTagline(listing: Listing): string {
  const processor = getListingProcessor(listing);
  const ram = getListingRam(listing);
  const storage = getListingStorage(listing);
  const specs = [processor, ram, storage].filter(Boolean);
  if (specs.length > 0) return specs.join(" · ");
  return listing.headline;
}

export function FeaturedProductHero({ listing }: Props) {
  const hero = listing.images[0] ?? getListingFallbackImage(listing.category);
  const href = `/listings/${listing.slug}`;
  const tagline = buildTagline(listing);

  return (
    <section
      className="animate-fade-in overflow-hidden bg-surface pt-8 pb-12 md:pt-10 md:pb-16"
      aria-label="Featured product"
    >
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="order-2 lg:order-1">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">
              Featured
            </p>
            <h1 className="mt-3 text-[clamp(2rem,5vw,3rem)] font-bold leading-[1.1] tracking-[-0.03em] text-navy">
              {listing.name}
            </h1>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-muted md:text-base">
              {tagline}
            </p>
            <p className="mt-8 text-card-price tabular-nums text-navy">
              {formatNgn(listing.askingPriceNGN)}
            </p>
            <p className="mt-2 text-[12px] font-medium uppercase tracking-wide text-success">
              In Stock
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Button
                href={href}
                variant="navy"
                className="min-h-[52px] rounded-xl px-8 text-[15px] font-semibold"
              >
                Explore
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
            className="product-image-zoom group relative order-1 mx-auto block w-full max-w-xl lg:order-2 lg:max-w-none"
            aria-label={`View ${listing.name}`}
          >
            <Image
              src={hero}
              alt={listing.name}
              width={1400}
              height={1050}
              className="mx-auto h-auto w-full max-h-[min(480px,55vh)] object-contain"
              sizes="(max-width:768px) 90vw, 560px"
              priority
            />
          </Link>
        </div>
      </Container>
    </section>
  );
}
