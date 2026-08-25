import { AboutSection } from "@/components/sections/AboutSection";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { TestimonialCarousel } from "@/components/sections/TestimonialCarousel";
import { TrustBar } from "@/components/sections/TrustBar";
import { WhyChoose } from "@/components/sections/WhyChoose";
import { PageHero } from "@/components/sections/PageHero";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { homeProcess } from "@/data/process";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About Triova Infradesigns | Interior & Construction Firm in Hyderabad",
  description:
    "Triova Infradesigns is a Hyderabad interior design, architecture and construction firm with 20+ years of combined experience and 250+ delivered projects across residential and commercial spaces.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "About", href: "/about" },
        ]}
      />

      <PageHero
        tag="About Triova"
        title="A Single Team, From First Drawing to Final Handover"
        description="Triova Infradesigns brings design, construction and material supply under one roof — so there is one contract, one schedule and one team accountable for the result."
        image={{ src: "/images/hero-luxury.webp", alt: "" }}
        breadcrumb={[{ name: "About", href: "/about" }]}
      />

      <TrustBar />
      <AboutSection headingLevel="h2" />
      <WhyChoose />
      <ProcessTimeline steps={homeProcess} />
      <TestimonialCarousel />

      <CtaBanner
        heading="Let's Talk About Your Project"
        description="Book a free consultation and we'll walk you through scope, timeline and budget before you commit to anything."
      />
    </>
  );
}
