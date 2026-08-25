import { CtaBanner } from "@/components/sections/CtaBanner";
import { PageHero } from "@/components/sections/PageHero";
import { PortfolioGallery } from "@/components/sections/PortfolioGallery";
import { Section } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Container } from "@/components/ui/Container";
import { TestimonialCarousel } from "@/components/sections/TestimonialCarousel";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Portfolio | Interior, Renovation & Construction Projects",
  description:
    "Browse Triova Infradesigns' portfolio of residential, commercial, renovation and construction projects delivered across Hyderabad.",
  path: "/portfolio",
});

export default function PortfolioPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Portfolio", href: "/portfolio" },
        ]}
      />

      <PageHero
        tag="Our Portfolio"
        title="Projects Crafted With Precision and Elegance"
        description="Discover our premium interior design, renovation and construction projects — filter by category, and select any project to view it larger."
        image={{ src: "/images/wardrobe.webp", alt: "" }}
        breadcrumb={[{ name: "Portfolio", href: "/portfolio" }]}
      />

      <Section tone="surface" aria-labelledby="gallery-heading">
        <Container width="wide" className="!px-0">
          <SectionTitle
            id="gallery-heading"
            tag="Featured Projects"
            title="A Collection of Our Finest Work"
            description="Residential, commercial, renovation and construction projects delivered across Hyderabad."
            className="gutter mb-16"
          />
        </Container>
        <PortfolioGallery />
      </Section>

      <TestimonialCarousel />

      <CtaBanner
        heading="Your Project Could Be Next"
        description="Share your requirements and our team will get back to you with a plan tailored to your space and budget."
      />
    </>
  );
}
