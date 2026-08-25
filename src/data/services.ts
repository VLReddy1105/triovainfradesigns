import type { Service, ServiceSlug } from "@/types";

/**
 * All four service pages are driven from this file. The interior-design entry
 * is ported from the original `interior-designing.html`; the other three were
 * written from scratch because those source files were empty — see README.
 */
export const services: Service[] = [
  {
    slug: "interior-designing",
    name: "Interior Design",
    tagline: "Premium Interior Design",
    heading: "Luxury Interiors Crafted Around Your Lifestyle",
    summary:
      "Luxury residential and commercial interiors crafted to perfection.",
    intro:
      "Transform your home or commercial space with bespoke interior design solutions that blend luxury, functionality, and timeless elegance. Every project is tailored to reflect your vision.",
    metaTitle: "Interior Design in Hyderabad | Luxury Home & Office Interiors",
    metaDescription:
      "Bespoke interior design in Hyderabad by Triova Infradesigns — living rooms, modular kitchens, bedrooms, wardrobes, false ceilings and office interiors with turnkey execution.",
    card: {
      src: "/images/living-room.webp",
      alt: "Living room with carved teak seating and a cove-lit false ceiling",
      width: 768,
      height: 501,
    },
    hero: {
      src: "/images/home-interior.webp",
      alt: "Double-height living room with a sculptural brass chandelier and marble flooring",
      width: 1024,
      height: 1024,
    },
    showcase: {
      src: "/images/ceiling.webp",
      alt: "Formal living room with a circular recessed false ceiling and a crystal chandelier",
      width: 600,
      height: 500,
    },
    showcaseHeading: "Everything You Need Under One Roof",
    showcaseBody:
      "Whether you're building a new home or renovating an existing one, Triova provides complete interior design solutions with premium craftsmanship, intelligent planning, and flawless execution.",
    highlights: [
      "Living Room Interiors",
      "Modular Kitchens",
      "Luxury Bedrooms",
      "Walk-in Wardrobes",
      "TV Units",
      "False Ceilings",
      "Dining Areas",
      "Pooja Units",
      "Home Office",
      "Commercial Interiors",
    ],
    subServicesHeading: "Spaces We Design",
    subServices: [
      {
        icon: "sofa",
        title: "Living Rooms",
        description:
          "Elegant and luxurious living spaces for modern lifestyles.",
      },
      {
        icon: "key",
        title: "Bedrooms",
        description:
          "Comfortable spaces designed for relaxation and style.",
      },
      {
        icon: "boxes",
        title: "Modular Kitchens",
        description:
          "Beautiful kitchens with intelligent storage solutions.",
      },
      {
        icon: "door",
        title: "Wardrobes",
        description: "Modern wardrobe designs with maximum functionality.",
      },
      {
        icon: "building",
        title: "Office Interiors",
        description: "Professional workspaces that inspire productivity.",
      },
      {
        icon: "lightbulb",
        title: "False Ceilings",
        description:
          "Premium ceiling concepts with modern lighting designs.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Consultation",
        description: "Understanding your vision, requirements and budget.",
        icon: "message",
      },
      {
        step: "02",
        title: "Site Visit",
        description: "Detailed measurements and space analysis.",
        icon: "ruler",
      },
      {
        step: "03",
        title: "Concept Design",
        description:
          "Layouts, mood boards and planning tailored to your lifestyle.",
        icon: "drafting",
      },
      {
        step: "04",
        title: "3D Visualization",
        description:
          "Photorealistic renders so you can visualize the final outcome.",
        icon: "blocks",
      },
      {
        step: "05",
        title: "Material Selection",
        description: "Premium materials, finishes and color palettes.",
        icon: "paint",
      },
      {
        step: "06",
        title: "Execution",
        description:
          "Expert craftsmanship with dedicated project supervision.",
        icon: "hammer",
      },
      {
        step: "07",
        title: "Quality Check",
        description: "Multiple inspections before project completion.",
        icon: "scan",
      },
      {
        step: "08",
        title: "Handover",
        description: "Delivering your dream space, ready to enjoy.",
        icon: "key",
      },
    ],
    faqs: [
      {
        question: "How long does an interior design project take?",
        answer:
          "Project timelines depend on the scope and size of the project. Most residential interiors are completed within 6–12 weeks after design approval.",
      },
      {
        question: "Do you provide 3D designs before execution?",
        answer:
          "Yes. We provide detailed 2D layouts and realistic 3D visualizations so you can confidently approve the design before execution begins.",
      },
      {
        question: "Can I customize every room?",
        answer:
          "Absolutely. Every space is designed according to your lifestyle, preferences, and functional requirements.",
      },
      {
        question: "Do you provide turnkey interior solutions?",
        answer:
          "Yes. We handle everything from design and material selection to execution, quality checks, and final handover.",
      },
      {
        question: "Which locations do you serve?",
        answer:
          "We primarily serve Hyderabad and surrounding areas. For larger projects, we also undertake work in other cities upon discussion.",
      },
    ],
    featuredProjects: [
      "modern-villa",
      "minimal-living",
      "luxury-modular-kitchen",
      "master-bedroom",
      "corporate-workspace",
    ],
  },

  {
    slug: "construction",
    name: "Construction",
    tagline: "Architecture & Construction",
    heading: "Built to Last, Delivered on Schedule",
    summary:
      "Premium residential and commercial construction solutions.",
    intro:
      "From the first structural drawing to the final coat of paint, Triova takes on ground-up construction with the same discipline we bring to interiors — clear drawings, supervised workmanship and a fixed, transparent scope.",
    metaTitle: "Construction Company in Hyderabad | Residential & Commercial",
    metaDescription:
      "Ground-up residential and commercial construction in Hyderabad by Triova Infradesigns — architecture, structural work, MEP, finishing and supervised turnkey delivery.",
    card: {
      src: "/images/architecture.webp",
      alt: "Street of pitched-roof buildings viewed along a cobbled lane",
      width: 1400,
      height: 2100,
    },
    hero: {
      src: "/images/architecture.webp",
      alt: "Street of pitched-roof buildings viewed along a cobbled lane",
      width: 1400,
      height: 2100,
    },
    showcase: {
      src: "/images/project1.webp",
      alt: "Double-height living area of a completed villa, opening onto a kitchen",
      width: 474,
      height: 269,
    },
    showcaseHeading: "One Contractor, One Point of Accountability",
    showcaseBody:
      "Splitting a build across an architect, a civil contractor and a finishing team is where budgets slip. We hold the drawing, the structure and the finish under one contract, so nothing falls between two trades.",
    highlights: [
      "Independent Houses & Villas",
      "Apartment Buildings",
      "Commercial & Retail Shells",
      "Architectural Drawings",
      "Structural Design",
      "RCC & Masonry Work",
      "Electrical & Plumbing",
      "Waterproofing",
      "Flooring & Finishing",
      "External Elevation Work",
    ],
    subServicesHeading: "What We Build",
    subServices: [
      {
        icon: "drafting",
        title: "Architecture & Planning",
        description:
          "Site analysis, floor plans, elevations and working drawings prepared before a single brick is laid.",
      },
      {
        icon: "hardhat",
        title: "Structural Work",
        description:
          "Foundation, RCC framing, slabs and masonry executed to the approved structural design.",
      },
      {
        icon: "wrench",
        title: "MEP Services",
        description:
          "Electrical, plumbing and sanitary routing planned alongside the structure rather than cut in later.",
      },
      {
        icon: "shield",
        title: "Waterproofing",
        description:
          "Terrace, bathroom and basement waterproofing — the detail that decides how a building ages.",
      },
      {
        icon: "layers",
        title: "Flooring & Finishing",
        description:
          "Tiling, stone, plastering, putty and paint carried out by dedicated finishing crews.",
      },
      {
        icon: "building",
        title: "Elevation & External Works",
        description:
          "Façade treatment, cladding, compound walls, driveways and landscaping to complete the envelope.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Consultation",
        description:
          "We discuss the plot, your brief, the budget band and the timeline you have in mind.",
        icon: "message",
      },
      {
        step: "02",
        title: "Site Survey",
        description:
          "Measurement, soil and access assessment, and a review of local building regulations.",
        icon: "ruler",
      },
      {
        step: "03",
        title: "Drawings & Estimate",
        description:
          "Architectural and structural drawings with an itemised estimate you approve before work starts.",
        icon: "drafting",
      },
      {
        step: "04",
        title: "Approvals",
        description:
          "Documentation support for the sanctions and permissions your build requires.",
        icon: "clipboard",
      },
      {
        step: "05",
        title: "Structure",
        description:
          "Foundation, framing and slab work with staged material checks at every pour.",
        icon: "hardhat",
      },
      {
        step: "06",
        title: "Services & Finishing",
        description:
          "Electrical, plumbing, plastering, flooring and paint carried out in a planned sequence.",
        icon: "hammer",
      },
      {
        step: "07",
        title: "Quality Check",
        description:
          "A snag list is raised, worked through and re-inspected before we call the stage complete.",
        icon: "scan",
      },
      {
        step: "08",
        title: "Handover",
        description:
          "Final cleaning, documentation and keys — with our team reachable after you move in.",
        icon: "key",
      },
    ],
    faqs: [
      {
        question: "Do you take on complete construction, or only interiors?",
        answer:
          "We take on complete construction. Triova handles architecture, structural work, MEP services and finishing, and the same team can continue straight into the interiors so you deal with one contractor throughout.",
      },
      {
        question: "How is the cost of a construction project worked out?",
        answer:
          "After the site survey we issue an itemised estimate covering material, labour and finishing specifications. You approve it before work begins, and any change in scope is quoted and approved in writing before it is executed.",
      },
      {
        question: "Do you help with building approvals and permissions?",
        answer:
          "Yes. We prepare the drawings and documentation your sanction requires and coordinate with the relevant authorities. Statutory fees are paid by the owner and are shown separately from our estimate.",
      },
      {
        question: "How long does a typical independent house take?",
        answer:
          "It depends on the built-up area, the number of floors and the finishing specification. Once drawings and approvals are in place we share a stage-wise schedule at the start of the project and update you against it.",
      },
      {
        question: "Can I visit the site while work is going on?",
        answer:
          "Of course. Site visits are welcome at any stage, and a project supervisor is assigned to your build so you always have one person to call for updates.",
      },
      {
        question: "Which areas do you build in?",
        answer:
          "We primarily serve Hyderabad and the surrounding areas of Telangana. For larger projects we also take on work in other cities upon discussion.",
      },
    ],
    featuredProjects: [
      "structural-works",
      "modern-villa",
      "corporate-workspace",
      "designer-ceiling",
      "home-makeover",
    ],
  },

  {
    slug: "home-renovation",
    name: "Home Renovation",
    tagline: "Renovation & Remodelling",
    heading: "Transform Existing Spaces Into Modern Masterpieces",
    summary: "Transform existing spaces into modern masterpieces.",
    intro:
      "Renovation is harder than building new — you are working around a structure that already exists, and around a family that still has to live in it. We plan renovations stage by stage so the disruption is contained and the finish looks original, not retrofitted.",
    metaTitle: "Home Renovation in Hyderabad | Remodelling & Makeovers",
    metaDescription:
      "Home renovation and remodelling in Hyderabad by Triova Infradesigns — kitchen and bathroom upgrades, full apartment makeovers, flooring, false ceilings and painting.",
    card: {
      src: "/images/bedroom.webp",
      alt: "Renovated bedroom with a teak-panelled headboard wall and cove lighting",
      width: 502,
      height: 512,
    },
    hero: {
      src: "/images/hero-luxury.webp",
      alt: "Renovated duplex interior with a curved staircase, dining area and living room",
      width: 1024,
      height: 572,
    },
    showcase: {
      src: "/images/kitchen.webp",
      alt: "Renovated L-shaped modular kitchen with walnut shutters and a granite counter",
      width: 764,
      height: 502,
    },
    showcaseHeading: "Renovate Without Losing Your Home for Months",
    showcaseBody:
      "A renovation only works if the sequence is right. We survey what is already there, agree on what stays, and phase the work so wet areas, carpentry and painting do not run into each other — which is what keeps a renovation to its schedule.",
    highlights: [
      "Full Apartment Makeovers",
      "Kitchen Renovation",
      "Bathroom Renovation",
      "Flooring Replacement",
      "False Ceiling & Lighting",
      "Wardrobe & Storage Upgrades",
      "Wall Panelling & Texture",
      "Interior & Exterior Painting",
      "Electrical Rewiring",
      "Plumbing Replacement",
    ],
    subServicesHeading: "What We Renovate",
    subServices: [
      {
        icon: "recycle",
        title: "Full Home Makeovers",
        description:
          "A complete refresh of an existing apartment or villa, planned room by room around your occupancy.",
      },
      {
        icon: "boxes",
        title: "Kitchen Renovation",
        description:
          "New modular units, counters, backsplashes and appliance planning fitted into the existing footprint.",
      },
      {
        icon: "wrench",
        title: "Bathroom Renovation",
        description:
          "Re-tiling, waterproofing, sanitaryware and fittings replaced with the wet areas properly sealed.",
      },
      {
        icon: "layers",
        title: "Flooring Replacement",
        description:
          "Tile, vitrified, wooden and stone flooring lifted and relaid with minimal dust containment issues.",
      },
      {
        icon: "lightbulb",
        title: "Ceilings & Lighting",
        description:
          "False ceilings, cove detailing and a lighting layout that suits how each room is actually used.",
      },
      {
        icon: "paint",
        title: "Painting & Finishes",
        description:
          "Surface preparation, putty, primer and finish coats — including textures, panelling and wallpaper.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Consultation",
        description:
          "We walk through what is working in the space, what is not, and what your budget allows.",
        icon: "message",
      },
      {
        step: "02",
        title: "Condition Survey",
        description:
          "Measurements plus a check of the existing wiring, plumbing, dampness and structural constraints.",
        icon: "scan",
      },
      {
        step: "03",
        title: "Scope & Estimate",
        description:
          "A clear list of what stays, what is replaced and what it costs — agreed before anything is opened up.",
        icon: "clipboard",
      },
      {
        step: "04",
        title: "Design & Approval",
        description:
          "Layouts and 3D visuals of the renovated space so you can approve the outcome, not just the plan.",
        icon: "drafting",
      },
      {
        step: "05",
        title: "Demolition & Prep",
        description:
          "Controlled dismantling with dust barriers, debris removal and the rest of the home protected.",
        icon: "hammer",
      },
      {
        step: "06",
        title: "Rebuild & Finish",
        description:
          "Civil, carpentry, electrical, plumbing and painting run in a sequence that avoids rework.",
        icon: "hardhat",
      },
      {
        step: "07",
        title: "Snagging",
        description:
          "A room-by-room inspection with every defect logged, corrected and re-checked.",
        icon: "shield",
      },
      {
        step: "08",
        title: "Handover",
        description:
          "Deep cleaning and a walkthrough so you take back a space that is ready to use the same day.",
        icon: "key",
      },
    ],
    faqs: [
      {
        question: "Can I stay in the house during the renovation?",
        answer:
          "Often, yes. For a partial renovation we phase the work room by room and seal off the active zone with dust barriers. For a full makeover that involves flooring or rewiring throughout, moving out for the duration is usually faster and less disruptive.",
      },
      {
        question: "How long does a renovation take?",
        answer:
          "A single kitchen or bathroom is usually a matter of a few weeks, while a full apartment makeover takes longer and depends on the extent of civil work. We share a stage-wise schedule once the scope is finalised.",
      },
      {
        question: "Will you work with the fittings and furniture I already have?",
        answer:
          "Yes. During the condition survey we identify what is worth retaining, and the design is planned around it. Reusing sound carpentry and fittings is one of the most effective ways to keep a renovation budget in check.",
      },
      {
        question: "How do you handle dust and debris?",
        answer:
          "Active work areas are sealed off, floors and retained furniture are covered, and debris is cleared at agreed intervals rather than being left to accumulate. A deep clean is carried out before handover.",
      },
      {
        question: "What if you find a problem once work has started?",
        answer:
          "Hidden dampness, old wiring and weak plaster sometimes only appear after a surface is opened. We stop, show you what was found, and quote the additional work for your approval before continuing.",
      },
      {
        question: "Do you renovate commercial spaces as well?",
        answer:
          "Yes. We take on office, retail and clinic refurbishments, and can schedule the noisier stages outside business hours where the premises need to stay operational.",
      },
    ],
    featuredProjects: [
      "home-makeover",
      "modular-kitchen",
      "designer-ceiling",
      "master-bedroom",
      "home-office",
    ],
  },

  {
    slug: "raw-materials",
    name: "Interior Material Supply",
    tagline: "Interior Material Supply",
    heading: "Premium Interior Materials, Supplied Direct",
    summary:
      "High-quality WPC and PVC boards, door frames and premium interior materials.",
    intro:
      "Triova supplies the same materials we specify on our own projects — WPC and PVC boards, door frames, laminates, veneers and hardware. Buy them for your own site, or let us supply and install them as part of a turnkey fit-out.",
    metaTitle: "Interior Material Supply in Hyderabad | WPC, PVC & Laminates",
    metaDescription:
      "Interior material supply in Hyderabad by Triova Infradesigns — WPC and PVC boards, door frames, laminates, veneers, hardware and fittings for builders, contractors and homeowners.",
    card: {
      src: "/images/wardrobe.webp",
      alt: "Wardrobe run built from laminate-finished boards with backlit glass shutters",
      width: 1200,
      height: 800,
    },
    hero: {
      src: "/images/wardrobe.webp",
      alt: "Full-height wardrobe run with backlit glass shutters and brass handles",
      width: 1200,
      height: 800,
    },
    showcase: {
      src: "/images/project3.webp",
      alt: "Kitchen island and tall units finished in marble and high-gloss laminate",
      width: 474,
      height: 266,
    },
    showcaseHeading: "Materials Chosen by People Who Install Them",
    showcaseBody:
      "We specify these materials on live sites every week, so we know which boards hold a screw, which laminates chip on the edge and which hinges last past the warranty. That is the advice you get along with the quote.",
    highlights: [
      "WPC Boards & Sheets",
      "PVC Boards & Panels",
      "WPC Door Frames",
      "Laminates",
      "Acrylic & Veneers",
      "Plywood & MDF",
      "Louvres & Wall Panels",
      "Edge Banding",
      "Hardware & Fittings",
      "Adhesives & Consumables",
    ],
    subServicesHeading: "What We Supply",
    subServices: [
      {
        icon: "package",
        title: "WPC & PVC Boards",
        description:
          "Termite-proof, water-resistant boards for kitchens, wardrobes, vanities and wet areas.",
      },
      {
        icon: "door",
        title: "Door Frames & Shutters",
        description:
          "WPC door frames and shutters that hold their shape in humid conditions far better than timber.",
      },
      {
        icon: "layers",
        title: "Laminates & Acrylic",
        description:
          "A wide range of textures, matt and high-gloss finishes for shutters and panelling.",
      },
      {
        icon: "gem",
        title: "Veneers & Plywood",
        description:
          "Natural veneers plus graded plywood and MDF for carcass and surface work.",
      },
      {
        icon: "wrench",
        title: "Hardware & Fittings",
        description:
          "Soft-close hinges, channels, handles, lift-ups and wardrobe accessories.",
      },
      {
        icon: "truck",
        title: "Site Delivery",
        description:
          "Scheduled delivery to your site in Hyderabad, coordinated around your carpentry programme.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Enquiry",
        description:
          "Tell us what the material is for — we quote differently for a wet area than for a dry one.",
        icon: "message",
      },
      {
        step: "02",
        title: "Requirement Review",
        description:
          "We check quantities against your drawings or carpentry list so you are not left short mid-run.",
        icon: "clipboard",
      },
      {
        step: "03",
        title: "Sample Selection",
        description:
          "Physical samples of laminates, veneers and boards so a finish is chosen in daylight, not on a screen.",
        icon: "paint",
      },
      {
        step: "04",
        title: "Quotation",
        description:
          "An itemised quote with brand, grade, thickness and rate stated for every line.",
        icon: "wallet",
      },
      {
        step: "05",
        title: "Order Confirmation",
        description:
          "Stock is reserved against your order and a delivery window is confirmed in writing.",
        icon: "package",
      },
      {
        step: "06",
        title: "Quality Check",
        description:
          "Every consignment is checked for grade, thickness and damage before it leaves us.",
        icon: "scan",
      },
      {
        step: "07",
        title: "Delivery",
        description:
          "Delivered to site on the agreed date, in the sequence your carpenters need it.",
        icon: "truck",
      },
      {
        step: "08",
        title: "After-Sales Support",
        description:
          "Shortfalls, replacements and top-up orders handled by the same person who took the original order.",
        icon: "handshake",
      },
    ],
    faqs: [
      {
        question: "Do you supply materials without taking on the installation?",
        answer:
          "Yes. Supply-only orders are welcome — many of our customers are builders, contractors and homeowners running their own carpentry teams. We can also supply and install as part of a turnkey fit-out if you prefer a single point of responsibility.",
      },
      {
        question: "What is the difference between WPC and plywood?",
        answer:
          "WPC is a wood-plastic composite that does not absorb water and is not attacked by termites, which makes it the safer choice for kitchens, bathrooms and vanities. Plywood is stronger in tension and holds fasteners better, so it still has a place in dry areas and load-bearing carcass work. We will recommend based on where the material is actually going.",
      },
      {
        question: "Can I see samples before ordering?",
        answer:
          "Yes. We keep physical samples of laminates, veneers, acrylics and board sections. Seeing a finish under daylight is the only reliable way to judge colour and texture.",
      },
      {
        question: "Is there a minimum order quantity?",
        answer:
          "It varies by product. Boards and laminates are normally supplied by the sheet, and hardware by the set or box. Share your requirement and we will confirm what applies before you commit.",
      },
      {
        question: "Do you deliver to site?",
        answer:
          "We deliver across Hyderabad and the surrounding areas on a scheduled date. Delivery charges depend on distance and load, and are shown as a separate line on your quotation.",
      },
      {
        question: "What happens if material arrives damaged?",
        answer:
          "Check the consignment at the time of delivery and flag anything damaged straight away. Damage noted at delivery is replaced by us; manufacturer defects found later are taken up under the relevant brand warranty, and we handle that claim on your behalf.",
      },
    ],
    featuredProjects: [
      "walk-in-wardrobe",
      "luxury-modular-kitchen",
      "modular-kitchen",
      "designer-ceiling",
      "minimal-living",
    ],
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

export const serviceSlugs: ServiceSlug[] = services.map((service) => service.slug);
