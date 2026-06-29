import { ElectronicsHero } from "@/components/store/electronics-hero";
import { TrustedBrands } from "@/components/store/trusted-brands";
import { ShopByCategory } from "@/components/store/shop-by-category";
import { ElectronicsListingsGrid } from "@/components/store/electronics-listings-grid";
import { WhyRequireGlobal } from "@/components/store/why-require-global";
import { ProcurementBanner } from "@/components/store/procurement-banner";
import { CustomerReviews } from "@/components/store/customer-reviews";
import { fetchActiveListings } from "@/lib/os-listings";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const listings = await fetchActiveListings();

  return (
    <div className="bg-page">
      <ElectronicsHero />
      <TrustedBrands />
      <ShopByCategory />
      <ElectronicsListingsGrid
        listings={listings}
        limit={6}
        heading="Featured Products"
        ctaHref="/listings"
        ctaLabel="View all"
      />
      <WhyRequireGlobal />
      <ProcurementBanner />
      <CustomerReviews />
    </div>
  );
}
