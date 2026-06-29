import type { MetadataRoute } from "next";

import { siteUrl } from "@/lib/site-config";
import { fetchListingSlugs } from "@/lib/os-listings";
import { getSupabaseAnon } from "@/lib/supabase/server";

const STATIC_ROUTES = [
  "",
  "/listings",
  "/laptops",
  "/smartphones",
  "/audio",
  "/brands",
  "/business",
  "/sell",
  "/grading",
  "/faq",
  "/about",
  "/contact",
  "/returns",
  "/privacy-policy",
  "/terms",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = [...STATIC_ROUTES];

  const listingSlugs = await fetchListingSlugs();
  for (const slug of listingSlugs) {
    routes.push(`/listings/${slug}`);
  }

  try {
    const supabase = getSupabaseAnon();
    const { data: products } = await supabase
      .from("products")
      .select("slug")
      .eq("active", true)
      .order("created_at", { ascending: false });

    for (const product of products ?? []) {
      if (product.slug) routes.push(`/products/${product.slug}`);
    }
  } catch {
    // Keep static routes even when local env/database is unavailable.
  }

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1 : 0.8,
  }));
}
