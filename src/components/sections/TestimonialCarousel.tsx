"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { testimonials } from "@/data/testimonials";
import { cn } from "@/lib/utils";

const AUTOPLAY_MS = 6000;

export function TestimonialCarousel() {
  const reduceMotion = useReducedMotion();
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    duration: reduceMotion ? 0 : 26,
  });
  const [selected, setSelected] = useState(0);
  const [paused, setPaused] = useState(false);

  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi],
  );

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  // Autoplay, implemented directly rather than pulling in the plugin package.
  useEffect(() => {
    if (!emblaApi || paused || reduceMotion) return;
    const timer = window.setInterval(() => emblaApi.scrollNext(), AUTOPLAY_MS);
    return () => window.clearInterval(timer);
  }, [emblaApi, paused, reduceMotion]);

  return (
    <Section tone="surface" aria-labelledby="testimonials-heading">
      <Container width="wide">
        <SectionTitle
          id="testimonials-heading"
          tag="Client Testimonials"
          title="What Our Clients Say"
          description="We believe every successful project is built on trust, transparency, and lasting relationships."
        />

        <div
          className="mt-16"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          <div
            className="overflow-hidden"
            ref={emblaRef}
            aria-roledescription="carousel"
            aria-label="Client testimonials"
          >
            <ul className="flex">
              {testimonials.map((testimonial, index) => (
                <li
                  key={testimonial.name}
                  className="min-w-0 shrink-0 basis-full pr-6 sm:basis-1/2 lg:basis-1/3"
                  aria-roledescription="slide"
                  aria-label={`${index + 1} of ${testimonials.length}`}
                >
                  <Card as="figure" className="flex h-full flex-col p-8">
                    <Quote
                      className="text-gold mb-5 size-9"
                      aria-hidden="true"
                    />

                    <div
                      className="mb-5 flex gap-1"
                      aria-label={`Rated ${testimonial.rating} out of 5`}
                    >
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star
                          key={i}
                          className="fill-gold text-gold size-5"
                          aria-hidden="true"
                        />
                      ))}
                    </div>

                    <blockquote className="text-body flex-1 text-base leading-relaxed italic">
                      &ldquo;{testimonial.quote}&rdquo;
                    </blockquote>

                    <figcaption className="mt-6">
                      <p className="text-ink text-lg font-bold">
                        {testimonial.name}
                      </p>
                      <p className="text-muted text-sm">{testimonial.role}</p>
                    </figcaption>
                  </Card>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10 flex items-center justify-center gap-6">
            <button
              type="button"
              onClick={() => emblaApi?.scrollPrev()}
              aria-label="Previous testimonial"
              className="border-gold text-gold-text hover:bg-gold hover:text-navy grid size-11 place-items-center rounded-full border-2 transition"
            >
              <ChevronLeft className="size-5" aria-hidden="true" />
            </button>

            <div className="flex gap-2.5">
              {testimonials.map((testimonial, index) => (
                <button
                  key={testimonial.name}
                  type="button"
                  onClick={() => scrollTo(index)}
                  aria-label={`Go to testimonial ${index + 1}`}
                  aria-current={index === selected}
                  className={cn(
                    "h-2.5 rounded-full transition-all duration-300",
                    index === selected
                      ? "bg-gold w-8"
                      : "bg-gold/35 hover:bg-gold/60 w-2.5",
                  )}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => emblaApi?.scrollNext()}
              aria-label="Next testimonial"
              className="border-gold text-gold-text hover:bg-gold hover:text-navy grid size-11 place-items-center rounded-full border-2 transition"
            >
              <ChevronRight className="size-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
