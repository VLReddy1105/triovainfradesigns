"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Expand } from "lucide-react";
import { useMemo, useState } from "react";
import { Container } from "@/components/ui/Container";
import { Lightbox } from "@/components/ui/Lightbox";
import { projectCategories, projects } from "@/data/projects";
import { staggerChildren, fadeUp } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { ProjectCategory } from "@/types";

type Filter = ProjectCategory | "all";

export function PortfolioGallery() {
  const [filter, setFilter] = useState<Filter>("all");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const reduceMotion = useReducedMotion();

  const visible = useMemo(
    () =>
      filter === "all"
        ? projects
        : projects.filter((project) => project.category === filter),
    [filter],
  );

  return (
    <Container width="wide">
      <div
        role="group"
        aria-label="Filter projects by category"
        className="flex flex-wrap justify-center gap-3"
      >
        {projectCategories.map((category) => {
          const active = filter === category.value;
          return (
            <button
              key={category.value}
              type="button"
              onClick={() => {
                setFilter(category.value);
                setOpenIndex(null);
              }}
              aria-pressed={active}
              className={cn(
                "rounded-pill px-6 py-3 text-sm font-semibold transition-all duration-300",
                active
                  ? "bg-gold text-navy shadow-gold"
                  : "text-ink shadow-card hover:text-navy-bright bg-white",
              )}
            >
              {category.label}
            </button>
          );
        })}
      </div>

      <p className="text-muted mt-6 text-center text-sm" aria-live="polite">
        Showing {visible.length} of {projects.length}{" "}
        {visible.length === 1 ? "project" : "projects"}
      </p>

      {/* Re-keying on the filter replays the entrance; filtered-out cards are
          unmounted immediately rather than animated out, so a stalled
          animation can never leave a hidden card on screen. */}
      <motion.ul
        key={filter}
        initial={reduceMotion ? false : "hidden"}
        animate="visible"
        variants={staggerChildren}
        className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
      >
        {visible.map((project, index) => (
          <motion.li key={project.id} variants={fadeUp}>
            <button
              type="button"
              onClick={() => setOpenIndex(index)}
              className="rounded-card shadow-card ease-out-soft hover:shadow-card-hover group block w-full overflow-hidden bg-white text-left transition-all duration-300 hover:-translate-y-2"
            >
              <span className="relative block h-64 overflow-hidden">
                <Image
                  src={project.image.src}
                  alt={project.image.alt}
                  fill
                  sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 400px"
                  className="ease-out-soft object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="bg-navy/0 group-hover:bg-navy/45 absolute inset-0 grid place-items-center transition-colors duration-300">
                  <Expand
                    className="size-9 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    aria-hidden="true"
                  />
                </span>
              </span>

              <span className="block p-6">
                <span className="text-ink block text-lg font-bold">
                  {project.title}
                </span>
                <span className="text-muted mt-1 block text-sm">
                  {project.meta}
                </span>
                <span className="sr-only">— open larger image</span>
              </span>
            </button>
          </motion.li>
        ))}
      </motion.ul>

      <Lightbox
        items={visible}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onNavigate={setOpenIndex}
      />
    </Container>
  );
}
