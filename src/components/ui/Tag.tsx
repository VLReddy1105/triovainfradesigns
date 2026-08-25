import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TagProps {
  children: ReactNode;
  className?: string;
  /** `solid` is gold-on-navy (8.5:1); `outline` suits dark photographic heroes. */
  variant?: "solid" | "outline";
}

export function Tag({ children, className, variant = "solid" }: TagProps) {
  return (
    <span
      className={cn(
        "rounded-pill inline-block px-5 py-2 text-xs font-semibold tracking-[0.12em] uppercase",
        variant === "solid"
          ? "bg-gold text-navy"
          : "border border-white/30 bg-white/10 text-white backdrop-blur-md",
        className,
      )}
    >
      {children}
    </span>
  );
}
