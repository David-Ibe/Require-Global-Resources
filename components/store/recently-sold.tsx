import Link from "next/link";

import { ArrowRight, BadgeCheck } from "@/components/icons";
import { FadeInView } from "@/components/fade-in-view";
import { fetchRecentSales } from "@/lib/os-listings";

function howLongAgo(days: number): string {
  if (days <= 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;
  if (days < 14) return "Last week";
  const weeks = Math.round(days / 7);
  return `${weeks} weeks ago`;
}

export async function RecentlySold() {
  const recentSales = await fetchRecentSales();
  if (recentSales.length === 0) return null;

  return (
    <section className="border-y border-rgr-gray300/40 bg-white py-10 md:py-14">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <FadeInView>
            <p className="font-display text-sm uppercase tracking-[0.2em] text-rgr-blue">
              Recently sold
            </p>
            <h2 className="mt-2 font-display text-2xl uppercase tracking-tight text-rgr-navy md:text-3xl">
              Shipped to Nigerian buyers
            </h2>
          </FadeInView>
          <Link
            href="/listings"
            className="inline-flex items-center gap-1 text-sm font-semibold text-rgr-blue hover:underline"
          >
            See what&rsquo;s live now
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>

        <ul className="mt-6 divide-y divide-rgr-gray300/40 rounded-2xl border border-rgr-gray300/40 bg-white shadow-soft">
          {recentSales.map((sale, index) => (
            <li
              key={`${sale.productName}-${index}`}
              className="flex flex-wrap items-center gap-x-4 gap-y-1 px-5 py-3.5 md:px-6"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                <BadgeCheck className="h-4 w-4" aria-hidden />
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-display text-sm uppercase tracking-wider text-rgr-navy">
                  {sale.productName}
                </p>
                <p className="text-xs text-rgr-gray500">
                  Sold to a buyer in {sale.buyerCity}
                </p>
              </div>
              <span className="text-xs font-medium uppercase tracking-wider text-rgr-gray500">
                {howLongAgo(sale.soldDaysAgo)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
