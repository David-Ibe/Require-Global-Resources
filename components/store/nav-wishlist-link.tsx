"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { Heart } from "@/components/icons";
import { getWishlist } from "@/lib/wishlist";
import { cn } from "@/lib/cn";

type Props = {
  className?: string;
};

export function NavWishlistLink({ className }: Props) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const update = () => setCount(getWishlist().length);
    update();
    window.addEventListener("rg-wishlist", update);
    window.addEventListener("storage", update);
    return () => {
      window.removeEventListener("rg-wishlist", update);
      window.removeEventListener("storage", update);
    };
  }, []);

  return (
    <Link
      href="/listings?wishlist=1"
      className={cn(
        "relative flex h-10 w-10 items-center justify-center rounded-xl text-neutral-600 transition hover:bg-neutral-100 hover:text-neutral-900",
        className
      )}
      aria-label={`Wishlist${count > 0 ? `, ${count} items` : ""}`}
    >
      <Heart className="h-5 w-5" />
      {count > 0 && (
        <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-semibold text-white">
          {count > 9 ? "9+" : count}
        </span>
      )}
    </Link>
  );
}
