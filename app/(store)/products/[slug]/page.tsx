import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { ProductPageClient } from "@/components/product/product-page-client";
import { ProductViewTracker } from "@/components/product-view-tracker";
import { brand, siteUrl } from "@/lib/site-config";
import { getCachedProductBySlug } from "@/lib/product-by-slug";

import { ProductRelatedSection } from "./product-related-section";
import { ProductReviewsSection } from "./product-reviews-section";

type Props = { params: { slug: string } };

/** Cache product HTML at the edge; content updates within ~1 min. */
export const revalidate = 60;

function RelatedFallback() {
  return (
    <section
      className="border-t border-rgr-gray300/40 bg-[#fafafa] py-20 md:py-24"
      aria-hidden
    >
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <div className="h-8 w-44 max-w-full animate-pulse rounded bg-rgr-gray200" />
        <div className="mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-[22rem] animate-pulse rounded-2xl bg-rgr-gray200/80"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ReviewsFallback() {
  return (
    <section
      className="border-t border-rgr-gray300/40 bg-rgr-surface py-20 md:py-24"
      aria-hidden
    >
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <div className="h-8 w-32 max-w-full animate-pulse rounded bg-rgr-gray200" />
        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[0, 1].map((i) => (
            <div
              key={i}
              className="h-56 animate-pulse rounded-2xl bg-rgr-gray200/80"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params;
  const { product } = await getCachedProductBySlug(slug);

  if (!product) {
    return { title: `Product | ${brand.shortName}` };
  }

  const title = `${product.name} | ${brand.shortName}`;
  const img = product.images?.[0];

  return {
    title,
    description: product.description.slice(0, 160),
    openGraph: {
      title,
      description: product.description.slice(0, 200),
      url: `${siteUrl}/products/${slug}`,
      images: img ? [{ url: img, width: 1200, height: 630 }] : ["/og-default.svg"]
    }
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = params;
  const { product, error } = await getCachedProductBySlug(slug);

  if (error || !product) {
    notFound();
  }

  const options = Array.isArray(product.pricing_options)
    ? product.pricing_options
    : [];
  const firstPrice =
    (options[0] as { price?: string })?.price ?? product.current_price;

  return (
    <>
      <ProductViewTracker productName={product.name} price={firstPrice} />
      <ProductPageClient product={product} />
      <Suspense fallback={<RelatedFallback />}>
        <ProductRelatedSection slug={slug} />
      </Suspense>
      <Suspense fallback={<ReviewsFallback />}>
        <ProductReviewsSection productId={product.id} productName={product.name} />
      </Suspense>
    </>
  );
}
