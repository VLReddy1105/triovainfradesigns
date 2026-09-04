import { Hero } from "@/components/sections/Hero";
import { ArchitecturalStory } from "@/components/architecture/ArchitecturalStory";
import { TrustBar } from "@/components/sections/TrustBar";
import { AboutSection } from "@/components/sections/AboutSection";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { PortfolioPreview } from "@/components/sections/PortfolioPreview";
import { WhyChoose } from "@/components/sections/WhyChoose";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { TestimonialCarousel } from "@/components/sections/TestimonialCarousel";
import { FaqSection } from "@/components/sections/FaqSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { FaqJsonLd } from "@/components/seo/JsonLd";
import { homeFaqs } from "@/data/faqs";
import { homeProcess } from "@/data/process";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/data/site";

export const metadata = pageMetadata({
  title: `${site.name} | Premium Interior Designers in Hyderabad`,
  description: site.description,
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <FaqJsonLd faqs={homeFaqs} />
      <Hero />
      <ArchitecturalStory />
      <TrustBar />
      <AboutSection />
      <ServicesGrid />
      <PortfolioPreview />
      <WhyChoose />
      <ProcessTimeline steps={homeProcess} />
      <TestimonialCarousel />
      <FaqSection faqs={homeFaqs} />
      <ContactSection />
    </>
  );
}
