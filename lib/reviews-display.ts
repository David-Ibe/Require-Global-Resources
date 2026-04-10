import { STATIC_HOME_REVIEWS } from "@/lib/home-static-content";
import type { ReviewWithProduct } from "@/lib/home-data";

/** Ensures at least three reviews for the homepage when the database has fewer. */
export function mergeReviewsForHome(db: ReviewWithProduct[]): ReviewWithProduct[] {
  const out: ReviewWithProduct[] = [...db];
  if (out.length >= 3) {
    return out.slice(0, 6);
  }
  for (const s of STATIC_HOME_REVIEWS) {
    if (out.length >= 3) break;
    if (!out.some((r) => r.id === s.id)) {
      out.push(s);
    }
  }
  return out.slice(0, 6);
}
