import Link from "next/link";
import Image from "next/image";

import { Mail, MapPin, Phone } from "@/components/icons";
import {
  FacebookIcon,
  InstagramIcon,
  TikTokIcon,
  WhatsAppIcon,
} from "@/components/icons";
import { brand, contact, getWhatsAppLink } from "@/lib/site-config";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/auto", label: "Car Accessories" },
  { href: "/home", label: "Smart Home" },
  { href: "/about", label: "About Us" },
  { href: "/returns", label: "Returns Policy" },
];

const social = [
  { label: "Instagram", href: contact.instagramUrl, icon: InstagramIcon, color: "#E1306C" },
  { label: "TikTok", href: contact.tiktokUrl, icon: TikTokIcon, color: "#EE1D52" },
  { label: "WhatsApp", href: contact.whatsappUrl, icon: WhatsAppIcon, color: "#25D366" },
  { label: "Facebook", href: contact.facebookUrl, icon: FacebookIcon, color: "#1877F2" },
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
          <p className="mt-3 text-sm leading-relaxed text-white/60">
            Smart car and home upgrades for the modern Nigerian.
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
                className="inline-flex items-center gap-2 text-white/70 transition hover:text-white"
              >
                <Phone className="h-3.5 w-3.5 text-rgr-gold" aria-hidden />
                {brand.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${contact.email}`}
                className="inline-flex items-center gap-2 text-white/70 transition hover:text-white"
              >
                <Mail className="h-3.5 w-3.5 text-rgr-gold" aria-hidden />
                {contact.email}
              </a>
            </li>
            <li className="inline-flex items-center gap-2 text-white/50">
              <MapPin className="h-3.5 w-3.5 text-rgr-gold" aria-hidden />
              {brand.location}
            </li>
            <li className="pl-[22px] text-white/50">Mon–Sat 8am–8pm WAT</li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm uppercase tracking-[0.2em] text-rgr-gold">
            Follow Us
          </h3>
          <div className="mt-4 flex flex-wrap gap-3">
            {social.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Follow us on ${s.label}`}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/60 transition hover:border-rgr-gold/40 hover:bg-white/10 hover:text-white"
              >
                <s.icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-rgr-gold/20 px-6 py-6 md:px-10">
        <p className="mx-auto max-w-7xl text-center text-xs text-white/40">
          &copy; {new Date().getFullYear()} {brand.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
