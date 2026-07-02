import type {
  Listing,
  ListingCondition,
  RecentSale,
} from "@/lib/electronics-listings";
import { normalizeStoreCategorySlug } from "@/lib/category-slugs";
import { parseListingSpecField } from "@/lib/listing-spec-parser";
import { getStoreSupabase } from "@/lib/supabase/store";

export type OsCategoryRow = {
  id: string;
  name: string;
  slug: string;
};

export type OsListingRow = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  spec: string | null;
  price: number;
  condition: string;
  source: string;
  status: string;
  images: string[] | null;
  whatsapp_link: string | null;
  sold_at: string | null;
  created_at: string;
  updated_at: string;
  category: OsCategoryRow | null;
};

const LISTING_SELECT = "*, category:categories(id, name, slug)";

function inferBrand(title: string): string {
  const brands = [
    "Apple",
    "Dell",
    "ThinkPad",
    "Lenovo",
    "Samsung",
    "Sony",
    "Bose",
    "Google",
    "HP",
    "Asus",
    "Microsoft",
    "iPhone",
    "MacBook",
  ];

  const normalized = title.toLowerCase();
  for (const brand of brands) {
    if (normalized.includes(brand.toLowerCase())) {
      return brand === "iPhone" || brand === "MacBook" ? "Apple" : brand;
    }
  }

  return title.split(/\s+/)[0] || "General";
}

function mapStatus(status: string): Listing["status"] {
  switch (status) {
    case "Sold":
      return "sold";
    case "Pending":
      return "reserved";
    default:
      return "available";
  }
}

export function mapOsListing(row: OsListingRow): Listing {
  const rawCategorySlug = row.category?.slug ?? "general-merchandise";
  const categorySlug = normalizeStoreCategorySlug(rawCategorySlug);

  return {
    slug: row.slug,
    name: row.title,
    headline:
      row.spec?.split("·")[0]?.trim() ||
      row.category?.name ||
      row.title,
    category: categorySlug,
    brand: inferBrand(row.title),
    condition: row.condition as ListingCondition,
    sourceMarket: row.source,
    serialMasked: "Available on request",
    availability:
      row.status === "Sold"
        ? "Sold"
        : row.status === "Pending"
          ? "Reserved — enquire on WhatsApp"
          : "1 unit available",
    askingPriceNGN: row.price,
    description: row.description || row.spec || row.title,
    specs: parseListingSpecField(row.spec),
    proof: [],
    disclosures: [],
    images: row.images?.length ? row.images : [],
    status: mapStatus(row.status),
    createdAt: row.created_at,
    trustScore: {
      source: 0,
      condition: 0,
      battery: 0,
      serial: 0,
      accessories: 0,
      packaging: 0,
    },
    verificationReport: [],
    inspector: "Require Global",
    inspectionDate: row.updated_at.slice(0, 10),
    faq: [],
  };
}

export async function fetchActiveListings(): Promise<Listing[]> {
  try {
    const supabase = getStoreSupabase();
    const { data, error } = await supabase
      .from("listings")
      .select(LISTING_SELECT)
      .eq("status", "Active")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("[fetchActiveListings]", error.message);
      return [];
    }
    if (!data) return [];
    return (data as OsListingRow[]).map(mapOsListing);
  } catch (err) {
    console.error("[fetchActiveListings]", err);
    return [];
  }
}

export async function fetchListingBySlug(slug: string): Promise<Listing | null> {
  try {
    const supabase = getStoreSupabase();
    const { data, error } = await supabase
      .from("listings")
      .select(LISTING_SELECT)
      .eq("slug", slug)
      .in("status", ["Active", "Sold"])
      .maybeSingle();

    if (error || !data) return null;
    return mapOsListing(data as OsListingRow);
  } catch {
    return null;
  }
}

export async function fetchListingsByCategorySlug(
  categorySlug: string
): Promise<Listing[]> {
  const listings = await fetchActiveListings();
  const normalized = normalizeStoreCategorySlug(categorySlug);
  return listings.filter((listing) => listing.category === normalized);
}

export async function fetchListingSlugs(): Promise<string[]> {
  try {
    const supabase = getStoreSupabase();
    const { data, error } = await supabase
      .from("listings")
      .select("slug")
      .in("status", ["Active", "Sold"])
      .order("created_at", { ascending: false });

    if (error || !data) return [];
    return data.map((row) => row.slug);
  } catch {
    return [];
  }
}

export async function fetchStoreCategories(): Promise<OsCategoryRow[]> {
  try {
    const supabase = getStoreSupabase();
    const { data, error } = await supabase
      .from("categories")
      .select("id, name, slug")
      .order("name");

    if (error || !data) return [];
    return data;
  } catch {
    return [];
  }
}

export async function fetchRecentSales(limit = 5): Promise<RecentSale[]> {
  try {
    const supabase = getStoreSupabase();
    const { data, error } = await supabase
      .from("listings")
      .select("title, sold_at, category:categories(slug)")
      .eq("status", "Sold")
      .not("sold_at", "is", null)
      .order("sold_at", { ascending: false })
      .limit(limit);

    if (error || !data) return [];

    type SoldRow = {
      title: string;
      sold_at: string;
      category: { slug: string } | null;
    };

    return (data as SoldRow[]).map((row) => {
      const soldAt = new Date(row.sold_at);
      const soldDaysAgo = Math.max(
        1,
        Math.floor((Date.now() - soldAt.getTime()) / (1000 * 60 * 60 * 24))
      );

      return {
        productName: row.title,
        category: row.category?.slug ?? "general-merchandise",
        buyerCity: "Nigeria",
        soldDaysAgo,
      };
    });
  } catch {
    return [];
  }
}
