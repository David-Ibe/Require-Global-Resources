import type { MetadataRoute } from "next";

import { siteUrl } from "@/lib/site-config";
import { getSupabaseAnon } from "@/lib/supabase/server";

const STATIC_ROUTES = [
  "",
  "/auto",
  "/home",
  "/about",
  "/contact",
  "/returns",
  "/privacy-policy",
  "/terms"
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = [...STATIC_ROUTES];

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
    priority: route === "" ? 1 : 0.8
  }));
}
