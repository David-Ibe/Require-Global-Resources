import {
  Headphones,
  Laptop,
  Monitor,
  Gamepad2,
  Smartphone,
  Watch,
  Cable,
  Briefcase,
  type LucideIcon,
} from "lucide-react";

export type StoreCategory = {
  slug: string;
  name: string;
  shortName: string;
  href: string;
  tagline: string;
  description: string;
  icon: LucideIcon;
  available: boolean;
  /** Brand names shown on category cards (legacy). */
  brands?: string[];
};

/** @deprecated Use StoreCategory */
export type ElectronicsCategory = StoreCategory;

export const STORE_CATEGORIES: StoreCategory[] = [
  {
    slug: "laptops",
    name: "Laptops",
    shortName: "Laptops",
    href: "/laptops",
    tagline: "MacBook · ThinkPad · Dell · Surface",
    description: "Premium laptops from Apple, Dell, Lenovo and HP.",
    brands: ["MacBook", "Dell", "ThinkPad"],
    icon: Laptop,
    available: true,
  },
  {
    slug: "smartphones",
    name: "Smartphones",
    shortName: "Smartphones",
    href: "/smartphones",
    tagline: "iPhone · Samsung · Pixel",
    description: "Factory-unlocked flagships with verified IMEI.",
    brands: ["iPhone", "Samsung", "Google Pixel"],
    icon: Smartphone,
    available: true,
  },
  {
    slug: "audio",
    name: "Audio",
    shortName: "Audio",
    href: "/audio",
    tagline: "AirPods · Sony · Bose",
    description: "Headphones, earbuds and premium audio gear.",
    brands: ["AirPods", "Sony", "Bose"],
    icon: Headphones,
    available: true,
  },
  {
    slug: "wearables",
    name: "Wearables",
    shortName: "Wearables",
    href: "/listings?category=wearables",
    tagline: "Apple Watch · Galaxy Watch",
    description: "Smartwatches and fitness trackers.",
    icon: Watch,
    available: false,
  },
  {
    slug: "accessories",
    name: "Accessories",
    shortName: "Accessories",
    href: "/listings?category=accessories",
    tagline: "Chargers · Cables · Hubs",
    description: "Genuine chargers, cables and peripherals.",
    icon: Cable,
    available: false,
  },
  {
    slug: "office-equipment",
    name: "Office Equipment",
    shortName: "Office",
    href: "/listings?category=office-equipment",
    tagline: "Printers · Monitors · Scanners",
    description: "Business-grade office technology.",
    icon: Monitor,
    available: false,
  },
  {
    slug: "gaming",
    name: "Gaming",
    shortName: "Gaming",
    href: "/listings?category=gaming",
    tagline: "ROG · Legion · Peripherals",
    description: "Gaming laptops and accessories.",
    icon: Gamepad2,
    available: false,
  },
  {
    slug: "business-solutions",
    name: "Business Solutions",
    shortName: "Business",
    href: "/business",
    tagline: "Procurement · Bulk orders",
    description: "Corporate technology procurement at scale.",
    icon: Briefcase,
    available: true,
  },
];

export function getCategoryBySlug(slug: string): StoreCategory | undefined {
  return STORE_CATEGORIES.find((c) => c.slug === slug);
}

export function getCategoryLabel(slug: string): string {
  return getCategoryBySlug(slug)?.shortName ?? slug.replace(/-/g, " ");
}

/** @deprecated Use STORE_CATEGORIES */
export const ELECTRONICS_CATEGORIES = STORE_CATEGORIES;
