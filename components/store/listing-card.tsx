import Link from "next/link";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { formatNgn, type Listing } from "@/lib/electronics-listings";
import { getListingFallbackImage } from "@/lib/listing-placeholders";
import {
  getListingProcessor,
  getListingRam,
  getListingStorage,
} from "@/lib/listing-search";
import { WishlistButton } from "@/components/store/wishlist-button";
import Image from "next/image";

type Props = {
  listing: Listing;
  className?: string;
};

function ConditionBadge({ condition }: { condition: string }) {
  return (
    <span className="inline-flex items-center rounded-full bg-accent-light px-2 py-0.5 text-[11px] font-medium text-accent-text">
      {condition}
    </span>
  );
}

function SpecText({ listing }: { listing: Listing }) {
  const processor = getListingProcessor(listing);
  const ram = getListingRam(listing);
  const storage = getListingStorage(listing);
  const text = [processor, ram, storage].filter(Boolean).join(" · ") || listing.headline;

  return (
    <p className="mb-2 line-clamp-2 text-xs leading-normal text-muted">{text}</p>
  );
}

export function ListingCard({ listing, className }: Props) {
  const hero = listing.images[0] ?? getListingFallbackImage(listing.category);
  const isSold = listing.status === "sold";
  const href = `/listings/${listing.slug}`;
  const inStock = listing.status === "available";

  return (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-xl bg-surface shadow-sm transition-shadow duration-150 hover:shadow-md",
        className
      )}
    >
      <div className="relative">
        <Link
          href={href}
          className="product-image-zoom relative flex aspect-[4/3] items-center justify-center bg-page p-6"
          aria-label={`View ${listing.name}`}
        >
          <Image
            src={hero}
            alt={listing.name}
            width={240}
            height={180}
            className="max-h-[180px] w-auto object-contain"
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
        {!isSold && (
          <span className="absolute left-3 top-3">
            <ConditionBadge condition={listing.condition} />
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="mb-1 text-[15px] font-semibold leading-snug text-navy">
          <Link href={href} className="hover:text-navy-secondary">
            {listing.name}
          </Link>
        </h3>

        <p className="mb-2 text-[11px] font-medium uppercase tracking-wide text-quiet">
          {listing.brand}
        </p>

        <SpecText listing={listing} />

        <p className="mb-2 text-lg font-bold tabular-nums tracking-tight text-navy">
          {formatNgn(listing.askingPriceNGN)}
        </p>

        {inStock && (
          <p className="mb-2 text-[11px] text-quiet">In Stock</p>
        )}

        <div className="mt-auto pt-2">
          <Button href={href} variant="secondary" className="min-h-[44px] w-full rounded-lg sm:w-auto">
            View Product
          </Button>
        </div>
      </div>
    </article>
  );
}
