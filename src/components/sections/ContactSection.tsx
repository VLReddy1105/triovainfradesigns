import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ContactForm } from "@/components/sections/ContactForm";
import { MapEmbed } from "@/components/sections/MapEmbed";
import { site } from "@/data/site";

interface ContactSectionProps {
  headingLevel?: "h1" | "h2";
  showMap?: boolean;
  tag?: string;
  heading?: string;
  description?: string;
}

export function ContactSection({
  headingLevel = "h2",
  showMap = true,
  tag = "Contact Us",
  heading = "Let's Build Your Dream Space",
  description = "Tell us about your project and our team will get back to you shortly.",
}: ContactSectionProps) {
  return (
    <Section id="contact" tone="surface" aria-labelledby="contact-heading">
      <Container width="wide">
        <SectionTitle
          id="contact-heading"
          as={headingLevel}
          tag={tag}
          title={heading}
          description={description}
        />

        <div className="mt-16 grid items-start gap-10 lg:grid-cols-[1.5fr_1fr]">
          <ContactForm />

          <div className="flex flex-col gap-8">
            <div className="rounded-panel shadow-card bg-white p-8">
              <h3 className="text-ink text-xl font-bold">
                Contact Information
              </h3>

              <ul className="mt-7 flex flex-col gap-6">
                <li className="flex items-start gap-4">
                  <span className="bg-gold text-navy grid size-11 shrink-0 place-items-center rounded-full">
                    <Phone className="size-5" aria-hidden="true" />
                  </span>
                  <span className="flex flex-col gap-1">
                    {site.phones.map((phone) => (
                      <a
                        key={phone.raw}
                        href={`tel:${phone.raw}`}
                        className="text-body hover:text-navy-bright font-medium transition"
                      >
                        {phone.display}
                      </a>
                    ))}
                  </span>
                </li>

                <li className="flex items-start gap-4">
                  <span className="bg-gold text-navy grid size-11 shrink-0 place-items-center rounded-full">
                    <Mail className="size-5" aria-hidden="true" />
                  </span>
                  <a
                    href={`mailto:${site.email}`}
                    className="text-body hover:text-navy-bright font-medium break-all transition"
                  >
                    {site.email}
                  </a>
                </li>

                <li className="flex items-start gap-4">
                  <span className="bg-gold text-navy grid size-11 shrink-0 place-items-center rounded-full">
                    <MapPin className="size-5" aria-hidden="true" />
                  </span>
                  <a
                    href={site.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-body hover:text-navy-bright font-medium transition"
                  >
                    {site.address.display}
                  </a>
                </li>

                <li className="flex items-start gap-4">
                  <span className="bg-gold text-navy grid size-11 shrink-0 place-items-center rounded-full">
                    <Clock className="size-5" aria-hidden="true" />
                  </span>
                  <p className="text-body font-medium">{site.hours.display}</p>
                </li>
              </ul>
            </div>

            {showMap ? <MapEmbed /> : null}
          </div>
        </div>
      </Container>
    </Section>
  );
}
