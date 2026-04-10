"use client";

import { X } from "lucide-react";
import { useEffect, useState } from "react";

const STORAGE_KEY = "rgr-announce-dismiss";

export function AnnouncementBar() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(STORAGE_KEY) === "1") {
        setVisible(false);
      }
    } catch {
      /* ignore */
    }
  }, []);

  if (!visible) return null;

  return (
    <div className="relative z-[110] w-full bg-rgr-gold px-4 py-2.5 text-center">
      <button
        type="button"
        onClick={() => {
          document
            .getElementById("products")
            ?.scrollIntoView({ behavior: "smooth" });
        }}
        className="mx-auto block w-full max-w-4xl px-8 text-[13px] font-bold uppercase tracking-wide text-rgr-navy md:px-0 md:text-sm"
      >
        FREE Delivery on Next 5 Orders Today &mdash; Order Now
      </button>
      <button
        type="button"
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-rgr-navy/60 transition hover:text-rgr-navy md:right-4"
        aria-label="Dismiss announcement"
        onClick={() => {
          try {
            sessionStorage.setItem(STORAGE_KEY, "1");
          } catch {
            /* ignore */
          }
          setVisible(false);
        }}
      >
        <X className="h-4 w-4" strokeWidth={2.5} />
      </button>
    </div>
  );
}
