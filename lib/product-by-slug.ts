import { cache } from "react";

import { createClient } from "@/lib/supabase/server";
import type { ProductRow } from "@/lib/supabase/types";

/** Deduplicates product fetches between generateMetadata and the page in one request. */
export const getCachedProductBySlug = cache(async (slug: string) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .eq("active", true)
    .maybeSingle();

  if (error) {
    return { product: null as ProductRow | null, error };
  }
  return { product: data as ProductRow | null, error: null };
});
