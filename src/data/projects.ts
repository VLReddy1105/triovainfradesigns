import type { Project, ProjectCategory } from "@/types";

export const projectCategories: { value: ProjectCategory | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "residential", label: "Residential" },
  { value: "commercial", label: "Commercial" },
  { value: "renovation", label: "Renovation" },
  { value: "construction", label: "Construction" },
];

export const projects: Project[] = [
  {
    id: "modern-villa",
    title: "Modern Villa Interior",
    category: "residential",
    meta: "Hyderabad • 3200 Sq.ft • Contemporary",
    featured: true,
    image: {
      src: "/images/project1.webp",
      alt: "Double-height villa living area opening onto a kitchen, with full-height glazing and a planted mezzanine",
      width: 474,
      height: 269,
    },
  },
  {
    id: "luxury-living-room",
    title: "Traditional Living Room",
    category: "residential",
    meta: "Hyderabad • Residential Interior",
    image: {
      src: "/images/living-room.webp",
      alt: "Living room with carved teak seating, a cove-lit false ceiling and a wooden TV unit",
      width: 768,
      height: 501,
    },
  },
  {
    id: "modular-kitchen",
    title: "Modular Kitchen",
    category: "renovation",
    meta: "Hyderabad • Kitchen Renovation",
    image: {
      src: "/images/kitchen.webp",
      alt: "L-shaped modular kitchen with walnut shutters, a patterned tile backsplash and a dark granite counter",
      width: 764,
      height: 502,
    },
  },
  {
    id: "master-bedroom",
    title: "Master Bedroom",
    category: "residential",
    meta: "Hyderabad • Luxury Residence",
    image: {
      src: "/images/bedroom.webp",
      alt: "Bedroom with a teak-panelled headboard wall, cove lighting and wooden flooring",
      width: 502,
      height: 512,
    },
  },
  {
    id: "home-office",
    title: "Home Office & Study",
    category: "residential",
    meta: "Hyderabad • Residential Interior",
    image: {
      src: "/images/office.webp",
      alt: "Home study with a full-width wooden desk, drawer unit and floating wall shelves",
      width: 512,
      height: 512,
    },
  },
  {
    id: "home-makeover",
    title: "Complete Home Makeover",
    category: "renovation",
    meta: "Hyderabad • Full Renovation",
    image: {
      src: "/images/home-interior.webp",
      alt: "Double-height living room with a sculptural brass chandelier, marble flooring and a mezzanine walkway",
      width: 1024,
      height: 1024,
    },
  },
  {
    id: "walk-in-wardrobe",
    title: "Walk-in Wardrobe",
    category: "residential",
    meta: "Hyderabad • Residential Interior",
    image: {
      src: "/images/wardrobe.webp",
      alt: "Full-height wardrobe run with backlit glass shutters, brass handles and open display shelving",
      width: 1200,
      height: 800,
    },
  },
  {
    id: "designer-ceiling",
    title: "Designer False Ceiling",
    category: "residential",
    meta: "Hyderabad • Ceiling & Lighting",
    image: {
      src: "/images/ceiling.webp",
      alt: "Formal living room with a circular recessed false ceiling and a crystal chandelier",
      width: 600,
      height: 500,
    },
  },
  {
    id: "structural-works",
    title: "Structural Works",
    category: "construction",
    meta: "Hyderabad • Ground-up Construction",
    image: {
      src: "/images/architecture.webp",
      alt: "Street of pitched-roof buildings viewed along a cobbled lane",
      width: 1400,
      height: 2100,
    },
  },
  {
    id: "minimal-living",
    title: "Minimal Living Room",
    category: "residential",
    meta: "Hyderabad • Apartment",
    image: {
      src: "/images/project2.webp",
      alt: "Minimal living room with a curved bouclé sofa, plaster walls and a stone coffee table",
      width: 330,
      height: 270,
    },
  },
  {
    id: "luxury-modular-kitchen",
    title: "Luxury Modular Kitchen",
    category: "residential",
    meta: "Hyderabad • Kitchen",
    image: {
      src: "/images/project3.webp",
      alt: "Luxury kitchen with a waterfall marble island, gold pendant lights and tall appliance units",
      width: 474,
      height: 266,
    },
  },
  {
    id: "corporate-workspace",
    title: "Corporate Workspace",
    category: "commercial",
    meta: "Hyderabad • Office",
    image: {
      src: "/images/project5.webp",
      alt: "Open-plan office with a long meeting table, timber slat ceiling and a breakout lounge",
      width: 288,
      height: 288,
    },
  },
];

export function getProjects(ids: string[]): Project[] {
  return ids
    .map((id) => projects.find((project) => project.id === id))
    .filter((project): project is Project => project !== undefined);
}
