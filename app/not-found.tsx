import type { Metadata } from "next";
import Link from "next/link";

import { getWhatsAppLink } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Page Not Found | Require Global Resources",
  description: "The page you are looking for does not exist or has been moved."
};

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-4 py-20 text-center md:px-8">
      <p className="text-[8rem] font-extrabold leading-none text-brand-navy">
        404
      </p>
      <h1 className="mt-4 text-3xl font-bold text-brand-navy sm:text-4xl">
        Page Not Found
      </h1>
      <p className="mt-4 max-w-md text-lg text-slate-600">
        The page you are looking for does not exist or has been moved.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/#products"
          className="inline-flex items-center justify-center rounded-lg bg-brand-electric px-6 py-3.5 text-base font-semibold text-white transition-all duration-200 hover:bg-brand-navy hover:scale-[1.03] active:scale-[0.98]"
        >
          View Our Products
        </Link>
        <Link
          href={getWhatsAppLink("Hi, I need help finding a product on your website.")}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-lg bg-[#22C55E] px-6 py-3.5 text-base font-semibold text-white transition-all duration-200 hover:bg-[#16A34A] hover:scale-[1.03] active:scale-[0.98]"
        >
          Order on WhatsApp
        </Link>
      </div>
    </div>
  );
}
