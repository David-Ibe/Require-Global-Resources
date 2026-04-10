"use client";

export function UrgencyBar({ stockCount }: { stockCount: number }) {
  return (
    <div className="border-b border-rgr-gray300/50 bg-[#fafafa] px-4 py-2.5 text-center text-sm text-rgr-gray700">
      <span className="text-rgr-navy font-medium">{stockCount}</span>
      {" "}units left at this price
    </div>
  );
}
