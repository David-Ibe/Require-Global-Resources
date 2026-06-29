import type { Listing, ListingCondition } from "@/lib/electronics-listings";

export type SortOption = "newest" | "price-asc" | "price-desc" | "popular";

export type ListingFilters = {
  q?: string;
  category?: string;
  brand?: string;
  condition?: ListingCondition | "";
  minPrice?: number;
  maxPrice?: number;
  ram?: string;
  storage?: string;
  processor?: string;
  availability?: "available" | "reserved" | "all";
  sort?: SortOption;
};

function specValue(listing: Listing, ...labels: string[]): string {
  const hit = listing.specs.find((s) =>
    labels.some((l) => s.label.toLowerCase().includes(l.toLowerCase()))
  );
  return hit?.value ?? "";
}

export function getListingRam(listing: Listing): string {
  return specValue(listing, "memory", "ram");
}

export function getListingStorage(listing: Listing): string {
  return specValue(listing, "storage");
}

export function getListingProcessor(listing: Listing): string {
  return specValue(listing, "processor", "chip");
}

/** Configuration line for product cards — e.g. "16GB · 512GB · Core Ultra 7" */
export function getListingConfiguration(listing: Listing): string {
  const parts = [
    getListingRam(listing),
    getListingStorage(listing),
    getListingProcessor(listing),
  ].filter(Boolean);
  if (parts.length > 0) return parts.join(" · ");
  return listing.headline;
}

export function getUniqueFilterOptions(listings: Listing[]) {
  const brands = new Set<string>();
  const rams = new Set<string>();
  const storages = new Set<string>();
  const processors = new Set<string>();

  for (const l of listings) {
    brands.add(l.brand);
    const ram = getListingRam(l);
    const storage = getListingStorage(l);
    const proc = getListingProcessor(l);
    if (ram) rams.add(ram);
    if (storage) storages.add(storage);
    if (proc) processors.add(proc);
  }

  return {
    brands: [...brands].sort(),
    rams: [...rams].sort(),
    storages: [...storages].sort(),
    processors: [...processors].sort(),
    conditions: [
      "New Sealed",
      "New Open Box",
      "Used - Grade A",
      "Used - Grade B",
    ] as ListingCondition[],
  };
}

export function filterListings(
  listings: Listing[],
  filters: ListingFilters
): Listing[] {
  let result = [...listings];

  const q = filters.q?.trim().toLowerCase();
  if (q) {
    result = result.filter((l) => {
      const haystack = [
        l.name,
        l.headline,
        l.brand,
        l.description,
        ...l.specs.map((s) => `${s.label} ${s.value}`),
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }

  if (filters.category) {
    result = result.filter((l) => l.category === filters.category);
  }

  if (filters.brand) {
    result = result.filter((l) => l.brand === filters.brand);
  }

  if (filters.condition) {
    result = result.filter((l) => l.condition === filters.condition);
  }

  if (filters.minPrice != null && filters.minPrice > 0) {
    result = result.filter((l) => l.askingPriceNGN >= filters.minPrice!);
  }

  if (filters.maxPrice != null && filters.maxPrice > 0) {
    result = result.filter((l) => l.askingPriceNGN <= filters.maxPrice!);
  }

  if (filters.ram) {
    result = result.filter((l) => getListingRam(l) === filters.ram);
  }

  if (filters.storage) {
    result = result.filter((l) => getListingStorage(l) === filters.storage);
  }

  if (filters.processor) {
    result = result.filter((l) => getListingProcessor(l) === filters.processor);
  }

  if (filters.availability === "available") {
    result = result.filter((l) => l.status === "available");
  } else if (filters.availability === "reserved") {
    result = result.filter((l) => l.status === "reserved");
  }

  const sort = filters.sort ?? "newest";
  result.sort((a, b) => {
    switch (sort) {
      case "price-asc":
        return a.askingPriceNGN - b.askingPriceNGN;
      case "price-desc":
        return b.askingPriceNGN - a.askingPriceNGN;
      case "popular":
        return (a.badge ? 1 : 0) - (b.badge ? 1 : 0) || b.askingPriceNGN - a.askingPriceNGN;
      case "newest":
      default:
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });

  return result;
}
