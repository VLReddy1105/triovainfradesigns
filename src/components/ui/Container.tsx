import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  /** `wide` matches the original 1300px content column; `narrow` suits prose. */
  width?: "default" | "wide" | "narrow";
}

const widths = {
  narrow: "max-w-3xl",
  default: "max-w-6xl",
  wide: "max-w-[81.25rem]",
} as const;

export function Container({
  children,
  className,
  as: Tag = "div",
  width = "default",
}: ContainerProps) {
  return (
    <Tag className={cn("gutter mx-auto w-full", widths[width], className)}>
      {children}
    </Tag>
  );
}
