import { useRef, useEffect } from "react";
import { Chip } from "./ui/Chip";

const GROUPS = [
  { label: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Responsive Design"] },
  { label: "Backend", items: ["Node.js", "Express.js", "MongoDB", "REST APIs", "Authentication (JWT)", "SQL"] },
  { label: "Design & Branding", items: ["Brand Identity", "Logo Design", "UI/UX Design", "Graphic Design", "Adobe Photoshop", "Figma"] },
  { label: "Tools & DevOps", items: ["Git & GitHub", "VS Code", "Postman", "Docker", "Vercel", "Cloud Fundamentals (AWS)"] },
  { label: "Motion & Creative", items: ["Motion Design", "Three.js", "Video Post-Production", "Adobe After Effects", "DaVinci Resolve"] },
];

const ACCENT_VAR = {
  cyan: { color: "var(--cyan)", soft: "rgba(108,232,236,0.35)", glow: "var(--cyan-glow)" },
  gold: { color: "var(--gold)", soft: "rgba(212,180,134,0.35)", glow: "rgba(212,180,134,0.4)" },
  violet: { color: "var(--violet)", soft: "rgba(168,121,255,0.35)", glow: "var(--violet-glow)" },
};
const ACCENT_CYCLE = ["cyan", "gold", "violet"];

function HoloCard({ group, accent, className }) {
  const ref = useRef(null);
  const a = ACCENT_VAR[accent];

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - (r.left + r.width / 2)) / r.width;
      const py = (e.clientY - (r.top + r.height / 2)) / r.height;
      el.style.transform = `perspective(900px) rotateX(${(-py * 4).toFixed(2)}deg) rotateY(${(px * 5).toFixed(2)}deg)`;
    };
    const onLeave = () => {
      el.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
    };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <article
      ref={ref}
      className={`holo-card p-6 md:p-7 lg:p-8 ${className}`}
      style={{
        "--card-accent": a.color,
        "--card-accent-soft": a.soft,
        "--card-accent-glow": a.glow,
      }}
      data-testid={`toolkit-card-${group.label.toLowerCase().replace(/\s/g, "-")}`}
    >
      <span className="scanner" />
      <div className="relative z-[1]">
        <h3 className="font-tight text-[24px] sm:text-[27px] text-[var(--ink)]">
          {group.label}
        </h3>

        <div className="mt-6 flex flex-wrap gap-2.5">
          {group.items.map((it) => (
            <Chip key={it} accent={accent}>{it}</Chip>
          ))}
        </div>
      </div>

      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-1/2 pointer-events-none opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage: "linear-gradient(to top, black, transparent)",
          WebkitMaskImage: "linear-gradient(to top, black, transparent)",
        }}
      />
    </article>
  );
}

// Five groups: three across, then two wider cards, so no row ends with a gap.
const SPAN = ["lg:col-span-2", "lg:col-span-2", "lg:col-span-2", "lg:col-span-3", "lg:col-span-3"];

export const Toolkit = () => {
  return (
    <section id="toolkit" data-testid="toolkit-section" className="relative">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-20 md:py-32">
        <div className="mb-12 md:mb-20 reveal">
          <div className="section-mark mb-6">Stack</div>
          <h2 className="font-tight text-[36px] sm:text-[48px] lg:text-[58px] leading-[1.04] text-[var(--ink)] max-w-[20ch]">
            What I <span className="text-[var(--cyan)]">work with</span>.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 md:gap-6">
          {GROUPS.map((g, i) => (
            <HoloCard
              key={g.label}
              group={g}
              accent={ACCENT_CYCLE[i % ACCENT_CYCLE.length]}
              className={`${SPAN[i]} ${i === GROUPS.length - 1 ? "md:col-span-2" : ""}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Toolkit;
