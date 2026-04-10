/**
 * Seed Require Global Resources products and reviews.
 * Usage: ensure .env.local has NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY, then:
 *   npm run seed
 *   (Plain `node` does not load .env files; this script loads ../.env.local via dotenv.)
 */
import { config } from "dotenv";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

import { createClient } from "@supabase/supabase-js";

const __dirname = dirname(fileURLToPath(import.meta.url));
config({ path: resolve(__dirname, "../.env.local") });
config({ path: resolve(__dirname, "../.env") });

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  console.error(
    "Missing env: NEXT_PUBLIC_SUPABASE_URL and/or SUPABASE_SERVICE_ROLE_KEY.\n" +
      "Add them to .env.local (same as Next.js), then run: npm run seed"
  );
  process.exit(1);
}

const supabase = createClient(url, key, {
  auth: { persistSession: false, autoRefreshToken: false }
});

function supabaseHost() {
  try {
    return new URL(url).hostname;
  } catch {
    return "(invalid NEXT_PUBLIC_SUPABASE_URL)";
  }
}

function isLikelyNetworkFailure(err) {
  const blob = `${err?.message ?? ""} ${err?.details ?? ""} ${err?.code ?? ""}`;
  return /fetch failed|ConnectTimeout|ECONNRESET|ENOTFOUND|ETIMEDOUT|UND_ERR_CONNECT/i.test(
    blob
  );
}

async function sleep(ms) {
  await new Promise((r) => setTimeout(r, ms));
}

/** Retries transient network failures (common on slow or filtered networks). */
async function withNetworkRetry(label, fn, { attempts = 4, baseDelayMs = 1500 } = {}) {
  let last;
  for (let i = 0; i < attempts; i++) {
    last = await fn();
    if (!last.error) return last;
    if (!isLikelyNetworkFailure(last.error) || i === attempts - 1) return last;
    const wait = baseDelayMs * (i + 1);
    console.warn(
      `${label}: attempt ${i + 1}/${attempts} failed (${String(last.error.message).slice(0, 120)}…). Retrying in ${wait}ms…`
    );
    await sleep(wait);
  }
  return last;
}

