import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";
import type { Service } from "@/types";

export function SubServices({ service }: { service: Service }) {
  return (
    <Section tone="surface" aria-labelledby="sub-services-heading">
      <Container width="wide">
        <SectionTitle
          id="sub-services-heading"
          tag="Our Expertise"
          title={service.subServicesHeading}
          description={`Every part of a ${service.name.toLowerCase()} project, handled by one accountable team.`}
        />

        <ul className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {service.subServices.map((sub, index) => (
            <Reveal as="li" key={sub.title} delay={index * 0.06}>
              <Card interactive className="flex h-full flex-col p-8">
                <Icon name={sub.icon} className="text-gold mb-6 size-10" />
                <h3 className="text-ink text-lg font-bold">{sub.title}</h3>
                <p className="text-body mt-3 text-sm leading-relaxed">
                  {sub.description}
                </p>
              </Card>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
