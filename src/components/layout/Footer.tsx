import Link from "next/link";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/layout/Logo";
import { navLinks, site } from "@/data/site";
import { services } from "@/data/services";

export function Footer() {
  const quickLinks = navLinks.map(({ label, href }) => ({ label, href }));

  return (
    <footer className="bg-ink border-gold border-t-[3px] text-white">
      <div className="gutter mx-auto grid max-w-[81.25rem] gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1.2fr_1.4fr] lg:py-20">
        <div>
          <Logo size="lg" />
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/70">
            {site.name} delivers premium interior, architecture, renovation,
            turnkey execution and material supply solutions across{" "}
            {site.address.locality}.
          </p>
        </div>

        <nav aria-labelledby="footer-links">
          <h2
            id="footer-links"
            className="text-gold text-lg font-bold tracking-wide"
          >
            Quick Links
          </h2>
          <ul className="mt-5 flex flex-col gap-3">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="hover:text-gold inline-block text-sm text-white/70 transition-all hover:translate-x-1"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-labelledby="footer-services">
          <h2
            id="footer-services"
            className="text-gold text-lg font-bold tracking-wide"
          >
            Services
          </h2>
          <ul className="mt-5 flex flex-col gap-3">
            {services.map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  className="hover:text-gold inline-block text-sm text-white/70 transition-all hover:translate-x-1"
                >
                  {service.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-gold text-lg font-bold tracking-wide">Contact</h2>
          <ul className="mt-5 flex flex-col gap-4 text-sm">
            {site.phones.map((phone) => (
              <li key={phone.raw} className="flex items-center gap-3">
                <Phone className="text-gold size-4 shrink-0" aria-hidden="true" />
                <a
                  href={`tel:${phone.raw}`}
                  className="hover:text-gold text-white/80 transition"
                >
                  {phone.display}
                </a>
              </li>
            ))}

            <li className="flex items-center gap-3">
              <Mail className="text-gold size-4 shrink-0" aria-hidden="true" />
              <a
                href={`mailto:${site.email}`}
                className="hover:text-gold break-all text-white/80 transition"
              >
                {site.email}
              </a>
            </li>

            <li className="flex items-center gap-3">
              <MapPin className="text-gold size-4 shrink-0" aria-hidden="true" />
              <a
                href={site.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gold text-white/80 transition"
              >
                {site.address.display}
              </a>
            </li>

            <li className="flex items-center gap-3">
              <Clock className="text-gold size-4 shrink-0" aria-hidden="true" />
              <span className="text-white/80">{site.hours.display}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="gutter mx-auto max-w-[81.25rem] border-t border-white/10 py-6">
        <p className="text-center text-sm text-white/55">
          © {new Date().getFullYear()} {site.name} | All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
