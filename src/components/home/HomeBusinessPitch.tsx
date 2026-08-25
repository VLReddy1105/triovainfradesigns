import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function HomeBusinessPitch() {
  return (
    <div aria-labelledby="home-pitch-heading">
      <p className="home-pitch-eyebrow">Designed Around You</p>
      <h2
        id="home-pitch-heading"
        className="text-balance-heading mt-4 max-w-[17ch] text-[clamp(1.75rem,2.65vw,3.1rem)] leading-[1.08] font-semibold tracking-[-0.035em] text-navy"
      >
        From the first idea to the final detail, we create spaces that feel
        distinctly yours.
      </h2>
      <p className="mt-5 max-w-[30rem] text-sm leading-relaxed font-medium tracking-[0.035em] text-navy/75 sm:text-base">
        Interior Design · Architecture · Construction · Renovation · Material
        Solutions
      </p>
      <Link
        href="/services"
        className="group mt-7 inline-flex items-center gap-3 border-b border-gold-deep pb-1 text-sm font-bold tracking-[0.08em] text-navy uppercase transition-colors hover:text-navy-bright"
      >
        Explore Our Expertise
        <ArrowRight
          className="size-4 transition-transform duration-300 group-hover:translate-x-1"
          aria-hidden="true"
        />
      </Link>
    </div>
  );
}
