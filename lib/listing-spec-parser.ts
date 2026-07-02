import type { Listing, ListingSpec } from "@/lib/electronics-listings";

const SPEC_LABELS = [
  "Additional Features",
  "Operating System",
  "Processor",
  "Display",
  "Memory",
  "Storage",
  "Graphics",
  "Battery",
  "Connectivity",
  "Dimensions",
  "Weight",
  "Camera",
  "Audio",
  "Ports",
  "Wireless",
  "Security",
  "Colour",
  "Color",
  "Screen Size",
  "Screen",
  "Chip",
  "GPU",
  "RAM",
  "SSD",
  "Perfect for",
] as const;

export type ListingDocumentation = {
  overview: string[];
  idealFor?: string;
  highlights: string[];
  specs: ListingSpec[];
};

function normalizeText(text: string): string {
  return text
    .replace(/\r\n/g, "\n")
    .replace(/\u00a0/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function splitSentences(text: string): string[] {
  return text
    .split(/(?<=[.!?])\s+(?=[A-Z0-9"(\u201c])/u)
    .map((part) => part.trim())
    .filter(Boolean);
}

function buildSpecPattern(): RegExp {
  const escaped = [...SPEC_LABELS]
    .sort((a, b) => b.length - a.length)
    .map((label) => label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  return new RegExp(`(?:^|\\s)(${escaped.join("|")}):\\s*`, "gi");
}

function parseInlineSpecs(text: string): {
  intro: string;
  specs: ListingSpec[];
  tail: string;
} {
  const normalized = normalizeText(
    text.replace(/key specifications/gi, " ").replace(/--/g, " ")
  );
  const pattern = buildSpecPattern();
  const specs: ListingSpec[] = [];
  let intro = normalized;
  let tail = "";

  const matches = [...normalized.matchAll(pattern)];
  if (matches.length === 0) {
    return { intro: normalized, specs, tail };
  }

  intro = normalized.slice(0, matches[0].index).trim();

  for (let i = 0; i < matches.length; i += 1) {
    const match = matches[i];
    const label = match[1].replace(/\s+/g, " ").trim();
    const valueStart = (match.index ?? 0) + match[0].length;
    const valueEnd =
      i + 1 < matches.length ? (matches[i + 1].index ?? normalized.length) : normalized.length;
    const value = normalized.slice(valueStart, valueEnd).trim();
    if (label && value) {
      specs.push({ label, value });
    }
  }

  const lastMatch = matches[matches.length - 1];
  const lastValueEnd =
    (lastMatch.index ?? 0) + lastMatch[0].length + (specs.at(-1)?.value.length ?? 0);
  tail = normalized.slice(lastValueEnd).trim();

  return { intro, specs, tail };
}

function isGenericSpecLabel(label: string): boolean {
  return /^Spec \d+$/i.test(label) || label === "Details";
}

function mergeSpecs(primary: ListingSpec[], fallback: ListingSpec[]): ListingSpec[] {
  const merged = new Map<string, ListingSpec>();

  for (const spec of fallback) {
    if (!isGenericSpecLabel(spec.label)) {
      merged.set(spec.label.toLowerCase(), spec);
    }
  }

  for (const spec of primary) {
    merged.set(spec.label.toLowerCase(), spec);
  }

  return [...merged.values()];
}

function extractHighlights(specs: ListingSpec[], extraText: string): string[] {
  const highlights: string[] = [];
  const features = specs.find((spec) =>
    spec.label.toLowerCase().includes("additional features")
  );

  if (features) {
    highlights.push(
      ...features.value
        .split(/(?<=[.!?])\s+|(?=\sENERGY STAR\b)|(?=\sEPEAT\b)/u)
        .map((part) => part.trim())
        .filter((part) => part.length > 8)
    );
  }

  for (const sentence of splitSentences(extraText)) {
    if (/energy star|epeat|warranty|certified|ai capabilities|business-grade|port selection/i.test(sentence)) {
      highlights.push(sentence);
    }
  }

  return [...new Set(highlights)].slice(0, 6);
}

/** Turn raw listing copy into structured overview, highlights, and spec rows. */
export function getListingDocumentation(listing: Listing): ListingDocumentation {
  const source = normalizeText(listing.description);

  const parsedFromDescription = parseInlineSpecs(source);
  const parsedFromExisting =
    listing.specs.length > 0
      ? parseInlineSpecs(
          listing.specs.map((spec) => `${spec.label}: ${spec.value}`).join(" ")
        )
      : { intro: "", specs: [], tail: "" };

  const mergedSpecs = mergeSpecs(parsedFromDescription.specs, [
    ...parsedFromExisting.specs,
    ...listing.specs.filter((spec) => !isGenericSpecLabel(spec.label)),
  ]);

  const idealForRaw = mergedSpecs.find((spec) =>
    spec.label.toLowerCase() === "perfect for"
  )?.value;

  let idealFor: string | undefined;
  const idealForTail: string[] = [];

  if (idealForRaw) {
    const sentences = splitSentences(idealForRaw);
    idealFor = sentences[0];
    idealForTail.push(...sentences.slice(1));
  }

  const specs = mergedSpecs.filter(
    (spec) =>
      spec.label.toLowerCase() !== "perfect for" &&
      !spec.label.toLowerCase().includes("additional features")
  );

  const overviewParts = [
    parsedFromDescription.intro,
    parsedFromDescription.tail,
    parsedFromExisting.intro,
    parsedFromExisting.tail,
    ...idealForTail,
  ]
    .flatMap((part) => splitSentences(part))
    .filter(Boolean);

  const overview =
    overviewParts.length > 0
      ? overviewParts
      : listing.headline
        ? [listing.headline]
        : ["Detailed specifications for this listing are shown below."];

  const highlights = extractHighlights(
    mergedSpecs,
    [parsedFromDescription.tail, parsedFromExisting.tail].join(" ")
  );

  return {
    overview,
    idealFor,
    highlights,
    specs,
  };
}

/** Parse a spec field from Supabase into structured rows. */
export function parseListingSpecField(spec: string | null): ListingSpec[] {
  if (!spec?.trim()) return [];

  const inline = parseInlineSpecs(spec);
  if (inline.specs.length > 0) {
    return inline.specs.filter(
      (item) => item.label.toLowerCase() !== "perfect for"
    );
  }

  const parts = spec
    .split(/[·|\n]/)
    .map((part) => part.trim())
    .filter(Boolean);

  return parts.map((part, index) => {
    const colonIndex = part.indexOf(":");
    if (colonIndex > 0) {
      return {
        label: part.slice(0, colonIndex).trim(),
        value: part.slice(colonIndex + 1).trim(),
      };
    }
    return { label: `Spec ${index + 1}`, value: part };
  });
}
