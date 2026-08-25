import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "onDark";
type Size = "md" | "lg";

const base =
  "rounded-pill inline-flex items-center justify-center gap-2 font-semibold transition-all duration-300 ease-out-soft disabled:pointer-events-none disabled:opacity-60";

const variants: Record<Variant, string> = {
  // gold field with navy text — 8.5:1
  primary:
    "bg-gold text-navy shadow-gold hover:-translate-y-0.5 hover:bg-gold-deep hover:shadow-card-hover",
  // gold outline on light backgrounds, using the accessible gold for the label
  secondary:
    "border-2 border-gold text-gold-text hover:bg-gold hover:text-navy hover:-translate-y-0.5",
  ghost: "text-gold-text hover:text-navy underline-offset-4 hover:underline",
  // white outline for photographic heroes
  onDark:
    "border-2 border-white text-white hover:bg-white hover:text-navy hover:-translate-y-0.5",
};

const sizes: Record<Size, string> = {
  md: "px-7 py-3 text-sm",
  lg: "px-9 py-4 text-base",
};

interface CommonProps {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
}

interface ButtonAsLink extends CommonProps {
  href: string;
  external?: boolean;
}

export function ButtonLink({
  children,
  href,
  external = false,
  variant = "primary",
  size = "md",
  className,
}: ButtonAsLink) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if (external) {
    // tel: and mailto: must not open in a new tab
    const newTab = /^https?:/.test(href);
    return (
      <a
        href={href}
        className={classes}
        target={newTab ? "_blank" : undefined}
        rel={newTab ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}

type ButtonProps = CommonProps & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  type = "button",
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(base, variants[variant], sizes[size], className)}
      {...rest}
    >
      {children}
    </button>
  );
}
