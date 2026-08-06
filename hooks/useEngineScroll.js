import { useEffect, useRef } from "react";

/**
 * Returns a ref holding scroll progress (0-1) across the full document.
 * A ref, not state — the Engine reads this every animation frame and we
 * don't want a re-render on every scroll pixel.
 */
export function useEngineScroll() {
  const progressRef = useRef(0);

  useEffect(() => {
    const compute = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      progressRef.current = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    };
    compute();
    window.addEventListener("scroll", compute, { passive: true });
    window.addEventListener("resize", compute);
    return () => {
      window.removeEventListener("scroll", compute);
      window.removeEventListener("resize", compute);
    };
  }, []);

  return progressRef;
}

export default useEngineScroll;
