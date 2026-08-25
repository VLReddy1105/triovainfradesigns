"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import type { Project } from "@/types";

interface LightboxProps {
  items: Project[];
  /** Index of the open item, or `null` when the lightbox is closed. */
  index: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function Lightbox({ items, index, onClose, onNavigate }: LightboxProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const [direction, setDirection] = useState(0);
  const reduceMotion = useReducedMotion();
  const isOpen = index !== null;

  useLockBodyScroll(isOpen);
  useFocusTrap(dialogRef, isOpen);

  const go = useCallback(
    (delta: number) => {
      if (index === null || items.length === 0) return;
      setDirection(delta);
      onNavigate((index + delta + items.length) % items.length);
    },
    [index, items.length, onNavigate],
  );

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") go(1);
      if (event.key === "ArrowLeft") go(-1);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose, go]);

  const current = index === null ? null : items[index];

  return (
    <AnimatePresence>
      {current ? (
        <motion.div
          key="lightbox"
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={`${current.title}, image ${(index ?? 0) + 1} of ${items.length}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-100 flex items-center justify-center bg-black/92 p-4"
          onClick={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
          onTouchStart={(event) => {
            touchStartX.current = event.changedTouches[0].screenX;
          }}
          onTouchEnd={(event) => {
            if (touchStartX.current === null) return;
            const delta = touchStartX.current - event.changedTouches[0].screenX;
            if (Math.abs(delta) > 50) go(delta > 0 ? 1 : -1);
            touchStartX.current = null;
          }}
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close gallery"
            className="absolute top-4 right-4 z-10 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20 sm:top-6 sm:right-6"
          >
            <X className="size-6" aria-hidden="true" />
          </button>

          {items.length > 1 ? (
            <>
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous project"
                className="absolute left-2 z-10 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20 sm:left-6"
              >
                <ChevronLeft className="size-7" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Next project"
                className="absolute right-2 z-10 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20 sm:right-6"
              >
                <ChevronRight className="size-7" aria-hidden="true" />
              </button>
            </>
          ) : null}

          <AnimatePresence mode="wait" custom={direction}>
            <motion.figure
              key={current.id}
              initial={reduceMotion ? false : { opacity: 0, x: direction * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, x: direction * -40 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="flex max-h-full w-full max-w-4xl flex-col items-center gap-5"
              onClick={(event) => event.stopPropagation()}
            >
              <Image
                src={current.image.src}
                alt={current.image.alt}
                width={current.image.width}
                height={current.image.height}
                sizes="(max-width: 896px) 92vw, 896px"
                className="max-h-[70vh] w-auto rounded-2xl object-contain"
              />
              <figcaption className="text-center">
                <h2 className="text-xl font-semibold text-white sm:text-2xl">
                  {current.title}
                </h2>
                <p className="mt-1 text-sm text-white/70">{current.meta}</p>
                <p className="mt-3 text-xs tracking-widest text-white/50 uppercase">
                  {(index ?? 0) + 1} / {items.length}
                </p>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
