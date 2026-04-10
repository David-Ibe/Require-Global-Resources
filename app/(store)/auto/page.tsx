import type { Metadata } from "next";
import Link from "next/link";

import { FadeInView } from "@/components/fade-in-view";
import { ProductCardHome } from "@/components/store/product-card-home";
import { brand, siteUrl } from "@/lib/site-config";
import { createClient } from "@/lib/supabase/server";
import type { ProductRow } from "@/lib/supabase/types";

export const revalidate = 60;

export const metadata: Metadata = {
  title: `Car Accessories | ${brand.shortName}`,
  description:
    "Premium verified car accessories for the modern Nigerian driver. Delivered in 2–5 days. Pay on delivery.",
  openGraph: {
    title: `Car Accessories | ${brand.shortName}`,
    description:
      "Premium verified car accessories for the modern Nigerian driver. Delivered in 2–5 days.",
    url: `${siteUrl}/auto`,
  },
};

async function fetchCarProducts(): Promise<ProductRow[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("active", true)
      .order("created_at", { ascending: false });

    if (error || !data) return [];

    return (data as ProductRow[]).filter(
      (p) =>
        p.category === "Car Accessories" || p.category === "Bundle Deal"
    );
  } catch {
    return [];
  }
}

export default async function AutoPage() {
  const products = await fetchCarProducts();

  return (
    <div>
      <section className="bg-rgr-navy py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <FadeInView>
            <nav className="text-sm text-white/50">
              <Link href="/" className="hover:text-white">
                Home
              </Link>
              <span className="mx-2">→</span>
              <span className="text-rgr-gold">Car Accessories</span>
            </nav>
            <span className="mt-6 inline-block rounded-full bg-rgr-blue/20 px-4 py-1.5 text-sm font-medium text-rgr-gold">
              🚗 Car Accessories
            </span>
            <h1 className="mt-4 font-display text-4xl uppercase tracking-tight text-white md:text-5xl lg:text-6xl">
              Upgrade Your Ride.
            </h1>
            <p className="mt-4 max-w-lg text-base text-white/70 md:text-lg">
              Premium verified car accessories for the modern Nigerian driver.
            </p>
          </FadeInView>
        </div>
      </section>

      <section className="bg-[#F8F9FC] py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          {products.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {products.map((p, i) => (
                <ProductCardHome key={p.id} product={p} index={i} />
              ))}
            </div>
          ) : (
            <FadeInView>
              <div className="py-20 text-center">
                <p className="font-display text-2xl text-rgr-navy">
                  More car accessories coming soon.
                </p>
                <p className="mt-3 text-rgr-gray500">
                  Follow{" "}
                  <a
                    href="https://instagram.com/requireglobalresources"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-rgr-blue underline"
                  >
                    @requireglobalresources
                  </a>{" "}
                  to be the first to know.
                </p>
                <Link
                  href="/"
                  className="mt-8 inline-flex rounded-xl bg-rgr-gold px-8 py-3.5 font-display text-sm uppercase tracking-wider text-rgr-navy transition hover:bg-amber-400"
                >
                  ← Back to Store
                </Link>
              </div>
            </FadeInView>
          )}
        </div>
      </section>
    </div>
  );
}
