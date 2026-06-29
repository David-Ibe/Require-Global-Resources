import { WhatsAppIcon } from "@/components/icons";
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
        <span className="inline-flex items-center rounded-full bg-accent-light px-2 py-0.5 text-[11px] font-medium text-accent-text">
          {listing.condition}
        </span>
        <WishlistButton slug={listing.slug} className="shrink-0" />
      </div>

      <h1 className="mt-5 text-[clamp(1.75rem,4vw,2.25rem)] font-bold leading-tight tracking-tight text-navy">
        {listing.name}
      </h1>

      <p className="mt-3 text-[15px] text-neutral-700">{config}</p>

      <p className="mt-8 text-[1.25rem] font-bold tabular-nums tracking-tight text-navy md:text-[1.375rem]">
        {formatNgn(listing.askingPriceNGN)}
      </p>

      <p className="mt-2 text-[13px] text-quiet">
        {listing.availability} · {listing.sourceMarket}
      </p>

      {!isSold && (
        <div className="mt-10 hidden flex-col gap-3 lg:flex">
          <Button
            href={whatsappHref}
            variant="navy"
            className="min-h-[52px] w-full"
          >
            <WhatsAppIcon size={18} />
            Order on WhatsApp
          </Button>
        </div>
      )}

      <div className="mt-8 space-y-1.5 text-[13px] leading-relaxed text-muted">
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
        className="fixed inset-x-0 bottom-0 z-50 bg-surface/95 p-4 shadow-md backdrop-blur-md lg:hidden"
        aria-label="Purchase actions"
      >
        <div className="mx-auto flex max-w-lg items-center gap-4">
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-bold text-navy">
              {formatNgn(listing.askingPriceNGN)}
            </p>
            <p className="truncate text-[11px] text-quiet">{listing.condition}</p>
          </div>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[48px] shrink-0 items-center justify-center gap-2 rounded-lg bg-navy px-6 text-sm font-medium text-white transition hover:bg-navy-secondary"
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
