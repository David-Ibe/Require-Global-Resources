import type { Metadata } from "next";

import { CategoryPageTemplate } from "@/components/store/category-page-template";
import { getCategoryBySlug } from "@/lib/electronics-categories";
import { brand, siteUrl } from "@/lib/site-config";

const SLUG = "smartphones" as const;

export function generateMetadata(): Metadata {
  const cat = getCategoryBySlug(SLUG);
  return {
    title: cat ? cat.name : "Smartphones",
    description:
      cat?.description ??
      `Verified factory-unlocked iPhones and Samsung flagships from ${brand.shortName}`,
    alternates: { canonical: `${siteUrl}/${SLUG}` },
  };
}

export default function SmartphonesPage() {
  return <CategoryPageTemplate slug={SLUG} />;
}
