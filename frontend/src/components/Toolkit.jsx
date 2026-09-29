import { useRef, useEffect } from "react";
import { Chip } from "./ui/Chip";

const GROUPS = [
  {
    code: "01",
    label: "Frontend",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Responsive Design"],
  },
  {
    code: "02",
    label: "Backend",
    items: ["Node.js", "Express.js", "MongoDB", "REST APIs", "Authentication (JWT)", "SQL"],
  },
  {
    code: "03",
    label: "Design & Branding",
    items: ["Brand Identity", "Logo Design", "UI/UX Design", "Graphic Design", "Adobe Photoshop", "Figma"],
  },
  {
    code: "04",
    label: "Tools & DevOps",
    items: ["Git & GitHub", "VS Code", "Postman", "Docker", "Vercel", "Cloud Fundamentals (AWS)"],
  },
  {
    code: "05",
    label: "Motion & Creative",
    items: ["Motion Design", "Three.js", "Video Post-Production", "Adobe After Effects", "DaVinci Resolve"],
  },
];

const ACCENT_VAR = {
  cyan: { color: "var(--cyan)", soft: "rgba(108,232,236,0.35)", glow: "var(--cyan-glow)" },
  gold: { color: "var(--gold)", soft: "rgba(212,180,134,0.35)", glow: "rgba(212,180,134,0.4)" },
  violet: { color: "var(--violet)", soft: "rgba(168,121,255,0.35)", glow: "var(--violet-glow)" },
};
const ACCENT_CYCLE = ["cyan", "gold", "violet"];

function HoloCard({ group, accent }) {
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
      className="holo-card p-6 md:p-7 lg:p-8 relative transition-transform"
      style={{
        minHeight: 210,
        transformStyle: "preserve-3d",
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

export const Toolkit = () => {
  return (
    <section id="toolkit" data-testid="toolkit-section" className="relative">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-16 md:py-28">
        <div className="mb-14 md:mb-20 reveal">
          <div className="section-mark mb-6">Stack</div>
          <h2 className="font-tight text-[34px] sm:text-[46px] lg:text-[56px] leading-[1.05] text-[var(--ink)] max-w-[20ch]">
            What I{" "}
            <em className="font-italic text-[var(--cyan)]">work with</em>.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
          {GROUPS.map((g, i) => (
            <HoloCard key={g.label} group={g} accent={ACCENT_CYCLE[i % ACCENT_CYCLE.length]} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Toolkit;
