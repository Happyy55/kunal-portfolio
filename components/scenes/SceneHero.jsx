import { useEffect, useRef } from "react";
import { useMagnetic } from "../../hooks/useMagnetic";

/**
 * Scene 01 — Hero.
 * The Engine (mounted once at page level, fixed behind all scenes)
 * is already visible here — this scene owns no 3D of its own. Typography
 * is the dominant element; one message, one action.
 */
export const SceneHero = () => {
  const headlineRef = useRef(null);
  useMagnetic("#scene-hero-magnetic", 0.28);

  useEffect(() => {
    const root = headlineRef.current;
    if (!root) return;
    const lines = root.querySelectorAll(".mask-line");
    lines.forEach((l, i) => {
      setTimeout(() => l.classList.add("is-visible"), 160 + i * 150);
    });
  }, []);

  return (
    <section
      id="top"
      data-testid="scene-hero"
      className="relative min-h-[100svh] flex items-center"
    >
      <div className="relative z-10 max-w-[1240px] mx-auto px-6 md:px-10 w-full">
        <div className="max-w-[16ch] sm:max-w-[18ch]" ref={headlineRef}>
          <h1
            data-testid="hero-headline"
            className="font-tight text-display-xl text-[var(--ink)]"
          >
            <span className="mask-line"><span>Building digital</span></span>
            <span className="mask-line"><span>experiences that</span></span>
            <span className="mask-line">
              <span>people <em className="font-italic text-[var(--cyan)]">remember</em>.</span>
            </span>
          </h1>

          <p className="reveal mt-8 text-body-lg text-[var(--ink-soft)] max-w-[42ch]" style={{ transitionDelay: "550ms" }}>
            KJ Creator — a studio for strategy, design, and engineering that ships together.
          </p>

          <div className="reveal mt-10" style={{ transitionDelay: "700ms" }}>
            <a
              href="#work"
              onClick={(e) => { const el = document.getElementById("work"); if (el) { e.preventDefault(); el.scrollIntoView({ behavior: "smooth" }); } }}
              data-testid="hero-cta"
              id="scene-hero-magnetic"
              className="magnetic inline-block"
              data-magnetic
            >
              <span className="btn-primary" data-magnetic-target>
                <span>Start a project</span>
                <span className="arrow-dot" />
              </span>
            </a>
          </div>
        </div>
      </div>

      <div
        aria-hidden
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-60"
      >
        <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--ink-muted)]">Scroll</span>
        <span className="w-px h-8 bg-[var(--rule-strong)]" />
      </div>
    </section>
  );
};

export default SceneHero;
