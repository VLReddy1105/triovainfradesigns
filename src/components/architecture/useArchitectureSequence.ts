"use client";

import type { RefObject } from "react";
import { useEffect } from "react";
import {
  architectureFrameSource,
  architectureSequences,
  type ArchitectureSequenceVariant,
} from "./sequenceConfig";
import {
  architectureCities,
  architectureTaglines,
  CITY_REVEAL_DURATION,
  TAGLINE_CROSSFADE_DURATION,
} from "./architectureContent";

interface SequenceRefs {
  canvasRef: RefObject<HTMLCanvasElement | null>;
  loadingRef: RefObject<HTMLParagraphElement | null>;
  sectionRef: RefObject<HTMLElement | null>;
  variant: ArchitectureSequenceVariant | null;
  reducedMotion: boolean;
}

const clamp = (value: number, minimum = 0, maximum = 1) =>
  Math.min(maximum, Math.max(minimum, value));

function titleOpacity(progress: number) {
  if (progress < 0.08) return progress / 0.08;
  return 1;
}

function smoothReveal(progress: number, start: number, duration: number) {
  const linearProgress = clamp((progress - start) / duration);
  return linearProgress * linearProgress * (3 - 2 * linearProgress);
}

function taglineVisual(progress: number, index: number) {
  const stage = architectureTaglines[index];
  const halfFade = TAGLINE_CROSSFADE_DURATION / 2;
  const entrance =
    index === 0
      ? 1
      : smoothReveal(
          progress,
          stage.startAt - halfFade,
          TAGLINE_CROSSFADE_DURATION,
        );
  const nextStage = architectureTaglines[index + 1];
  const departure = nextStage
    ? 1 -
      smoothReveal(
        progress,
        nextStage.startAt - halfFade,
        TAGLINE_CROSSFADE_DURATION,
      )
    : 1;
  const opacity = Math.min(entrance, departure);

  if (entrance < 1) {
    return { opacity, shift: (1 - entrance) * 8 };
  }

  if (departure < 1) {
    return { opacity, shift: -(1 - departure) * 8 };
  }

  return { opacity, shift: 0 };
}

function cameraScale(progress: number) {
  if (progress <= 0.54) return 1.03 + (progress / 0.54) * 0.03;
  return 1.06 - ((progress - 0.54) / 0.46) * 0.06;
}

function drawCover(
  canvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D,
  image: HTMLImageElement,
) {
  const scale = Math.max(
    canvas.width / image.naturalWidth,
    canvas.height / image.naturalHeight,
  );
  const width = image.naturalWidth * scale;
  const height = image.naturalHeight * scale;
  const x = (canvas.width - width) / 2;
  const y = (canvas.height - height) / 2;

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(image, x, y, width, height);
}

