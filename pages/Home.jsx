import { useEffect, useMemo } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import ScrollspyRail from "../components/ScrollspyRail";
import Engine from "../components/Engine";
import SceneHero from "../components/scenes/SceneHero";
import ScenePhilosophy from "../components/scenes/ScenePhilosophy";
import SceneAlphaRadar from "../components/scenes/SceneAlphaRadar";
import SceneAttendly from "../components/scenes/SceneAttendly";
import SceneLedger from "../components/scenes/SceneLedger";
import SceneClosing from "../components/scenes/SceneClosing";
import SceneCTA from "../components/scenes/SceneCTA";
import { useReveal } from "../hooks/useReveal";
import { useEngineScroll } from "../hooks/useEngineScroll";
import { useReadingMode } from "../hooks/useReadingMode";

/**
 * Homepage — seven scenes, one continuous story. The Engine mounts once
 * here at the page root (fixed, behind everything) and is driven by a
 * single scroll-progress ref shared across all seven scenes; it is never
 * unmounted or re-created between scenes.
 */
export default function Home() {
  const ref = useReveal();
  const scrollRef = useEngineScroll();
  const { enabled: readingMode } = useReadingMode();
  // OS-level reduced-motion preference — independent of the in-app Reading
  // Mode toggle. A continuously-animating WebGL particle system is exactly
  // the kind of motion this setting exists to suppress; most people who
  // need it never touch an in-page toggle, so this check can't be optional.
  const prefersReducedMotion = useMemo(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );
  const suppressEngine = readingMode || prefersReducedMotion;

  useEffect(() => {
    document.title = "KJ Creator — Digital experiences, engineered with intent";
  }, []);

  return (
    <div ref={ref} data-testid="home-page">
      <Nav />
      <ScrollspyRail />
      {!suppressEngine && <Engine scrollRef={scrollRef} />}
      {suppressEngine && (
        <div
          aria-hidden
          data-testid="engine-static-fallback"
          className="fixed inset-0 flex items-center justify-center pointer-events-none"
          style={{ zIndex: 1, opacity: 0.5 }}
        >
          <span
            className="font-mono font-bold text-[15vw] sm:text-[8vw]"
            style={{ color: "var(--cyan)", letterSpacing: "-0.02em" }}
          >
            KJ
          </span>
        </div>
      )}
      <main className="relative" style={{ zIndex: 2 }}>
        <SceneHero />
        <ScenePhilosophy />
        <SceneAlphaRadar />
        <SceneAttendly />
        <SceneLedger />
        <SceneClosing />
        <SceneCTA />
      </main>
      <Footer />
    </div>
  );
}
