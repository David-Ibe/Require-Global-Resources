import Link from "next/link";
import {
  Gamepad2,
  Headphones,
  Laptop,
  Smartphone,
  Watch,
  Cable,
} from "lucide-react";

import { Container } from "@/components/ui/container";
import { cn } from "@/lib/cn";

const CATEGORIES = [
  { slug: "laptops", name: "Laptops", href: "/laptops", icon: Laptop, available: true },
  { slug: "smartphones", name: "Phones", href: "/smartphones", icon: Smartphone, available: true },
  { slug: "audio", name: "Audio", href: "/audio", icon: Headphones, available: true },
  { slug: "accessories", name: "Accessories", href: "/listings?category=accessories", icon: Cable, available: false },
  { slug: "wearables", name: "Wearables", href: "/listings?category=wearables", icon: Watch, available: false },
  { slug: "gaming", name: "Gaming", href: "/listings?category=gaming", icon: Gamepad2, available: false },
] as const;

export function ShopByCategory() {
  return (
    <section className="py-14 md:py-16" aria-label="Categories">
      <Container>
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-6 sm:gap-4">
          {CATEGORIES.map((category) => {
            const Icon = category.icon;
            return (
              <Link
                key={category.slug}
                href={category.available ? category.href : "#"}
                className={cn(
                  "group flex flex-col items-center rounded-xl border border-border bg-white py-6 text-center transition hover:border-neutral-300 hover:shadow-soft",
                  !category.available && "pointer-events-none opacity-50"
                )}
                aria-disabled={!category.available}
              >
                <span className="flex h-11 w-11 items-center justify-center text-navy transition group-hover:scale-105">
                  <Icon className="h-6 w-6" strokeWidth={1.5} />
                </span>
                <span className="mt-3 text-sm font-medium text-neutral-900">
                  {category.name}
                </span>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
