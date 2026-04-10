import { Star } from "lucide-react";

import type { ReviewRow } from "@/lib/supabase/types";

const gradients = [
  "from-rgr-blue to-rgr-navy",
  "from-rgr-gold to-amber-600",
  "from-green-500 to-emerald-700",
  "from-purple-500 to-indigo-700",
  "from-pink-500 to-rose-700",
];

function avatarGradient(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return gradients[Math.abs(hash) % gradients.length];
}

export function ReviewCard({
  review,
  productName,
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

  const gradient = avatarGradient(review.reviewer_name);

  return (
    <article className="flex h-full flex-col rounded-2xl border border-rgr-gray300/40 bg-white p-6 shadow-soft transition duration-300 hover:-translate-y-0.5 hover:shadow-lift">
      <div className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < review.rating
                ? "fill-rgr-gold text-rgr-gold"
                : "text-rgr-gray300"
            }`}
          />
        ))}
      </div>

      <p className="mt-4 flex-1 text-sm italic leading-relaxed text-rgr-gray700">
        &ldquo;{review.review_text}&rdquo;
      </p>

      <div className="mt-6 flex items-center gap-3 border-t border-rgr-gray100 pt-5">
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${gradient} text-xs font-bold text-white`}
        >
          {initials}
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-rgr-navy">
              {review.reviewer_name}
            </span>
            {review.verified && (
              <span className="rounded-full bg-green-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-green-700">
                ✅ Verified Buyer
              </span>
            )}
          </div>
          <span className="text-xs text-rgr-gray500">
            {review.reviewer_location}
          </span>
        </div>
      </div>

      {productName ? (
        <p className="mt-3 text-xs text-rgr-gray500">
          Purchased:{" "}
          <span className="rounded-full bg-rgr-blue/10 px-2 py-0.5 font-medium text-rgr-blue">
            {productName}
          </span>
        </p>
      ) : null}
    </article>
  );
}
