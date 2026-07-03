import Link from "next/link";

import { BrandLogo, MARQUEE_BRAND_SLUGS } from "@/components/store/brand-logos";
import { getBrandBySlug } from "@/lib/brands";
import { cn } from "@/lib/cn";

function LogoSet() {
  return (
    <>
      {MARQUEE_BRAND_SLUGS.map((slug) => {
        const brand = getBrandBySlug(slug);
        return (
          <span key={slug} className="flex shrink-0 items-center gap-8 px-8 md:gap-10 md:px-10">
            <Link
              href={brand?.href ?? `/listings?q=${encodeURIComponent(slug)}`}
              className="flex items-center"
              aria-label={brand?.name ?? slug}
            >
              <BrandLogo slug={slug} />
            </Link>
            <span className="h-8 w-px shrink-0 bg-neutral-200" aria-hidden />
          </span>
        );
      })}
    </>
  );
}

type Props = {
  className?: string;
};

export function BrandMarquee({ className }: Props) {
  return (
    <section
      className={cn("border-y border-neutral-200/80 bg-white", className)}
      aria-label="Shop trusted global brands"
    >
      <div className="flex flex-col md:flex-row md:items-stretch">
        <div className="hidden shrink-0 items-center border-b border-neutral-200/80 px-6 py-4 md:flex md:border-b-0 md:border-r lg:px-8">
          <p className="whitespace-nowrap text-sm text-neutral-600 md:text-[15px]">
            Shop trusted <span className="font-semibold text-neutral-900">global brands</span>
          </p>
        </div>

        <div className="group relative min-w-0 flex-1 overflow-hidden py-4 md:py-5">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-white to-transparent md:w-12" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-white to-transparent md:w-12" />
          <div className="marquee-track animate-marquee group-hover:[animation-play-state:paused]">
            <div className="flex items-center">
              <LogoSet />
            </div>
            <div className="flex items-center" aria-hidden>
              <LogoSet />
            </div>
          </div>
        </div>

        <div className="flex shrink-0 items-center justify-center border-t border-neutral-200/80 px-6 py-3 md:border-t-0 md:border-l md:py-0 lg:px-8">
          <Link href="/brands" className="link-accent whitespace-nowrap text-sm font-medium">
            View all brands →
          </Link>
        </div>
      </div>
    </section>
  );
}
