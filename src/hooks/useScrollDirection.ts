"use client";

import { useEffect, useState } from "react";

interface ScrollState {
  /** True once the page has scrolled past the transparent-header zone. */
  scrolled: boolean;
  /** True while the user is scrolling down and far enough from the top. */
  hidden: boolean;
}

/**
 * Replaces the original site's three overlapping scroll listeners with one
 * rAF-throttled handler.
 */
export function useScrollDirection(
  scrolledAt = 80,
  hideAt = 140,
): ScrollState {
  const [state, setState] = useState<ScrollState>({
    scrolled: false,
    hidden: false,
  });

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const update = () => {
      const y = window.scrollY;
      setState({
        scrolled: y > scrolledAt,
        hidden: y > lastY && y > hideAt,
      });
      lastY = y;
      ticking = false;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [scrolledAt, hideAt]);

  return state;
}
