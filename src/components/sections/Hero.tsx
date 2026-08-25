"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { HomeBusinessPitch } from "@/components/home/HomeBusinessPitch";
import { PendantLamp } from "@/components/home/PendantLamp";
import { SofaConsultantScene } from "@/components/home/SofaConsultantScene";
import { WallBranding } from "@/components/home/WallBranding";

type HeroScene = 1 | 2;

const WHEEL_THRESHOLD = 32;
const WHEEL_IDLE_MS = 180;
const TRANSITION_MS = 1050;
const REDUCED_TRANSITION_MS = 240;
const INPUT_RELEASE_MS = 1400;
const REDUCED_INPUT_RELEASE_MS = 320;

function normalizedWheelDelta(event: WheelEvent) {
  if (event.deltaMode === WheelEvent.DOM_DELTA_LINE) return event.deltaY * 16;
  if (event.deltaMode === WheelEvent.DOM_DELTA_PAGE) {
    return event.deltaY * window.innerHeight;
  }
  return event.deltaY;
}

/**
 * A discrete two-state room. The first deliberate gesture furnishes the room;
 * the next gesture is released to normal document scrolling.
 */
export function Hero() {
  const reduceMotion = Boolean(useReducedMotion());
  const [scene, setScene] = useState<HeroScene>(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const sceneState = useRef<HeroScene>(1);
  const transitioning = useRef(false);
  const inputLocked = useRef(false);
  const gestureActive = useRef(false);
  const wheelAccumulator = useRef(0);
  const returnedFromContent = useRef(false);
  const gestureIdleTimer = useRef<number | null>(null);
  const transitionTimer = useRef<number | null>(null);
  const inputReleaseTimer = useRef<number | null>(null);
  const inputLockUntil = useRef(0);
  const touchStartY = useRef<number | null>(null);

  const beginTransition = useCallback(
    (nextScene: HeroScene) => {
      if (transitioning.current || sceneState.current === nextScene) return;

      transitioning.current = true;
      inputLocked.current = true;
      inputLockUntil.current =
        Date.now() +
        (reduceMotion ? REDUCED_INPUT_RELEASE_MS : INPUT_RELEASE_MS);
      wheelAccumulator.current = 0;
      sceneState.current = nextScene;
      setIsTransitioning(true);
      setScene(nextScene);

      if (transitionTimer.current !== null) {
        window.clearTimeout(transitionTimer.current);
      }

      transitionTimer.current = window.setTimeout(
        () => {
          transitioning.current = false;
          setIsTransitioning(false);
        },
        reduceMotion ? REDUCED_TRANSITION_MS : TRANSITION_MS,
      );

      if (inputReleaseTimer.current !== null) {
        window.clearTimeout(inputReleaseTimer.current);
      }
      inputReleaseTimer.current = window.setTimeout(
        () => {
          if (!gestureActive.current) inputLocked.current = false;
        },
        reduceMotion ? REDUCED_INPUT_RELEASE_MS : INPUT_RELEASE_MS,
      );
    },
    [reduceMotion],
  );

  useEffect(() => {
    const initialSceneFrame = window.requestAnimationFrame(() => {
      if (window.scrollY > 4) {
        sceneState.current = 2;
        setScene(2);
        returnedFromContent.current = true;
      }
    });

    const endGestureAfterIdle = () => {
      gestureActive.current = true;
      if (gestureIdleTimer.current !== null) {
        window.clearTimeout(gestureIdleTimer.current);
      }

      gestureIdleTimer.current = window.setTimeout(() => {
        gestureActive.current = false;
        wheelAccumulator.current = 0;
        if (!transitioning.current && Date.now() >= inputLockUntil.current) {
          inputLocked.current = false;
        }
        if (window.scrollY <= 4) returnedFromContent.current = false;
      }, WHEEL_IDLE_MS);
    };

    const onScroll = () => {
      if (
        inputLocked.current &&
        sceneState.current === 2 &&
        window.scrollY > 4
      ) {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
        return;
      }
      if (window.scrollY > 4) returnedFromContent.current = true;
    };

    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey) return;

      const delta = normalizedWheelDelta(event);
      if (Math.abs(delta) < 0.5) return;

      const currentScene = sceneState.current;
      const atHeroTop = window.scrollY <= 4;
      endGestureAfterIdle();

      if (transitioning.current || inputLocked.current) {
        event.preventDefault();
        return;
      }

      if (currentScene === 1 && delta > 0 && atHeroTop) {
        event.preventDefault();
        wheelAccumulator.current += delta;
        if (wheelAccumulator.current >= WHEEL_THRESHOLD) beginTransition(2);
        return;
      }

      if (currentScene === 2 && delta < 0 && atHeroTop) {
        if (returnedFromContent.current) return;

        event.preventDefault();
        wheelAccumulator.current += delta;
        if (wheelAccumulator.current <= -WHEEL_THRESHOLD) beginTransition(1);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const isInteractive = target?.matches(
        "a, button, input, select, textarea, [contenteditable='true']",
      );
      if (isInteractive) return;

      const atHeroTop = window.scrollY <= 4;
      const downKey =
        event.key === "ArrowDown" ||
        event.key === "PageDown" ||
        event.key === " ";
      const upKey = event.key === "ArrowUp" || event.key === "PageUp";

      if (transitioning.current && (downKey || upKey)) {
        event.preventDefault();
        return;
      }

      if (sceneState.current === 1 && downKey && atHeroTop) {
        event.preventDefault();
        beginTransition(2);
      } else if (
        sceneState.current === 2 &&
        upKey &&
        atHeroTop &&
        !returnedFromContent.current
      ) {
        event.preventDefault();
        beginTransition(1);
      }
    };

    const onTouchStart = (event: TouchEvent) => {
      touchStartY.current = event.touches[0]?.clientY ?? null;
    };

    const onTouchMove = (event: TouchEvent) => {
      if (touchStartY.current === null) return;
      const currentY = event.touches[0]?.clientY ?? touchStartY.current;
      const travel = touchStartY.current - currentY;
      const atHeroTop = window.scrollY <= 4;

      if (transitioning.current) {
        event.preventDefault();
      } else if (sceneState.current === 1 && travel > 0 && atHeroTop) {
        event.preventDefault();
      } else if (
        sceneState.current === 2 &&
        travel < 0 &&
        atHeroTop &&
        !returnedFromContent.current
      ) {
        event.preventDefault();
      }
    };

    const onTouchEnd = (event: TouchEvent) => {
      if (touchStartY.current === null) return;
      const endY = event.changedTouches[0]?.clientY ?? touchStartY.current;
      const travel = touchStartY.current - endY;
      const atHeroTop = window.scrollY <= 4;

      if (!transitioning.current && atHeroTop) {
        if (sceneState.current === 1 && travel > 45) {
          beginTransition(2);
        } else if (
          sceneState.current === 2 &&
          travel < -45 &&
          !returnedFromContent.current
        ) {
          beginTransition(1);
        }
      }

      touchStartY.current = null;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      window.cancelAnimationFrame(initialSceneFrame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      if (gestureIdleTimer.current !== null) {
        window.clearTimeout(gestureIdleTimer.current);
      }
      if (transitionTimer.current !== null) {
        window.clearTimeout(transitionTimer.current);
      }
      if (inputReleaseTimer.current !== null) {
        window.clearTimeout(inputReleaseTimer.current);
      }
    };
  }, [beginTransition]);

  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      aria-busy={isTransitioning}
      data-scene={scene}
      data-transitioning={isTransitioning ? "true" : "false"}
      className="home-hero relative isolate h-svh overflow-hidden bg-room-base"
    >
      <Image
        src="/images/home-scene/room-background.webp"
        alt=""
        fill
        preload
        sizes="100vw"
        className="home-background-image object-cover"
      />
      <div aria-hidden="true" className="home-room-vignette absolute inset-0 z-10" />
      <div aria-hidden="true" className="home-room-grain absolute inset-0 z-10" />

      <AnimatePresence mode="wait">
        {scene === 1 ? (
          <motion.div
            key="scene-one"
            className="home-scene absolute inset-0 z-20"
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduceMotion ? 0 : -20 }}
            transition={{
              duration: reduceMotion ? 0.12 : 0.62,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="home-wall-coordinate absolute">
              <WallBranding />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="scene-two"
            className="home-scene absolute inset-0 z-20"
            initial={false}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0.12 : 0.22 }}
          >
            <SofaConsultantScene reducedMotion={reduceMotion} />
            <motion.div
              className="home-pitch absolute z-40"
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: 26 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: reduceMotion ? 0 : 0.22,
                duration: reduceMotion ? 0.12 : 0.55,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <HomeBusinessPitch />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <PendantLamp scene={scene} reducedMotion={reduceMotion} />

      <div
        aria-hidden="true"
        className="home-scroll-cue absolute z-50 flex flex-col items-center gap-3"
      >
        <AnimatePresence initial={false} mode="wait">
          <motion.span
            key={scene}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: reduceMotion ? 0.1 : 0.2 }}
          >
            {scene === 1 ? "Scroll to enter" : "Scroll to explore"}
          </motion.span>
        </AnimatePresence>
        <span className="home-scroll-line" />
      </div>
    </section>
  );
}
