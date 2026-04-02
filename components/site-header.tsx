"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { brand } from "@/lib/site-config";

const navItems = [
  { href: "/#products", label: "Products" },
  { href: "/#about", label: "About" },
  { href: "/contact", label: "Contact" }
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/95 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/90">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 md:px-8">
        <Link href="/" className="text-lg font-bold text-brand-navy">
          Require <span className="text-brand-electric">Global</span> Resources
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-brand-dark transition hover:text-brand-electric"
            >
              {item.label}
            </Link>
          ))}
          <span className="rounded-full bg-brand-navy px-3 py-1 text-xs font-semibold text-white">
            Registered Nigerian Business
          </span>
        </nav>

        <button
          type="button"
          className="md:hidden"
          aria-label="Toggle menu"
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-slate-100 bg-white md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-brand-dark"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <p className="text-xs font-semibold text-brand-navy">
              Registered Nigerian Business - {brand.name}
            </p>
          </div>
        </div>
      ) : null}
    </header>
  );
}
