"use client";

import { useEffect, useState } from "react";

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

function getSecondsUntilMidnightWAT(): number {
  const now = new Date();
  const watOffset = 1 * 60;
  const localOffset = now.getTimezoneOffset();
  const watTime = new Date(now.getTime() + (watOffset + localOffset) * 60000);
  const midnight = new Date(watTime);
  midnight.setHours(24, 0, 0, 0);
  return Math.max(0, Math.floor((midnight.getTime() - watTime.getTime()) / 1000));
}

export function UrgencyBar({ stockCount }: { stockCount: number }) {
  const [seconds, setSeconds] = useState(getSecondsUntilMidnightWAT);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(getSecondsUntilMidnightWAT());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  const soldOut = stockCount <= 0;

  return (
    <div className="border-b border-white/10 bg-rgr-navy px-4 py-2.5">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <div className="flex items-center gap-2">
          {soldOut ? (
            <span className="flex items-center gap-2 text-sm font-semibold text-red-400">
              <span className="animate-stock-pulse">🔴</span>
              SOLD OUT
            </span>
          ) : (
            <span className="flex items-center gap-2 text-sm font-semibold text-red-400">
              <span className="animate-stock-pulse">🔴</span>
              {stockCount} UNITS LEFT
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 text-sm text-rgr-gold">
          <span className="hidden sm:inline">⏱️ PROMO ENDS IN:</span>
          <div className="flex gap-1">
            <span className="rounded bg-rgr-gold/20 px-1.5 py-0.5 font-display text-sm tabular-nums text-rgr-gold">
              {pad(hrs)}
            </span>
            <span className="text-rgr-gold/60">:</span>
            <span className="rounded bg-rgr-gold/20 px-1.5 py-0.5 font-display text-sm tabular-nums text-rgr-gold">
              {pad(mins)}
            </span>
            <span className="text-rgr-gold/60">:</span>
            <span className="rounded bg-rgr-gold/20 px-1.5 py-0.5 font-display text-sm tabular-nums text-rgr-gold animate-countdown">
              {pad(secs)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