const products = [
  {
    name: "Magnetic Car Phone Holder — Stable Even on Third Mainland Bridge",
    slug: "magnetic-car-phone-holder",
    category: "Car Accessories",
    badge: "HOT SELLER",
    description:
      "Stop driving dangerously in Lagos traffic. This magnetic car phone holder clips to your air vent in 30 seconds — keeping your phone visible, secure, and hands-free through every pothole and sharp turn.",
    features: [
      "360° Rotation",
      "Universal Fit — all phones and cases",
      "Air vent mount — installs in 30 seconds",
      "Super strong magnet — pothole-proof",
      "One-hand mount and release"
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
    active: true
  },
  {
    name: "Car Seat Gap Organiser — No More Lost Keys Between the Seats",
    slug: "car-seat-gap-organiser",
    category: "Car Accessories",
    badge: "NEW",
    description:
      "Stop losing your phone, keys and coins between your car seats every day. The Car Seat Gap Organiser fills that annoying gap completely and adds smart storage within easy reach while driving.",
    features: [
      "Fits all car models universally",
      "Built-in cup holder",
      "Installs in under 2 minutes",
      "Stops phones keys and coins falling",
      "Premium leather-look finish"
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
    active: true
  },
  {
    name: "The Lagos Driver Bundle — Phone + Organiser in One Delivery",
    slug: "lagos-driver-bundle",
    category: "Bundle Deal",
    badge: "BEST VALUE",
    description:
      "The complete car upgrade every Lagos driver needs. Phone Holder plus Seat Gap Organiser in one order — solving the two biggest daily frustrations for Nigerian drivers in one delivery.",
    features: [
      "2 premium products in 1 order",
      "Magnetic Car Phone Holder included",
      "Car Seat Gap Organiser included",
      "Free delivery on the bundle",
      "Save ₦2,000 vs buying separately"
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
    active: true
  }
];

async function run() {
  console.log(`Seeding → Supabase host: ${supabaseHost()}`);

  const ping = await withNetworkRetry("Ping Supabase", () =>
    supabase.from("products").select("id").limit(1)
  );
  if (ping.error) {
    if (isLikelyNetworkFailure(ping.error)) {
      console.error(
        "\nCould not reach Supabase (network timeout or blocked connection).\n" +
          "Try:\n" +
          "  • Different network or disable VPN / corporate proxy blocking *.supabase.co\n" +
          "  • Confirm the project is running: https://supabase.com/dashboard\n" +
          "  • Verify NEXT_PUBLIC_SUPABASE_URL in .env.local matches Project Settings → API\n"
      );
      process.exit(1);
    }
    console.warn("Ping warning (continuing):", ping.error.message);
  }

  for (const p of products) {
    const { error } = await withNetworkRetry(`Upsert ${p.slug}`, () =>
      supabase.from("products").upsert(p, {
        onConflict: "slug"
      })
    );
    if (error) {
      console.error("Product upsert error:", p.slug, error);
      if (error.code === "PGRST204") {
        console.error(
          "\nYour Supabase `products` table is missing columns the app expects.\n" +
            "In Supabase → SQL Editor, run: supabase/migrations/003_align_products_full_schema.sql\n" +
            "Then run npm run seed again.\n"
        );
      }
      if (error.code === "23514") {
        console.error(
          "\nA CHECK constraint on `products` rejected the row (often `products_category_check`).\n" +
            "In Supabase → SQL Editor, run: supabase/migrations/004_drop_products_category_check.sql\n" +
            "Then run npm run seed again.\n"
        );
      }
      process.exit(1);
    }
    console.log("Upserted product:", p.slug);
  }

  const { data: prodRows } = await supabase
    .from("products")
    .select("id, slug")
    .in("slug", [
      "magnetic-car-phone-holder",
      "car-seat-gap-organiser",
      "lagos-driver-bundle"
    ]);

  const bySlug = Object.fromEntries((prodRows ?? []).map((r) => [r.slug, r.id]));

  const reviewSeeds = [
    {
      slug: "magnetic-car-phone-holder",
      reviewer_name: "Adaeze Okonkwo",
      reviewer_location: "Lagos Island",
      rating: 5,
      review_text:
        "Received in 2 days after ordering. The phone holder is very solid — holds my iPhone 15 Pro on Third Mainland Bridge with no issues. Exactly as described. 100% recommend!",
      verified: true
    },
    {
      slug: "car-seat-gap-organiser",
      reviewer_name: "Emeka Ike",
      reviewer_location: "Abuja",
      rating: 5,
      review_text:
        "I was skeptical at first because of bad experiences with other vendors. But they confirmed on WhatsApp immediately, gave me a tracking update, and delivered in 3 days. Product is genuine.",
      verified: true
    },
    {
      slug: "lagos-driver-bundle",
      reviewer_name: "Tolu Adeyemi",
      reviewer_location: "Ibadan",
      rating: 5,
      review_text:
        "Bought the bundle deal. Saved ₦2,000 and got both products in one delivery. Customer service is fantastic — they followed up after delivery to make sure I was happy.",
      verified: true
    }
  ];

  const { count: reviewCount, error: reviewCountError } = await supabase
    .from("reviews")
    .select("id", { count: "exact", head: true });

  if (reviewCountError?.code === "PGRST205") {
    console.error(
      "\nTable public.reviews does not exist yet.\n" +
        "In Supabase → SQL Editor, run: supabase/migrations/005_create_reviews_table.sql\n" +
        "Then run: npm run seed   (products are already saved; this will add reviews.)\n"
    );
    console.log("Seed complete (reviews skipped).");
    return;
  }

  if ((reviewCount ?? 0) === 0) {
    let productReviewsOk = 0;
    for (const r of reviewSeeds) {
      const pid = bySlug[r.slug];
      if (!pid) continue;
      const { error } = await supabase.from("reviews").insert({
        product_id: pid,
        reviewer_name: r.reviewer_name,
        reviewer_location: r.reviewer_location,
        rating: r.rating,
        review_text: r.review_text,
        verified: r.verified
      });
      if (error) {
        console.error("Review insert:", error);
        if (error.code === "PGRST205") {
          console.error(
            "Create the table: supabase/migrations/005_create_reviews_table.sql then re-run seed."
          );
        }
      } else {
        productReviewsOk += 1;
      }
    }

  const generalReviews = [
    {
      product_id: null,
      reviewer_name: "Chidi N.",
      reviewer_location: "Lekki, Lagos",
      rating: 5,
      review_text:
        "Straight talk on WhatsApp and product exactly as shown. That is rare. Glad I found Require.",
      verified: true
    },
    {
      product_id: null,
      reviewer_name: "Funke A.",
      reviewer_location: "Abuja",
      rating: 5,
      review_text:
        "Pay on delivery gave me peace of mind. The team was polite and delivery was quick.",
      verified: true
    },
    {
      product_id: null,
      reviewer_name: "Yusuf M.",
      reviewer_location: "Port Harcourt",
      rating: 5,
      review_text:
        "CAC registered mattered to me. Professional from first message to delivery.",
      verified: true
    }
  ];

    let generalReviewsOk = 0;
    for (const r of generalReviews) {
      const { error } = await supabase.from("reviews").insert(r);
      if (error) {
        console.warn("General review:", error.message);
        if (error.code === "PGRST205") {
          console.error(
            "Create the table: supabase/migrations/005_create_reviews_table.sql then re-run seed."
          );
        }
      } else {
        generalReviewsOk += 1;
      }
    }
    console.log(
      `Seeded reviews: ${productReviewsOk} product reviews, ${generalReviewsOk} general reviews.`
    );
  } else {
    console.log("Reviews table not empty — skipping review seed.");
  }

  console.log("Seed complete.");
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
