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
        compact ? "py-4 md:py-5" : "py-14 md:py-16",
        className
      )}
      aria-label="Categories"
    >
      <Container>
        <div
          className={cn(
            compact
              ? "flex gap-3 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:grid sm:grid-cols-6 sm:gap-3 sm:overflow-visible"
              : "grid grid-cols-3 gap-3 sm:grid-cols-6 sm:gap-3"
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
                  "group flex shrink-0 cursor-pointer flex-col items-center rounded-xl bg-surface px-4 py-5 text-center shadow-sm transition-all duration-150",
                  compact ? "w-[5.5rem] sm:w-auto" : "",
                  active
                    ? "bg-highlight shadow-sm"
                    : "hover:-translate-y-px hover:shadow-md",
                  !category.available && "pointer-events-none opacity-50"
                )}
                aria-disabled={!category.available}
                aria-current={active ? "page" : undefined}
              >
                <Icon
                  className={cn(
                    "mb-2.5 h-7 w-7 shrink-0 transition-colors",
                    active ? "text-accent" : "text-muted group-hover:text-neutral-700"
                  )}
                  strokeWidth={1.5}
                />
                <span
                  className={cn(
                    "text-[13px] font-medium text-neutral-700",
                    active && "font-semibold text-navy-secondary"
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
