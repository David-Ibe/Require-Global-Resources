"use client";

import { Search, X } from "@/components/icons";
import { cn } from "@/lib/cn";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

type Props = {
  className?: string;
  defaultValue?: string;
  compact?: boolean;
  large?: boolean;
  autoFocus?: boolean;
  onClose?: () => void;
};

export function MarketplaceSearch({
  className,
  defaultValue = "",
  compact = false,
  large = false,
  autoFocus = false,
  onClose,
}: Props) {
  const router = useRouter();
  const [query, setQuery] = useState(defaultValue);

  useEffect(() => {
    setQuery(defaultValue);
  }, [defaultValue]);

  function submit(e: FormEvent) {
    e.preventDefault();
    const q = query.trim();
    router.push(q ? `/listings?q=${encodeURIComponent(q)}` : "/listings");
    onClose?.();
  }

  return (
    <form
      onSubmit={submit}
      role="search"
      aria-label="Search products"
      className={cn("relative w-full", className)}
    >
      <Search
        className={cn(
          "pointer-events-none absolute top-1/2 -translate-y-1/2 text-neutral-400",
          large ? "left-6 h-6 w-6" : "left-4 h-4 w-4"
        )}
        aria-hidden
      />
      <input
        type="search"
        name="q"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={large ? "Search products..." : "Search products..."}
        autoFocus={autoFocus}
        autoComplete="off"
        className={cn(
          "w-full border border-neutral-200 bg-neutral-50 text-neutral-900 placeholder:text-neutral-400 transition-colors focus:border-neutral-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-neutral-300",
          large
            ? "rounded-2xl py-5 pl-16 pr-6 text-lg md:py-6 md:text-xl"
            : cn(
                "rounded-full",
                compact ? "py-2 pl-10 pr-9 text-sm" : "py-2.5 pl-11 pr-10 text-sm"
              )
        )}
      />
      {query && !large && (
        <button
          type="button"
          onClick={() => setQuery("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-neutral-400 hover:text-neutral-700"
          aria-label="Clear search"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      )}
    </form>
  );
}
