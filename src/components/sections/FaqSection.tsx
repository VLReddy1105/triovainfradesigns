import { Accordion } from "@/components/ui/Accordion";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ContactCard } from "@/components/sections/ContactCard";
import type { Faq } from "@/types";

interface FaqSectionProps {
  faqs: Faq[];
  heading?: string;
  description?: string;
  tone?: "white" | "surface";
  /** Renders the phone/WhatsApp panel beside the questions. */
  withContactCard?: boolean;
}

export function FaqSection({
  faqs,
  heading = "Frequently Asked Questions",
  description = "Everything you need to know before starting your project with Triova.",
  tone = "white",
  withContactCard = true,
}: FaqSectionProps) {
  return (
    <Section tone={tone} aria-labelledby="faq-heading">
      <Container width="wide">
        <SectionTitle
          id="faq-heading"
          tag="FAQs"
          title={heading}
          description={description}
        />

        <div
          className={
            withContactCard
              ? "mt-16 grid items-start gap-10 lg:grid-cols-[1.6fr_1fr]"
              : "mx-auto mt-16 max-w-3xl"
          }
        >
          <Accordion items={faqs} />
          {withContactCard ? <ContactCard /> : null}
        </div>
      </Container>
    </Section>
  );
}
