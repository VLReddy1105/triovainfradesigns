# Architecture sequence sources

The seven source keyframes are ordered as follows:

1. Empty prepared site
2. Foundations and starter bars
3. Reinforced-concrete structure
4. Floors and masonry enclosure
5. Glazing, balconies and facade
6. New landscaping and pre-reveal lighting
7. Completed residence

Run `node scripts/generate-architecture-sequence.mjs` from the project root to
rebuild both delivery sequences. Pass `desktop` or `mobile` to rebuild only one
variant.

Generated files:

- `public/architecture-sequence/desktop/frame-001.webp` through
  `frame-120.webp` at 1600 × 900
- `public/architecture-sequence/mobile/frame-001.webp` through
  `frame-060.webp` at 768 × 1365

The runtime only depends on the generated WebP files. Production renders can
replace those files directly without any component changes, provided the names,
dimensions and frame counts remain unchanged.
