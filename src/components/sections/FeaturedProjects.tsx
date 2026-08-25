import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { getProjects } from "@/data/projects";
import { cn } from "@/lib/utils";

interface FeaturedProjectsProps {
  ids: string[];
  heading?: string;
  description?: string;
}

export function FeaturedProjects({
  ids,
  heading = "Featured Projects",
  description = "Every project reflects our commitment to craftsmanship, functionality and timeless luxury.",
}: FeaturedProjectsProps) {
  const featured = getProjects(ids);
  if (featured.length === 0) return null;

  return (
    <Section tone="white" aria-labelledby="featured-heading">
      <Container width="wide">
        <SectionTitle
          id="featured-heading"
          tag="Our Portfolio"
          title={heading}
          description={description}
        />

        <ul className="mt-16 grid auto-rows-[16rem] gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((project, index) => (
            <Reveal
              as="li"
              key={project.id}
              delay={index * 0.06}
              className={cn(index === 0 && "sm:col-span-2 sm:row-span-2")}
            >
              <figure className="rounded-card shadow-card group relative h-full overflow-hidden">
                <Image
                  src={project.image.src}
                  alt={project.image.alt}
                  fill
                  sizes={
                    index === 0
                      ? "(max-width: 640px) 92vw, (max-width: 1024px) 92vw, 620px"
                      : "(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 300px"
                  }
                  className="ease-out-soft object-cover transition-transform duration-600 group-hover:scale-108"
                />
                <figcaption className="from-navy/95 via-navy/40 absolute inset-0 flex flex-col justify-end bg-gradient-to-t to-transparent p-6">
                  <span className="text-gold text-xs font-semibold tracking-[0.15em] uppercase">
                    {project.category}
                  </span>
                  <h3 className="mt-2 text-lg font-bold text-white sm:text-xl">
                    {project.title}
                  </h3>
                  <p className="mt-1 text-sm text-white/70">{project.meta}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>

        <div className="mt-14 flex justify-center">
          <ButtonLink href="/portfolio" variant="secondary" size="lg">
            View Full Portfolio
            <ArrowRight className="size-4" aria-hidden="true" />
          </ButtonLink>
        </div>
      </Container>
    </Section>
  );
}
