import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";
import type { ProcessStep } from "@/types";

interface ProcessTimelineProps {
  steps: ProcessStep[];
  tag?: string;
  heading?: string;
  description?: string;
  tone?: "white" | "surface";
}

export function ProcessTimeline({
  steps,
  tag = "Our Process",
  heading = "From Vision to Reality",
  description = "Every project follows a structured process that ensures quality, transparency, and timely delivery.",
  tone = "surface",
}: ProcessTimelineProps) {
  return (
    <Section tone={tone} aria-labelledby="process-heading">
      <Container width="wide">
        <SectionTitle
          id="process-heading"
          tag={tag}
          title={heading}
          description={description}
        />

        <ol className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <Reveal as="li" key={step.step} delay={index * 0.06}>
              <Card interactive className="flex h-full flex-col items-center p-8 text-center">
                <span className="bg-gold text-navy shadow-gold grid size-14 place-items-center rounded-full text-lg font-bold">
                  {step.step}
                </span>
                <Icon name={step.icon} className="text-gold my-6 size-9" />
                <h3 className="text-ink text-lg font-bold">{step.title}</h3>
                <p className="text-body mt-3 text-sm leading-relaxed">
                  {step.description}
                </p>
              </Card>
            </Reveal>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
