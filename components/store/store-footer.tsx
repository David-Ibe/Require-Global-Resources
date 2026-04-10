import Link from "next/link";
import Image from "next/image";

import { TrackedWhatsAppLink } from "@/components/store/tracked-whatsapp-link";
import { brand, contact, getWhatsAppLink } from "@/lib/site-config";
import { waEntryQuestion } from "@/lib/whatsapp-sales";

const links = [
  { href: "/#products", label: "Products" },
  { href: "/#how-it-works", label: "How it works" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/returns", label: "Returns" }
];

const social = [
  { label: "Instagram", href: contact.instagramUrl },
  { label: "TikTok", href: contact.tiktokUrl },
  { label: "Facebook", href: contact.facebookUrl }
] as const;

export function StoreFooter() {
  const waQuestion = getWhatsAppLink(waEntryQuestion());

  return (
    <footer className="border-t border-rgr-gray300/40 bg-rgr-navy text-rgr-gray300">
      <div className="mx-auto grid w-full max-w-7xl gap-12 px-6 py-16 md:grid-cols-2 md:px-10 lg:grid-cols-4">
        <div>
          <Link href="/" className="inline-flex items-center gap-2.5">
            <Image
              src="/logo-mark.png"
              alt=""
              width={40}
              height={40}
              className="h-9 w-9"
            />
            <span className="text-lg font-semibold tracking-tight text-white">
              {brand.shortName}
            </span>
          </Link>
          <p className="mt-4 text-sm leading-relaxed text-white/85">
            {brand.tagline}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-rgr-gray300">
            {brand.oneLiner}
          </p>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
            Links
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
            Social
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {social.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition hover:text-white"
                >
                  {s.label}
                </a>
              </li>
            ))}
            <li>
              <TrackedWhatsAppLink
                href={waQuestion}
                eventLabel="Footer — Message on WhatsApp"
                className="transition hover:text-white"
              >
                Message on WhatsApp
              </TrackedWhatsAppLink>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
            Contact
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <a
                href={`tel:+${contact.whatsappNumber.replace(/\D/g, "")}`}
                className="hover:text-white"
              >
                {brand.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${contact.email}`} className="hover:text-white">
                {contact.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 px-6 py-6 text-center text-xs leading-relaxed text-rgr-gray500 md:px-10">
        <p>© 2026 {brand.name}. All rights reserved.</p>
      </div>
    </footer>
  );
}
