export type BrandProduct = {
  name: string;
  href: string;
};

export type FeaturedBrand = {
  slug: string;
  name: string;
  href: string;
  tagline: string;
  products: BrandProduct[];
};

export const FEATURED_BRANDS: FeaturedBrand[] = [
  {
    slug: "apple",
    name: "Apple",
    href: "/brands/apple",
    tagline: "MacBook, iPhone, iPad & AirPods",
    products: [
      { name: "MacBook", href: "/listings?q=MacBook" },
      { name: "iPhone", href: "/listings?q=iPhone" },
      { name: "iPad", href: "/listings?q=iPad" },
      { name: "AirPods", href: "/listings?q=AirPods" },
    ],
  },
  {
    slug: "dell",
    name: "Dell",
    href: "/brands/dell",
    tagline: "Latitude, XPS & Precision",
    products: [
      { name: "Latitude", href: "/listings?q=Dell+Latitude" },
      { name: "XPS", href: "/listings?q=Dell+XPS" },
      { name: "Precision", href: "/listings?q=Dell+Precision" },
    ],
  },
  {
    slug: "lenovo",
    name: "Lenovo",
    href: "/brands/lenovo",
    tagline: "ThinkPad, IdeaPad & Legion",
    products: [
      { name: "ThinkPad", href: "/listings?q=ThinkPad" },
      { name: "IdeaPad", href: "/listings?q=IdeaPad" },
      { name: "Legion", href: "/listings?q=Legion" },
    ],
  },
  {
    slug: "hp",
    name: "HP",
    href: "/brands/hp",
    tagline: "EliteBook, ProBook & Envy",
    products: [
      { name: "EliteBook", href: "/listings?q=HP+EliteBook" },
      { name: "ProBook", href: "/listings?q=HP+ProBook" },
      { name: "Envy", href: "/listings?q=HP+Envy" },
    ],
  },
  {
    slug: "samsung",
    name: "Samsung",
    href: "/brands/samsung",
    tagline: "Galaxy smartphones & tablets",
    products: [
      { name: "Galaxy S", href: "/listings?q=Galaxy+S" },
      { name: "Galaxy Z", href: "/listings?q=Galaxy+Z" },
      { name: "Galaxy Tab", href: "/listings?q=Galaxy+Tab" },
    ],
  },
  {
    slug: "sony",
    name: "Sony",
    href: "/brands/sony",
    tagline: "WH-1000XM & premium audio",
    products: [
      { name: "WH-1000XM", href: "/listings?q=WH-1000XM" },
      { name: "WF-1000XM", href: "/listings?q=WF-1000XM" },
    ],
  },
  {
    slug: "asus",
    name: "ASUS",
    href: "/brands/asus",
    tagline: "ZenBook, ROG & ProArt",
    products: [
      { name: "ZenBook", href: "/listings?q=ZenBook" },
      { name: "ROG", href: "/listings?q=ASUS+ROG" },
    ],
  },
  {
    slug: "microsoft",
    name: "Microsoft",
    href: "/brands/microsoft",
    tagline: "Surface laptops & accessories",
    products: [
      { name: "Surface Laptop", href: "/listings?q=Surface+Laptop" },
      { name: "Surface Pro", href: "/listings?q=Surface+Pro" },
    ],
  },
  {
    slug: "canon",
    name: "Canon",
    href: "/brands/canon",
    tagline: "Printers & imaging equipment",
    products: [
      { name: "Printers", href: "/listings?q=Canon+printer" },
      { name: "Scanners", href: "/listings?q=Canon+scanner" },
    ],
  },
  {
    slug: "logitech",
    name: "Logitech",
    href: "/brands/logitech",
    tagline: "Mice, keyboards & webcams",
    products: [
      { name: "MX Master", href: "/listings?q=MX+Master" },
      { name: "MX Keys", href: "/listings?q=MX+Keys" },
    ],
  },
  {
    slug: "sandisk",
    name: "SanDisk",
    href: "/brands/sandisk",
    tagline: "USB drives & memory cards",
    products: [
      { name: "USB flash drives", href: "/listings?q=SanDisk" },
      { name: "SD cards", href: "/listings?q=SanDisk+SD" },
    ],
  },
  {
    slug: "seagate",
    name: "Seagate",
    href: "/brands/seagate",
    tagline: "External & internal storage",
    products: [
      { name: "External drives", href: "/listings?q=Seagate" },
      { name: "Portable SSD", href: "/listings?q=Seagate+SSD" },
    ],
  },
  {
    slug: "epson",
    name: "Epson",
    href: "/brands/epson",
    tagline: "Printers & projectors",
    products: [
      { name: "Printers", href: "/listings?q=Epson+printer" },
      { name: "Projectors", href: "/listings?q=Epson+projector" },
    ],
  },
  {
    slug: "jbl",
    name: "JBL",
    href: "/brands/jbl",
    tagline: "Speakers & headphones",
    products: [
      { name: "Bluetooth speakers", href: "/listings?q=JBL" },
      { name: "Headphones", href: "/listings?q=JBL+headphones" },
    ],
  },
  {
    slug: "cisco",
    name: "Cisco",
    href: "/brands/cisco",
    tagline: "Networking & business equipment",
    products: [
      { name: "Routers", href: "/listings?q=Cisco+router" },
      { name: "Switches", href: "/listings?q=Cisco+switch" },
    ],
  },
];

export const TRUST_BRAND_NAMES = [
  "Apple",
  "Dell",
  "Lenovo",
  "Samsung",
  "HP",
  "Sony",
  "Microsoft",
  "ASUS",
  "Logitech",
  "Canon",
] as const;

export function getBrandBySlug(slug: string): FeaturedBrand | undefined {
  return FEATURED_BRANDS.find((b) => b.slug === slug);
}
