// Single source of truth for brand hex values needed in JS/Three.js contexts
// (WebGL materials and lights can't read CSS custom properties). Keep every
// value here in sync with the :root tokens in src/index.css — this is what
// stops a 3D scene from silently drifting onto an off-palette color.

export const PALETTE = {
  bg: "#05070f",
  bgElev: "#0a0d18",
  bgCard: "#0e1224",

  ink: "#f3eee5",

  cyan: "#6ce8ec",
  cyanDeep: "#34c2c8",

  violet: "#a879ff",
  violetDeep: "#7c4cf0",

  gold: "#d4b486",

  live: "#62e3a5",
};
