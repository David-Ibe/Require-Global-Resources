export type GradeKey = "new-sealed" | "new-open-box";

export type Grade = {
  key: GradeKey;
  label: string;
  shortLabel: string;
  oneLine: string;
  whatYouGet: string[];
  whatYouWontGet: string[];
  proofShown: string[];
  chip: string;
};

export const GRADES: Grade[] = [
  {
    key: "new-sealed",
    label: "New Sealed",
    shortLabel: "Sealed",
    oneLine: "Manufacturer-sealed retail box. Never opened.",
    whatYouGet: [
      "Apple / OEM factory shrink-wrap intact",
      "Full retail box and accessories",
      "Full original warranty starting at activation",
      "Box-seal video sent before dispatch",
    ],
    whatYouWontGet: [
      "Photos of the unit itself until you ask us to open it",
    ],
    proofShown: [
      "Box-seal video",
      "Sealed-box photo (every side)",
      "Source receipt where the consignee provides one",
    ],
    chip: "bg-neutral-100 text-neutral-800 border-neutral-200",
  },
  {
    key: "new-open-box",
    label: "New Open Box",
    shortLabel: "Open Box",
    oneLine: "Brand new — box opened only for verification photos.",
    whatYouGet: [
      "Factory-new device in excellent condition",
      "Full retail box and accessories where provided",
      "Original warranty, full duration remaining",
      "Verification photos and battery / serial confirmed",
    ],
    whatYouWontGet: [
      "An untouched manufacturer seal — we opened it to verify the unit",
    ],
    proofShown: [
      "Box-seal video before opening",
      "Activation lookup screenshot",
      "Cycle count screenshot (laptops / phones)",
      "Source receipt where the consignee provides one",
    ],
    chip: "bg-neutral-50 text-neutral-700 border-neutral-200",
  },
];
