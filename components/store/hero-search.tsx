"use client";

import { Search } from "@/components/icons";
import { cn } from "@/lib/cn";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

type Props = {
  className?: string;
};

export function HeroSearch({ className }: Props) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  function submit(e: FormEvent) {
    e.preventDefault();
    const q = query.trim();
    router.push(q ? `/listings?q=${encodeURIComponent(q)}` : "/listings");
  }

  return (
    <form
      onSubmit={submit}
      role="search"
      aria-label="Search products"
      className={cn("mx-auto w-full max-w-2xl", className)}
    >
      <div className="relative">
        <Search
          className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-400 md:left-6 md:h-6 md:w-6"
          aria-hidden
        />
        <input
          type="search"
          name="q"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search MacBook, ThinkPad, iPhone..."
          autoComplete="off"
          className="w-full rounded-xl border border-neutral-200 bg-neutral-50 py-4 pl-14 pr-5 text-base text-neutral-900 placeholder:text-neutral-400 transition focus:border-neutral-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-neutral-300 md:py-5 md:pl-16 md:text-lg"
        />
      </div>
    </form>
  );
}
