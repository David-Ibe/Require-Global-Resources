import Link from "next/link";
import Image from "next/image";

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

type Props = {
  listing: Listing;
  className?: string;
};

function ConditionBadge({ condition }: { condition: string }) {
  return (
    <span className="inline-flex items-center rounded-full bg-accent-light px-2.5 py-1 text-[11px] font-medium text-accent-text">
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
    <p className="line-clamp-2 text-[14px] leading-snug text-muted">{text}</p>
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
        "showroom-card group relative flex h-full flex-col overflow-hidden rounded-2xl bg-surface shadow-card",
        className
      )}
    >
      <div
        className="showroom-card-glow pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(37,99,235,0.06) 0%, transparent 65%)",
        }}
      />

      <div className="relative">
        <Link
          href={href}
          className="product-image-zoom relative flex aspect-square items-center justify-center bg-page p-6 md:p-8"
          aria-label={`View ${listing.name}`}
        >
          <Image
            src={hero}
            alt={listing.name}
            width={400}
            height={400}
            className="h-auto max-h-[280px] w-auto object-contain drop-shadow-[0_8px_24px_rgba(17,24,39,0.08)] md:max-h-[320px]"
            sizes="(max-width:768px) 100vw, 33vw"
          />
          {isSold && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/85 backdrop-blur-[2px]">
              <span className="text-sm font-medium text-muted">Sold</span>
            </div>
          )}
        </Link>
        {!isSold && (
          <WishlistButton
            slug={listing.slug}
            className="wishlist-reveal absolute right-4 top-4"
          />
        )}
        {!isSold && (
          <span className="absolute left-4 top-4">
            <ConditionBadge condition={listing.condition} />
          </span>
        )}
      </div>

      <div className="relative flex flex-1 flex-col px-5 pb-5 pt-4 md:px-6 md:pb-6">
        <p className="mb-1.5 text-[12px] font-semibold uppercase tracking-[0.08em] text-quiet">
          {listing.brand}
        </p>

        <h3 className="text-card-title text-navy transition-colors group-hover:text-accent">
          <Link href={href}>{listing.name}</Link>
        </h3>

        <div className="mt-2">
          <SpecText listing={listing} />
        </div>

        <p className="mt-4 text-card-price tabular-nums text-navy">
          {formatNgn(listing.askingPriceNGN)}
        </p>

        {inStock && (
          <p className="mt-1.5 text-[11px] font-medium uppercase tracking-wide text-success">
            In Stock
          </p>
        )}

        <div className="mt-auto pt-5">
          <Button
            href={href}
            variant="ghost-accent"
            className="min-h-[44px] px-0 text-[14px] font-semibold"
          >
            View Product →
          </Button>
        </div>
      </div>
    </article>
  );
}
