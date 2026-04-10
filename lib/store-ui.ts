/**
 * Shared layout + typography for the public store (minimal, consistent).
 */
export const storePage = {
  /** Standard content pages (about, returns, legal). */
  narrow: "mx-auto max-w-3xl px-5 py-20 md:px-10 md:py-24",
  /** Contact, wider layouts. */
  wide: "mx-auto max-w-6xl px-5 py-20 md:px-10 md:py-24",
  /** Centered short pages (order confirmation, 404). */
  center: "mx-auto flex min-h-[65vh] max-w-lg flex-col justify-center px-5 py-20 md:px-10"
} as const;

export const storeType = {
  h1: "text-3xl font-semibold tracking-tight text-rgr-navy md:text-4xl",
  h2: "text-2xl font-semibold tracking-tight text-rgr-navy md:text-3xl",
  h3: "text-lg font-semibold text-rgr-navy",
  lead: "mt-6 text-lg leading-relaxed text-rgr-gray700",
  body: "mt-4 leading-relaxed text-rgr-gray700",
  muted: "text-sm text-rgr-gray500",
  list: "mt-6 list-disc space-y-2 pl-6 text-rgr-gray700"
} as const;

export const storeSurface = {
  card: "rounded-2xl border border-rgr-gray300/40 bg-rgr-surface p-8 shadow-soft",
  cardSm: "rounded-2xl border border-rgr-gray300/40 bg-rgr-surface p-6 shadow-soft",
  sectionAlt: "bg-[#fafafa]"
} as const;

export const storeCta = {
  whatsapp:
    "inline-flex items-center justify-center rounded-lg bg-rgr-whatsapp px-8 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:brightness-110",
  navy: "inline-flex items-center justify-center rounded-lg bg-rgr-navy px-8 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-rgr-charcoal",
  link: "font-medium text-rgr-navy underline decoration-rgr-gray300 underline-offset-4 transition hover:decoration-rgr-navy",
  ghost:
    "inline-flex items-center justify-center rounded-lg border border-rgr-gray300 bg-transparent px-8 py-3.5 text-sm font-semibold text-rgr-navy transition hover:bg-rgr-gray100"
} as const;
