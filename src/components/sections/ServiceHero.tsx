import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Tag } from "@/components/ui/Tag";
import type { Service } from "@/types";

export function ServiceHero({ service }: { service: Service }) {
  return (
    <section
      aria-labelledby="service-hero-heading"
      className="relative flex min-h-[70svh] items-center overflow-hidden pt-32 pb-20"
    >
      <Image
        src={service.hero.src}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div
        aria-hidden="true"
        className="from-navy/95 via-navy/85 to-navy/65 absolute inset-0 bg-gradient-to-r"
      />

      <div className="gutter relative mx-auto w-full max-w-[81.25rem]">
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex flex-wrap items-center gap-2 text-sm text-white/60">
            <li>
              <Link href="/" className="hover:text-gold transition">
                Home
              </Link>
            </li>
            <ChevronRight className="size-4" aria-hidden="true" />
            <li>
              <Link href="/services" className="hover:text-gold transition">
                Services
              </Link>
            </li>
            <ChevronRight className="size-4" aria-hidden="true" />
            <li className="text-gold font-medium" aria-current="page">
              {service.name}
            </li>
          </ol>
        </nav>

        <div className="max-w-2xl">
          <Tag variant="outline">{service.tagline}</Tag>

          <h1
            id="service-hero-heading"
            className="text-balance-heading mt-6 text-4xl leading-[1.08] font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            {service.heading}
          </h1>

          <p className="mt-7 text-base leading-relaxed text-white/80 sm:text-lg">
            {service.intro}
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <ButtonLink href="/contact" size="lg">
              Book Free Consultation
              <ArrowRight className="size-4" aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href="/portfolio" variant="onDark" size="lg">
              View Portfolio
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
