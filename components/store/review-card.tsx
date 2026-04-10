import { Star } from "lucide-react";

import type { ReviewRow } from "@/lib/supabase/types";

export function ReviewCard({
  review,
  productName
}: {
  review: ReviewRow;
  productName?: string | null;
}) {
  const initials = review.reviewer_name
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <article className="flex h-full flex-col rounded-2xl border border-rgr-gray300/40 bg-rgr-surface p-6 shadow-soft">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-rgr-navy text-xs font-semibold text-white">
          {initials}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="font-semibold text-rgr-navy">{review.reviewer_name}</span>
            <span className="text-xs text-rgr-gray500">— {review.reviewer_location}</span>
            {review.verified ? (
              <span className="text-[11px] font-medium uppercase tracking-wide text-rgr-gray500">
                Verified
              </span>
            ) : null}
          </div>
          <div className="mt-1 flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < review.rating
                    ? "fill-rgr-navy text-rgr-navy"
                    : "text-rgr-gray300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
      <p className="mt-4 flex-1 text-sm leading-relaxed text-rgr-gray700">
        {review.review_text}
      </p>
      {productName ? (
        <p className="mt-4 border-t border-rgr-gray100 pt-4 text-xs text-rgr-gray500">
          Product purchased:{" "}
          <span className="font-medium text-rgr-navy">{productName}</span>
        </p>
      ) : null}
    </article>
  );
}
