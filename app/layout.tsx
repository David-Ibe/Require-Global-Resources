import type { Metadata, Viewport } from "next";
import { Bebas_Neue, DM_Sans } from "next/font/google";
import { Suspense } from "react";

import { AnalyticsProvider } from "@/components/analytics-provider";
import { ClientMetrics } from "@/components/client-metrics";
import { brand, contact, defaultSiteDescription, defaultSiteTitle, siteUrl } from "@/lib/site-config";

import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm"
});

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-bebas"
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultSiteTitle,
    template: `%s | ${brand.shortName}`
  },
  description: defaultSiteDescription,
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || ""
  },
  other: {
    "facebook-domain-verification":
      process.env.NEXT_PUBLIC_FACEBOOK_DOMAIN_VERIFICATION || ""
  },
  openGraph: {
    title: defaultSiteTitle,
    description: defaultSiteDescription,
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
  },
  twitter: {
    card: "summary_large_image",
    title: defaultSiteTitle,
    description: defaultSiteDescription,
    images: ["/og-default.svg"]
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#08142A"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dmSans.variable} ${bebasNeue.variable} font-sans antialiased`}
      >
        <Suspense fallback={null}>
          <AnalyticsProvider />
        </Suspense>
        {children}
        <ClientMetrics />
      </body>
    </html>
  );
}
