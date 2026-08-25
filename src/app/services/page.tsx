import { CtaBanner } from "@/components/sections/CtaBanner";
import { FaqSection } from "@/components/sections/FaqSection";
import { PageHero } from "@/components/sections/PageHero";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { WhyChoose } from "@/components/sections/WhyChoose";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { homeFaqs } from "@/data/faqs";
import { homeProcess } from "@/data/process";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Our Services | Interior Design, Construction & Renovation",
  description:
    "Interior design, architecture, construction, renovation, turnkey execution and interior material supply in Hyderabad — all delivered by one accountable team at Triova Infradesigns.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
        ]}
      />

      <PageHero
        tag="Our Services"
        title="Complete Interior Solutions Under One Roof"
        description="Design, build, renovate and supply — four services that fit together, so a project never stalls at the handover between two contractors."
        image={{ src: "/images/living-room.webp", alt: "" }}
        breadcrumb={[{ name: "Services", href: "/services" }]}
      />

      <ServicesGrid
        heading="Choose the Service You Need"
        description="Each service page sets out exactly what is included, how the process runs, and what to expect at every stage."
        tone="white"
      />

      <WhyChoose />
      <ProcessTimeline steps={homeProcess} />
      <FaqSection faqs={homeFaqs} />

      <CtaBanner
        heading="Not Sure Which Service You Need?"
        description="Tell us about the space and we'll advise on the right scope — no obligation, no pressure."
      />
    </>
  );
}
