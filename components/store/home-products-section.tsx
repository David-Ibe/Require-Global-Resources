import { ProductCardHome } from "@/components/store/product-card-home";
import { FadeInView } from "@/components/fade-in-view";
import { STATIC_FEATURED_PRODUCTS } from "@/lib/home-static-content";
import { fetchHomeProducts } from "@/lib/home-data";

export function HomeProductsHeading() {
  return (
    <FadeInView>
      <p className="font-display text-sm uppercase tracking-[0.2em] text-rgr-blue">
        Best Sellers
      </p>
      <h2 className="mt-2 font-display text-3xl uppercase tracking-tight text-rgr-navy md:text-4xl">
        FEATURED PRODUCTS
      </h2>
      <p className="mt-3 max-w-md text-base text-rgr-gray500">
        Our most popular verified products — loved by Nigerian drivers.
      </p>
    </FadeInView>
  );
}

export function HomeProductsSkeleton() {
  return (
    <div
      className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3"
      aria-hidden
    >
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="overflow-hidden rounded-2xl bg-white shadow-soft ring-1 ring-rgr-gray300/40"
        >
          <div className="aspect-[4/3] animate-pulse bg-rgr-gray100" />
          <div className="space-y-4 px-6 pb-7 pt-6">
            <div className="h-6 max-w-[88%] animate-pulse rounded bg-rgr-gray100" />
            <div className="h-4 w-full animate-pulse rounded bg-rgr-gray100" />
            <div className="h-8 w-28 animate-pulse rounded bg-rgr-gray100" />
            <div className="h-12 animate-pulse rounded-xl bg-rgr-gray100" />
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
        More products coming soon. Follow{" "}
        <a
          href="https://instagram.com/requireglobalresources"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-rgr-blue underline underline-offset-2"
        >
          @requireglobalresources
        </a>
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
          Showing featured items &mdash; reconnecting to catalog.
        </p>
      ) : null}
    </>
  );
}
