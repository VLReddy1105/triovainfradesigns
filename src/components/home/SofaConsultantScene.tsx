import { motion } from "framer-motion";
import Image from "next/image";

interface SofaConsultantSceneProps {
  reducedMotion: boolean;
}

export function SofaConsultantScene({ reducedMotion }: SofaConsultantSceneProps) {
  return (
    <motion.div
      className="home-sofa-anchor absolute z-30"
      initial={reducedMotion ? { opacity: 0 } : { y: "14vh", scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: reducedMotion ? 0.12 : 0.72,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <span aria-hidden="true" className="home-sofa-shadow" />
      <Image
        src="/images/home-scene/sofa.webp"
        alt=""
        width={1619}
        height={639}
        loading="eager"
        sizes="(max-width: 767px) 96vw, (max-width: 1024px) 56vw, 50vw"
        className="relative z-10 h-auto w-full object-contain"
      />

      <div className="home-consultant absolute z-20 opacity-100">
        <Image
          src="/images/home-scene/consultant.webp"
          alt="Professional design consultant seated on a sofa and explaining a project"
          width={555}
          height={917}
          sizes="(max-width: 767px) 30vw, (max-width: 1024px) 18vw, 16vw"
          className="h-auto w-full object-contain opacity-100"
        />
      </div>
    </motion.div>
  );
}
