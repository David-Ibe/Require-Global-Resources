"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "rg-wishlist";

function read(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

function write(slugs: string[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(slugs));
}

export function getWishlist(): string[] {
  return read();
}

export function isWishlisted(slug: string): boolean {
  return read().includes(slug);
}

export function toggleWishlist(slug: string): boolean {
  const current = read();
  const next = current.includes(slug)
    ? current.filter((s) => s !== slug)
    : [...current, slug];
  write(next);
  return next.includes(slug);
}

/** Subscribe to wishlist changes within the same tab. */
export function useWishlist(slug: string) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSaved(isWishlisted(slug));
    const onStorage = () => setSaved(isWishlisted(slug));
    window.addEventListener("storage", onStorage);
    window.addEventListener("rg-wishlist", onStorage);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("rg-wishlist", onStorage);
    };
  }, [slug]);

  function toggle() {
    const nowSaved = toggleWishlist(slug);
    setSaved(nowSaved);
    window.dispatchEvent(new Event("rg-wishlist"));
  }

  return { saved, toggle };
}
