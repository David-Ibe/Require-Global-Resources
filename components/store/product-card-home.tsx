import Image from "next/image";
import Link from "next/link";

import type { ProductRow } from "@/lib/supabase/types";
import { homeProductTitle } from "@/lib/product-home-titles";

import { FadeInView } from "@/components/fade-in-view";

export function ProductCardHome({
  product,
  index
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

  return (
    <FadeInView delay={index * 60} className="h-full">
      <article className="flex h-full flex-col overflow-hidden rounded-2xl bg-rgr-surface shadow-soft ring-1 ring-rgr-gray300/40 transition hover:shadow-lift">
        <Link
          href={`/products/${product.slug}`}
          className="relative block aspect-[4/3] w-full overflow-hidden bg-[#f4f4f5]"
        >
          <Image
            src={img}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width:768px) 100vw, 33vw"
          />
        </Link>
        <div className="flex flex-1 flex-col px-6 pb-7 pt-6">
          <h3 className="line-clamp-2 text-lg font-semibold leading-snug tracking-tight text-rgr-navy">
            <Link
              href={`/products/${product.slug}`}
              className="hover:text-rgr-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rgr-navy/20"
            >
              {title}
            </Link>
          </h3>
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-rgr-gray700">
            {product.description}
          </p>
          <div className="mt-4 flex flex-wrap items-baseline gap-x-2 gap-y-1">
            {product.old_price ? (
              <span className="text-sm text-rgr-gray500 line-through">
                {product.old_price}
              </span>
            ) : null}
            <span className="text-2xl font-bold tabular-nums tracking-tight text-rgr-navy">
              {price}
            </span>
            {savings ? (
              <span className="text-xs font-medium text-rgr-gray600">({savings})</span>
            ) : null}
          </div>
          <div className="mt-6">
            <Link
              href={`/order/${product.slug}`}
              className="inline-flex w-full items-center justify-center rounded-lg bg-[#22C55E] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#16A34A]"
            >
              Order now
            </Link>
          </div>
        </div>
      </article>
    </FadeInView>
  );
}
