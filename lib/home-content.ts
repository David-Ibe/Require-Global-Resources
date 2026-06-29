export type HowItWorksStep = {
  step: number;
  title: string;
  description: string;
};

export type WhyChooseItem = {
  title: string;
  description: string;
  icon: "shield" | "link" | "truck" | "warranty" | "building" | "headphones";
};

export type CustomerReview = {
  name: string;
  role: string;
  location: string;
  rating: number;
  text: string;
};

export type BuyingGuide = {
  slug: string;
  title: string;
  description: string;
  href: string;
  readTime: string;
};

export type HighIntentFaq = {
  q: string;
  a: string;
};

export const HOW_IT_WORKS: HowItWorksStep[] = [
  {
    step: 1,
    title: "Browse Products",
    description: "Explore our curated catalogue of genuine laptops, smartphones and accessories.",
  },
  {
    step: 2,
    title: "Order Online or via WhatsApp",
    description: "Checkout online or chat with our team for personalised recommendations.",
  },
  {
    step: 3,
    title: "Verified Delivery",
    description: "Nationwide shipping with tracking. Lagos same-day delivery available.",
  },
  {
    step: 4,
    title: "Enjoy Genuine Technology",
    description: "Every product is backed by warranty and our Require Certified guarantee.",
  },
];

export const WHY_CHOOSE: WhyChooseItem[] = [
  {
    title: "Genuine Products Only",
    description: "Every item is sourced through verified suppliers and authenticated before listing.",
    icon: "shield",
  },
  {
    title: "Verified Supply Chain",
    description: "Full traceability from supplier to your door. Serial numbers verified on request.",
    icon: "link",
  },
  {
    title: "Nationwide Delivery",
    description: "Reliable courier partners deliver across Nigeria with full tracking.",
    icon: "truck",
  },
  {
    title: "Warranty Support",
    description: "International manufacturer warranty honoured. We guide you through claims.",
    icon: "warranty",
  },
  {
    title: "Business Procurement",
    description: "Volume pricing, official quotations and dedicated account managers.",
    icon: "building",
  },
  {
    title: "Dedicated Customer Support",
    description: "Real humans on WhatsApp and email. Video inspection before you pay.",
    icon: "headphones",
  },
];

export const CUSTOMER_REVIEWS: CustomerReview[] = [
  {
    name: "Adaeze O.",
    role: "Software Engineer",
    location: "Lagos",
    rating: 5,
    text: "Ordered a MacBook Pro through WhatsApp. They sent a live video showing the serial, box seal and specs before I paid. Delivered same day. Exactly as described.",
  },
  {
    name: "Emeka N.",
    role: "IT Manager",
    location: "Abuja",
    rating: 5,
    text: "We procured 12 ThinkPads for our office. Official quotation, CAC invoice, and all units arrived within 48 hours. Professional from start to finish.",
  },
  {
    name: "Fatima A.",
    role: "University Student",
    location: "Ibadan",
    rating: 5,
    text: "Bought my first laptop here — a Dell Latitude. They walked me through the specs on a video call and helped me pick the right configuration for my budget.",
  },
  {
    name: "Chidi K.",
    role: "Startup Founder",
    location: "Port Harcourt",
    rating: 5,
    text: "Reliable source for genuine iPhones and AirPods. No marketplace drama — just clear pricing, verified products and fast delivery.",
  },
];

export const BUYING_GUIDES: BuyingGuide[] = [
  {
    slug: "choosing-laptop",
    title: "Choosing the Right Laptop",
    description: "Processor, RAM, storage and display — what matters for your use case.",
    href: "/listings?category=laptops",
    readTime: "8 min read",
  },
  {
    slug: "macbook-guide",
    title: "MacBook Buying Guide",
    description: "Air vs Pro, M-series chips, and which configuration fits your workflow.",
    href: "/listings?q=MacBook",
    readTime: "10 min read",
  },
  {
    slug: "student-laptops",
    title: "Best Laptops for Students",
    description: "Budget-friendly options that handle coursework, research and light creative work.",
    href: "/listings?q=student",
    readTime: "6 min read",
  },
  {
    slug: "small-business-tech",
    title: "Technology for Small Businesses",
    description: "Essential hardware for startups and SMEs — laptops, phones and office equipment.",
    href: "/business",
    readTime: "7 min read",
  },
  {
    slug: "laptop-comparison",
    title: "Laptop Comparison Guide",
    description: "ThinkPad vs MacBook vs Dell XPS — an honest side-by-side for professionals.",
    href: "/listings?category=laptops",
    readTime: "12 min read",
  },
  {
    slug: "workstation-guide",
    title: "Workstation Buying Guide",
    description: "High-performance machines for engineering, design and data-intensive work.",
    href: "/listings?q=workstation",
    readTime: "9 min read",
  },
];

export const HIGH_INTENT_FAQS: HighIntentFaq[] = [
  {
    q: "How do you verify authenticity?",
    a: "Every product is sourced through verified suppliers. We check serial numbers, packaging, and condition before listing. You can verify independently on the manufacturer's website before you pay.",
  },
  {
    q: "What warranty do you offer?",
    a: "All products carry international manufacturer warranty. We explain exactly what's covered and where to service before you buy. Hardware faults within 7 days of delivery are covered by us.",
  },
  {
    q: "How long does delivery take?",
    a: "Lagos: same day or next day. Major cities: 1–2 business days. Other locations: 2–4 business days. You receive tracking the moment your order ships.",
  },
  {
    q: "Do you deliver nationwide?",
    a: "Yes — we ship to every state in Nigeria using vetted courier partners for high-value electronics.",
  },
  {
    q: "Can businesses request quotations?",
    a: "Absolutely. We provide official CAC-registered quotations and invoices for corporate, school, NGO and government procurement.",
  },
  {
    q: "How do returns work?",
    a: "If what arrives doesn't match what we showed you — different serial, condition or spec — we refund in full. No restocking fee.",
  },
];

export const PRODUCT_BADGES = [
  "Most Popular",
  "Business Favourite",
  "Editor's Choice",
  "New Arrival",
] as const;

export type ProductBadge = (typeof PRODUCT_BADGES)[number];

export function getListingBadge(slug: string, index: number): ProductBadge | "Require Certified" {
  if (index === 0) return "Most Popular";
  if (index === 1) return "Editor's Choice";
  if (index === 2) return "Business Favourite";
  if (index === 3) return "New Arrival";
  return "Require Certified";
}

export function getListingReviewCount(slug: string): number {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = (hash << 5) - hash + slug.charCodeAt(i);
    hash |= 0;
  }
  return 8 + (Math.abs(hash) % 25);
}
