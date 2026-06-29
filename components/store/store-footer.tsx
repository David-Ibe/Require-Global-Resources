import Link from "next/link";
import Image from "next/image";

import { Container } from "@/components/ui/container";
import { brand, contact } from "@/lib/site-config";

const footerColumns = [
  {
    title: "Shop",
    links: [
      { href: "/listings", label: "All Products" },
      { href: "/laptops", label: "Laptops" },
      { href: "/smartphones", label: "Smartphones" },
      { href: "/audio", label: "Audio" },
      { href: "/listings?category=gaming", label: "Gaming" },
    ],
  },
  {
    title: "Brands",
    links: [
      { href: "/brands/apple", label: "Apple" },
      { href: "/brands/dell", label: "Dell" },
      { href: "/brands/lenovo", label: "Lenovo" },
      { href: "/brands/hp", label: "HP" },
      { href: "/brands", label: "View All" },
    ],
  },
  {
    title: "Business",
    links: [
      { href: "/business", label: "Procurement" },
      { href: "/business#quotations", label: "Quotations" },
      { href: "/business#volume", label: "Volume Pricing" },
      { href: "/sell", label: "Sell With Us" },
    ],
  },
  {
    title: "Support",
    links: [
      { href: "/faq", label: "FAQ" },
      { href: "/grading", label: "Grading Guide" },
      { href: "/returns", label: "Returns" },
      { href: contact.whatsappUrl, label: "WhatsApp", external: true },
      { href: `mailto:${contact.email}`, label: "Contact" },
    ],
  },
  {
    title: "About",
    links: [
      { href: "/about", label: "Our Story" },
      { href: "/privacy-policy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms" },
    ],
  },
] as const;

export function StoreFooter() {
  return (
    <footer className="border-t border-border bg-surface pt-12 pb-8">
      <Container>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-6">
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <Image
                src="/logo-mark.png"
                alt=""
                width={32}
                height={32}
                className="h-8 w-8"
              />
              <span className="text-sm font-semibold text-navy">
                {brand.shortName}
              </span>
            </Link>
            <p className="mt-1.5 text-[13px] text-muted">
              {brand.tagline}
            </p>
            <p className="mt-2 text-xs text-muted">{brand.location}</p>
          </div>

          {footerColumns.map((column) => (
            <div key={column.title}>
              <h3 className="mb-4 text-[13px] font-semibold uppercase tracking-[0.06em] text-navy">
                {column.title}
              </h3>
              <ul className="space-y-0">
                {column.links.map((link) => (
                  <li key={link.label} className="leading-8">
                    {"external" in link && link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[13px] text-muted transition hover:text-navy"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-[13px] text-muted transition hover:text-navy"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-[13px] text-muted">
            <a href={contact.instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-navy">
              Instagram
            </a>
            <a href={contact.tiktokUrl} target="_blank" rel="noopener noreferrer" className="hover:text-navy">
              TikTok
            </a>
            <a href={contact.facebookUrl} target="_blank" rel="noopener noreferrer" className="hover:text-navy">
              Facebook
            </a>
          </div>
          <div className="text-[13px] text-muted">
            <span>Bank Transfer · Paystack</span>
            <span className="mx-3 text-border">|</span>
            <span>Mon–Sat 9am–6pm WAT</span>
          </div>
        </div>

        <p className="mt-8 border-t border-border pt-5 text-center text-xs text-quiet">
          &copy; {new Date().getFullYear()} {brand.legalName}. CAC {brand.cacNumber}.
          All rights reserved.
        </p>
      </Container>
    </footer>
  );
}
