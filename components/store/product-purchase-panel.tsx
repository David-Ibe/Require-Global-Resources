import { WhatsAppIcon } from "@/components/icons";
import { RequireCertifiedBadge, TrustPill } from "@/components/store/require-certified-badge";
import { WishlistButton } from "@/components/store/wishlist-button";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { formatNgn, type Listing } from "@/lib/electronics-listings";

type Props = {
  listing: Listing;
  config: string;
  whatsappHref: string;
  className?: string;
};

export function ProductPurchasePanel({
  listing,
  config,
  whatsappHref,
  className,
}: Props) {
  const isSold = listing.status === "sold";

  return (
    <div className={cn("lg:sticky lg:top-24 lg:self-start", className)}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-block rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-700">
            {listing.condition}
          </span>
          <RequireCertifiedBadge size="sm" />
        </div>
        <WishlistButton slug={listing.slug} className="shrink-0" />
      </div>

      <h1 className="mt-5 text-[clamp(1.75rem,4vw,2.25rem)] font-semibold leading-tight tracking-tight text-neutral-950">
        {listing.name}
      </h1>

      <p className="mt-3 text-base text-neutral-500">{config}</p>

      <p className="mt-8 text-3xl font-medium tabular-nums tracking-tight text-neutral-950 md:text-4xl">
        {formatNgn(listing.askingPriceNGN)}
      </p>

      <p className="mt-2 text-sm text-neutral-400">
        {listing.availability} · {listing.sourceMarket}
      </p>

      {!isSold && (
        <div className="mt-4 flex flex-wrap gap-2">
          <TrustPill>Ships Today</TrustPill>
          <TrustPill>Warranty Included</TrustPill>
        </div>
      )}

      {!isSold && (
        <div className="mt-10 hidden flex-col gap-3 lg:flex">
          <Button
            href={whatsappHref}
            variant="primary"
            className="min-h-[52px] w-full"
          >
            <WhatsAppIcon size={18} />
            Order on WhatsApp
          </Button>
        </div>
      )}

      <div className="mt-8 space-y-1.5 text-sm leading-relaxed text-neutral-500">
        <p>Lagos same-day or next-day delivery.</p>
        <p>Nationwide shipping in 2–4 days.</p>
        <p>Pay-on-delivery available in Lagos.</p>
      </div>
    </div>
  );
}

type MobileBarProps = {
  listing: Listing;
  whatsappHref: string;
};

export function ProductMobileBar({ listing, whatsappHref }: MobileBarProps) {
  if (listing.status === "sold") return null;

  return (
    <>
      <div
        className="fixed inset-x-0 bottom-0 z-50 border-t border-neutral-200 bg-white/95 p-4 backdrop-blur-md lg:hidden"
        aria-label="Purchase actions"
      >
        <div className="mx-auto flex max-w-lg items-center gap-4">
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-neutral-950">
              {formatNgn(listing.askingPriceNGN)}
            </p>
            <p className="truncate text-xs text-neutral-500">{listing.condition}</p>
          </div>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[48px] shrink-0 items-center justify-center gap-2 rounded-full bg-neutral-900 px-6 text-sm font-medium text-white transition hover:bg-neutral-800"
          >
            <WhatsAppIcon size={18} />
            WhatsApp
          </a>
        </div>
      </div>
      <div className="h-24 lg:hidden" aria-hidden />
    </>
  );
}
