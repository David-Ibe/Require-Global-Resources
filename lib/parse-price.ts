/** Parse ₦7,500 style strings to kobo for Paystack (NGN × 100). */
export function nairaStringToKobo(price: string): number {
  const n = Number.parseInt(String(price).replace(/[^\d]/g, ""), 10);
  if (!Number.isFinite(n) || n < 0) return 0;
  return n * 100;
}

/** Numeric naira amount from display string */
export function nairaStringToNumber(price: string): number {
  const n = Number.parseInt(String(price).replace(/[^\d]/g, ""), 10);
  return Number.isFinite(n) ? n : 0;
}
