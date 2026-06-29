/**
 * Shared layout + typography for the public store (minimal, consistent).
 */
export const storePage = {
  narrow: "mx-auto max-w-3xl px-5 py-20 md:px-10 md:py-24",
  wide: "mx-auto max-w-6xl px-5 py-20 md:px-10 md:py-24",
  center: "mx-auto flex min-h-[65vh] max-w-lg flex-col justify-center px-5 py-20 md:px-10",
} as const;

export const storeType = {
  h1: "text-3xl font-bold tracking-tight text-navy md:text-4xl",
  h2: "text-section-title text-navy",
  h3: "text-lg font-semibold text-navy",
  lead: "mt-6 text-[15px] leading-relaxed text-neutral-700",
  body: "mt-4 text-[15px] leading-relaxed text-neutral-700",
  muted: "text-[13px] text-muted",
  list: "mt-6 list-disc space-y-2 pl-6 text-neutral-700",
} as const;

export const storeSurface = {
  card: "rounded-xl bg-surface p-8 shadow-sm",
  cardSm: "rounded-xl bg-surface p-6 shadow-sm",
  sectionAlt: "bg-section-alt",
} as const;

export const storeCta = {
  whatsapp:
    "inline-flex items-center justify-center rounded-lg bg-whatsapp px-8 py-3.5 text-sm font-semibold text-white transition hover:bg-[#20bd5a]",
  navy: "inline-flex items-center justify-center rounded-lg bg-navy px-8 py-3.5 text-sm font-semibold text-white transition hover:bg-navy-secondary",
  link: "font-medium text-accent hover:underline",
  ghost:
    "inline-flex items-center justify-center rounded-lg border border-navy bg-surface px-8 py-3.5 text-sm font-medium text-navy transition hover:bg-page",
} as const;
