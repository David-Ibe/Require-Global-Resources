declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

type ProductEvent = {
  productName: string;
  price: string;
};

function isBrowser() {
  return typeof window !== "undefined";
}

export function trackPageView(path: string) {
  if (!isBrowser()) return;
  window.fbq?.("track", "PageView");
  window.gtag?.("config", process.env.NEXT_PUBLIC_GA4_ID, {
    page_path: path
  });
}

export function trackViewContent({ productName, price }: ProductEvent) {
  if (!isBrowser()) return;
  window.fbq?.("track", "ViewContent", {
    content_name: productName,
    value: Number(price.replace(/,/g, "")),
    currency: "NGN"
  });
}

export function trackLead({ productName, price }: ProductEvent) {
  if (!isBrowser()) return;
  window.fbq?.("track", "Lead", {
    content_name: productName,
    value: Number(price.replace(/,/g, "")),
    currency: "NGN"
  });
  window.gtag?.("event", "whatsapp_order_click", {
    event_category: "engagement",
    event_label: productName,
    value: Number(price.replace(/,/g, ""))
  });
}

export function trackPurchase() {
  if (!isBrowser()) return;
  window.fbq?.("track", "Purchase");
}

export function trackWhatsAppClick(label: string) {
  if (!isBrowser()) return;
  window.gtag?.("event", "whatsapp_click", {
    event_category: "engagement",
    event_label: label
  });
}
