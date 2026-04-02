import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { AnalyticsProvider } from "@/components/analytics-provider";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { brand, siteUrl } from "@/lib/site-config";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Require Global Resources | Quality Products Delivered Across Nigeria",
    template: "%s"
  },
  description:
    "Quality products delivered across Nigeria with secure WhatsApp ordering.",
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || ""
  },
  other: {
    "facebook-domain-verification": process.env.NEXT_PUBLIC_FACEBOOK_DOMAIN_VERIFICATION || "",
  },
  openGraph: {
    title: "Require Global Resources | Quality Products Delivered Across Nigeria",
    description:
      "Quality products delivered across Nigeria with secure WhatsApp ordering.",
    type: "website",
    locale: "en_NG",
    url: siteUrl,
    siteName: brand.shortName,
    images: [
      {
        url: "/og-default.svg",
        width: 1200,
        height: 630,
        alt: `${brand.shortName} website`
      }
    ]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AnalyticsProvider />
        <SiteHeader />
        <main>{children}</main>
        <FloatingWhatsApp />
        <SiteFooter />
      </body>
    </html>
  );
}
