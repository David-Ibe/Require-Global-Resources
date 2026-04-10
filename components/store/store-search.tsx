"use client";

import { Search } from "@/components/icons";
import { FormEvent } from "react";

function scrollToProducts() {
  document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
}

export function StoreSearch() {
  function goToProducts(e: FormEvent) {
    e.preventDefault();
    scrollToProducts();
  }

  return (
    <>
      <button
        type="button"
        onClick={scrollToProducts}
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-rgr-gray300/80 bg-rgr-gray100/90 text-rgr-gray700 transition hover:bg-rgr-gray100 md:hidden"
        aria-label="Search products"
      >
        <Search className="h-4 w-4" aria-hidden />
      </button>
      <form
        onSubmit={goToProducts}
        className="mx-auto hidden min-w-0 max-w-xl flex-1 md:flex"
        role="search"
        aria-label="Search products"
      >
        <label className="flex w-full cursor-text items-center gap-2.5 rounded-full border border-rgr-gray300/80 bg-rgr-gray100/90 px-4 py-2.5 text-rgr-gray500 shadow-sm transition focus-within:border-rgr-navy/25 focus-within:bg-white focus-within:ring-2 focus-within:ring-rgr-navy/10">
          <Search className="h-4 w-4 shrink-0 text-rgr-gray500" aria-hidden />
          <input
            type="search"
            name="q"
            placeholder="Search your products here"
            className="min-w-0 flex-1 bg-transparent text-sm text-rgr-navy placeholder:text-rgr-gray500 focus:outline-none"
            autoComplete="off"
          />
        </label>
      </form>
    </>
  );
}
