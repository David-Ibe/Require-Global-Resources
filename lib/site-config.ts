export const brand = {
  name: "Require Global",
  shortName: "Require Global",
  tagline: "Genuine Electronics. Delivered.",
  oneLiner:
    "Consumer electronics for Nigeria — laptops, smartphones and audio with clear specs and nationwide delivery.",
  shortPitch:
    "Laptops, smartphones, audio and tech — carefully selected and delivered across Nigeria.",
  legalName: "Require Trading Limited",
  cacNumber: "7879319",
  parentCompany: "Require Holdings",
  colors: {
    navy: "#0D1F3C",
    accent: "#E8601C",
    blue: "#0D1F3C",
    blueLight: "#1a3a6b",
    gold: "#E8601C",
    white: "#FFFFFF",
    background: "#F5F7FA",
  },
  location: "Lagos, Nigeria",
  phoneDisplay: "+234 802 913 8335",
  website: "requireglobal.ng",
} as const;

const configuredWhatsAppNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "2348029138335";
const cleanedWhatsAppNumber =
  configuredWhatsAppNumber.replace(/[^\d]/g, "") || "2348029138335";

export const contact = {
  whatsappNumber: configuredWhatsAppNumber,
  whatsappUrl: `https://wa.me/${cleanedWhatsAppNumber}`,
  instagramHandle: "@requireglobalng",
  instagramUrl:
    process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "https://www.instagram.com/requireglobalng",
  tiktokHandle: "@requireglobalng",
  tiktokUrl:
    process.env.NEXT_PUBLIC_TIKTOK_URL ?? "https://www.tiktok.com/@requireglobalng",
  facebookName: "Require Global",
  facebookUrl:
    process.env.NEXT_PUBLIC_FACEBOOK_URL ?? "https://www.facebook.com/requireglobalng",
  email: "info@requireglobal.ng",
  jijiUrl: process.env.NEXT_PUBLIC_JIJI_URL ?? "https://jiji.ng",
} as const;

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://requireglobal.ng";

export const defaultSiteTitle =
  "Require Global — Genuine Electronics. Delivered.";
export const defaultSiteDescription =
  "Laptops, smartphones, audio and consumer electronics — clear specifications, transparent condition grading and nationwide delivery across Nigeria.";

export function getWhatsAppLink(message: string): string {
  return `https://wa.me/${cleanedWhatsAppNumber}?text=${encodeURIComponent(message)}`;
}
