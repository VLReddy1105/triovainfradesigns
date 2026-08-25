import { MessageCircle } from "lucide-react";
import { primaryPhone, whatsappUrl } from "@/data/site";

/** Hidden on small screens, where the sticky call bar already offers WhatsApp. */
export function WhatsAppFloat() {
  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Chat with us on WhatsApp at ${primaryPhone.display}`}
      className="shadow-card-hover fixed bottom-6 left-5 z-40 hidden size-14 place-items-center rounded-full bg-whatsapp hover:bg-whatsapp-dark text-white transition-transform duration-300 hover:scale-110 sm:grid lg:left-8"
    >
      <MessageCircle className="size-7" aria-hidden="true" />
    </a>
  );
}
