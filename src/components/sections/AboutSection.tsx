import Image from "next/image";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { Tag } from "@/components/ui/Tag";
import { site } from "@/data/site";

const pillars = [
  "Luxury Interior Design",
  "Architecture & Planning",
  "Construction & Renovation",
  "Complete Turnkey Execution",
];

interface AboutSectionProps {
  /** The about page renders this as its H1; the home page as an H2. */
  headingLevel?: "h1" | "h2";
  showCta?: boolean;
}

export function AboutSection({
  headingLevel: Heading = "h2",
  showCta = true,
}: AboutSectionProps) {
  return (
    <Section id="about" tone="white" aria-labelledby="about-heading">
      <Container width="wide">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <div className="relative">
              <Image
                src="/images/living-room.webp"
                alt="Living room designed and executed by Triova in Hyderabad"
                width={768}
                height={501}
                sizes="(max-width: 1024px) 92vw, 600px"
                className="rounded-panel shadow-panel h-[22rem] w-full object-cover sm:h-[30rem] lg:h-[34rem]"
              />
              <div className="bg-gold text-navy shadow-card-hover absolute bottom-5 left-5 rounded-2xl px-7 py-5 text-center lg:-left-8">
                <p className="text-4xl font-extrabold">20+</p>
                <p className="mt-1 text-xs font-semibold tracking-wide">
                  Years Combined Experience
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <Tag>About Triova</Tag>

            <Heading
              id="about-heading"
              className="text-balance-heading text-ink mt-6 text-3xl leading-tight font-bold tracking-tight sm:text-4xl lg:text-5xl"
            >
              Designing Elegant Spaces That Reflect Your Lifestyle
            </Heading>

            <p className="text-body mt-6 text-base leading-relaxed sm:text-lg">
              At <strong className="text-ink">{site.name}</strong>, we create
              luxurious, functional and timeless interiors that perfectly blend
              aesthetics with practicality. From premium residences to
              commercial spaces, our expert team delivers complete turnkey
              solutions with exceptional craftsmanship, innovative design, and
              meticulous attention to detail.
            </p>

            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {pillars.map((pillar) => (
                <li key={pillar} className="flex items-center gap-3">
                  <CheckCircle2
                    className="text-gold-text size-5 shrink-0"
                    aria-hidden="true"
                  />
                  <span className="text-ink font-medium">{pillar}</span>
                </li>
              ))}
            </ul>

            {showCta ? (
              <div className="mt-9 flex flex-wrap gap-4">
                <ButtonLink href="/contact">
                  Get Free Consultation
                  <ArrowRight className="size-4" aria-hidden="true" />
                </ButtonLink>
                <ButtonLink href="/portfolio" variant="secondary">
                  View Portfolio
                </ButtonLink>
              </div>
            ) : null}

            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              <div className="bg-surface rounded-2xl px-6 py-6 text-center">
                <p className="text-gold-text text-3xl font-bold">250+</p>
                <p className="text-body mt-1 text-sm">
                  Projects Successfully Delivered
                </p>
              </div>
              <div className="bg-surface rounded-2xl px-6 py-6 text-center">
                <p className="text-gold-text text-3xl font-bold">100%</p>
                <p className="text-body mt-1 text-sm">
                  Client Satisfaction Rate
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
