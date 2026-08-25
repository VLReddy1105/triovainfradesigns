import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { Tag } from "@/components/ui/Tag";
import type { Service } from "@/types";

export function ServiceShowcase({ service }: { service: Service }) {
  return (
    <Section tone="white" aria-labelledby="showcase-heading">
      <Container width="wide">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <Tag>What We Do</Tag>

            <h2
              id="showcase-heading"
              className="text-balance-heading text-ink mt-6 text-3xl leading-tight font-bold tracking-tight sm:text-4xl"
            >
              {service.showcaseHeading}
            </h2>

            <p className="text-body mt-6 text-base leading-relaxed sm:text-lg">
              {service.showcaseBody}
            </p>

            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {service.highlights.map((highlight) => (
                <li key={highlight} className="flex items-center gap-3">
                  <span className="bg-gold/15 grid size-6 shrink-0 place-items-center rounded-full">
                    <Check
                      className="text-gold-text size-3.5"
                      strokeWidth={3}
                      aria-hidden="true"
                    />
                  </span>
                  <span className="text-ink text-sm font-medium">
                    {highlight}
                  </span>
                </li>
              ))}
            </ul>

            <ButtonLink href="/contact" size="lg" className="mt-10">
              Book Free Consultation
              <ArrowRight className="size-4" aria-hidden="true" />
            </ButtonLink>
          </Reveal>

          <Reveal delay={0.1}>
            <Image
              src={service.showcase.src}
              alt={service.showcase.alt}
              width={service.showcase.width}
              height={service.showcase.height}
              sizes="(max-width: 1024px) 92vw, 600px"
              className="rounded-panel shadow-panel h-[22rem] w-full object-cover sm:h-[30rem] lg:h-[34rem]"
            />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
