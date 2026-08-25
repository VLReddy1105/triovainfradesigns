import type { Metadata } from "next";
import { site } from "@/data/site";

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? site.url;

interface PageMetaOptions {
  title: string;
  description: string;
  /** Path with a leading slash, e.g. "/services/construction". */
  path: string;
  image?: string;
}

/** Builds per-route metadata with canonical, Open Graph and Twitter tags. */
export function pageMetadata({
  title,
  description,
  path,
  image = site.ogImage,
}: PageMetaOptions): Metadata {
  const url = `${siteUrl}${path === "/" ? "" : path}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: site.name,
      locale: site.locale,
      type: "website",
      images: [
        {
          url: `${siteUrl}${image}`,
          width: 1200,
          height: 630,
          alt: site.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${siteUrl}${image}`],
    },
  };
}
