"use client";

import { useEffect, useRef } from "react";
import { usePaystackPayment } from "react-paystack";

type Props = {
  amount: number;
  email: string;
  name: string;
  phone: string;
  onSuccess: (reference: string) => void;
  onClose: () => void;
};

const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY ?? "";

export function ProductPaystackBridge({
  amount,
  email,
  name,
  phone,
  onSuccess,
  onClose,
}: Props) {
  const config = {
    reference: `rgr-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    email,
    amount: amount * 100,
    publicKey,
    metadata: {
      custom_fields: [
        { display_name: "Customer Name", variable_name: "customer_name", value: name },
        { display_name: "Phone", variable_name: "phone", value: phone },
      ],
    },
  };

  const initializePayment = usePaystackPayment(config);
  const triggered = useRef(false);

  useEffect(() => {
    if (triggered.current) return;
    if (!publicKey) {
      onClose();
      return;
    }
    triggered.current = true;
    initializePayment({
      onSuccess: (ref) => {
        const reference = typeof ref === "object" && ref !== null && "reference" in ref
          ? String((ref as { reference: string }).reference)
          : config.reference;
        onSuccess(reference);
      },
      onClose,
    });
  }, [initializePayment, onSuccess, onClose, config.reference]);

  return null;
}
