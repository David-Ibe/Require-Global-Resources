declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

function gaId() {
  return (
    process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID ||
    process.env.NEXT_PUBLIC_GA4_ID ||
    ""
  );
}

/** Only non-empty numeric IDs — avoids loading the script when .env still has example placeholders. */
export function facebookPixelId(): string | null {
  const raw = (
    process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID ||
    process.env.NEXT_PUBLIC_FB_PIXEL_ID ||
    ""
  ).trim();
  if (!raw) return null;
  if (/^(your_facebook_pixel_id|placeholder|null|none)$/i.test(raw)) return null;
  if (!/^\d{10,20}$/.test(raw)) return null;
  return raw;
}

function isBrowser() {
  return typeof window !== "undefined";
}

export function trackPageView(path: string) {
  if (!isBrowser()) return;
  if (facebookPixelId()) window.fbq?.("track", "PageView");
  const id = gaId();
  if (id && window.gtag) {
    window.gtag("config", id, { page_path: path });
  }
}

export function trackViewContent(params: {
  contentName: string;
  value: number;
  currency?: string;
}) {
  if (!isBrowser()) return;
  if (facebookPixelId()) {
    window.fbq?.("track", "ViewContent", {
      content_name: params.contentName,
      content_type: "product",
      value: params.value,
      currency: params.currency ?? "NGN"
    });
  }
  window.gtag?.("event", "view_item", {
    currency: params.currency ?? "NGN",
    value: params.value,
    items: [
      {
        item_name: params.contentName,
        price: params.value,
        item_category: "product"
      }
    ]
  });
}

export function trackInitiateCheckout(value: number, currency = "NGN") {
  if (!isBrowser()) return;
  if (facebookPixelId()) {
    window.fbq?.("track", "InitiateCheckout", {
      value,
      currency
    });
  }
  window.gtag?.("event", "begin_checkout", {
    value,
    currency
  });
}

export function trackPurchase(params: {
  value: number;
  currency?: string;
  transactionId: string;
  contentName?: string;
}) {
  if (!isBrowser()) return;
  if (facebookPixelId()) {
    window.fbq?.("track", "Purchase", {
      value: params.value,
      currency: params.currency ?? "NGN",
      content_name: params.contentName
    });
  }
  window.gtag?.("event", "purchase", {
    transaction_id: params.transactionId,
    value: params.value,
    currency: params.currency ?? "NGN"
  });
}

export function trackWhatsAppClick(label: string) {
  if (!isBrowser()) return;
  window.gtag?.("event", "whatsapp_click", {
    event_category: "engagement",
    event_label: label
  });
}

/** Legacy WhatsApp CTA tracking — Lead + optional value */
export function trackLead(params: { productName: string; price: string }) {
  if (!isBrowser()) return;
  const raw = params.price.replace(/[^\d]/g, "");
  const value = raw ? Number.parseInt(raw, 10) : 0;
  if (facebookPixelId()) {
    window.fbq?.("track", "Lead", {
      content_name: params.productName,
      value: Number.isFinite(value) ? value : 0,
      currency: "NGN"
    });
  }
  window.gtag?.("event", "whatsapp_order_click", {
    event_category: "engagement",
    event_label: params.productName,
    value: Number.isFinite(value) ? value : 0
  });
}
