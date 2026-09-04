export const architectureCities = [
  { name: "Hyderabad", revealAt: 0 },
  { name: "Vijayawada", revealAt: 0.25 },
  { name: "Vizag", revealAt: 0.45 },
  { name: "Bangalore", revealAt: 0.65 },
] as const;

export const architectureTaglines = [
  {
    startAt: 0,
    text: "Every timeless space begins with a vision.",
  },
  {
    startAt: 0.2,
    text: "Where ideas take shape.",
  },
  {
    startAt: 0.4,
    text: "Designed with purpose. Built with precision.",
  },
  {
    startAt: 0.6,
    text: "Transforming spaces into timeless luxury.",
  },
  {
    startAt: 0.8,
    text: "From vision to reality — crafted by Triova.",
  },
] as const;

export const CITY_REVEAL_DURATION = 0.055;
export const TAGLINE_CROSSFADE_DURATION = 0.06;
