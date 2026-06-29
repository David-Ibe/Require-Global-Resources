"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { ListingCard } from "@/components/store/listing-card";
import { Container } from "@/components/ui/container";
import { MarketplaceSearch } from "@/components/store/marketplace-search";
import {
  filterListings,
  getUniqueFilterOptions,
  type ListingFilters,
  type SortOption,
} from "@/lib/listing-search";
import type { Listing } from "@/lib/electronics-listings";
import { cn } from "@/lib/cn";

type Props = {
  listings: Listing[];
  showHeader?: boolean;
  className?: string;
};

const selectClass =
  "w-full rounded-lg border border-border bg-surface px-2.5 py-[7px] text-[13px] text-neutral-700 focus:border-navy focus:outline-none focus:ring-0";

const filterLabelClass =
  "mb-2 block text-[11px] font-semibold uppercase tracking-[0.06em] text-quiet";

export function ListingsCatalog({ listings, showHeader = true, className }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [moreFiltersOpen, setMoreFiltersOpen] = useState(false);

  const filters: ListingFilters = useMemo(
    () => ({
      q: searchParams.get("q") ?? undefined,
      category: searchParams.get("category") ?? undefined,
      brand: searchParams.get("brand") ?? undefined,
      condition: (searchParams.get("condition") as ListingFilters["condition"]) ?? undefined,
      minPrice: searchParams.get("minPrice")
        ? Number(searchParams.get("minPrice"))
        : undefined,
      maxPrice: searchParams.get("maxPrice")
        ? Number(searchParams.get("maxPrice"))
        : undefined,
      ram: searchParams.get("ram") ?? undefined,
      storage: searchParams.get("storage") ?? undefined,
      processor: searchParams.get("processor") ?? undefined,
      availability: (searchParams.get("availability") as ListingFilters["availability"]) ?? "available",
      sort: (searchParams.get("sort") as SortOption) ?? "newest",
    }),
    [searchParams]
  );

  const options = useMemo(() => getUniqueFilterOptions(listings), [listings]);

  const filtered = useMemo(
    () => filterListings(listings.filter((l) => l.status !== "sold"), filters),
    [listings, filters]
  );

  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    const qs = params.toString();
    router.replace(qs ? `?${qs}` : "?", { scroll: false });
  }

  return (
    <div className={cn("bg-surface", className)}>
      {showHeader && (
        <header className="bg-highlight pt-14 pb-12 md:pt-[4.5rem] md:pb-14">
          <Container>
            <h1 className="text-hero-title text-navy">Shop</h1>
            <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-neutral-700">
              Live inventory from Require Global — spec, condition and price up front.
            </p>
            <div className="mt-10 max-w-2xl">
              <MarketplaceSearch defaultValue={filters.q ?? ""} large />
            </div>
          </Container>
        </header>
      )}

      <Container className={showHeader ? "py-10 md:py-14" : "py-6 md:py-8"}>
        <div className="flex flex-col gap-10 lg:flex-row lg:gap-10">
          <aside className="bg-page lg:w-[220px] lg:shrink-0 lg:rounded-xl lg:p-4">
            <div className="space-y-0">
              <div>
                <FilterSelect
                  label="Brand"
                  value={filters.brand ?? ""}
                  onChange={(v) => updateParam("brand", v)}
                  options={options.brands}
                />
              </div>

              <div className="mt-5">
                <p className={filterLabelClass}>Price</p>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={filters.minPrice ?? ""}
                    onChange={(e) => updateParam("minPrice", e.target.value)}
                    className={selectClass}
                    min={0}
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={filters.maxPrice ?? ""}
                    onChange={(e) => updateParam("maxPrice", e.target.value)}
                    className={selectClass}
                    min={0}
                  />
                </div>
              </div>

              <div className="mt-5">
                <FilterSelect
                  label="Availability"
                  value={filters.availability ?? "available"}
                  onChange={(v) => updateParam("availability", v)}
                  options={["available", "reserved", "all"]}
                  labels={{
                    available: "Available",
                    reserved: "Reserved",
                    all: "All",
                  }}
                />
              </div>

              <button
                type="button"
                onClick={() => setMoreFiltersOpen((v) => !v)}
                className="mt-3 text-[13px] font-medium text-accent"
              >
                {moreFiltersOpen ? "Fewer filters" : "More filters"}
              </button>

              {moreFiltersOpen && (
                <div className="mt-5 space-y-5">
                  <FilterSelect
                    label="Condition"
                    value={filters.condition ?? ""}
                    onChange={(v) => updateParam("condition", v)}
                    options={options.conditions}
                  />
                  <FilterSelect
                    label="RAM"
                    value={filters.ram ?? ""}
                    onChange={(v) => updateParam("ram", v)}
                    options={options.rams}
                  />
                  <FilterSelect
                    label="Storage"
                    value={filters.storage ?? ""}
                    onChange={(v) => updateParam("storage", v)}
                    options={options.storages}
                  />
                  <FilterSelect
                    label="Processor"
                    value={filters.processor ?? ""}
                    onChange={(v) => updateParam("processor", v)}
                    options={options.processors}
                  />
                </div>
              )}
            </div>
          </aside>

          <div className="min-w-0 flex-1">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <p className="text-[13px] text-quiet">
                {filtered.length} {filtered.length === 1 ? "product" : "products"}
              </p>
              <div className="flex items-center gap-2">
                <label htmlFor="sort" className="text-[13px] text-quiet">
                  Sort
                </label>
                <select
                  id="sort"
                  value={filters.sort ?? "newest"}
                  onChange={(e) => updateParam("sort", e.target.value)}
                  className={cn(selectClass, "w-auto min-w-[140px]")}
                >
                  <option value="newest">Newest</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="popular">Popular</option>
                </select>
              </div>
            </div>

            {filtered.length === 0 ? (
              <div className="rounded-xl bg-page py-20 text-center shadow-sm">
                <p className="text-[15px] text-neutral-700">No products match your filters.</p>
                <button
                  type="button"
                  onClick={() => router.replace("?", { scroll: false })}
                  className="link-accent mt-4 text-[13px] font-medium"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.map((listing) => (
                  <ListingCard key={listing.slug} listing={listing} />
                ))}
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
  labels,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: readonly string[];
  labels?: Record<string, string>;
}) {
  return (
    <div>
      <label className={filterLabelClass}>{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={selectClass}
      >
        <option value="">All</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {labels?.[opt] ?? opt}
          </option>
        ))}
      </select>
    </div>
  );
}
