import type { Listing } from "@/lib/electronics-listings";

/** Pick the most showcase-worthy available listing for the homepage hero. */
export function pickFeaturedListing(listings: Listing[]): Listing | null {
  const available = listings.filter((l) => l.status === "available");
  if (available.length === 0) return null;

  const withBadge = available.find((l) => l.badge);
  if (withBadge) return withBadge;

  return [...available].sort((a, b) => b.askingPriceNGN - a.askingPriceNGN)[0];
}
