import type { Metadata } from "next";

import { CategoryPageTemplate } from "@/components/store/category-page-template";
import { getCategoryBySlug } from "@/lib/electronics-categories";
import { brand, siteUrl } from "@/lib/site-config";

const SLUG = "audio" as const;

export function generateMetadata(): Metadata {
  const cat = getCategoryBySlug(SLUG);
  return {
    title: cat ? cat.name : "Audio",
    description:
      cat?.description ??
      `Genuine AirPods, Sony WH-1000XM and Bose QuietComfort sold by ${brand.shortName}`,
    alternates: { canonical: `${siteUrl}/${SLUG}` },
  };
}

export default function AudioPage() {
  return <CategoryPageTemplate slug={SLUG} />;
}
