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
      "Stop driving dangerously in Lagos traffic. This magnetic car phone holder clips to your air vent in 30 seconds — keeping your phone visible, secure, and hands-free through every pothole and sharp turn.",
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
      "Stop losing your phone, keys and coins between your car seats every day. The Car Seat Gap Organiser fills that annoying gap completely and adds smart storage within easy reach while driving.",
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
      "The complete car upgrade every Lagos driver needs. Phone Holder plus Seat Gap Organiser in one order — solving the two biggest daily frustrations for Nigerian drivers in one delivery.",
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

/** Shown when there are no rows in `reviews` yet — same stories as seed, editable copy. */
export const STATIC_HOME_REVIEWS: (ReviewRow & { product_name?: string | null })[] =
  [
    {
      id: "00000000-0000-4000-8000-000000000101",
      product_id: null,
      reviewer_name: "Adaeze O.",
      reviewer_location: "Lagos Island",
      rating: 5,
      review_text:
        "Used on my Corolla for one week before reviewing. Delivery took 2 days to Lagos Island, and the magnet still holds my phone steady on Third Mainland Bridge even with potholes.",
      verified: true,
      created_at: new Date().toISOString(),
      product_name: HOME_PRODUCT_TITLE["magnetic-car-phone-holder"]
    },
    {
      id: "00000000-0000-4000-8000-000000000102",
      product_id: null,
      reviewer_name: "Emeka I.",
      reviewer_location: "Abuja",
      rating: 5,
      review_text:
        "I was skeptical after getting fake accessories online before. They confirmed quickly on WhatsApp, sent delivery updates, and my order arrived in 3 days to Abuja exactly as shown.",
      verified: true,
      created_at: new Date().toISOString(),
      product_name: HOME_PRODUCT_TITLE["car-seat-gap-organiser"]
    },
    {
      id: "00000000-0000-4000-8000-000000000103",
      product_id: null,
      reviewer_name: "Tolu A.",
      reviewer_location: "Ibadan",
      rating: 5,
      review_text:
        "I bought the Lagos Driver Bundle for my Camry. Both items came together in one delivery to Ibadan, and the team followed up after delivery to confirm everything worked well.",
      verified: true,
      created_at: new Date().toISOString(),
      product_name: HOME_PRODUCT_TITLE["lagos-driver-bundle"]
    },
    {
      id: "00000000-0000-4000-8000-000000000104",
      product_id: null,
      reviewer_name: "Nkechi U.",
      reviewer_location: "Port Harcourt",
      rating: 5,
      review_text:
        "The seat gap organiser solved the daily problem of losing keys and cards between seats. Packaging was neat, installation was easy, and delivery to Port Harcourt was smooth.",
      verified: true,
      created_at: new Date().toISOString(),
      product_name: HOME_PRODUCT_TITLE["car-seat-gap-organiser"]
    },
    {
      id: "00000000-0000-4000-8000-000000000105",
      product_id: null,
      reviewer_name: "Musa K.",
      reviewer_location: "Lekki, Lagos",
      rating: 5,
      review_text:
        "Ordered at night on WhatsApp and got confirmation almost immediately. I paid on delivery in Lekki, and the holder fits my vent properly without shaking while driving.",
      verified: true,
      created_at: new Date().toISOString(),
      product_name: HOME_PRODUCT_TITLE["magnetic-car-phone-holder"]
    }
  ];
