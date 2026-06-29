import Link from "next/link";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { formatNgn, type Listing } from "@/lib/electronics-listings";
import { getListingBadge, getListingReviewCount } from "@/lib/home-content";
import { getListingFallbackImage } from "@/lib/listing-placeholders";
import {
  getListingConfiguration,
  getListingProcessor,
  getListingRam,
  getListingStorage,
} from "@/lib/listing-search";
import { RequireCertifiedBadge, TrustPill } from "@/components/store/require-certified-badge";
import { WishlistButton } from "@/components/store/wishlist-button";
import { Star } from "@/components/icons";
import Image from "next/image";

type Props = {
  listing: Listing;
  className?: string;
  index?: number;
  showBadge?: boolean;
};

function SpecLines({ listing }: { listing: Listing }) {
  const processor = getListingProcessor(listing);
  const ram = getListingRam(listing);
  const storage = getListingStorage(listing);
  const lines = [processor, ram, storage].filter(Boolean);

  if (lines.length === 0) {
    return (
      <p className="mt-2 text-sm text-muted line-clamp-2">{listing.headline}</p>
    );
  }

  return (
    <ul className="mt-2 space-y-0.5 text-sm text-muted">
      {lines.map((line) => (
        <li key={line}>{line}</li>
      ))}
    </ul>
  );
}

export function ListingCard({ listing, className, index = 0, showBadge = true }: Props) {
  const hero = listing.images[0] ?? getListingFallbackImage(listing.category);
  const isSold = listing.status === "sold";
  const href = `/listings/${listing.slug}`;
  const reviewCount = getListingReviewCount(listing.slug);
  const badge = listing.badge ?? getListingBadge(listing.slug, index);
  const inStock = listing.status === "available";

  return (
    <article className={cn("group flex h-full flex-col animate-fade-in", className)}>
      <div className="relative">
        <Link
          href={href}
          className="product-image-zoom relative block aspect-[4/5] w-full overflow-hidden rounded-xl border border-border bg-white"
          aria-label={`View ${listing.name}`}
        >
          <Image
            src={hero}
            alt={listing.name}
            fill
            className="object-contain p-4 md:p-6"
            sizes="(max-width:768px) 100vw, 33vw"
          />
          {isSold && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/80">
              <span className="text-sm font-medium text-muted">Sold</span>
            </div>
          )}
        </Link>
        {!isSold && (
          <WishlistButton slug={listing.slug} className="absolute right-3 top-3" />
        )}
        {showBadge && badge && !isSold && (
          <span className="absolute left-3 top-3 rounded-full bg-navy px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white">
            {badge}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col pt-5">
        <h3 className="text-card-title font-semibold leading-snug text-neutral-900">
          <Link href={href} className="hover:text-navy">
            {listing.name}
          </Link>
        </h3>

        <p className="mt-1 text-xs font-medium uppercase tracking-wide text-muted">
          {listing.brand}
        </p>

        <div className="mt-2 flex items-center gap-1.5">
          <div className="flex gap-0.5" aria-hidden>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-3.5 w-3.5 fill-accent text-accent" />
            ))}
          </div>
          <span className="text-xs text-muted">({reviewCount})</span>
        </div>

        <SpecLines listing={listing} />

        <div className="mt-4 flex flex-wrap gap-2">
          <RequireCertifiedBadge size="sm" />
          {inStock && (
            <>
              <TrustPill>Ships Today</TrustPill>
              <TrustPill>Warranty Included</TrustPill>
            </>
          )}
        </div>

        {inStock && (
          <p className="mt-3 text-xs font-medium text-success">In Stock</p>
        )}

        <p className="mt-3 text-xl font-semibold tabular-nums tracking-tight text-neutral-900">
          {formatNgn(listing.askingPriceNGN)}
        </p>

        <div className="mt-5">
          <Button href={href} variant="secondary" className="min-h-[44px] w-full sm:w-auto">
            View Product
          </Button>
        </div>
      </div>
    </article>
  );
}
