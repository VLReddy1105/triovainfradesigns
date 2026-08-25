import Image from "next/image";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

interface LogoProps {
  /** Controls the size of the mark and wordmark together. */
  size?: "sm" | "md" | "lg";
  className?: string;
  priority?: boolean;
}

const sizes = {
  sm: { box: "size-11 p-1.5", name: "text-base", sub: "text-[0.6rem]" },
  md: { box: "size-14 p-2", name: "text-lg", sub: "text-[0.65rem]" },
  lg: { box: "size-16 p-2.5", name: "text-xl", sub: "text-[0.7rem]" },
} as const;

/**
 * The brand mark is navy-on-transparent, so it needs a light plate to stay
 * legible against the navy header and near-black footer.
 */
export function Logo({ size = "md", className, priority = false }: LogoProps) {
  const scale = sizes[size];

  return (
    <span className={cn("flex items-center gap-3", className)}>
      <span
        className={cn(
          "grid shrink-0 place-items-center rounded-2xl bg-white",
          scale.box,
        )}
      >
        <Image
          src="/images/logo.png"
          alt=""
          width={512}
          height={512}
          priority={priority}
          sizes="64px"
          className="size-full object-contain"
        />
      </span>

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
