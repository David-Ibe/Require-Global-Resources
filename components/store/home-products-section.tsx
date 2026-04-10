import { ProductCardHome } from "@/components/store/product-card-home";
import { FadeInView } from "@/components/fade-in-view";
import { STATIC_FEATURED_PRODUCTS } from "@/lib/home-static-content";
import { fetchHomeProducts } from "@/lib/home-data";

export function HomeProductsHeading() {
  return (
    <FadeInView>
      <h2 className="text-3xl font-semibold tracking-tight text-rgr-navy md:text-4xl">
        Featured products
      </h2>
      <p className="mt-3 max-w-md text-[15px] leading-relaxed text-rgr-gray500 md:text-base">
        Verified quality, fast dispatch, and clean pricing.
      </p>
    </FadeInView>
  );
}

export function HomeProductsSkeleton() {
  return (
    <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3" aria-hidden>
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="overflow-hidden rounded-2xl bg-rgr-surface shadow-soft ring-1 ring-rgr-gray300/40"
        >
          <div className="aspect-[4/3] animate-pulse bg-rgr-gray100" />
          <div className="space-y-4 px-6 pb-7 pt-6">
            <div className="h-6 max-w-[88%] animate-pulse rounded bg-rgr-gray100" />
            <div className="h-8 w-28 animate-pulse rounded bg-rgr-gray100" />
            <div className="h-3.5 w-16 animate-pulse rounded bg-rgr-gray100" />
            <div className="h-11 animate-pulse rounded-lg bg-rgr-gray100" />
          </div>
        </div>
      ))}
    </div>
  );
}

export async function HomeProductsGrid() {
  const { products: loadedProducts, fetchError } = await fetchHomeProducts();
  const products = fetchError ? STATIC_FEATURED_PRODUCTS : loadedProducts;

  if (!fetchError && loadedProducts.length === 0) {
    return (
      <p className="mt-12 text-center text-rgr-gray700">
        More products coming soon. Follow @requireglobalresources
      </p>
    );
  }

  return (
    <>
      <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {products.map((p, i) => (
          <ProductCardHome key={p.id} product={p} index={i} />
        ))}
      </div>
      {fetchError ? (
        <p className="mt-8 text-center text-sm text-rgr-gray500">
          Showing featured items — reconnecting to catalog.
        </p>
      ) : null}
    </>
  );
}
