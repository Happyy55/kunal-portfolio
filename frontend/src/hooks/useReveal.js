import { useEffect, useRef } from "react";

// Adds the `is-visible` class to children with `.reveal` once they intersect.
// One observer per mount, opt-in via wrapping element.
export function useReveal(rootMargin = "0px 0px -8% 0px") {
  const ref = useRef(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    if (typeof IntersectionObserver === "undefined") {
      root.querySelectorAll(".reveal").forEach((t) => t.classList.add("is-visible"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin, threshold: 0.05 }
    );

    const seen = new WeakSet();
    const observeAll = () => {
      root.querySelectorAll(".reveal:not(.is-visible)").forEach((t) => {
        if (!seen.has(t)) {
          seen.add(t);
          io.observe(t);
        }
      });
    };
    observeAll();

    // Sections below the hero load as a separate chunk after first paint, so
    // new .reveal nodes appear after mount and need to be picked up too.
    const mo = new MutationObserver(observeAll);
    mo.observe(root, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, [rootMargin]);

  return ref;
}
