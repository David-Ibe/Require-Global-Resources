import type { ProductRow, ReviewRow } from "@/lib/supabase/types";
import { HOME_PRODUCT_TITLE } from "@/lib/product-home-titles";

/**
 * Shown when the catalog API fails so the shop section never looks “broken”.
 * Matches seeded product slugs so links stay valid when the DB is healthy.
 */
export const STATIC_FEATURED_PRODUCTS: ProductRow[] = [
  {
    id: "00000000-0000-4000-8000-000000000001",
    name: HOME_PRODUCT_TITLE["magnetic-car-phone-holder"],
    slug: "magnetic-car-phone-holder",
    category: "Car Accessories",
    badge: "HOT SELLER",
    description:
      "Strong magnetic grip. 360\u00B0 rotation. Air vent mount. Universal fit. Clips to your air vent in 30 seconds \u2014 keeping your phone visible, secure, and hands-free.",
    features: [
      "360° Rotation",
      "Universal Fit — all phones and cases",
      "Air vent mount — installs in 30 seconds"
    ],
    images: [
      "/products/car-phone-holder-gallery/01-vacuum-magnet.png",
      "/products/car-phone-holder-gallery/02-compatibility.png",
      "/products/car-phone-holder-gallery/03-live-streaming.png",
      "/products/car-phone-holder-gallery/04-shoot-outdoors.png"
    ],
    pricing_options: [
      { label: "Buy 1 Unit", price: "₦7,500", savings: "", qty: "1" },
      { label: "Buy 2 Units", price: "₦13,500", savings: "Save ₦1,500", qty: "2" }
    ],
    youtube_url: null,
    stock_count: 15,
    old_price: "₦12,000",
    current_price: "₦7,500",
    active: true,
    created_at: new Date().toISOString()
  },
  {
    id: "00000000-0000-4000-8000-000000000002",
    name: HOME_PRODUCT_TITLE["car-seat-gap-organiser"],
    slug: "car-seat-gap-organiser",
    category: "Car Accessories",
    badge: "NEW",
    description:
      "Stop losing your phone and keys between your seats. Smart storage within easy reach while driving.",
    features: [
      "Fits all car models universally",
      "Built-in cup holder",
      "Installs in under 2 minutes"
    ],
    images: [
      "/products/Car-Seat-Gap-Organiser/1.png",
      "/products/Car-Seat-Gap-Organiser/2.png",
      "/products/Car-Seat-Gap-Organiser/3.png",
      "/products/Car-Seat-Gap-Organiser/4.png",
      "/products/Car-Seat-Gap-Organiser/5.png",
      "/products/Car-Seat-Gap-Organiser/6.png",
      "/products/Car-Seat-Gap-Organiser/7.png",
      "/products/Car-Seat-Gap-Organiser/8.png"
    ],
    pricing_options: [
      { label: "Buy 1 Unit", price: "₦8,000", savings: "", qty: "1" },
      { label: "Buy 2 Units", price: "₦14,000", savings: "Save ₦2,000", qty: "2" }
    ],
    youtube_url: null,
    stock_count: 15,
    old_price: null,
    current_price: "₦8,000",
    active: true,
    created_at: new Date().toISOString()
  },
  {
    id: "00000000-0000-4000-8000-000000000003",
    name: HOME_PRODUCT_TITLE["lagos-driver-bundle"],
    slug: "lagos-driver-bundle",
    category: "Bundle Deal",
    badge: "BEST VALUE",
    description:
      "Phone Holder + Seat Organiser. The complete car upgrade every Lagos driver needs.",
    features: [
      "2 premium products in 1 order",
      "Magnetic Car Phone Holder included",
      "Car Seat Gap Organiser included"
    ],
    images: [
      "/products/car-phone-holder-gallery/01-vacuum-magnet.png",
      "/products/car-phone-holder-gallery/02-compatibility.png",
      "/products/Car-Seat-Gap-Organiser/1.png",
      "/products/Car-Seat-Gap-Organiser/2.png"
    ],
    pricing_options: [
      {
        label: "The Complete Bundle",
        price: "₦13,500",
        savings: "Save ₦2,000",
        qty: "1"
      }
    ],
    youtube_url: null,
    stock_count: 15,
    old_price: "₦15,500",
    current_price: "₦13,500",
    active: true,
    created_at: new Date().toISOString()
  }
];

/** Shown when there are no rows in `reviews` yet — editable copy. */
export const STATIC_HOME_REVIEWS: (ReviewRow & { product_name?: string | null })[] =
  [
    {
      id: "00000000-0000-4000-8000-000000000101",
      product_id: null,
      reviewer_name: "Yusuf M.",
      reviewer_location: "Port Harcourt",
      rating: 5,
      review_text:
        "CAC registration and professionalism stood out. Delivery was perfect.",
      verified: true,
      created_at: new Date().toISOString(),
      product_name: HOME_PRODUCT_TITLE["magnetic-car-phone-holder"]
    },
    {
      id: "00000000-0000-4000-8000-000000000102",
      product_id: null,
      reviewer_name: "Funke A.",
      reviewer_location: "Abuja",
      rating: 5,
      review_text:
        "Pay on delivery gave me total peace of mind. Excellent service.",
      verified: true,
      created_at: new Date().toISOString(),
      product_name: HOME_PRODUCT_TITLE["car-seat-gap-organiser"]
    },
    {
      id: "00000000-0000-4000-8000-000000000103",
      product_id: null,
      reviewer_name: "Chidi N.",
      reviewer_location: "Lekki, Lagos",
      rating: 5,
      review_text:
        "Product exactly as shown. Finally found a trustworthy seller.",
      verified: true,
      created_at: new Date().toISOString(),
      product_name: HOME_PRODUCT_TITLE["lagos-driver-bundle"]
    }
  ];
