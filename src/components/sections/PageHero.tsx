import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Tag } from "@/components/ui/Tag";

interface PageHeroProps {
  tag: string;
  title: string;
  description: string;
  image: { src: string; alt: string };
  breadcrumb: { name: string; href: string }[];
}

/** Compact hero used by the About, Services, Portfolio and Contact pages. */
export function PageHero({
  tag,
  title,
  description,
  image,
  breadcrumb,
}: PageHeroProps) {
  return (
    <section
      aria-labelledby="page-hero-heading"
      className="relative flex min-h-[56svh] items-center overflow-hidden pt-32 pb-16"
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div
        aria-hidden="true"
        className="from-navy/95 via-navy/88 to-navy/70 absolute inset-0 bg-gradient-to-r"
      />

      <div className="gutter relative mx-auto w-full max-w-[81.25rem]">
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex flex-wrap items-center gap-2 text-sm text-white/60">
            <li>
              <Link href="/" className="hover:text-gold transition">
                Home
              </Link>
            </li>
            {breadcrumb.map((crumb, index) => (
              <li key={crumb.href} className="flex items-center gap-2">
                <ChevronRight className="size-4" aria-hidden="true" />
                {index === breadcrumb.length - 1 ? (
                  <span className="text-gold font-medium" aria-current="page">
                    {crumb.name}
                  </span>
                ) : (
                  <Link href={crumb.href} className="hover:text-gold transition">
                    {crumb.name}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </nav>

        <div className="max-w-3xl">
          <Tag variant="outline">{tag}</Tag>
          <h1
            id="page-hero-heading"
            className="text-balance-heading mt-6 text-4xl leading-[1.08] font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            {title}
          </h1>
          <p className="mt-6 text-base leading-relaxed text-white/80 sm:text-lg">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}
