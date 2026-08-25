import { ContactSection } from "@/components/sections/ContactSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { PageHero } from "@/components/sections/PageHero";
import { BreadcrumbJsonLd, FaqJsonLd } from "@/components/seo/JsonLd";
import { homeFaqs } from "@/data/faqs";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact Triova Infradesigns | Interior Designers in Hyderabad",
  description:
    "Get in touch with Triova Infradesigns in Hyderabad. Call +91 77998 22344, email triova.infradesigns@gmail.com, or send an enquiry for a free consultation.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <FaqJsonLd faqs={homeFaqs} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Contact", href: "/contact" },
        ]}
      />

      <PageHero
        tag="Contact Us"
        title="Let's Build Your Dream Space"
        description="Tell us about your project and our team will get back to you during business hours. Consultations are free and come with no obligation."
        image={{ src: "/images/home-interior.webp", alt: "" }}
        breadcrumb={[{ name: "Contact", href: "/contact" }]}
      />

      <ContactSection
        tag="Send an Enquiry"
        heading="Tell Us About Your Project"
        description="Share a few details and our team will call you back during business hours. You can also reach us directly on the numbers below."
      />
      <FaqSection faqs={homeFaqs} tone="white" withContactCard={false} />
    </>
  );
}
