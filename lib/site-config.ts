export const brand = {
  name: "Require Global Resources",
  shortName: "Require Global Resources",
  tagline: "Verified. Delivered. Trusted.",
  oneLiner:
    "Smart car and home upgrade products for the modern Nigerian.",
  corePromise:
    "Every product verified before it reaches you. Pay only when it arrives.",
  positioning: "Not the cheapest. The most trusted.",
  legalName: "Require Trading Limited",
  colors: {
    navy: "#08142A",
    blue: "#1246D6",
    blueLight: "#2563EB",
    gold: "#F5A623",
    white: "#FFFFFF",
  },
  location: "Lagos, Nigeria",
  phoneDisplay: "+234 802 913 8335",
  website: "requireglobalresources.com",
} as const;

const configuredWhatsAppNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "2348029138335";
const cleanedWhatsAppNumber =
  configuredWhatsAppNumber.replace(/[^\d]/g, "") || "2348029138335";

export const contact = {
  whatsappNumber: configuredWhatsAppNumber,
  whatsappUrl: `https://wa.me/${cleanedWhatsAppNumber}`,
  instagramHandle: "@requireglobalresources",
  instagramUrl: "https://www.instagram.com/requireglobalresources",
  tiktokHandle: "@requireglobalresources",
  tiktokUrl: "https://www.tiktok.com/@requireglobalresources",
  facebookName: "Require Global Resources",
  facebookUrl: "https://www.facebook.com/people/Require-Global-Resources",
  email: "info@requireglobalresources.com",
} as const;

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://requireglobalresources.com";

export const defaultSiteTitle =
  "Require Global Resources — Verified Car & Home Products. Delivered Nigeria-Wide.";
export const defaultSiteDescription =
  "Shop verified car accessories and home upgrade products. Pay on delivery. Delivered anywhere in Nigeria in 2–5 days. CAC registered Nigerian business.";

export function getWhatsAppLink(message: string): string {
  return `https://wa.me/${cleanedWhatsAppNumber}?text=${encodeURIComponent(message)}`;
}
