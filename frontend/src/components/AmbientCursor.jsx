import { useEffect, useRef } from "react";

/**
 * Cursor-follow ambient glow.
 * Sets --cursor-x / --cursor-y on the body and renders a fixed radial
 * gradient layer that follows the pointer.
 */
export default function AmbientCursor() {
  const ref = useRef(null);

  useEffect(() => {
    let raf = 0;
    let tx = 50, ty = 50, cx = 50, cy = 50;
    const onMove = (e) => {
      tx = (e.clientX / window.innerWidth) * 100;
      ty = (e.clientY / window.innerHeight) * 100;
    };
    const loop = () => {
      cx += (tx - cx) * 0.12;
      cy += (ty - cy) * 0.12;
      const el = ref.current;
      if (el) {
        el.style.setProperty("--cursor-x", `${cx}%`);
        el.style.setProperty("--cursor-y", `${cy}%`);
      }
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <div ref={ref} className="cursor-glow" aria-hidden />;
}
