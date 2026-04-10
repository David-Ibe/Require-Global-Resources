import { createClient } from "@/lib/supabase/server";
import type { ProductRow, ReviewRow } from "@/lib/supabase/types";

export async function fetchHomeProducts(): Promise<{
  products: ProductRow[];
  fetchError: boolean;
}> {
  try {
    const supabase = await createClient();
    const pRes = await supabase
      .from("products")
      .select("*")
      .eq("active", true)
      .order("created_at", { ascending: false });

    if (pRes.error) {
      return { products: [], fetchError: true };
    }

    return {
      products: (pRes.data ?? []) as ProductRow[],
      fetchError: false
    };
  } catch {
    return { products: [], fetchError: true };
  }
}

export type ReviewWithProduct = ReviewRow & { product_name?: string | null };

export async function fetchHomeReviews(): Promise<ReviewWithProduct[]> {
  try {
    const supabase = await createClient();
    const rRes = await supabase
      .from("reviews")
      .select(
        `
          *,
          products ( name )
        `
      )
      .is("product_id", null)
      .order("created_at", { ascending: false });

    if (rRes.error) {
      return [];
    }

    let reviews: ReviewWithProduct[] = (rRes.data ?? []).map(
      (row: ReviewRow & { products?: { name: string } | null }) => ({
        ...row,
        product_name: row.products?.name ?? null
      })
    );

    if (reviews.length === 0) {
      const fallback = await supabase
        .from("reviews")
        .select(
          `
          *,
          products ( name )
        `
        )
        .order("created_at", { ascending: false })
        .limit(12);
      if (fallback.data?.length) {
        reviews = fallback.data.map(
          (row: ReviewRow & { products?: { name: string } | null }) => ({
            ...row,
            product_name: row.products?.name ?? null
          })
        );
      }
    }

    return reviews;
  } catch {
    return [];
  }
}
