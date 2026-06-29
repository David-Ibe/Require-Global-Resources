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
      className="hero-glow animate-fade-in overflow-hidden pt-10 pb-16 md:pt-14 md:pb-24"
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
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-surface shadow-card">
              <div
                className="showroom-card-glow pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500"
                style={{
                  background:
                    "radial-gradient(ellipse at 50% 80%, rgba(37,99,235,0.08) 0%, transparent 70%)",
                }}
              />
              <div className="flex h-full items-center justify-center p-8 md:p-12">
                <Image
                  src={hero}
                  alt={listing.name}
                  width={560}
                  height={560}
                  className="h-auto max-h-[min(420px,70vw)] w-auto object-contain drop-shadow-[0_24px_48px_rgba(17,24,39,0.12)]"
                  sizes="(max-width:768px) 90vw, 560px"
                  priority
                />
              </div>
            </div>
          </Link>
        </div>
      </Container>
    </section>
  );
}
