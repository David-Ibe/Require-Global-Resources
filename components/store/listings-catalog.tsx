"use client";

import { useMemo } from "react";
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
};

const selectClass =
  "w-full rounded-xl border border-neutral-200 bg-white px-3 py-2.5 text-sm text-neutral-900 focus:border-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-300";

export function ListingsCatalog({ listings, showHeader = true }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

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
    <div>
      {showHeader && (
        <header className="border-b border-neutral-100 bg-page pt-12 pb-10 md:pt-16 md:pb-14">
          <Container>
            <h1 className="text-3xl font-semibold tracking-tight text-neutral-950 md:text-4xl">
              Shop
            </h1>
            <p className="mt-3 max-w-lg text-neutral-500">
              Live inventory from Require Global — spec, condition and price up front.
            </p>
            <div className="mt-10 max-w-2xl">
              <MarketplaceSearch defaultValue={filters.q ?? ""} large />
            </div>
          </Container>
        </header>
      )}

      <Container className="py-10 md:py-14">
        <div className="flex flex-col gap-10 lg:flex-row lg:gap-16">
          {/* Filters sidebar */}
          <aside className="lg:w-56 lg:shrink-0">
            <p className="mb-4 text-xs font-medium uppercase tracking-wider text-neutral-400">
              Filter
            </p>
            <div className="space-y-4">
              <FilterSelect
                label="Brand"
                value={filters.brand ?? ""}
                onChange={(v) => updateParam("brand", v)}
                options={options.brands}
              />
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
          </aside>

          <div className="min-w-0 flex-1">
            <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
              <p className="text-sm text-neutral-500">
                {filtered.length} {filtered.length === 1 ? "product" : "products"}
              </p>
              <div className="flex items-center gap-2">
                <label htmlFor="sort" className="text-sm text-neutral-500">
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
              <div className="rounded-2xl border border-neutral-100 bg-neutral-50 py-20 text-center">
                <p className="text-neutral-600">No products match your filters.</p>
                <button
                  type="button"
                  onClick={() => router.replace("?", { scroll: false })}
                  className="mt-4 text-sm font-medium text-accent hover:underline"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 xl:grid-cols-3">
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
      <label className="mb-1.5 block text-xs text-neutral-500">{label}</label>
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
