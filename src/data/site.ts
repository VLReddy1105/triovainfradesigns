import type { NavLink } from "@/types";

/**
 * Every piece of real business data lives here. Nothing else in the codebase
 * should hard-code a phone number, an address or the domain.
 */
export const site = {
  name: "Triova Infradesigns Pvt. Ltd.",
  shortName: "Triova",
  legalName: "Triova Infradesigns Private Limited",
  url: "https://www.triovainfradesigns.com",
  description:
    "Triova Infradesigns Pvt. Ltd. provides premium interior design, architecture, construction, renovation, turnkey execution, and interior material supply in Hyderabad.",
  tagline: "Premium Interior Design • Architecture • Construction",
  locale: "en_IN",

  phones: [
    { display: "+91 77998 22344", raw: "+917799822344", primary: true },
    { display: "+91 63032 22344", raw: "+916303222344", primary: false },
  ],
  email: "triova.infradesigns@gmail.com",
  address: {
    locality: "Hyderabad",
    region: "Telangana",
    country: "IN",
    display: "Hyderabad, Telangana",
  },
  hours: {
    display: "Mon – Sat, 9:00 AM – 7:00 PM",
    opens: "09:00",
    closes: "19:00",
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  },
  /** Approximate city-centre coordinates — see README before publishing. */
  geo: { latitude: 17.385, longitude: 78.4867 },

  mapsUrl: "https://maps.google.com/?q=Hyderabad,Telangana",
  mapEmbedUrl:
    "https://www.google.com/maps?q=Hyderabad,Telangana,India&output=embed",

  ogImage: "/images/og-image.jpg",
  /** Browser UI colour on mobile. Mirrors --color-navy-bright in globals.css. */
  themeColor: "#0B3B7A",
  foundingYear: 2019,
} as const;

export const primaryPhone = site.phones[0];

export const whatsappUrl = `https://wa.me/${primaryPhone.raw.replace("+", "")}`;

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Interior Design", href: "/services/interior-designing" },
      { label: "Construction", href: "/services/construction" },
      { label: "Home Renovation", href: "/services/home-renovation" },
      { label: "Interior Material Supply", href: "/services/raw-materials" },
    ],
  },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Contact", href: "/contact" },
];

/** Service names exactly as the business describes them. */
export const serviceNames = [
  "Interior Design",
  "Architecture",
  "Construction",
  "Renovation",
  "Turnkey Execution",
  "Interior Material Supply",
] as const;

export type ServiceEnquiryOption = (typeof serviceNames)[number];
