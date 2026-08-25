"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Plus } from "lucide-react";
import { useId, useState } from "react";
import { cn } from "@/lib/utils";
import type { Faq } from "@/types";

interface AccordionProps {
  items: Faq[];
  /** Index of the panel open on first render; `null` opens none. */
  defaultOpen?: number | null;
  className?: string;
}

/**
 * Accessible disclosure set: each question is a real button that owns
 * `aria-expanded` and `aria-controls`, and each answer is a labelled region.
 */
export function Accordion({ items, defaultOpen = 0, className }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpen);
  const reduceMotion = useReducedMotion();
  const baseId = useId();

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const buttonId = `${baseId}-trigger-${index}`;
        const panelId = `${baseId}-panel-${index}`;

        return (
          <div
            key={item.question}
            className={cn(
              "rounded-card shadow-card overflow-hidden bg-white transition-colors",
              isOpen && "ring-gold/40 ring-1",
            )}
          >
            <h3>
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="text-ink hover:text-navy-bright flex w-full items-center justify-between gap-6 px-6 py-6 text-left text-base font-semibold sm:px-8 sm:text-lg"
              >
                {item.question}
                <Plus
                  aria-hidden="true"
                  strokeWidth={2}
                  className={cn(
                    "text-gold-text size-5 shrink-0 transition-transform duration-300",
                    isOpen && "rotate-45",
                  )}
                />
              </button>
            </h3>

            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  key="panel"
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="text-body px-6 pb-7 text-base leading-relaxed sm:px-8">
                    {item.answer}
                  </p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
