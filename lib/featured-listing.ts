import type { Listing } from "@/lib/electronics-listings";

export type CardLabel = "Featured" | "New Listing";

/** Honest card label — no fabricated popularity metrics. */
export function getCardLabel(
  listing: Listing,
  featuredSlug?: string | null
): CardLabel {
  if (featuredSlug && listing.slug === featuredSlug) return "Featured";
  return "New Listing";
}

function heroScore(listing: Listing): number {
  const name = listing.name.toLowerCase();

  if (/pro 14|latitude|xps|macbook|thinkpad|laptop/.test(name)) return 0;
  if (/mac mini|iphone|ipad/.test(name)) return 1;
  if (/tower|desktop|workstation/.test(name)) return 100;
  if (listing.category === "laptops") return 2;
  return 50;
}

/** Pick a broadly relevant hero product — laptop or Mac Mini, not niche desktops. */
export function pickFeaturedListing(listings: Listing[]): Listing | null {
  const available = listings.filter((l) => l.status === "available");
  if (available.length === 0) return null;

  const dellPro14 = available.find((l) => /dell.*pro\s*14/i.test(l.name));
  if (dellPro14) return dellPro14;

  const macPortable = available.find((l) => /mac mini|macbook/i.test(l.name));
  if (macPortable) return macPortable;

  return [...available].sort((a, b) => {
    const scoreDiff = heroScore(a) - heroScore(b);
    if (scoreDiff !== 0) return scoreDiff;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  })[0];
}
