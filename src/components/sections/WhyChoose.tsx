import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { whyChoose } from "@/data/whyChoose";

export function WhyChoose() {
  return (
    <Section tone="white" aria-labelledby="why-heading">
      <Container width="wide">
        <SectionTitle
          id="why-heading"
          tag="Why Choose Triova"
          title="Why Homeowners & Businesses Choose Triova"
          description="We combine decades of industry expertise with innovative design, premium materials, and flawless execution to create spaces that are elegant, functional, and built to last."
        />

        <ul className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {whyChoose.map((feature, index) => (
            <Reveal as="li" key={feature.title} delay={index * 0.06}>
              <Card interactive className="hover:ring-gold/40 flex h-full flex-col p-8 text-center hover:ring-1">
                <Icon
                  name={feature.icon}
                  className="text-gold mx-auto mb-6 size-11"
                />
                <h3 className="text-ink text-lg font-bold">{feature.title}</h3>
                <p className="text-body mt-3 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
