import type { ProcessStep } from "@/types";

/** The four-stage overview used on the home page. */
export const homeProcess: ProcessStep[] = [
  {
    step: "01",
    title: "Consultation",
    description: "Understanding your requirements, budget and lifestyle.",
    icon: "message",
  },
  {
    step: "02",
    title: "Design",
    description: "Layouts, 3D concepts, material selection and approvals.",
    icon: "drafting",
  },
  {
    step: "03",
    title: "Execution",
    description: "Professional workmanship with regular quality checks.",
    icon: "hammer",
  },
  {
    step: "04",
    title: "Handover",
    description: "Final inspection and timely project delivery.",
    icon: "key",
  },
];
