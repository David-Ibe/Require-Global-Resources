import Image from "next/image";
import Link from "next/link";

import type { ProductRow } from "@/lib/supabase/types";
import { homeProductTitle } from "@/lib/product-home-titles";
import { FadeInView } from "@/components/fade-in-view";

const badgeColors: Record<string, string> = {
  "HOT SELLER": "bg-red-500 text-white",
  NEW: "bg-rgr-blue text-white",
  "BEST VALUE": "bg-rgr-gold text-rgr-navy",
};

export function ProductCardHome({
  product,
  index,
}: {
  product: ProductRow;
  index: number;
}) {
  const img = product.images[0] ?? "/og-default.svg";
  const options = Array.isArray(product.pricing_options)
    ? (product.pricing_options as {
        label: string;
        price: string;
        savings?: string;
      }[])
    : [];
  const price = options[0]?.price ?? product.current_price;
  const savings = options[0]?.savings ?? "";
  const title = homeProductTitle(product.slug, product.name);
  const features = product.features?.slice(0, 3) ?? [];
  const isBundleDeal = product.category === "Bundle Deal";

  return (
    <FadeInView delay={index * 80} className="h-full">
      <article
        className={`group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-lift ${
          isBundleDeal
            ? "ring-2 ring-rgr-gold"
            : "ring-1 ring-rgr-gray300/40"
        }`}
      >
        <Link
          href={`/products/${product.slug}`}
          className="relative block aspect-[4/3] w-full overflow-hidden bg-[#f4f4f5]"
        >
          <Image
            src={img}
            alt={title}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
            sizes="(max-width:768px) 100vw, 33vw"
          />
          {product.badge && (
            <span
              className={`absolute left-4 top-4 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider shadow-sm ${
                badgeColors[product.badge] ?? "bg-rgr-navy text-white"
              }`}
            >
              {product.badge}
            </span>
          )}
          <span className="absolute right-4 top-4 rounded-full bg-rgr-navy/70 px-2.5 py-1 text-[10px] font-medium text-white/80 backdrop-blur-sm">
            {product.category}
          </span>
        </Link>

        <div className="flex flex-1 flex-col px-6 pb-6 pt-5">
          <h3 className="font-display text-xl uppercase tracking-tight text-rgr-navy">
            <Link
              href={`/products/${product.slug}`}
              className="transition hover:text-rgr-blue focus-visible:outline-none"
            >
              {title}
            </Link>
          </h3>

          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-rgr-gray500">
            {product.description}
          </p>

          {features.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {features.map((f) => (
                <span
                  key={f}
                  className="rounded-full bg-rgr-navy/5 px-2.5 py-1 text-[11px] font-medium text-rgr-gray700"
                >
                  {f}
                </span>
              ))}
            </div>
          )}

          <div className="mt-4 flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
            {product.old_price ? (
              <span className="text-sm text-rgr-gray500 line-through">
                {product.old_price}
              </span>
            ) : null}
            <span className="font-display text-2xl tabular-nums tracking-tight text-rgr-blue">
              {price}
            </span>
            {savings ? (
              <span className="rounded-full bg-green-50 px-2 py-0.5 text-xs font-semibold text-green-700">
                {savings}
              </span>
            ) : null}
          </div>

          <div className="mt-auto pt-5">
            <Link
              href={`/products/${product.slug}`}
              className="inline-flex w-full items-center justify-center rounded-xl bg-rgr-navy px-6 py-3.5 font-display text-sm uppercase tracking-wider text-white transition duration-200 hover:bg-rgr-gold hover:text-rgr-navy active:scale-[0.98]"
            >
              Order Now →
            </Link>
          </div>
        </div>
      </article>
    </FadeInView>
  );
}
