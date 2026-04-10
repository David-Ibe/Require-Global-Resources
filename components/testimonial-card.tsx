import { Star } from "@/components/icons";

type TestimonialCardProps = {
  name: string;
  location: string;
  rating: number;
  text: string;
};

export function TestimonialCard({
  name,
  location,
  rating,
  text
}: TestimonialCardProps) {
  return (
    <article className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm">
      <div className="mb-3 flex items-center gap-1">
        {Array.from({ length: rating }).map((_, idx) => (
          <Star key={idx} className="h-4 w-4 fill-amber-400 text-amber-400" />
        ))}
      </div>
      <p className="text-sm text-slate-700">
        &ldquo;{text}&rdquo;
      </p>
      <p className="mt-4 text-sm font-semibold text-brand-navy">{name}</p>
      <p className="text-xs text-slate-500">{location}</p>
    </article>
  );
}
