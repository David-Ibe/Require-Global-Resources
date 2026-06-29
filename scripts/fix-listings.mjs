/**
 * One-off listing fixes: remove off-brand inventory, correct pricing.
 * Usage: npm run fix-listings
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
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
  process.exit(1);
}

const supabase = createClient(url, key, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const DELL_TARGET_PRICE = 1_600_000;

async function main() {
  const { data: active, error: listError } = await supabase
    .from("listings")
    .select("id, title, slug, price, status")
    .eq("status", "Active");

  if (listError) {
    console.error("Failed to load listings:", listError.message);
    process.exit(1);
  }

  console.log(`Active listings: ${active?.length ?? 0}`);

  const deye = (active ?? []).filter((row) =>
    /deye|solar inverter/i.test(row.title)
  );

  for (const row of deye) {
    const { error } = await supabase.from("listings").delete().eq("id", row.id);
    if (error) {
      console.error(`Failed to delete "${row.title}":`, error.message);
    } else {
      console.log(`Deleted off-brand listing: ${row.title} (${row.slug})`);
    }
  }

  const dell = (active ?? []).find((row) =>
    /dell.*pro\s*14/i.test(row.title)
  );

  if (!dell) {
    console.warn("No active Dell Pro 14 listing found — update price manually if needed.");
  } else if (dell.price === DELL_TARGET_PRICE) {
    console.log(`Dell Pro 14 already at ₦${DELL_TARGET_PRICE.toLocaleString()}: ${dell.title}`);
  } else {
    const { error } = await supabase
      .from("listings")
      .update({ price: DELL_TARGET_PRICE })
      .eq("id", dell.id);

    if (error) {
      console.error(`Failed to update Dell price:`, error.message);
      process.exit(1);
    }

    console.log(
      `Updated "${dell.title}": ₦${dell.price.toLocaleString()} → ₦${DELL_TARGET_PRICE.toLocaleString()}`
    );
  }

  const { data: remaining } = await supabase
    .from("listings")
    .select("title, price, slug")
    .eq("status", "Active");

  console.log("\nRemaining active listings:");
  for (const row of remaining ?? []) {
    console.log(`  - ${row.title} | ₦${Number(row.price).toLocaleString()} | /listings/${row.slug}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
