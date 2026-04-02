import Link from "next/link";

import { SocialMediaIcons } from "@/components/SocialMediaIcons";
import { brand, contact, getWhatsAppLink } from "@/lib/site-config";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-6 py-12 md:grid-cols-3 md:px-8">
        {/* BRAND */}
        <div>
          <h2 className="text-lg font-bold text-brand-navy">
            Require <span className="text-brand-electric">Global</span> Resources
          </h2>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-slate-600">
            {brand.tagline}
          </p>
          <p className="mt-4 text-xs text-slate-400">
            Trusted by customers across Lagos&nbsp;&amp;&nbsp;nationwide
          </p>
        </div>

        {/* LINKS */}
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-900">
            Quick Links
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-slate-600">
            <li>
              <Link href="/#products" className="transition-colors duration-200 hover:text-slate-900">
                Products
              </Link>
            </li>
            <li>
              <Link href="/contact" className="transition-colors duration-200 hover:text-slate-900">
                Contact
              </Link>
            </li>
            <li>
              <Link
                href={getWhatsAppLink("Hi, I want to place an order.")}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors duration-200 hover:text-slate-900"
              >
                WhatsApp Order
              </Link>
            </li>
            <li>
              <Link href="/privacy-policy" className="transition-colors duration-200 hover:text-slate-900">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="transition-colors duration-200 hover:text-slate-900">
                Terms
              </Link>
            </li>
          </ul>
        </div>

        {/* CONTACT */}
        <div className="space-y-6">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-900">
              Follow Us
            </h3>
            <div className="mt-4">
              <SocialMediaIcons variant="footer" />
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-900">
              Contact
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-600">
              <li>
                <Link
                  href={getWhatsAppLink("Hi, I have a question.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors duration-200 hover:text-slate-900"
                >
                  WhatsApp: +{contact.whatsappNumber}
                </Link>
              </li>
              <li>
                <Link
                  href={`mailto:${contact.email}`}
                  className="transition-colors duration-200 hover:text-slate-900"
                >
                  {contact.email}
                </Link>
              </li>
              <li>{brand.location}</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-200 py-5 text-center text-xs text-slate-500">
        &copy; {new Date().getFullYear()} {brand.name}
      </div>
    </footer>
  );
}
