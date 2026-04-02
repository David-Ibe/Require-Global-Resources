"use client";

import { useEffect } from "react";

import { trackViewContent } from "@/lib/analytics";

type ProductViewTrackerProps = {
  productName: string;
  price: string;
};

export function ProductViewTracker({ productName, price }: ProductViewTrackerProps) {
  useEffect(() => {
    trackViewContent({ productName, price });
  }, [price, productName]);

  return null;
}
