import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
  /** Background treatment, mirroring the original alternating sections. */
  tone?: "white" | "surface" | "ink" | "navy";
  "aria-labelledby"?: string;
}

const tones = {
  white: "bg-white text-ink",
  surface: "bg-surface text-ink",
  ink: "bg-ink text-white",
  navy: "bg-navy text-white",
} as const;

export function Section({
  children,
  id,
  className,
  tone = "white",
  ...rest
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "py-section lg:py-section-lg relative",
        tones[tone],
        className,
      )}
      {...rest}
    >
      {children}
    </section>
  );
}
