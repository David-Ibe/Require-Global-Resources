import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ListingCard } from "@/components/store/listing-card";
import {
  ProductMobileBar,
  ProductPurchasePanel,
} from "@/components/store/product-purchase-panel";
import { ProductGallery } from "@/components/store/product-gallery";
import { Container } from "@/components/ui/container";
import { formatNgn, type Listing } from "@/lib/electronics-listings";
import { getCategoryLabel } from "@/lib/electronics-categories";
import { getListingConfiguration } from "@/lib/listing-search";
import {
  fetchActiveListings,
  fetchListingBySlug,
} from "@/lib/os-listings";
import { brand, getWhatsAppLink, siteUrl } from "@/lib/site-config";

type Props = { params: { slug: string } };

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const listing = await fetchListingBySlug(params.slug);
  if (!listing) {
    return { title: `Listing not found | ${brand.shortName}` };
  }
  const title = `${listing.name} — ${formatNgn(listing.askingPriceNGN)}`;
  return {
    title,
    description: `${listing.condition}. ${listing.headline}. ${formatNgn(
      listing.askingPriceNGN
    )}. Order on WhatsApp.`,
    alternates: { canonical: `${siteUrl}/listings/${listing.slug}` },
    openGraph: {
      title,
      description: listing.description.slice(0, 200),
      url: `${siteUrl}/listings/${listing.slug}`,
      images: listing.images[0]
        ? [{ url: listing.images[0], width: 1200, height: 630 }]
        : ["/og-default.svg"],
    },
  };
}

function buildListingJsonLd(listing: Listing) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: listing.name,
    description: listing.description,
    brand: { "@type": "Brand", name: listing.brand },
    image: listing.images[0]
      ? `${siteUrl}${listing.images[0]}`
      : `${siteUrl}/og-default.svg`,
    itemCondition: "https://schema.org/NewCondition",
    offers: {
      "@type": "Offer",
      url: `${siteUrl}/listings/${listing.slug}`,
      priceCurrency: "NGN",
      price: listing.askingPriceNGN,
      availability:
        listing.status === "available"
          ? "https://schema.org/InStock"
          : listing.status === "reserved"
            ? "https://schema.org/LimitedAvailability"
            : "https://schema.org/SoldOut",
      seller: { "@type": "Organization", name: brand.name },
    },
  };
}

export default async function ListingDetailPage({ params }: Props) {
  const listing = await fetchListingBySlug(params.slug);
  if (!listing) notFound();

  const categoryLabel = getCategoryLabel(listing.category);
  const config = getListingConfiguration(listing);
  const activeListings = await fetchActiveListings();
  const related = activeListings
    .filter((item) => item.slug !== listing.slug && item.status !== "sold")
    .slice(0, 3);

  const whatsappHref = getWhatsAppLink(
    `Hi ${brand.shortName}, I want to order the ${listing.name} listed at ${formatNgn(
      listing.askingPriceNGN
    )}. What's the next step?`
  );

  const jsonLd = buildListingJsonLd(listing);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="bg-page">
        <Container className="py-4">
          <nav className="flex flex-wrap items-center gap-2 text-xs text-quiet">
            <Link href="/" className="hover:text-navy">
              Home
            </Link>
            <span>/</span>
            <Link href="/listings" className="hover:text-navy">
              Shop
            </Link>
            <span>/</span>
            <Link
              href={`/listings?category=${listing.category}`}
              className="hover:text-navy"
            >
              {categoryLabel}
            </Link>
          </nav>
        </Container>

        <section className="animate-fade-in bg-surface py-10 md:py-16">
          <Container>
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
              <ProductGallery
                images={listing.images}
                alt={listing.name}
                category={listing.category}
                videoUrl={listing.inspectionVideoUrl || undefined}
                videoPoster={listing.inspectionVideoPoster}
              />

              <ProductPurchasePanel
                listing={listing}
                config={config}
                whatsappHref={whatsappHref}
              />
            </div>
          </Container>
        </section>

        <ProductMobileBar listing={listing} whatsappHref={whatsappHref} />

        <section className="bg-page py-section-sm md:py-section">
          <Container className="max-w-3xl">
            <h2 className="text-section-title text-navy">
              Overview
            </h2>
            <p className="mt-6 text-[15px] leading-relaxed text-neutral-700">
              {listing.description}
            </p>
          </Container>
        </section>

        {listing.specs.length > 0 && (
          <section className="bg-surface py-section-sm md:py-section">
            <Container className="max-w-3xl">
              <h2 className="text-section-title text-navy">
                Specifications
              </h2>
              <dl className="mt-8 divide-y divide-border">
                {listing.specs.map((spec) => (
                  <div
                    key={spec.label}
                    className="grid grid-cols-2 gap-4 py-4 text-sm first:pt-0"
                  >
                    <dt className="text-muted">{spec.label}</dt>
                    <dd className="text-navy">{spec.value}</dd>
                  </div>
                ))}
              </dl>
            </Container>
          </section>
        )}

        {listing.conditionNote && (
          <section className="bg-page py-section-sm md:py-section">
            <Container className="max-w-3xl">
              <h2 className="text-section-title text-navy">
                Condition
              </h2>
              <p className="mt-6 text-[15px] leading-relaxed text-neutral-700">
                {listing.conditionNote}
              </p>
              {listing.proof.length > 0 && (
                <ul className="mt-6 space-y-3">
                  {listing.proof.map((proof) => (
                    <li
                      key={proof.label}
                      className="text-sm leading-relaxed text-neutral-600"
                    >
                      <span className="font-medium text-neutral-900">
                        {proof.label}.
                      </span>{" "}
                      {proof.detail}
                    </li>
                  ))}
                </ul>
              )}
            </Container>
          </section>
        )}

        {listing.disclosures.length > 0 && (
          <section className="bg-surface py-section-sm md:py-section">
            <Container className="max-w-3xl">
              <h2 className="text-section-title text-navy">
                Shipping
              </h2>
              <ul className="mt-6 space-y-3">
                {listing.disclosures.map((disclosure) => (
                  <li
                    key={disclosure}
                    className="text-sm leading-relaxed text-neutral-600"
                  >
                    {disclosure}
                  </li>
                ))}
              </ul>
            </Container>
          </section>
        )}

        {listing.faq.length > 0 && (
          <section className="bg-page py-section-sm md:py-section">
            <Container className="max-w-3xl">
              <h2 className="text-section-title text-navy">
                FAQ
              </h2>
              <div className="mt-8 divide-y divide-border">
                {listing.faq.map((item) => (
                  <details key={item.q} className="group py-5">
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-left text-base font-medium text-neutral-900">
                      {item.q}
                      <span className="shrink-0 text-neutral-400 transition group-open:rotate-45">
                        +
                      </span>
                    </summary>
                    <p className="mt-3 pr-8 text-sm leading-relaxed text-neutral-600">
                      {item.a}
                    </p>
                  </details>
                ))}
              </div>
            </Container>
          </section>
        )}

        {related.length > 0 && (
          <section className="bg-surface py-section-sm md:py-section">
            <Container>
              <div className="mb-14 flex items-end justify-between md:mb-16">
                <h2 className="text-section-title text-navy">
                  Related
                </h2>
                <Link
                  href="/listings"
                  className="link-accent text-sm font-medium"
                >
                  View all →
                </Link>
              </div>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((item) => (
                  <ListingCard key={item.slug} listing={item} />
                ))}
              </div>
            </Container>
          </section>
        )}
      </div>
    </>
  );
}
