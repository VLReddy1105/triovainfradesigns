import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Tag } from "@/components/ui/Tag";
import { ConsultationCard } from "@/components/sections/ConsultationCard";
import { site } from "@/data/site";

export function Hero() {
  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="relative flex min-h-[92svh] items-center overflow-hidden pt-28 pb-16 lg:pt-32"
    >
      <Image
        src="/images/hero-luxury.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div
        aria-hidden="true"
        className="from-navy/95 via-navy/80 to-navy/70 absolute inset-0 bg-gradient-to-r"
      />

      <div className="gutter relative mx-auto grid w-full max-w-[81.25rem] items-center gap-14 lg:grid-cols-[1.15fr_auto]">
        <div className="max-w-2xl">
          <Tag variant="outline">{site.tagline}</Tag>

          <h1
            id="hero-heading"
            className="text-balance-heading mt-6 text-4xl leading-[1.05] font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl"
          >
            Transforming Spaces Into{" "}
            <span className="text-gold">Timeless Luxury</span>
          </h1>

          <p className="mt-7 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
            {site.name} delivers premium interior design, turnkey execution,
            renovation, architecture, and construction solutions across{" "}
            {site.address.locality} with unmatched craftsmanship.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <ButtonLink href="/contact" size="lg">
              Get Free Consultation
              <ArrowRight className="size-4" aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href="/portfolio" variant="onDark" size="lg">
              View Portfolio
            </ButtonLink>
          </div>
        </div>

        <div className="flex justify-center lg:justify-end">
          <ConsultationCard />
        </div>
      </div>
    </section>
  );
}
