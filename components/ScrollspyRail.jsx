import { useEffect, useState } from "react";

/**
 * Left-edge scrollspy rail — thin wayfinding, not decoration.
 * - Invisible until the user has scrolled past the hero.
 * - Active item gets a short accent line + label; others stay dim.
 * - Hidden on tablet/mobile (CSS media query in index.css); the
 *   existing top .scroll-progress bar covers orientation there.
 */
const SECTIONS = [
  { id: "top", num: "01", label: "Attention" },
  { id: "philosophy", num: "02", label: "Thinking" },
  { id: "work", num: "03", label: "Creation" },
  { id: "closing", num: "06", label: "Proof" },
  { id: "contact", num: "07", label: "Collaborate" },
];

const R = 9;
const CIRC = 2 * Math.PI * R;

function RailGauge({ progress }) {
  const offset = CIRC - progress * CIRC;
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" className="rail-gauge" aria-hidden>
      <circle cx="11" cy="11" r={R} className="rail-gauge-track" fill="none" strokeWidth="1.4" />
      <circle
        cx="11"
        cy="11"
        r={R}
        className="rail-gauge-fill"
        fill="none"
        strokeWidth="1.4"
        strokeDasharray={CIRC}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform="rotate(-90 11 11)"
      />
    </svg>
  );
}

export const ScrollspyRail = () => {
  const [visible, setVisible] = useState(false);
  const [activeId, setActiveId] = useState(SECTIONS[0].id);
  const [pageProgress, setPageProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.6);
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      setPageProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter(Boolean);
    if (!els.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) setActiveId(en.target.id);
        });
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const goTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav
      aria-label="Section navigation"
      data-testid="scrollspy-rail"
      className={`scrollspy-rail ${visible ? "is-visible" : ""}`}
    >
      {SECTIONS.map((s, i) => {
        const segStart = i / SECTIONS.length;
        const segEnd = (i + 1) / SECTIONS.length;
        const local = Math.min(1, Math.max(0, (pageProgress - segStart) / (segEnd - segStart)));
        return (
          <button
            key={s.id}
            type="button"
            onClick={() => goTo(s.id)}
            className={`rail-item ${activeId === s.id ? "is-active" : ""}`}
            aria-current={activeId === s.id ? "true" : undefined}
            data-testid={`rail-item-${s.id}`}
          >
            <RailGauge progress={activeId === s.id ? local : (pageProgress > segEnd ? 1 : 0)} />
            <span className="rail-num">{s.num}</span>
            <span className="rail-label">{s.label}</span>
          </button>
        );
      })}
    </nav>
  );
};

export default ScrollspyRail;