export function useArchitectureSequence({
  canvasRef,
  loadingRef,
  reducedMotion,
  sectionRef,
  variant,
}: SequenceRefs) {
  useEffect(() => {
    if (!variant) return;

    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;

    const context = canvas.getContext("2d", { alpha: false });
    if (!context) return;

    const config = architectureSequences[variant];
    const firstFrame = reducedMotion ? config.frameCount - 1 : 0;
    const images = new Array<HTMLImageElement | undefined>(config.frameCount);
    const pending = new Map<number, Promise<void>>();
    const failed = new Set<number>();
    let currentTarget = -1;
    let drawnFrame = -1;
    let scrollFrame = 0;
    let resizeFrame = 0;
    let destroyed = false;
    let progressiveLoadingStarted = false;
    const contentStyleCache = new Map<string, string>();

    const setContentStyle = (property: string, value: string) => {
      if (contentStyleCache.get(property) === value) return;
      contentStyleCache.set(property, value);
      section.style.setProperty(property, value);
    };

    const syncContentToProgress = (progress: number) => {
      architectureCities.forEach((city, index) => {
        const reveal =
          index === 0
            ? 1
            : smoothReveal(progress, city.revealAt, CITY_REVEAL_DURATION);
        setContentStyle(
          `--architecture-city-${index}-opacity`,
          reveal.toFixed(4),
        );
        setContentStyle(
          `--architecture-city-${index}-shift`,
          `${((1 - reveal) * 10).toFixed(2)}px`,
        );
      });

      architectureTaglines.forEach((_, index) => {
        const visual = taglineVisual(progress, index);
        setContentStyle(
          `--architecture-tagline-${index}-opacity`,
          visual.opacity.toFixed(4),
        );
        setContentStyle(
          `--architecture-tagline-${index}-shift`,
          `${visual.shift.toFixed(2)}px`,
        );
      });
    };

    const nearestLoadedFrame = (target: number) => {
      if (images[target]) return target;

      for (let distance = 1; distance < config.frameCount; distance += 1) {
        const before = target - distance;
        const after = target + distance;
        if (before >= 0 && images[before]) return before;
        if (after < config.frameCount && images[after]) return after;
      }

      return -1;
    };

    const drawTarget = (force = false) => {
      const frame = nearestLoadedFrame(currentTarget);
      if (frame < 0 || (!force && frame === drawnFrame)) return;
      const image = images[frame];
      if (!image) return;

      drawCover(canvas, context, image);
      drawnFrame = frame;
      section.dataset.sequenceReady = "true";
    };

    const loadFrame = (index: number) => {
      if (images[index] || failed.has(index)) return Promise.resolve();
      const existingRequest = pending.get(index);
      if (existingRequest) return existingRequest;

      const request = new Promise<void>((resolve) => {
        const image = new Image();
        image.decoding = "async";
        if (index === firstFrame) image.fetchPriority = "high";
        image.onload = () => {
          if (!destroyed) {
            images[index] = image;
            pending.delete(index);
            drawTarget();
          }
          resolve();
        };
        image.onerror = () => {
          pending.delete(index);
          failed.add(index);
          if (index === (reducedMotion ? config.frameCount - 1 : 0)) {
            section.dataset.sequenceError = "true";
            if (loadingRef.current) {
              loadingRef.current.textContent = "Architecture preview unavailable";
            }
          }
          resolve();
        };
        image.src = architectureFrameSource(variant, index);
      });

      pending.set(index, request);
      return request;
    };

    const resizeCanvas = () => {
      const bounds = canvas.getBoundingClientRect();
      const maximumRatio = variant === "mobile" ? 1.25 : 1.5;
      const pixelRatio = Math.min(window.devicePixelRatio || 1, maximumRatio);
      const width = Math.max(1, Math.round(bounds.width * pixelRatio));
      const height = Math.max(1, Math.round(bounds.height * pixelRatio));

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        drawnFrame = -1;
        drawTarget(true);
      }
    };

    const syncToScroll = () => {
      scrollFrame = 0;
      const bounds = section.getBoundingClientRect();
      const scrollRange = Math.max(1, bounds.height - window.innerHeight);
      const progress = reducedMotion
        ? 1
        : clamp(-bounds.top / scrollRange);
      const exitProgress = reducedMotion
        ? 0
        : clamp((progress - 0.86) / 0.14);
      const visibleTitle = reducedMotion ? 1 : titleOpacity(progress);
      const target = reducedMotion
        ? config.frameCount - 1
        : Math.round(progress * (config.frameCount - 1));

      section.style.setProperty("--architecture-progress", String(progress));
      section.style.setProperty("--architecture-exit", String(exitProgress));
      section.style.setProperty(
        "--architecture-scale",
        String(reducedMotion ? 1 : cameraScale(progress)),
      );
      section.style.setProperty(
        "--architecture-title-opacity",
        String(visibleTitle),
      );
      section.style.setProperty(
        "--architecture-title-shift",
        `${(1 - visibleTitle) * 20}px`,
      );
      syncContentToProgress(progress);

      if (target !== currentTarget) {
        currentTarget = target;
        drawnFrame = -1;
        drawTarget();
        if (!images[target]) void loadFrame(target);
      }
    };

    const requestScrollSync = () => {
      if (!scrollFrame) scrollFrame = window.requestAnimationFrame(syncToScroll);
    };

    const requestResize = () => {
      if (resizeFrame) return;
      resizeFrame = window.requestAnimationFrame(() => {
        resizeFrame = 0;
        resizeCanvas();
        syncToScroll();
      });
    };

    const loadRemainingFrames = async () => {
      if (progressiveLoadingStarted || reducedMotion) return;
      progressiveLoadingStarted = true;

      await Promise.all(config.keyframes.map((index) => loadFrame(index)));
      if (destroyed) return;

      const remaining = Array.from(
        { length: config.frameCount },
        (_, index) => index,
      ).filter((index) => !config.keyframes.includes(index));
      let cursor = 0;

      const worker = async () => {
        while (!destroyed && cursor < remaining.length) {
          const index = remaining[cursor];
          cursor += 1;
          await loadFrame(index);
        }
      };

      const concurrency = variant === "mobile" ? 2 : 3;
      await Promise.all(Array.from({ length: concurrency }, worker));
      if (!destroyed) section.dataset.sequenceLoaded = "true";
    };

    currentTarget = firstFrame;
    resizeCanvas();
    syncToScroll();
    void loadFrame(firstFrame).then(() => {
      if (!reducedMotion && !destroyed) {
        void Promise.all(config.keyframes.map((index) => loadFrame(index)));
      }
    });

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          void loadRemainingFrames();
          observer.disconnect();
        }
      },
      { rootMargin: "-12% 0px" },
    );
    observer.observe(section);

    const resizeObserver = new ResizeObserver(requestResize);
    resizeObserver.observe(canvas);
    window.addEventListener("scroll", requestScrollSync, { passive: true });
    window.addEventListener("resize", requestResize, { passive: true });

    return () => {
      destroyed = true;
      observer.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener("scroll", requestScrollSync);
      window.removeEventListener("resize", requestResize);
      if (scrollFrame) window.cancelAnimationFrame(scrollFrame);
      if (resizeFrame) window.cancelAnimationFrame(resizeFrame);
      section.removeAttribute("data-sequence-ready");
      section.removeAttribute("data-sequence-loaded");
      section.removeAttribute("data-sequence-error");
    };
  }, [canvasRef, loadingRef, reducedMotion, sectionRef, variant]);
}
