import { Star } from "@/components/icons";
import { Container } from "@/components/ui/container";
import { CUSTOMER_REVIEWS } from "@/lib/home-content";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < rating ? "fill-accent text-accent" : "text-neutral-200"}`}
        />
      ))}
    </div>
  );
}

export function CustomerReviews() {
  const reviews = CUSTOMER_REVIEWS.slice(0, 3);

  return (
    <section className="border-t border-border bg-white py-14 md:py-16" aria-label="Customer reviews">
      <Container>
        <div className="grid gap-6 md:grid-cols-3">
          {reviews.map((review) => (
            <blockquote key={review.name} className="flex flex-col">
              <StarRating rating={review.rating} />
              <p className="mt-4 flex-1 text-sm leading-relaxed text-neutral-700">
                &ldquo;{review.text}&rdquo;
              </p>
              <footer className="mt-5">
                <cite className="not-italic">
                  <span className="text-sm font-medium text-neutral-900">{review.name}</span>
                  <span className="mt-0.5 block text-xs text-muted">
                    {review.role} · {review.location}
                  </span>
                </cite>
              </footer>
            </blockquote>
          ))}
        </div>
      </Container>
    </section>
  );
}
