"use client";

import { Analytics } from "@vercel/analytics/react";
import dynamic from "next/dynamic";

const SpeedInsights = dynamic(
  () =>
    import("@vercel/speed-insights/next").then((mod) => mod.SpeedInsights),
  { ssr: false }
);

export function ClientMetrics() {
  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  );
}
