"use client";

import type { CSSProperties } from "react";
import { useRef } from "react";
import { BrandMark } from "@/components/layout/Logo";
import { ArchitectureCanvas } from "./ArchitectureCanvas";
import {
  architectureCities,
  architectureTaglines,
} from "./architectureContent";
import styles from "./ArchitecturalStory.module.css";

export function ArchitecturalStory() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      className={styles.story}
      aria-labelledby="architecture-story-title"
    >
      <div className={styles.sticky}>
        <ArchitectureCanvas sectionRef={sectionRef} />
        <div className={styles.imageGrade} aria-hidden="true" />
        <div className={styles.titleScrim} aria-hidden="true" />

        <div className={styles.copy}>
          <div className={styles.locations} aria-hidden="true">
            <span className={styles.architectureLabel}>Architecture</span>
            <span className={styles.cityList}>
              {architectureCities.map((city, index) => (
                <span
                  key={city.name}
                  className={styles.city}
                  style={
                    {
                      "--city-opacity": `var(--architecture-city-${index}-opacity)`,
                      "--city-shift": `var(--architecture-city-${index}-shift)`,
                    } as CSSProperties
                  }
                >
                  {city.name}
                </span>
              ))}
            </span>
          </div>

          <div className={styles.brandLockup}>
            <BrandMark
              sizes="(max-width: 767px) 54px, 92px"
              className={styles.logoFrame}
            />

            <h2 id="architecture-story-title" className={styles.wordmark}>
              <span className={styles.brandName}>TRIOVA</span>
              <span className={styles.brandDescriptor}>INFRADESIGNS</span>
            </h2>
          </div>

          <div className={styles.taglineViewport} aria-hidden="true">
            {architectureTaglines.map((tagline, index) => (
              <p
                key={tagline.text}
                className={styles.tagline}
                style={
                  {
                    "--tagline-opacity": `var(--architecture-tagline-${index}-opacity)`,
                    "--tagline-shift": `var(--architecture-tagline-${index}-shift)`,
                  } as CSSProperties
                }
              >
                {tagline.text}
              </p>
            ))}
          </div>

          <p className="sr-only">
            Triova Infradesigns provides architecture services in Hyderabad,
            Vijayawada, Vizag and Bangalore.
          </p>
        </div>

        <div className={styles.endWash} aria-hidden="true" />
      </div>
    </section>
  );
}
