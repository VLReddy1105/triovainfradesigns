import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface FieldProps {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
  className?: string;
  tone?: "light" | "dark";
}

export function Field({
  id,
  label,
  error,
  children,
  className,
  tone = "light",
}: FieldProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label
        htmlFor={id}
        className={cn(
          "text-sm font-semibold",
          tone === "dark" ? "text-white" : "text-ink",
        )}
      >
        {label}
      </label>
      {children}
      {error ? (
        <p
          id={`${id}-error`}
          role="alert"
          className={cn(
            "text-sm font-medium",
            tone === "dark" ? "text-error-on-dark" : "text-error-strong",
          )}
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}

export const inputStyles = {
  light:
    "w-full rounded-2xl border border-hairline bg-white px-4 py-3.5 text-base text-ink placeholder:text-muted focus:border-gold-deep focus:outline-none transition-colors",
  dark: "w-full rounded-xl border border-white/25 bg-white/95 px-4 py-3.5 text-base text-ink placeholder:text-muted focus:border-gold focus:outline-none transition-colors",
} as const;
