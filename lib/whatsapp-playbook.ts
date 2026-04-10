import { brand } from "@/lib/site-config";
import { credibility } from "@/lib/credibility";

/**
 * Internal sales playbook — rendered on /admin/whatsapp-playbook.
 * Edit numbers in lib/credibility.ts; legal name in lib/site-config brand.
 */

export type PlaybookSection = {
  id: string;
  title: string;
  blocks: { label?: string; text: string }[];
};

export const whatsappPlaybookIntro = {
  title: "Require WhatsApp sales system",
  subtitle:
    "Qualify buyers, build trust fast, handle objections, close cleanly. Reply within 1–3 minutes when possible."
};

export const whatsappPlaybookSections: PlaybookSection[] = [
  {
    id: "first-response",
    title: "1. First response (critical)",
    blocks: [
      {
        text: `Hi 👋 thanks for reaching out.

Yes, the [Product Name] is available.

Before we proceed, just to confirm:
📍 What location are you in?`
      }
    ]
  },
  {
    id: "qualify",
    title: "2. Qualify + control the flow",
    blocks: [
      {
        text: `Great 👍 we deliver to [Location].

Delivery typically takes [X days], and you'll pay on delivery after you inspect the item.

Just to confirm — are you ordering for yourself?`
      }
    ]
  },
  {
    id: "product-confirm",
    title: "3. Product confirmation (sell without “selling”)",
    blocks: [
      {
        label: "Send 2–3 real photos (optional short video), then:",
        text: `This is the exact product we'll send.

We inspect it here before dispatch, then you inspect again on delivery before paying — so no surprises.`
      }
    ]
  },
  {
    id: "close",
    title: "4. Close the order",
    blocks: [
      {
        text: `If everything looks good, I'll go ahead and place the order for you.

I just need:
Full Name:
Phone Number:
Delivery Address:`
      }
    ]
  },
  {
    id: "trust",
    title: "5. Trust reinforcement (if they hesitate)",
    blocks: [
      {
        text: `Just so you're comfortable:

– We're a registered company (${brand.legalName})
– You pay only after inspecting the item
– We've completed ${credibility.deliveriesLagosThisMonth} deliveries in Lagos this month

You're not taking any risk.`
      }
    ]
  },
  {
    id: "objections",
    title: "6. Objection handling",
    blocks: [
      {
        label: "“I've been scammed before”",
        text: `That's exactly why we built this differently.

We inspect before sending, and you inspect again before paying.

If it's not what you expect, you don't pay.`
      },
      {
        label: "“Price is too high”",
        text: `I understand.

Most cheaper options online don't get inspected, and that's where issues usually come from.

We focus on sending exactly what was advertised — that's the difference.`
      },
      {
        label: "“Let me think about it”",
        text: `No problem 👍

Just to mention — we currently have free delivery for a few orders today.

If you decide later, I'll still be here to help.`
      },
      {
        label: "“Is it original?”",
        text: `Yes — and more importantly, it's exactly what you'll see before paying.

No blind delivery, no surprises.`
      }
    ]
  },
  {
    id: "order-confirm-msg",
    title: "7. Order confirmation message (after they send details)",
    blocks: [
      {
        text: `Perfect 👍 your order has been placed.

We'll confirm shortly and send you delivery timing.

You'll pay on delivery after inspection.

Thank you for choosing Require.`
      }
    ]
  },
  {
    id: "followup",
    title: "8. Follow-up system",
    blocks: [
      {
        label: "6–12 hours later",
        text: `Hi 👋 just checking in.

Are you still interested in the [Product Name]?

We still have a delivery slot available today.`
      },
      {
        label: "Next day",
        text: `Quick one — should I reserve this for you or release the slot?

Just let me know 👍`
      }
    ]
  },
  {
    id: "after-delivery",
    title: "9. After delivery",
    blocks: [
      {
        text: `Hi 👋 just confirming your order was delivered.

Hope everything is perfect?

If you have a moment, I'd really appreciate your feedback 🙏

(Then ask for testimonial / photo if possible.)`
      }
    ]
  },
  {
    id: "quick-replies",
    title: "10. Quick replies (WhatsApp Business shortcuts)",
    blocks: [
      {
        label: "/price",
        text: "Paste your standard price reply for the product in context."
      },
      {
        label: "/delivery",
        text: "Paste delivery timeline by location."
      },
      {
        label: "/cod",
        text: `We operate pay on delivery.

You inspect the item first, then pay — no upfront payment required.`
      },
      {
        label: "/how",
        text: "Paste your 3–4 step how-it-works summary."
      }
    ]
  }
];
