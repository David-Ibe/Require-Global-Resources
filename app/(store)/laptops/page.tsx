import type { Metadata } from "next";

import { CategoryPageTemplate } from "@/components/store/category-page-template";
import { getCategoryBySlug } from "@/lib/electronics-categories";
import { brand, siteUrl } from "@/lib/site-config";

const SLUG = "laptops" as const;

export function generateMetadata(): Metadata {
  const cat = getCategoryBySlug(SLUG);
  return {
    title: cat ? cat.name : "Laptops",
    description: cat?.description ?? `Laptops from ${brand.shortName}`,
    alternates: { canonical: `${siteUrl}/${SLUG}` },
  };
}

export default function LaptopsPage() {
  return <CategoryPageTemplate slug={SLUG} />;
}
