"use client";

import { MapPin } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { site } from "@/data/site";

/**
 * The iframe is only mounted once the block scrolls into view, so the map's
 * scripts never touch the initial page load.
 */
export function MapEmbed() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="rounded-panel shadow-card bg-surface relative h-80 w-full overflow-hidden sm:h-96"
    >
      {inView ? (
        <iframe
          title={`Map showing ${site.address.display}`}
          src={site.mapEmbedUrl}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 size-full border-0"
        />
      ) : (
        <div className="text-muted absolute inset-0 grid place-items-center gap-3 text-sm">
          <MapPin className="text-gold mx-auto size-8" aria-hidden="true" />
          {site.address.display}
        </div>
      )}
    </div>
  );
}
