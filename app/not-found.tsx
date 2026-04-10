import type { Metadata } from "next";
import Link from "next/link";

import { storeCta, storePage, storeType } from "@/lib/store-ui";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you are looking for does not exist or has been moved."
};

export default function NotFound() {
  return (
    <div
      className={`${storePage.narrow} flex min-h-[70vh] flex-col items-center justify-center text-center`}
    >
      <p className="text-7xl font-semibold tabular-nums text-rgr-navy md:text-8xl">
        404
      </p>
      <h1 className={`${storeType.h1} mt-6`}>Page not found</h1>
      <p className="mt-4 max-w-md text-rgr-gray700">
        The page you are looking for does not exist or has been moved.
      </p>
      <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
        <Link href="/#products" className={storeCta.navy}>
          Browse products
        </Link>
        <Link href="/contact" className={storeCta.ghost}>
          Contact us
        </Link>
      </div>
    </div>
  );
}
