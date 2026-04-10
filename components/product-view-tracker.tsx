"use client";

import { useEffect } from "react";

import { trackViewContent } from "@/lib/analytics";
import { nairaStringToNumber } from "@/lib/parse-price";

type ProductViewTrackerProps = {
  productName: string;
  price: string;
};

export function ProductViewTracker({ productName, price }: ProductViewTrackerProps) {
  useEffect(() => {
    trackViewContent({
      contentName: productName,
      value: nairaStringToNumber(price)
    });
  }, [price, productName]);

  return null;
}
