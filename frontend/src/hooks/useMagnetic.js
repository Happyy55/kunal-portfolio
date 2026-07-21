import { useEffect } from "react";

/**
 * Lightweight magnetic-cursor effect.
 * Attaches mouse listeners to elements matching the selector.
 * Children with [data-magnetic-target] receive the inverse pull.
 */
export function useMagnetic(selector = "[data-magnetic]", strength = 0.35) {
  useEffect(() => {
    // Touch devices get stray pointermove events that permanently shift
    // the buttons — disable the effect entirely without a fine pointer.
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const els = document.querySelectorAll(selector);
    const handlers = [];

    els.forEach((el) => {
      const onMove = (e) => {
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) * strength;
        const dy = (e.clientY - cy) * strength;
        el.style.transform = `translate3d(${dx.toFixed(2)}px, ${dy.toFixed(2)}px, 0)`;
        const inner = el.querySelector("[data-magnetic-target]");
        if (inner) {
          inner.style.transform = `translate3d(${(dx * 0.4).toFixed(2)}px, ${(dy * 0.4).toFixed(2)}px, 0)`;
        }
      };
      const onLeave = () => {
        el.style.transform = "translate3d(0, 0, 0)";
        const inner = el.querySelector("[data-magnetic-target]");
        if (inner) inner.style.transform = "translate3d(0, 0, 0)";
      };
      el.addEventListener("pointermove", onMove);
      el.addEventListener("pointerleave", onLeave);
      handlers.push({ el, onMove, onLeave });
    });

    return () => {
      handlers.forEach(({ el, onMove, onLeave }) => {
        el.removeEventListener("pointermove", onMove);
        el.removeEventListener("pointerleave", onLeave);
      });
    };
  }, [selector, strength]);
}
