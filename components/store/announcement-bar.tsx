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
    <div className="relative z-[110] w-full border-b border-rgr-gray300/50 bg-[#fafafa] px-4 py-2.5 text-center text-[13px] font-medium text-rgr-gray700 md:text-sm">
      <button
        type="button"
        onClick={() => {
          document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
        }}
        className="mx-auto block w-full max-w-4xl px-8 md:px-0"
      >
        Lagos dispatch · Pay on delivery in eligible locations · Nationwide support
      </button>
      <button
        type="button"
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-rgr-gray600 transition hover:bg-rgr-gray100 md:hidden"
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
        <X className="h-5 w-5" strokeWidth={2.25} />
      </button>
    </div>
  );
}
