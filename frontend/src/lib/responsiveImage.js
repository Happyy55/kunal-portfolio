// Builds a webp srcSet from an original /images/*.png path, pointing at the
// pre-generated `{name}-{width}w.webp` variants sitting alongside it.
export function webpSrcSet(pngPath, widths) {
  const base = pngPath.replace(/\.png$/i, "");
  return widths.map((w) => `${base}-${w}w.webp ${w}w`).join(", ");
}

export const COVER_WIDTHS = [480, 800, 1200, 1600];
export const WIDE_WIDTHS = [640, 960, 1280, 1600, 1920];
export const PORTRAIT_WIDTHS = [400, 800, 1080];
