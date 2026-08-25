import { notFound } from "next/navigation";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { FaqSection } from "@/components/sections/FaqSection";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { ServiceHero } from "@/components/sections/ServiceHero";
import { ServiceShowcase } from "@/components/sections/ServiceShowcase";
import { SubServices } from "@/components/sections/SubServices";
import {
  BreadcrumbJsonLd,
  FaqJsonLd,
  ServiceJsonLd,
} from "@/components/seo/JsonLd";
import { getService, services } from "@/data/services";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) return {};

  return pageMetadata({
    title: service.metaTitle,
    description: service.metaDescription,
    path: `/services/${service.slug}`,
  });
}

export default async function ServicePage({
  params,
}: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) notFound();

  return (
    <>
      <ServiceJsonLd service={service} />
      <FaqJsonLd faqs={service.faqs} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
          { name: service.name, href: `/services/${service.slug}` },
        ]}
      />

      <ServiceHero service={service} />
      <ServiceShowcase service={service} />
      <SubServices service={service} />

      <ProcessTimeline
        steps={service.process}
        heading={`Our ${service.name} Process`}
        description="From the first consultation to the final handover, every stage is planned, supervised and signed off."
        tone="white"
      />

      <FeaturedProjects
        ids={service.featuredProjects}
        heading={`Featured ${service.name} Projects`}
      />

      <FaqSection
        faqs={service.faqs}
        description={`Everything you need to know before starting your ${service.name.toLowerCase()} project with Triova.`}
        tone="surface"
      />

      <CtaBanner
        heading={`Ready to Start Your ${service.name} Project?`}
        description="Book a free consultation and we'll walk you through scope, timeline and budget before you commit to anything."
      />
    </>
  );
}
