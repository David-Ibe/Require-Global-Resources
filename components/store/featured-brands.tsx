import Link from "next/link";

import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/store/section-header";
import { FEATURED_BRANDS } from "@/lib/brands";

export function FeaturedBrands() {
  return (
    <section className="bg-page py-section-sm md:py-section" aria-labelledby="featured-brands">
      <Container>
        <SectionHeader
          title="Featured brands"
          subtitle="Shop by the brands you trust — each product verified and warranty-backed."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {FEATURED_BRANDS.map((brand) => (
            <Link
              key={brand.slug}
              href={brand.href}
              className="group card-hover flex flex-col rounded-xl border border-border bg-white p-6"
            >
              <h3 className="text-xl font-semibold tracking-tight text-neutral-900 group-hover:text-navy">
                {brand.name}
              </h3>
              <p className="mt-1 text-sm text-muted">{brand.tagline}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {brand.products.slice(0, 4).map((product) => (
                  <li key={product.name}>
                    <span className="rounded-full bg-neutral-100 px-2.5 py-1 text-xs text-neutral-700">
                      {product.name}
                    </span>
                  </li>
                ))}
              </ul>
              <span className="mt-auto pt-5 text-sm font-medium text-navy group-hover:text-accent">
                Explore →
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/brands"
            className="text-sm font-medium text-navy hover:text-accent"
          >
            View all brands →
          </Link>
        </div>
      </Container>
    </section>
  );
}
