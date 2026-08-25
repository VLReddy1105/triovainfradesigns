import { site } from "@/data/site";
import { services } from "@/data/services";
import type { Faq, Service } from "@/types";

function Script({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // The payload is built from local data, never from user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

const businessId = `${site.url}/#localbusiness`;

/** Emitted once from the root layout. */
export function LocalBusinessJsonLd() {
  return (
    <Script
      data={{
        "@context": "https://schema.org",
        "@type": ["LocalBusiness", "GeneralContractor", "HomeAndConstructionBusiness"],
        "@id": businessId,
        name: site.name,
        legalName: site.legalName,
        description: site.description,
        url: site.url,
        image: `${site.url}${site.ogImage}`,
        logo: `${site.url}/images/logo.png`,
        telephone: site.phones.map((phone) => phone.raw),
        email: site.email,
        foundingDate: String(site.foundingYear),
        address: {
          "@type": "PostalAddress",
          addressLocality: site.address.locality,
          addressRegion: site.address.region,
          addressCountry: site.address.country,
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: site.geo.latitude,
          longitude: site.geo.longitude,
        },
        areaServed: {
          "@type": "City",
          name: site.address.locality,
        },
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: site.hours.days,
            opens: site.hours.opens,
            closes: site.hours.closes,
          },
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Services",
          itemListElement: services.map((service) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: service.name,
              url: `${site.url}/services/${service.slug}`,
            },
          })),
        },
      }}
    />
  );
}

export function ServiceJsonLd({ service }: { service: Service }) {
  return (
    <Script
      data={{
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": `${site.url}/services/${service.slug}/#service`,
        name: service.name,
        serviceType: service.name,
        description: service.metaDescription,
        url: `${site.url}/services/${service.slug}`,
        provider: { "@id": businessId },
        areaServed: {
          "@type": "City",
          name: site.address.locality,
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: service.subServicesHeading,
          itemListElement: service.subServices.map((sub) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: sub.title },
          })),
        },
      }}
    />
  );
}

export function FaqJsonLd({ faqs }: { faqs: Faq[] }) {
  return (
    <Script
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      }}
    />
  );
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; href: string }[];
}) {
  return (
    <Script
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: `${site.url}${item.href}`,
        })),
      }}
    />
  );
}
