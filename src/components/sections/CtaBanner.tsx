import { ArrowRight, Phone } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { primaryPhone } from "@/data/site";

interface CtaBannerProps {
  heading: string;
  description: string;
}

export function CtaBanner({ heading, description }: CtaBannerProps) {
  return (
    <section
      aria-labelledby="cta-heading"
      className="bg-ink relative overflow-hidden py-20 lg:py-24"
    >
      <span
        aria-hidden="true"
        className="bg-gold/8 absolute -top-40 -left-32 size-[28rem] rounded-full"
      />
      <span
        aria-hidden="true"
        className="bg-gold/8 absolute -right-32 -bottom-40 size-[28rem] rounded-full"
      />

      <Container className="relative text-center">
        <h2
          id="cta-heading"
          className="text-balance-heading text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl"
        >
          {heading}
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
          {description}
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <ButtonLink href="/contact" size="lg">
            Get Free Consultation
            <ArrowRight className="size-4" aria-hidden="true" />
          </ButtonLink>
          <ButtonLink
            href={`tel:${primaryPhone.raw}`}
            external
            variant="onDark"
            size="lg"
          >
            <Phone className="size-4" aria-hidden="true" />
            {primaryPhone.display}
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
