import { FeaturedProductHero } from "@/components/store/featured-product-hero";
import { ElectronicsListingsGrid } from "@/components/store/electronics-listings-grid";
import { ShopByCategory } from "@/components/store/shop-by-category";
import { pickFeaturedListing } from "@/lib/featured-listing";
import { filterListings } from "@/lib/listing-search";
import { fetchActiveListings } from "@/lib/os-listings";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const listings = await fetchActiveListings();
  const featured = pickFeaturedListing(listings);

  const gridListings = filterListings(
    listings.filter((listing) => listing.status !== "sold"),
    { availability: "available", sort: "newest" }
  ).filter((listing) => listing.slug !== featured?.slug);

  return (
    <div className="bg-page">
      {featured && <FeaturedProductHero listing={featured} />}
      <ShopByCategory compact />
      <ElectronicsListingsGrid
        listings={gridListings}
        heading="All Products"
        subtitle={`${gridListings.length} ${gridListings.length === 1 ? "product" : "products"} available`}
        ctaHref="/listings"
        ctaLabel="Refine search"
        className="bg-page"
      />
    </div>
  );
}
