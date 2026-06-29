import type { Metadata } from "next";
import { Suspense } from "react";

import { ListingsCatalog } from "@/components/store/listings-catalog";
import { filterListings, parseListingFilters } from "@/lib/listing-search";
import { brand, siteUrl } from "@/lib/site-config";
import { fetchActiveListings } from "@/lib/os-listings";

export const metadata: Metadata = {
  title: "Shop",
  description: `Browse live inventory from ${brand.shortName}`,
  alternates: { canonical: `${siteUrl}/listings` },
};

export const dynamic = "force-dynamic";

type Props = {
  searchParams: Record<string, string | string[] | undefined>;
};

export default async function ListingsPage({ searchParams }: Props) {
  const listings = await fetchActiveListings();
  const filters = parseListingFilters(searchParams);
  const filteredListings = filterListings(
    listings.filter((listing) => listing.status !== "sold"),
    filters
  );

  return (
    <div className="bg-page">
      <Suspense fallback={<div className="min-h-[60vh]" />}>
        <ListingsCatalog
          listings={listings}
          filteredListings={filteredListings}
        />
      </Suspense>
    </div>
  );
}
