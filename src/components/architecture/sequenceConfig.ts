export type ArchitectureSequenceVariant = "desktop" | "mobile";

interface ArchitectureSequenceConfig {
  frameCount: number;
  keyframes: number[];
  folder: string;
}

export const architectureSequences: Record<
  ArchitectureSequenceVariant,
  ArchitectureSequenceConfig
> = {
  desktop: {
    frameCount: 120,
    keyframes: [0, 20, 40, 60, 80, 100, 119],
    folder: "/architecture-sequence/desktop",
  },
  mobile: {
    frameCount: 60,
    keyframes: [0, 10, 20, 30, 40, 50, 59],
    folder: "/architecture-sequence/mobile",
  },
};

export function architectureFrameSource(
  variant: ArchitectureSequenceVariant,
  index: number,
) {
  const { folder } = architectureSequences[variant];
  return `${folder}/frame-${String(index + 1).padStart(3, "0")}.webp`;
}
