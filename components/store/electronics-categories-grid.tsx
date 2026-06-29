import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import type { Listing } from "@/lib/electronics-listings";
import { getCategoryPlaceholderImage } from "@/lib/listing-placeholders";
import {
  fetchStoreCategories,
  type OsCategoryRow,
} from "@/lib/os-listings";

type Props = {
  listings: Listing[];
};

function categoryImage(
  slug: string,
  listings: Listing[]
): string {
  const listing = listings.find(
    (item) =>
      item.category === slug &&
      item.images[0] &&
      !item.images[0].includes("placeholders")
  );
  if (listing?.images[0]) return listing.images[0];
  return getCategoryPlaceholderImage(slug);
}

function categoryCount(slug: string, listings: Listing[]): number {
  return listings.filter((listing) => listing.category === slug).length;
}

export async function ElectronicsCategoriesGrid({ listings }: Props) {
  const categories: OsCategoryRow[] = await fetchStoreCategories();
  const visibleCategories = categories.filter(
    (category) => categoryCount(category.slug, listings) > 0
  );

  if (visibleCategories.length === 0) return null;

  return (
    <section className="animate-fade-in py-section-sm md:py-section">
      <Container>
        <h2 className="mb-14 text-section-title font-semibold tracking-tight text-neutral-950 md:mb-16">
          Categories
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {visibleCategories.map((category) => {
            const img = categoryImage(category.slug, listings);
            const count = categoryCount(category.slug, listings);

            return (
              <Link
                key={category.slug}
                href={`/listings?category=${category.slug}`}
                className="block"
              >
                <article className="card-hover group flex h-full flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white hover:border-neutral-300 hover:shadow-soft">
                  <div className="product-image-zoom relative aspect-[16/10] w-full overflow-hidden bg-neutral-50">
                    <Image
                      src={img}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="(max-width:768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="flex flex-1 flex-col px-6 py-6 md:px-7 md:py-7">
                    <h3 className="text-lg font-medium tracking-tight text-neutral-950">
                      {category.name}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-neutral-500">
                      {count} {count === 1 ? "listing" : "listings"} live now
                    </p>
                  </div>
                </article>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
