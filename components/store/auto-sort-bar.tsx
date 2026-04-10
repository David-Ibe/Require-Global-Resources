"use client";

import { useRouter, useSearchParams } from "next/navigation";

const options = [
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low → High" },
  { value: "price-desc", label: "Price: High → Low" },
] as const;

export function AutoSortBar({ count }: { count: number }) {
  const router = useRouter();
  const params = useSearchParams();
  const current = params.get("sort") ?? "newest";

  function handleChange(value: string) {
    const sp = new URLSearchParams(params.toString());
    if (value === "newest") sp.delete("sort");
    else sp.set("sort", value);
    router.replace(`?${sp.toString()}`, { scroll: false });
  }

  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
      <p className="text-sm text-rgr-gray500">
        Showing{" "}
        <span className="font-semibold text-rgr-navy">{count}</span>{" "}
        {count === 1 ? "product" : "products"}
      </p>
      <div className="flex items-center gap-2">
        <label htmlFor="auto-sort" className="text-xs text-rgr-gray500">
          Sort by
        </label>
        <select
          id="auto-sort"
          value={current}
          onChange={(e) => handleChange(e.target.value)}
          className="rounded-lg border border-rgr-gray300/60 bg-white px-3 py-1.5 text-xs text-rgr-navy outline-none transition focus:border-rgr-blue focus:ring-1 focus:ring-rgr-blue/30"
        >
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
