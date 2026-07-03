import Image from "next/image";

import { cn } from "@/lib/cn";

const BRAND_ASSETS: Record<string, { src: string; width: number; height: number; alt: string }> = {
  apple: { src: "/brands/apple.jpg", width: 36, height: 44, alt: "Apple" },
  dell: { src: "/brands/dell.jpg", width: 72, height: 28, alt: "Dell" },
  lenovo: { src: "/brands/lenovo.jpg", width: 96, height: 32, alt: "Lenovo" },
  hp: { src: "/brands/hp.jpg", width: 44, height: 44, alt: "HP" },
};

type Props = {
  slug: string;
  className?: string;
};

export function BrandLogo({ slug, className }: Props) {
  const asset = BRAND_ASSETS[slug];
  if (!asset) return null;

  return (
    <Image
      src={asset.src}
      alt={asset.alt}
      width={asset.width}
      height={asset.height}
      className={cn(
        "h-8 w-auto max-w-[6.5rem] object-contain transition-opacity duration-300 hover:opacity-80 md:h-9 md:max-w-[7.5rem]",
        className
      )}
    />
  );
}

export const MARQUEE_BRAND_SLUGS = ["apple", "dell", "lenovo", "hp"] as const;
