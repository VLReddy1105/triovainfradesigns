import { MessageCircle, Phone } from "lucide-react";
import { primaryPhone, whatsappUrl } from "@/data/site";

/** Sticky call-to-action bar shown only on small screens. */
export function MobileCallBar() {
  return (
    <div className="bg-navy fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t border-white/10 sm:hidden">
      <a
        href={`tel:${primaryPhone.raw}`}
        className="bg-gold text-navy flex items-center justify-center gap-2 py-4 text-sm font-bold"
      >
        <Phone className="size-4" aria-hidden="true" />
        Call Now
      </a>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 py-4 text-sm font-bold text-white"
      >
        <MessageCircle className="size-4" aria-hidden="true" />
        WhatsApp
      </a>
    </div>
  );
}
