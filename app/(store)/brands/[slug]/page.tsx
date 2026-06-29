import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ElectronicsListingsGrid } from "@/components/store/electronics-listings-grid";
import { SectionHeader } from "@/components/store/section-header";
import { Container } from "@/components/ui/container";
import { getBrandBySlug, FEATURED_BRANDS } from "@/lib/brands";
import { defaultSiteTitle } from "@/lib/site-config";
import { fetchActiveListings } from "@/lib/os-listings";

type Props = {
  params: { slug: string };
};

export async function generateStaticParams() {
  return FEATURED_BRANDS.map((brand) => ({ slug: brand.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const brand = getBrandBySlug(params.slug);
  if (!brand) return { title: defaultSiteTitle };
  return {
    title: `${brand.name} | ${defaultSiteTitle}`,
    description: `Shop genuine ${brand.name} products — ${brand.tagline}. Require Certified with warranty.`,
  };
}

export default async function BrandPage({ params }: Props) {
  const brand = getBrandBySlug(params.slug);
  if (!brand) notFound();

  const allListings = await fetchActiveListings();
  const brandListings = allListings.filter(
    (l) =>
      l.brand.toLowerCase().includes(brand.name.toLowerCase()) ||
      l.name.toLowerCase().includes(brand.name.toLowerCase())
  );

  return (
    <div className="bg-page">
      <section className="hero-glow border-b border-border py-section-sm md:py-section">
        <Container>
          <nav className="mb-6 text-sm text-muted">
            <Link href="/brands" className="hover:text-neutral-900">
              Brands
            </Link>
            <span className="mx-2">/</span>
            <span className="text-neutral-900">{brand.name}</span>
          </nav>
          <h1 className="text-hero-title text-neutral-900">{brand.name}</h1>
          <p className="mt-4 max-w-2xl text-lg text-muted">{brand.tagline}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            {brand.products.map((product) => (
              <Link
                key={product.name}
                href={product.href}
                className="rounded-full border border-border bg-white px-4 py-2 text-sm font-medium text-neutral-800 transition hover:border-navy hover:text-navy"
              >
                {product.name}
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {brandListings.length > 0 ? (
        <ElectronicsListingsGrid
          listings={brandListings}
          heading={`${brand.name} Products`}
          subtitle="All items Require Certified with warranty included."
          ctaHref={`/listings?q=${encodeURIComponent(brand.name)}`}
          ctaLabel={`View all ${brand.name}`}
        />
      ) : (
        <section className="py-section-sm md:py-section">
          <Container className="text-center">
            <SectionHeader
              title={`${brand.name} coming soon`}
              subtitle="We're actively sourcing genuine products from this brand. Message us on WhatsApp to check availability."
              align="center"
            />
            <Link
              href={`/listings?q=${encodeURIComponent(brand.name)}`}
              className="text-sm font-medium text-navy hover:text-accent"
            >
              Search catalogue →
            </Link>
          </Container>
        </section>
      )}
    </div>
  );
}
