import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ListingCard } from "@/components/store/listing-card";
import { ListingSpecifications } from "@/components/store/listing-specifications";
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

      <div className="bg-surface">
        <section className="animate-fade-in pb-6 pt-3 md:pb-8 md:pt-4">
          <Container className="max-w-7xl">
            <nav className="mb-3 flex flex-wrap items-center gap-2 text-xs text-quiet">
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

            <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(280px,22rem)] lg:gap-10 xl:grid-cols-[minmax(0,1.5fr)_minmax(300px,24rem)]">
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
                categoryLabel={categoryLabel}
                whatsappHref={whatsappHref}
              />
            </div>
          </Container>
        </section>

        <ProductMobileBar listing={listing} whatsappHref={whatsappHref} />

        <ListingSpecifications listing={listing} />

        {listing.conditionNote && (
          <section className="bg-page py-8 md:py-10">
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
          <section className="bg-surface py-8 md:py-10">
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
          <section className="bg-page py-8 md:py-10">
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
          <section className="bg-surface py-8 md:py-10">
            <Container>
              <div className="mb-8 flex items-end justify-between md:mb-10">
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
