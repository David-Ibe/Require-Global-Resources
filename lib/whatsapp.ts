export function buildWhatsAppURL(order: {
  productName: string;
  unitPrice: number;
  quantity: number;
  fullName: string;
  phone: string;
  address: string;
  state: string;
}): string {
  const lineTotal = order.unitPrice * order.quantity;
  const message = `Hi! I just ordered the ${order.productName} (×${order.quantity}, ₦${lineTotal.toLocaleString()}).

Name: ${order.fullName}
Phone: ${order.phone}
Address: ${order.address}
State: ${order.state}

Please send me the payment details. Thank you!`;

  return `https://wa.me/2348029138335?text=${encodeURIComponent(message)}`;
}
