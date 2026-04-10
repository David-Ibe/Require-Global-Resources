"use client";

import { BadgeCheck, Menu, MessageCircle, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { brand, getWhatsAppLink } from "@/lib/site-config";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/auto", label: "Car Accessories" },
  { href: "/home", label: "Smart Home" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const whatsappHref = getWhatsAppLink(
  `Hi ${brand.shortName}, I'd like to place an order.`
);

export function StoreNavbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-[100] bg-rgr-navy transition-shadow duration-300 ${
        scrolled ? "shadow-[0_4px_20px_rgba(0,0,0,0.25)]" : ""
      }`}
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 md:h-16 md:px-8">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo-mark.png"
            alt={`${brand.shortName} logo`}
            width={40}
            height={40}
            className="h-9 w-9 md:h-10 md:w-10"
            priority
          />
          <div className="flex flex-col">
            <span className="font-display text-lg tracking-wide text-white md:text-xl">
              {brand.shortName.toUpperCase()}
            </span>
            <span className="hidden text-[10px] font-medium tracking-wider text-white/50 md:block">
              Verified Smart Upgrades for Your Car &amp; Home
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`font-display text-sm uppercase tracking-wider transition hover:text-rgr-gold ${
                pathname === item.href ? "text-rgr-gold" : "text-white/80"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <span className="hidden items-center gap-1.5 rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1.5 text-xs font-semibold text-green-400 md:inline-flex">
            <BadgeCheck className="h-3.5 w-3.5" />
            CAC Reg.
          </span>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-lg bg-[#25D366] px-4 py-2 text-sm font-bold text-white transition hover:bg-[#20bd5a] sm:inline-flex"
          >
            <MessageCircle className="h-4 w-4" />
            Order on WhatsApp
          </a>
          <button
            type="button"
            className="rounded-lg p-2 text-white lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 top-14 z-[99] bg-rgr-navy lg:hidden">
          <div className="flex h-full flex-col px-6 py-8">
            <nav className="flex flex-col gap-1">
              {navLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-xl px-4 py-3.5 font-display text-lg uppercase tracking-wider transition ${
                    pathname === item.href
                      ? "bg-white/10 text-rgr-gold"
                      : "text-white/80 hover:bg-white/5"
                  }`}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="mt-6 border-t border-white/10 pt-6">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1.5 text-xs font-semibold text-green-400">
                <BadgeCheck className="h-3.5 w-3.5" />
                CAC Registered Business
              </span>
            </div>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-4 font-display text-base uppercase tracking-wider text-white"
              onClick={() => setOpen(false)}
            >
              <MessageCircle className="h-5 w-5" />
              Order on WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
