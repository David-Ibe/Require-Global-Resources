"use client";

import { Heart } from "@/components/icons";
import { cn } from "@/lib/cn";
import { useWishlist } from "@/lib/wishlist";

type Props = {
  slug: string;
  className?: string;
};

export function WishlistButton({ slug, className }: Props) {
  const { saved, toggle } = useWishlist(slug);

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle();
      }}
      aria-label={saved ? "Remove from saved" : "Save product"}
      aria-pressed={saved}
      className={cn(
        "inline-flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-white/90 text-neutral-500 backdrop-blur-sm transition hover:border-neutral-300 hover:text-neutral-900",
        saved && "border-neutral-900 text-neutral-900",
        className
      )}
    >
      <Heart
        className={cn("h-[18px] w-[18px]", saved && "fill-neutral-900")}
        aria-hidden
      />
    </button>
  );
}
