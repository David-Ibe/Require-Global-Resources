import { unstable_noStore as noStore } from "next/cache";

import { getSupabaseServiceRole } from "@/lib/supabase/admin";
import { getSupabaseAnon } from "@/lib/supabase/server";

/** Server-side Supabase client for public storefront reads. Prefers service role (bypasses RLS). */
export function getStoreSupabase() {
  noStore();

  try {
    return getSupabaseServiceRole();
  } catch {
    return getSupabaseAnon();
  }
}
