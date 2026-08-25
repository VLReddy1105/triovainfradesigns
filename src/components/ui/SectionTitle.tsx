import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Tag } from "@/components/ui/Tag";

interface SectionTitleProps {
  tag?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "center" | "left";
  tone?: "light" | "dark";
  /** Supply when the parent section uses `aria-labelledby`. */
  id?: string;
  className?: string;
  as?: "h1" | "h2";
}

export function SectionTitle({
  tag,
  title,
  description,
  align = "center",
  tone = "light",
  id,
  className,
  as: Heading = "h2",
}: SectionTitleProps) {
  return (
    <div
      className={cn(
        "flex flex-col",
        align === "center" ? "mx-auto max-w-3xl text-center items-center" : "items-start",
        className,
      )}
    >
      {tag ? <Tag className="mb-5">{tag}</Tag> : null}

      <Heading
        id={id}
        className={cn(
          "text-balance-heading text-3xl leading-[1.15] font-bold tracking-tight sm:text-4xl lg:text-5xl",
          tone === "dark" ? "text-white" : "text-ink",
        )}
      >
        {title}
      </Heading>

      <span
        aria-hidden="true"
        className={cn(
          "bg-gold mt-6 block h-1 w-20 rounded-full",
          align === "center" && "mx-auto",
        )}
      />

      {description ? (
        <p
          className={cn(
            "mt-6 text-base leading-relaxed sm:text-lg",
            tone === "dark" ? "text-white/75" : "text-body",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
