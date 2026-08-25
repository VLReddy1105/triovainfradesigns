import { Mail, MessageCircle, Phone } from "lucide-react";
import { Tag } from "@/components/ui/Tag";
import { site, whatsappUrl } from "@/data/site";

/** Compact contact panel used alongside the FAQ accordion. */
export function ContactCard() {
  return (
    <aside
      aria-labelledby="contact-card-heading"
      className="rounded-panel bg-navy p-8 text-white lg:sticky lg:top-28"
    >
      <Tag>Contact Us</Tag>

      <h3 id="contact-card-heading" className="mt-5 text-2xl font-bold">
        Let&apos;s Build Something Beautiful
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-white/70">
        Speak with our team today and get a free consultation for your project.
      </p>

      <div className="mt-7 flex flex-col gap-3">
        {site.phones.map((phone) => (
          <a
            key={phone.raw}
            href={`tel:${phone.raw}`}
            className="hover:border-gold flex items-center gap-3 rounded-xl border border-white/20 px-4 py-3.5 text-sm font-semibold transition hover:bg-white/5"
          >
            <Phone className="text-gold size-4" aria-hidden="true" />
            {phone.display}
          </a>
        ))}

        <a
          href={`mailto:${site.email}`}
          className="hover:border-gold flex items-center gap-3 rounded-xl border border-white/20 px-4 py-3.5 text-sm font-semibold transition hover:bg-white/5"
        >
          <Mail className="text-gold size-4 shrink-0" aria-hidden="true" />
          Email Us
        </a>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 rounded-xl bg-whatsapp px-4 py-3.5 text-sm font-semibold transition hover:bg-whatsapp-dark"
        >
          <MessageCircle className="size-4" aria-hidden="true" />
          WhatsApp Now
        </a>
      </div>
    </aside>
  );
}
