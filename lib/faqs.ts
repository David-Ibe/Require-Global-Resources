export type Faq = {
  q: string;
  a: string;
};

export type FaqGroup = {
  title: string;
  faqs: Faq[];
};

export const FAQ_GROUPS: FaqGroup[] = [
  {
    title: "Before you buy",
    faqs: [
      {
        q: "Can I inspect a unit before payment?",
        a: "Yes. Lagos buyers can visit our office and inspect. Outside Lagos, we do a live WhatsApp video — we boot the unit, run the serial lookup, show the box and accessories, and answer anything you ask before you transfer.",
      },
      {
        q: "Can we do a video call?",
        a: "Yes. Free, anytime during business hours. We use it for serial checks, condition walk-arounds, battery reports and box-seal confirmation. Most buyers ask for one before paying.",
      },
      {
        q: "Can I check the serial number myself?",
        a: "Yes — and we want you to. We share the full serial on WhatsApp. Run it on apple.com/check-coverage, pcsupport.lenovo.com, or imei.info. Independent verification beats taking our word for it.",
      },
      {
        q: "Are these refurbished?",
        a: "No, unless it's explicitly labelled. We use two condition labels — New Sealed and New Open Box — and we don't soften them. If a unit is refurbished, it's stated up front.",
      },
    ],
  },
  {
    title: "Payment & delivery",
    faqs: [
      {
        q: "How do I pay?",
        a: "Bank transfer to Require Trading Limited. We issue a CAC-registered invoice for every sale. Cash on collection is available for Lagos walk-ins.",
      },
      {
        q: "Do you ship outside Lagos?",
        a: "Yes — nationwide. We use vetted courier partners for high-value electronics. You receive the waybill and tracking number the moment the unit ships.",
      },
      {
        q: "How long is delivery?",
        a: "Lagos: same day or next day. Major cities (Abuja, Port Harcourt, Ibadan, Kano): 1–2 business days. Other locations: 2–4 business days.",
      },
      {
        q: "What does it cost to ship?",
        a: "Lagos: free for orders above ₦500K. Outside Lagos: courier cost shared at checkout — we don't mark it up.",
      },
    ],
  },
  {
    title: "After you buy",
    faqs: [
      {
        q: "Can I return it?",
        a: "If what arrives is not exactly what we showed you on WhatsApp — different serial, different condition, different spec — we refund in full. No restocking fee. No argument.",
      },
      {
        q: "What if there's a hardware fault?",
        a: "Within 7 days of delivery, we cover replacement or repair for any fault that isn't user damage. After 7 days, manufacturer international warranty applies — we point you to the right authorised service centre in Nigeria.",
      },
      {
        q: "Does the international warranty really work here?",
        a: "For hardware, yes — Apple, Lenovo and Samsung honour international warranty parts globally. Labour terms vary. We tell you exactly what's covered and where to take it before you buy.",
      },
    ],
  },
  {
    title: "Consignment",
    faqs: [
      {
        q: "Do you buy used Macs and iPhones?",
        a: "We don't buy outright — we sell on consignment. You set the price with our input, we verify and list the unit, and you keep the net price (less an agreed commission) when it sells.",
      },
      {
        q: "What's the typical commission?",
        a: "Laptops ₦80–200K per unit. Smartphones ₦50–120K. Audio and accessories ₦15–40K. Final commission is agreed per unit, in writing, before we list. Full breakdown on the Sell with us page.",
      },
      {
        q: "How long does a typical consignment take to sell?",
        a: "Sealed iPhones and AirPods: usually under 7 days. Open-box MacBooks and laptops: 7–21 days. We tell you our honest expectation up front.",
      },
    ],
  },
];
