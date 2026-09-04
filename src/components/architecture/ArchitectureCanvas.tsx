"use client";

import { useReducedMotion } from "framer-motion";
import type { RefObject } from "react";
import { useEffect, useRef, useState } from "react";
import { useArchitectureSequence } from "./useArchitectureSequence";
import type { ArchitectureSequenceVariant } from "./sequenceConfig";
import styles from "./ArchitecturalStory.module.css";

interface ArchitectureCanvasProps {
  sectionRef: RefObject<HTMLElement | null>;
}

export function ArchitectureCanvas({ sectionRef }: ArchitectureCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const loadingRef = useRef<HTMLParagraphElement>(null);
  const reducedMotion = Boolean(useReducedMotion());
  const [variant, setVariant] =
    useState<ArchitectureSequenceVariant | null>(null);

  useEffect(() => {
    const query = window.matchMedia(
      "(max-width: 767px), (max-aspect-ratio: 3 / 4)",
    );
    const updateVariant = () => setVariant(query.matches ? "mobile" : "desktop");
    updateVariant();
    query.addEventListener("change", updateVariant);
    return () => query.removeEventListener("change", updateVariant);
  }, []);

  useArchitectureSequence({
    canvasRef,
    loadingRef,
    reducedMotion,
    sectionRef,
    variant,
  });

  return (
    <div className={styles.media} aria-hidden="true">
      <canvas ref={canvasRef} className={styles.canvas} />
      <div className={styles.loading}>
        <span className={styles.loadingLine} />
        <p ref={loadingRef}>Preparing the architecture</p>
      </div>
    </div>
  );
}
