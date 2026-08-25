import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { services } from "@/data/services";

interface ServicesGridProps {
  heading?: string;
  description?: string;
  tone?: "white" | "surface";
}

export function ServicesGrid({
  heading = "Complete Interior Solutions Under One Roof",
  description = "From concept to completion, Triova provides premium design, execution, renovation and material supply services for homes, offices and commercial spaces.",
  tone = "surface",
}: ServicesGridProps) {
  return (
    <Section id="services" tone={tone} aria-labelledby="services-heading">
      <Container width="wide">
        <SectionTitle
          id="services-heading"
          tag="Our Services"
          title={heading}
          description={description}
        />

        <ul className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <Reveal as="li" key={service.slug} delay={index * 0.08}>
              <Link
                href={`/services/${service.slug}`}
                className="rounded-card shadow-card ease-out-soft hover:shadow-card-hover group flex h-full flex-col overflow-hidden bg-white transition-all duration-300 hover:-translate-y-2"
              >
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={service.card.src}
                    alt={service.card.alt}
                    fill
                    sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 300px"
                    className="ease-out-soft object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="flex flex-1 flex-col p-7">
                  <h3 className="text-ink text-xl font-bold">{service.name}</h3>
                  <p className="text-body mt-3 text-sm leading-relaxed">
                    {service.summary}
                  </p>
                  <span className="text-gold-text mt-6 inline-flex items-center gap-2 text-sm font-semibold">
                    Explore Service
                    <ArrowRight
                      className="size-4 transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
