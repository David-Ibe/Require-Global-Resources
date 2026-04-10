import { createClient } from "@/lib/supabase/server";
import type { ProductRow } from "@/lib/supabase/types";

import { ProductCardHome } from "@/components/store/product-card-home";
import { FadeInView } from "@/components/fade-in-view";

const RELATED_SELECT =
  "id, slug, name, images, pricing_options, current_price, old_price, created_at";

export async function ProductRelatedSection({ slug }: { slug: string }) {
  const supabase = await createClient();
  const { data: relatedRows } = await supabase
    .from("products")
    .select(RELATED_SELECT)
    .eq("active", true)
    .neq("slug", slug)
    .order("created_at", { ascending: true })
    .limit(4);

  const related = (relatedRows ?? []) as ProductRow[];
  if (related.length === 0) return null;

  return (
    <section className="border-t border-rgr-gray300/40 bg-[#fafafa] py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <FadeInView>
          <h2 className="text-2xl font-semibold tracking-tight text-rgr-navy md:text-3xl">
            More products
          </h2>
          <p className="mt-3 max-w-md text-[15px] text-rgr-gray600 md:text-base">
            Verified and ready to ship.
          </p>
        </FadeInView>
        <div className="mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {related.map((p, i) => (
            <ProductCardHome key={p.id} product={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
