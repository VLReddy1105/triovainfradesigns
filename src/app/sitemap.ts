import type { MetadataRoute } from "next";
import { services } from "@/data/services";
import { siteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes = [
    { path: "/", priority: 1 },
    { path: "/services", priority: 0.9 },
    { path: "/portfolio", priority: 0.8 },
    { path: "/about", priority: 0.7 },
    { path: "/contact", priority: 0.7 },
  ];

  return [
    ...staticRoutes.map(({ path, priority }) => ({
      url: `${siteUrl}${path === "/" ? "" : path}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority,
    })),
    ...services.map((service) => ({
      url: `${siteUrl}/services/${service.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
  ];
}
