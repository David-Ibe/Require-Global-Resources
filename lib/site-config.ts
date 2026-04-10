export const brand = {
  name: "Require Global Resources",
  shortName: "Require Global Resources",
  tagline: "Verified Smart Upgrades for Your Car & Home",
  oneLiner:
    "Secure checkout, WhatsApp-first support, and nationwide delivery. Pay on delivery in eligible locations.",
  legalName: "Require Trading Limited",
  colors: {
    navy: "#08142A",
    blue: "#1246D6",
    white: "#FFFFFF"
  },
  location: "Lagos, Nigeria",
  phoneDisplay: "+234 802 913 8335",
  website: "requireglobalresources.com"
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
  facebookName: "Require Global",
  facebookUrl: "https://www.facebook.com/people/Require-Global-Resources",
  email: "info@requireglobalresources.com"
} as const;

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://requireglobalresources.com";

/** Default page title, meta description, and OG/Twitter preview text for the site. */
export const defaultSiteTitle = `${brand.shortName} | ${brand.tagline}`;
export const defaultSiteDescription = `${brand.tagline}. ${brand.oneLiner}`;

export function getWhatsAppLink(message: string): string {
  return `https://wa.me/${cleanedWhatsAppNumber}?text=${encodeURIComponent(message)}`;
}
