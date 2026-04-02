"use client";

import { useEffect } from "react";

import { trackPurchase } from "@/lib/analytics";

export function PurchaseTracker() {
  useEffect(() => {
    trackPurchase();
  }, []);

  return null;
}
