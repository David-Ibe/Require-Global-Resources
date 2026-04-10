import { brand } from "@/lib/site-config";

/**
 * Pre-filled WhatsApp entry messages — REQUIRE sales system.
 * Every outbound link should use one of these so chats open with intent + context.
 */

/** General site entry — homepage, floating button, nav when no SKU context. */
export function waEntrySiteInterest(): string {
  return `Hi, I'm interested in ordering. I saw your website.`;
}

export function waEntryQuestion(): string {
  return `Hi, I have a question. I saw your website.`;
}

export function waEntryReturnOrExchange(): string {
  return `Hi, I need help with a return or exchange for my order from ${brand.name}.`;
}

export function waEntryOrderConfirmation(): string {
  return `Hi, I just placed an order on your website and want to confirm.`;
}

export function waEntryNotFound(): string {
  return `Hi, I need help finding a product on your website.`;
}

export function waEntryNotifyStock(productName: string): string {
  return `Hi, please notify me when the ${productName.trim()} is back in stock.`;
}

/** After the customer fills the checkout form — structured close (matches sales script step 5). */
export function waOrderFormBody(params: {
  productName: string;
  packageLabel: string;
  price: string;
  quantity: number;
  total: string;
  paymentLabel: string;
  name: string;
  phone: string;
  whatsapp: string;
  address: string;
  state: string;
}): string {
  return `🛒 NEW ORDER — REQUIRE GLOBAL RESOURCES

📦 Product: ${params.productName}
🔢 Package: ${params.packageLabel}
💰 Unit Price: ${params.price}
📊 Quantity: ${params.quantity}
💵 Total: ${params.total}
💳 Payment: ${params.paymentLabel}
━━━━━━━━━━━━━━━
👤 Name: ${params.name}
📱 Phone: ${params.phone}
📲 WhatsApp: ${params.whatsapp}
📍 Address: ${params.address}
🗺️ State: ${params.state}
━━━━━━━━━━━━━━━
Please confirm my order. Thank you!`;
}
