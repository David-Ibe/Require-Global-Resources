import Link from "next/link";

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { ElectronicsListingsGrid } from "@/components/store/electronics-listings-grid";
import type { Listing } from "@/lib/electronics-listings";
import {
  getCategoryBySlug,
  type ElectronicsCategory,
} from "@/lib/electronics-categories";
import { fetchListingsByCategorySlug } from "@/lib/os-listings";
import { brand, getWhatsAppLink } from "@/lib/site-config";

type Props = {
  slug: ElectronicsCategory["slug"];
};

export async function CategoryPageTemplate({ slug }: Props) {
  const category = getCategoryBySlug(slug);
  if (!category) return null;

  const listings: Listing[] = await fetchListingsByCategorySlug(slug);
  const whatsappHref = getWhatsAppLink(
    `Hi ${brand.shortName}, I'm looking for a ${category.shortName.toLowerCase()}. What do you have available?`
  );

  return (
    <div className="bg-page">
      <header className="hero-glow pt-12 pb-10 md:pt-16 md:pb-14">
        <Container>
          <h1 className="text-3xl font-semibold tracking-tight text-neutral-950 md:text-4xl">
            {category.name}
          </h1>
          <p className="mt-3 max-w-lg text-neutral-500">{category.description}</p>
          <div className="mt-8">
            <Button href={whatsappHref} variant="secondary">
              Ask on WhatsApp
            </Button>
          </div>
        </Container>
      </header>

      {listings.length > 0 ? (
        <ElectronicsListingsGrid
          listings={listings}
          showHeading={false}
          ctaHref={undefined}
        />
      ) : (
        <section className="py-section-sm">
          <Container className="max-w-md text-center">
            <p className="text-neutral-600">Nothing live in this category right now.</p>
            <Link
              href={whatsappHref}
              className="mt-6 inline-block text-sm font-medium text-accent hover:underline"
            >
              Tell us what you need →
            </Link>
          </Container>
        </section>
      )}
    </div>
  );
}
