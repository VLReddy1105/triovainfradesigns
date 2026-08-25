import type { ICON_REGISTRY } from "@/components/ui/Icon";

/** Every icon name the content layer is allowed to reference. */
export type IconName = keyof typeof ICON_REGISTRY;

export interface NavLink {
  label: string;
  href: string;
  children?: NavLink[];
}

export interface Stat {
  /** Numeric portion, used to drive the count-up. Omit for non-numeric stats. */
  value?: number;
  /** Rendered before the number, e.g. nothing today. */
  prefix?: string;
  /** Rendered after the number, e.g. "+" or "%". */
  suffix?: string;
  /** Used verbatim when `value` is absent, e.g. "Turnkey". */
  display?: string;
  label: string;
  icon: IconName;
}

export interface Feature {
  title: string;
  description: string;
  icon: IconName;
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
  icon: IconName;
}

export interface SubService {
  title: string;
  description: string;
  icon: IconName;
}

export interface Faq {
  question: string;
  answer: string;
}

export type ServiceSlug =
  | "interior-designing"
  | "construction"
  | "home-renovation"
  | "raw-materials";

export interface ServiceImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface Service {
  slug: ServiceSlug;
  /** Short label used in nav, footer and cards. */
  name: string;
  /** Full H1 for the service page. */
  heading: string;
  /** Eyebrow tag above the heading. */
  tagline: string;
  /** One-line summary used on cards and in metadata. */
  summary: string;
  /** Two-to-three sentence intro used at the top of the service page. */
  intro: string;
  metaTitle: string;
  metaDescription: string;
  card: ServiceImage;
  hero: ServiceImage;
  /** Image beside the "what we do" copy block. */
  showcase: ServiceImage;
  showcaseHeading: string;
  showcaseBody: string;
  /** Bullet list beside the showcase image. */
  highlights: string[];
  subServicesHeading: string;
  subServices: SubService[];
  process: ProcessStep[];
  faqs: Faq[];
  /** Project ids pulled from `projects.ts`. */
  featuredProjects: string[];
}

export type ProjectCategory =
  | "residential"
  | "commercial"
  | "renovation"
  | "construction";

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  /** Rendered under the title, e.g. "Hyderabad • 3200 Sq.ft". */
  meta: string;
  image: ServiceImage;
  /** Marks the hero tile in the featured grid. */
  featured?: boolean;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  rating: 1 | 2 | 3 | 4 | 5;
}
