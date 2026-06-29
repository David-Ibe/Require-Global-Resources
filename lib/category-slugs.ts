/** Maps Supabase category slugs to storefront category slugs. */
const DB_CATEGORY_ALIASES: Record<string, string> = {
  "laptops-2-in-1s": "laptops",
  laptop: "laptops",
  laptops: "laptops",
  smartphones: "smartphones",
  smartphone: "smartphones",
  phones: "smartphones",
  "mobile-phones": "smartphones",
  audio: "audio",
  headphones: "audio",
  earbuds: "audio",
  wearables: "wearables",
  accessories: "accessories",
  gaming: "gaming",
  "office-equipment": "office-equipment",
};

export function normalizeStoreCategorySlug(dbSlug: string): string {
  const key = dbSlug.trim().toLowerCase();
  if (DB_CATEGORY_ALIASES[key]) return DB_CATEGORY_ALIASES[key];

  if (key.includes("laptop") || key.includes("2-in-1")) return "laptops";
  if (key.includes("phone") || key.includes("smartphone")) return "smartphones";
  if (key.includes("audio") || key.includes("headphone") || key.includes("earbud")) {
    return "audio";
  }
  if (key.includes("wearable") || key.includes("watch")) return "wearables";
  if (key.includes("gaming")) return "gaming";
  if (key.includes("access")) return "accessories";

  return key;
}

export function listingMatchesStoreCategory(
  listingCategory: string,
  storeCategorySlug: string
): boolean {
  return normalizeStoreCategorySlug(listingCategory) === storeCategorySlug;
}
