import { motion } from "framer-motion";

interface PendantLampProps {
  scene: 1 | 2;
  reducedMotion: boolean;
}

/** CSS-built so the lamp stays crisp and the cord attachment never moves. */
export function PendantLamp({ scene, reducedMotion }: PendantLampProps) {
  const ambient = scene === 1 && !reducedMotion;
  const lightTransition = {
    duration: reducedMotion ? 0.12 : 0.68,
    delay: scene === 2 && !reducedMotion ? 0.42 : 0,
    ease: [0.22, 1, 0.36, 1] as const,
  };

  return (
    <div
      className="home-lamp absolute z-30"
      data-scene={scene}
      aria-hidden="true"
    >
      <motion.span
        className="home-lamp-cone"
        animate={{ opacity: scene === 2 ? 0.7 : 0.17 }}
        transition={lightTransition}
      />
      <motion.span
        className="home-lamp-room-glow"
        animate={{ opacity: scene === 2 ? 0.8 : 0.15 }}
        transition={lightTransition}
      />

      <motion.div
        className="home-lamp-drop-layer"
        initial={
          reducedMotion ? false : { y: "-9rem", opacity: 0 }
        }
        animate={
          reducedMotion
            ? { y: 0, opacity: 1 }
            : { y: ["-9rem", "0.7rem", "0rem"], opacity: [0, 1, 1] }
        }
        transition={
          reducedMotion
            ? { duration: 0.12 }
            : {
                duration: 0.88,
                times: [0, 0.82, 1],
                ease: [0.16, 1, 0.3, 1],
              }
        }
      >
        <motion.div
          className="home-lamp-swing-layer"
          initial={{ rotate: 0 }}
          animate={
            ambient ? { rotate: [0, 3.7, -3.7, 0] } : { rotate: 0 }
          }
          transition={
            ambient
              ? {
                  delay: 0.92,
                  duration: 2.65,
                  times: [0, 0.25, 0.75, 1],
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "loop",
                }
              : {
                  duration: reducedMotion ? 0.12 : 0.72,
                  ease: [0.22, 1, 0.36, 1],
                }
          }
        >
          <div className="home-lamp-pendant">
            <span className="home-lamp-canopy" />
            <span className="home-lamp-cord" />
            <span className="home-lamp-shade">
              <span className="home-lamp-specular" />
              <span className="home-lamp-rim">
                <motion.span
                  className="home-lamp-bulb"
                  animate={{ opacity: scene === 2 ? 1 : 0.68 }}
                  transition={lightTransition}
                />
              </span>
            </span>
            <motion.span
              className="home-lamp-aura"
              animate={{ opacity: scene === 2 ? 0.92 : 0.36 }}
              transition={lightTransition}
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
