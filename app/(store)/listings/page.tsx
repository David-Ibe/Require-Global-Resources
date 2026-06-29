import type { Metadata } from "next";
import { Suspense } from "react";

import { ListingsCatalog } from "@/components/store/listings-catalog";
import { brand, siteUrl } from "@/lib/site-config";
import { fetchActiveListings } from "@/lib/os-listings";

export const metadata: Metadata = {
  title: "Shop",
  description: `Browse live inventory from ${brand.shortName}`,
  alternates: { canonical: `${siteUrl}/listings` },
};

export const dynamic = "force-dynamic";

export default async function ListingsPage() {
  const listings = await fetchActiveListings();

  return (
    <div className="bg-page">
      <Suspense fallback={<div className="min-h-[60vh]" />}>
        <ListingsCatalog listings={listings} />
      </Suspense>
    </div>
  );
}
