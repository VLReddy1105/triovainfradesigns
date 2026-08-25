import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  /** Adds the lift-on-hover treatment used throughout the original site. */
  interactive?: boolean;
}

export function Card({
  children,
  className,
  as: Tag = "div",
  interactive = false,
}: CardProps) {
  return (
    <Tag
      className={cn(
        "rounded-card shadow-card bg-white",
        interactive &&
          "ease-out-soft hover:shadow-card-hover transition-all duration-300 hover:-translate-y-2",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
