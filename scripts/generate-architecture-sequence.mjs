import { mkdir, readdir, rm } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import sharp from "sharp";

const projectRoot = process.cwd();
const sourceDirectory = path.join(
  projectRoot,
  "scripts",
  "architecture-keyframes",
);
const outputDirectory = path.join(
  projectRoot,
  "public",
  "architecture-sequence",
);

const variants = [
  {
    name: "desktop",
    frameCount: 120,
    width: 1600,
    height: 900,
    quality: 76,
    objectPositionX: 0.5,
  },
  {
    name: "mobile",
    frameCount: 60,
    width: 768,
    height: 1365,
    quality: 72,
    objectPositionX: 0.58,
  },
];

async function coverBuffer(file, { width, height, objectPositionX }) {
  const metadata = await sharp(file).metadata();
  if (!metadata.width || !metadata.height) {
    throw new Error(`Unable to read image dimensions for ${file}`);
  }

  const scale = Math.max(width / metadata.width, height / metadata.height);
  const resizedWidth = Math.ceil(metadata.width * scale);
  const resizedHeight = Math.ceil(metadata.height * scale);
  const maxLeft = Math.max(0, resizedWidth - width);
  const maxTop = Math.max(0, resizedHeight - height);

  return sharp(file)
    .resize(resizedWidth, resizedHeight, { fit: "fill" })
    .extract({
      left: Math.round(maxLeft * objectPositionX),
      top: Math.round(maxTop / 2),
      width,
      height,
    })
    .removeAlpha()
    .toBuffer();
}

async function buildVariant(keyframes, variant) {
  const targetDirectory = path.join(outputDirectory, variant.name);
  await rm(targetDirectory, { recursive: true, force: true });
  await mkdir(targetDirectory, { recursive: true });

  const prepared = await Promise.all(
    keyframes.map((file) => coverBuffer(file, variant)),
  );

  for (let index = 0; index < variant.frameCount; index += 1) {
    const sequencePosition =
      (index / (variant.frameCount - 1)) * (prepared.length - 1);
    const firstKeyframe = Math.floor(sequencePosition);
    const secondKeyframe = Math.min(firstKeyframe + 1, prepared.length - 1);
    const blendProgress = sequencePosition - firstKeyframe;
    const outputPath = path.join(
      targetDirectory,
      `frame-${String(index + 1).padStart(3, "0")}.webp`,
    );

    if (blendProgress < 0.001 || firstKeyframe === secondKeyframe) {
      await sharp(prepared[firstKeyframe])
        .webp({ quality: variant.quality, effort: 4, smartSubsample: true })
        .toFile(outputPath);
      continue;
    }

    const overlay = await sharp(prepared[secondKeyframe])
      .ensureAlpha(blendProgress)
      .toBuffer();

    await sharp(prepared[firstKeyframe])
      .composite([{ input: overlay, blend: "over", premultiplied: true }])
      .webp({ quality: variant.quality, effort: 4, smartSubsample: true })
      .toFile(outputPath);
  }
}

const keyframeNames = (await readdir(sourceDirectory))
  .filter((file) => /^keyframe-\d{2}\.png$/.test(file))
  .sort();

if (keyframeNames.length !== 7) {
  throw new Error(
    `Expected 7 PNG keyframes in ${sourceDirectory}; found ${keyframeNames.length}.`,
  );
}

const keyframes = keyframeNames.map((file) =>
  path.join(sourceDirectory, file),
);

await mkdir(outputDirectory, { recursive: true });
const requestedVariant = process.argv[2];
const selectedVariants = requestedVariant
  ? variants.filter(({ name }) => name === requestedVariant)
  : variants;

if (selectedVariants.length === 0) {
  throw new Error(`Unknown sequence variant: ${requestedVariant}`);
}

for (const variant of selectedVariants) {
  await buildVariant(keyframes, variant);
}

console.log(
  `Generated ${selectedVariants.map(({ frameCount, name }) => `${frameCount} ${name}`).join(" and ")} WebP frames from ${keyframes.length} construction keyframes.`,
);
