import Link from "next/link";

import { TRUST_BRAND_NAMES } from "@/lib/brands";
import { cn } from "@/lib/cn";

type Props = {
  className?: string;
  compact?: boolean;
};

export function BrandLogoWall({ className, compact = false }: Props) {
  return (
    <div className={cn("w-full", className)}>
      {!compact && (
        <p className="mb-6 text-xs font-medium uppercase tracking-widest text-muted">
          Trusted brands
        </p>
      )}
      <div
        className={cn(
          "flex flex-wrap items-center justify-center gap-x-8 gap-y-4 md:gap-x-10",
          compact && "gap-x-6 gap-y-3"
        )}
      >
        {TRUST_BRAND_NAMES.map((name) => (
          <Link
            key={name}
            href={`/listings?q=${encodeURIComponent(name)}`}
            className={cn(
              "group font-semibold tracking-tight text-neutral-400 transition-colors duration-300 hover:text-navy",
              compact ? "text-sm" : "text-base md:text-lg"
            )}
          >
            {name}
          </Link>
        ))}
      </div>
    </div>
  );
}
