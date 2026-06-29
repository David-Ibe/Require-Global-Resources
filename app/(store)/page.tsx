import { Suspense } from "react";

import { FeaturedProductHero } from "@/components/store/featured-product-hero";
import { ListingsCatalog } from "@/components/store/listings-catalog";
import { ShopByCategory } from "@/components/store/shop-by-category";
import { pickFeaturedListing } from "@/lib/featured-listing";
import { fetchActiveListings } from "@/lib/os-listings";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const listings = await fetchActiveListings();
  const featured = pickFeaturedListing(listings);

  return (
    <div className="bg-page">
      {featured && <FeaturedProductHero listing={featured} />}
      <ShopByCategory compact />
      <Suspense fallback={<div className="min-h-[60vh] bg-page" />}>
        <ListingsCatalog
          listings={listings}
          showHeader={false}
          showFilters={false}
          excludeSlug={featured?.slug}
          sectionTitle="All Products"
          className="bg-page"
        />
      </Suspense>
    </div>
  );
}
