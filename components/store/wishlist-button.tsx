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
        "inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-neutral-400 shadow-sm backdrop-blur-sm transition hover:text-accent hover:shadow-md",
        saved && "text-accent",
        className
      )}
    >
      <Heart
        className={cn("h-[18px] w-[18px]", saved && "fill-accent text-accent")}
        aria-hidden
      />
    </button>
  );
}
