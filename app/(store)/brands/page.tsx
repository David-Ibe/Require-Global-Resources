import type { Metadata } from "next";
import Link from "next/link";

import { BrandLogoWall } from "@/components/store/brand-logo-wall";
import { SectionHeader } from "@/components/store/section-header";
import { Container } from "@/components/ui/container";
import { FEATURED_BRANDS } from "@/lib/brands";
import { defaultSiteTitle } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `Brands | ${defaultSiteTitle}`,
  description:
    "Shop genuine technology from Apple, Dell, Lenovo, HP, Samsung, Sony and more — all Require Certified.",
};

export default function BrandsPage() {
  return (
    <div className="bg-page">
      <section className="hero-glow border-b border-border py-section-sm md:py-section">
        <Container className="max-w-3xl text-center">
          <h1 className="text-hero-title text-neutral-900">Shop by brand</h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            Every brand we carry is sourced through verified suppliers and backed by
            warranty. Browse by the names you trust.
          </p>
          <div className="mt-12">
            <BrandLogoWall compact />
          </div>
        </Container>
      </section>

      <section className="py-section-sm md:py-section">
        <Container>
          <SectionHeader
            title="All brands"
            subtitle="Click a brand to explore available products."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURED_BRANDS.map((brand) => (
              <Link
                key={brand.slug}
                href={brand.href}
                className="group card-hover rounded-xl border border-border bg-white p-7"
              >
                <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 group-hover:text-navy">
                  {brand.name}
                </h2>
                <p className="mt-2 text-sm text-muted">{brand.tagline}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {brand.products.map((product) => (
                    <li key={product.name}>
                      <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs text-neutral-700">
                        {product.name}
                      </span>
                    </li>
                  ))}
                </ul>
                <span className="mt-6 inline-block text-sm font-medium text-navy group-hover:text-accent">
                  Explore {brand.name} →
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
