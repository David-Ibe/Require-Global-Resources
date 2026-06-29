import { Suspense } from "react";

import { ListingsCatalog } from "@/components/store/listings-catalog";
import { ShopByCategory } from "@/components/store/shop-by-category";
import { fetchActiveListings } from "@/lib/os-listings";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const listings = await fetchActiveListings();

  return (
    <div className="bg-page">
      <ShopByCategory compact className="bg-page" />
      <Suspense fallback={<div className="min-h-[60vh] bg-surface" />}>
        <ListingsCatalog listings={listings} showHeader={false} className="bg-surface" />
      </Suspense>
    </div>
  );
}
