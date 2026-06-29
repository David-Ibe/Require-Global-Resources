"use client";

import { Menu, ShoppingCart, User, X } from "@/components/icons";
import { WhatsAppIcon } from "@/components/icons";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { MarketplaceSearch } from "@/components/store/marketplace-search";
import { NavWishlistLink } from "@/components/store/nav-wishlist-link";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/cn";
import { brand, getWhatsAppLink } from "@/lib/site-config";

const navLinks = [
  { href: "/listings", label: "Shop" },
  { href: "/brands", label: "Brands" },
  { href: "/business", label: "Business" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "Support" },
] as const;

const whatsappHref = getWhatsAppLink(
  `Hi ${brand.shortName}, I'd like help finding the right product.`
);

export function StoreNavbar() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const solid = scrolled || open || pathname !== "/";
  const isHome = pathname === "/";

  return (
    <header
      className={cn(
        "sticky top-0 z-[100] transition-colors duration-300",
        solid
          ? "border-b border-border bg-white/95 shadow-nav backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <Container>
        <div className="flex h-[4.25rem] items-center gap-3 md:h-[4.75rem] md:gap-4">
          <Link href="/" className="flex shrink-0 items-center gap-2.5">
            <Image
              src="/logo-mark.png"
              alt={`${brand.shortName} logo`}
              width={36}
              height={36}
              className="h-9 w-9"
              priority
            />
            <span className="hidden text-sm font-semibold tracking-tight text-neutral-900 sm:block">
              {brand.shortName}
            </span>
          </Link>

          <nav className="hidden items-center gap-6 xl:flex">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm text-muted transition hover:text-neutral-900",
                  pathname === item.href && "font-medium text-neutral-900"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden min-w-0 flex-1 md:block md:max-w-sm lg:max-w-md xl:max-w-lg">
            <MarketplaceSearch compact />
          </div>

          <div className="ml-auto flex items-center gap-1 sm:gap-2">
            <button
              type="button"
              className="rounded-xl p-2 text-muted hover:bg-neutral-100 md:hidden"
              aria-label="Search"
              onClick={() => setSearchOpen((v) => !v)}
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </button>

            <NavWishlistLink className="hidden sm:flex" />

            <Link
              href="/listings"
              className="hidden h-10 w-10 items-center justify-center rounded-xl text-muted transition hover:bg-neutral-100 hover:text-neutral-900 sm:flex"
              aria-label="Cart"
            >
              <ShoppingCart className="h-5 w-5" />
            </Link>

            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden min-h-[40px] items-center gap-2 rounded-full bg-[#25D366] px-4 text-sm font-medium text-white transition hover:bg-[#20bd5a] lg:inline-flex"
            >
              <WhatsAppIcon size={16} />
              <span className="hidden xl:inline">WhatsApp</span>
            </a>

            <Link
              href="/listings"
              className="hidden h-10 w-10 items-center justify-center rounded-xl text-muted transition hover:bg-neutral-100 hover:text-neutral-900 xl:flex"
              aria-label="Account"
            >
              <User className="h-5 w-5" />
            </Link>

            <button
              type="button"
              className="rounded-xl p-2 text-neutral-700 xl:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {searchOpen && (
          <div className="border-t border-border py-3 md:hidden">
            <MarketplaceSearch autoFocus onClose={() => setSearchOpen(false)} />
          </div>
        )}
      </Container>

      {open && (
        <div className="fixed inset-0 top-[4.25rem] z-[99] bg-page xl:hidden">
          <Container className="flex h-full flex-col py-8">
            <div className="mb-6 md:hidden">
              <MarketplaceSearch onClose={() => setOpen(false)} />
            </div>
            <nav className="flex flex-col gap-1">
              {navLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "rounded-xl px-4 py-3.5 text-lg text-neutral-800 transition hover:bg-white",
                    pathname === item.href && "bg-white font-medium"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="mt-6 flex gap-4">
              <NavWishlistLink />
              <Link
                href="/listings"
                className="flex h-10 w-10 items-center justify-center rounded-xl text-muted hover:bg-white"
                aria-label="Cart"
              >
                <ShoppingCart className="h-5 w-5" />
              </Link>
            </div>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="mt-8 inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 text-base font-medium text-white"
            >
              <WhatsAppIcon size={20} />
              Chat on WhatsApp
            </a>
          </Container>
        </div>
      )}
    </header>
  );
}
