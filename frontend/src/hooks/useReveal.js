import { useEffect, useRef } from "react";

// Adds the `is-visible` class to children with `.reveal` once they intersect.
// One observer per mount, opt-in via wrapping element.
export function useReveal(rootMargin = "0px 0px -8% 0px") {
  const ref = useRef(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const targets = root.querySelectorAll(".reveal");
    if (!targets.length) return;

    if (typeof IntersectionObserver === "undefined") {
      targets.forEach((t) => t.classList.add("is-visible"));
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

    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, [rootMargin]);

  return ref;
}
