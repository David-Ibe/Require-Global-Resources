"use client";

import { useEffect, useRef } from "react";
import { usePaystackPayment } from "react-paystack";
import type { InitializePayment } from "react-paystack/dist/types";

type Props = {
  publicKey: string;
  onReady: (initializePayment: InitializePayment) => void;
};

/**
 * Loads react-paystack only on the client. The library touches `window` at import time,
 * so it must not be bundled into the server chunk for ProductPageClient.
 */
export function PaystackBridge({ publicKey, onReady }: Props) {
  const initializePayment = usePaystackPayment({
    publicKey
  });
  const onReadyRef = useRef(onReady);
  onReadyRef.current = onReady;

  useEffect(() => {
    onReadyRef.current(initializePayment);
  }, [initializePayment]);

  return null;
}
