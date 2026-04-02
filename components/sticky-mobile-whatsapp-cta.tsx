import { WhatsAppOrderButton } from "@/components/whatsapp-order-button";
import { formatNaira } from "@/lib/currency";

type StickyMobileWhatsappCTAProps = {
  productName: string;
  sourcePage: string;
  message: string;
  price: string;
};

export function StickyMobileWhatsappCTA({
  productName,
  sourcePage,
  message,
  price
}: StickyMobileWhatsappCTAProps) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white p-3 shadow-soft md:hidden">
      <WhatsAppOrderButton
        label={`Order on WhatsApp - ₦${formatNaira(price)}`}
        productName={productName}
        sourcePage={sourcePage}
        message={message}
        price={price}
        className="w-full"
      />
    </div>
  );
}
