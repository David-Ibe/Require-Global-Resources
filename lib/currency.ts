export function formatNaira(value: string | number): string {
  const numeric =
    typeof value === "number"
      ? value
      : Number.parseInt(String(value).replace(/[^\d]/g, ""), 10);

  if (!Number.isFinite(numeric)) {
    return String(value);
  }

  return numeric.toLocaleString("en-NG");
}
