export type ListingCondition =
  | "New Sealed"
  | "New Open Box"
  | "Used - Grade A"
  | "Used - Grade B";

export type ListingProof = {
  label: string;
  detail: string;
};

export type ListingSpec = {
  label: string;
  value: string;
};

export type TrustScore = {
  source: number;
  condition: number;
  battery: number;
  serial: number;
  accessories: number;
  packaging: number;
};

export type VerificationEntry = {
  label: string;
  value: string;
  screenshotUrl?: string;
  note?: string;
};

export type ListingFaq = {
  q: string;
  a: string;
};

export type Listing = {
  slug: string;
  name: string;
  headline: string;
  category: string;
  brand: string;
  condition: ListingCondition;
  conditionNote?: string;
  sourceMarket: string;
  serialMasked: string;
  availability: string;
  askingPriceNGN: number;
  comparePriceNGN?: number;
  comparePriceNote?: string;
  description: string;
  specs: ListingSpec[];
  proof: ListingProof[];
  disclosures: string[];
  images: string[];
  status: "available" | "reserved" | "sold";
  badge?: string;
  createdAt: string;
  trustScore: TrustScore;
  verificationReport: VerificationEntry[];
  inspector: string;
  inspectionDate: string;
  inspectionVideoUrl?: string;
  inspectionVideoPoster?: string;
  faq: ListingFaq[];
};

export type RecentSale = {
  productName: string;
  category: string;
  buyerCity: string;
  soldDaysAgo: number;
};

export function formatNgn(value: number): string {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(value);
}
