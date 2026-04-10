"use client";

import { HelpCircle, Menu, User, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { StoreSearch } from "@/components/store/store-search";
import { brand } from "@/lib/site-config";

const nav = [
  { href: "/", label: "Home" },
  { href: "/#products", label: "Products" },
  { href: "/#how-it-works", label: "How it works" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" }
];

export function StoreNavbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-[100] transition-shadow duration-200 ${
        scrolled ? "shadow-md" : "shadow-sm"
      }`}
    >
      <div className="border-b border-rgr-gray300/50 bg-rgr-surface/95 backdrop-blur supports-[backdrop-filter]:bg-rgr-surface/90">
        <div className="mx-auto flex w-full max-w-7xl items-center gap-3 px-4 py-3 md:gap-6 md:px-8">
          <Link href="/" className="flex min-w-0 shrink-0 items-center gap-2.5">
            <Image
              src="/logo-mark.png"
              alt={`${brand.shortName} logo`}
              width={40}
              height={40}
              className="h-9 w-9 shrink-0 md:h-10 md:w-10"
              priority
            />
            <span className="text-xs font-semibold tracking-[0.14em] text-rgr-navy sm:text-sm md:text-base">
              {brand.shortName.toUpperCase()}
            </span>
          </Link>

          <StoreSearch />

          <div className="flex shrink-0 items-center gap-1 sm:gap-2">
            <Link
              href="/contact"
              className="hidden items-center gap-1.5 rounded-lg px-2 py-2 text-sm font-medium text-rgr-navy transition hover:bg-rgr-gray100 sm:px-3 md:inline-flex"
            >
              <User className="h-5 w-5 shrink-0" aria-hidden />
              <span>Contact</span>
            </Link>
            <button
              type="button"
              className="rounded-lg p-2 text-rgr-navy lg:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      <div className="hidden border-b border-rgr-gray300/40 bg-[#fafafa] lg:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-2.5">
          <nav className="flex flex-wrap items-center gap-x-8 gap-y-1">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition hover:text-rgr-navy ${
                  pathname === item.href.split("#")[0]
                    ? "text-rgr-navy"
                    : "text-rgr-gray700"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-rgr-gray600 transition hover:text-rgr-navy"
          >
            <HelpCircle className="h-4 w-4" aria-hidden />
            Help
          </Link>
        </div>
      </div>

      {open ? (
        <div className="border-b border-rgr-gray300/50 bg-rgr-surface lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-0.5 px-4 py-3">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-rgr-gray700"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="mt-1 inline-flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-rgr-gray700"
              onClick={() => setOpen(false)}
            >
              <HelpCircle className="h-4 w-4" aria-hidden />
              Help
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
