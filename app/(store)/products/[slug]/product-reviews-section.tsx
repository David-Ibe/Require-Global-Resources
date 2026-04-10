import { createClient } from "@/lib/supabase/server";
import type { ReviewRow } from "@/lib/supabase/types";

import { ReviewCard } from "@/components/store/review-card";
import { FadeInView } from "@/components/fade-in-view";

const REVIEW_SELECT =
  "id, reviewer_name, verified, rating, reviewer_location, review_text, created_at";

export async function ProductReviewsSection({
  productId,
  productName
}: {
  productId: string;
  productName: string;
}) {
  const supabase = await createClient();
  const { data: reviewsData } = await supabase
    .from("reviews")
    .select(REVIEW_SELECT)
    .eq("product_id", productId)
    .order("created_at", { ascending: false });

  const reviews = (reviewsData ?? []) as ReviewRow[];

  return (
    <section className="border-t border-rgr-gray300/40 bg-rgr-surface py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <FadeInView>
          <h2 className="text-2xl font-semibold tracking-tight text-rgr-navy md:text-3xl">
            Reviews
          </h2>
        </FadeInView>
        {reviews.length === 0 ? (
          <p className="mt-10 text-sm text-rgr-gray500">
            Be the first to review this product.
          </p>
        ) : (
          <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {reviews.map((r) => (
              <ReviewCard key={r.id} review={r} productName={productName} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
