import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { projects } from "@/data/projects";

const preview = projects.slice(0, 6);

export function PortfolioPreview() {
  return (
    <Section id="portfolio" tone="white" aria-labelledby="portfolio-heading">
      <Container width="wide">
        <SectionTitle
          id="portfolio-heading"
          tag="Our Portfolio"
          title="Our Signature Projects"
          description="From luxury residences to commercial interiors, every project reflects our commitment to quality, craftsmanship and timeless design."
        />

        <ul className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {preview.map((project, index) => (
            <Reveal as="li" key={project.id} delay={index * 0.06}>
              <figure className="rounded-card shadow-card group relative h-72 overflow-hidden">
                <Image
                  src={project.image.src}
                  alt={project.image.alt}
                  fill
                  sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 400px"
                  className="ease-out-soft object-cover transition-transform duration-600 group-hover:scale-108"
                />
                <figcaption className="from-navy/95 via-navy/50 absolute inset-0 flex flex-col justify-end bg-gradient-to-t to-transparent p-7 opacity-0 transition-opacity duration-300 group-hover:opacity-100 focus-within:opacity-100">
                  <h3 className="text-xl font-bold text-white">
                    {project.title}
                  </h3>
                  <p className="mt-1 text-sm text-white/75">{project.meta}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>

        <div className="mt-14 flex justify-center">
          <ButtonLink href="/portfolio" size="lg">
            Explore All Projects
            <ArrowRight className="size-4" aria-hidden="true" />
          </ButtonLink>
        </div>
      </Container>
    </Section>
  );
}
