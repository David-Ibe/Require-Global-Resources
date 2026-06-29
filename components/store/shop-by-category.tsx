"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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

export function ShopByCategory({
  compact = false,
  className,
}: {
  compact?: boolean;
  className?: string;
}) {
  const pathname = usePathname();

  function isActive(href: string) {
    if (href.startsWith("/listings?")) {
      return false;
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <section
      className={cn(
        "bg-page",
        compact ? "py-6 md:py-8" : "py-14 md:py-16",
        className
      )}
      aria-label="Categories"
    >
      <Container>
        {!compact && (
          <h2 className="mb-8 text-section-title text-navy">Shop by category</h2>
        )}
        <div
          className={cn(
            compact
              ? "flex gap-6 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:grid sm:grid-cols-6 sm:gap-6 sm:overflow-visible"
              : "grid grid-cols-3 gap-6 sm:grid-cols-6"
          )}
        >
          {CATEGORIES.map((category) => {
            const Icon = category.icon;
            const active = category.available && isActive(category.href);

            return (
              <Link
                key={category.slug}
                href={category.available ? category.href : "#"}
                className={cn(
                  "group flex shrink-0 cursor-pointer flex-col items-center text-center transition-all duration-300",
                  compact ? "w-[5.5rem] sm:w-auto" : "",
                  !category.available && "pointer-events-none opacity-40"
                )}
                aria-disabled={!category.available}
                aria-current={active ? "page" : undefined}
              >
                <div
                  className={cn(
                    "mb-3 flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-300",
                    active
                      ? "bg-accent-light text-accent shadow-glow"
                      : "bg-surface text-muted shadow-sm group-hover:-translate-y-0.5 group-hover:text-accent group-hover:shadow-md"
                  )}
                >
                  <Icon className="h-6 w-6" strokeWidth={1.5} />
                </div>
                <span
                  className={cn(
                    "text-[13px] font-medium text-neutral-700 transition-colors group-hover:text-accent",
                    active && "font-semibold text-accent"
                  )}
                >
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
