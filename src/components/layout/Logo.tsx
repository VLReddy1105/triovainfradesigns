import Image from "next/image";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

interface LogoProps {
  /** Controls the size of the mark and wordmark together. */
  size?: "sm" | "md" | "lg";
  className?: string;
  priority?: boolean;
}

interface BrandMarkProps {
  /** Describes the surface behind the transparent mark. */
  appearance?: "on-dark" | "on-light";
  className?: string;
  priority?: boolean;
  sizes?: string;
}

const sizes = {
  sm: { box: "size-11", name: "text-base", sub: "text-[0.6rem]" },
  md: { box: "size-14", name: "text-lg", sub: "text-[0.65rem]" },
  lg: { box: "size-16", name: "text-xl", sub: "text-[0.7rem]" },
} as const;

export function BrandMark({
  appearance = "on-dark",
  className,
  priority = false,
  sizes = "64px",
}: BrandMarkProps) {
  return (
    <span
      className={cn(
        "triova-brand-mark",
        appearance === "on-dark"
          ? "triova-brand-mark-on-dark"
          : "triova-brand-mark-on-light",
        className,
      )}
      aria-hidden="true"
    >
      <Image
        src="/images/logo.png"
        alt=""
        width={512}
        height={512}
        priority={priority}
        sizes={sizes}
        className="triova-brand-mark-image"
      />
    </span>
  );
}

export function Logo({ size = "md", className, priority = false }: LogoProps) {
  const scale = sizes[size];

  return (
    <span className={cn("flex items-center gap-3", className)}>
      <BrandMark className={scale.box} priority={priority} />

      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-extrabold tracking-tight text-white",
            scale.name,
          )}
        >
          TRIOVA
        </span>
        <span
          className={cn(
            "text-gold mt-1 font-semibold tracking-[0.22em]",
            scale.sub,
          )}
        >
          INFRADESIGNS
        </span>
      </span>

      <span className="sr-only">{site.name}</span>
    </span>
  );
}
