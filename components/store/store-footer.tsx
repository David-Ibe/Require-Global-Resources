import Link from "next/link";
import Image from "next/image";

import { brand, contact, getWhatsAppLink } from "@/lib/site-config";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/auto", label: "Car Accessories" },
  { href: "/home", label: "Smart Home" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact Us" },
  { href: "/returns", label: "Returns Policy" },
];

const social = [
  { label: "📸 Instagram", href: contact.instagramUrl },
  { label: "🎵 TikTok", href: contact.tiktokUrl },
  { label: "💬 WhatsApp", href: contact.whatsappUrl },
  { label: "👥 Facebook", href: contact.facebookUrl },
] as const;

export function StoreFooter() {
  return (
    <footer className="bg-rgr-navy text-rgr-gray300">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-6 py-16 md:grid-cols-2 md:px-10 lg:grid-cols-4 lg:gap-8">
        <div className="lg:col-span-1">
          <Link href="/" className="inline-flex items-center gap-3">
            <Image
              src="/logo-mark.png"
              alt=""
              width={40}
              height={40}
              className="h-10 w-10"
            />
            <span className="font-display text-xl tracking-wide text-white">
              {brand.shortName.toUpperCase()}
            </span>
          </Link>
          <p className="mt-3 font-display text-sm uppercase tracking-wider text-rgr-gold">
            Verified. Delivered. Trusted.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-white/60">
            Smart car and home upgrade products for the modern Nigerian.
            Every product verified before it reaches you.
          </p>
          <p className="mt-3 text-xs text-white/40">
            A trading brand of {brand.legalName}
          </p>
          <p className="text-xs text-white/40">
            CAC Registered &middot; {brand.location}
          </p>
        </div>

        <div>
          <h3 className="font-display text-sm uppercase tracking-[0.2em] text-rgr-gold">
            Quick Links
          </h3>
          <ul className="mt-4 space-y-3">
            {quickLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-sm text-white/70 transition hover:text-white"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm uppercase tracking-[0.2em] text-rgr-gold">
            Contact Us
          </h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a
                href={`tel:+${contact.whatsappNumber.replace(/\D/g, "")}`}
                className="text-white/70 transition hover:text-white"
              >
                📱 {brand.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${contact.email}`}
                className="text-white/70 transition hover:text-white"
              >
                📧 {contact.email}
              </a>
            </li>
            <li className="text-white/50">📍 {brand.location}</li>
            <li className="text-white/50">🕐 Mon–Sat 8am–8pm WAT</li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm uppercase tracking-[0.2em] text-rgr-gold">
            Follow Us
          </h3>
          <div className="mt-4 flex flex-wrap gap-2">
            {social.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/10 px-3 py-1.5 text-sm text-white/60 transition hover:border-rgr-gold/40 hover:text-white"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-rgr-gold/20 px-6 py-6 md:px-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 text-xs text-white/40 md:flex-row">
          <p>
            &copy; {new Date().getFullYear()} {brand.name}. All rights
            reserved. A trading brand of {brand.legalName}.
          </p>
          <p>
            CAC Registered &middot; {brand.location}
          </p>
        </div>
      </div>
    </footer>
  );
}
