import { useRef, useEffect } from "react";

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
    label: "AI Workflow",
    items: ["ChatGPT", "Claude", "Cursor AI", "GitHub Copilot", "Prompt Engineering", "AI-Assisted Development"],
  },
  {
    code: "05",
    label: "Tools & DevOps",
    items: ["Git & GitHub", "VS Code", "Postman", "Docker", "Vercel"],
  },
  {
    code: "06",
    label: "Professional Development",
    items: ["Motion Design", "Video Post-Production", "Adobe After Effects", "DaVinci Resolve", "Three.js", "Cloud Fundamentals (AWS)"],
  },
];

function HoloCard({ group }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
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
      style={{ minHeight: 210, transformStyle: "preserve-3d" }}
      data-testid={`toolkit-card-${group.label.toLowerCase().replace(/\s/g, "-")}`}
    >
      <span className="scanner" />
      <h3 className="font-tight text-[24px] sm:text-[27px] text-[var(--ink)]">
        {group.label}
      </h3>

      <div className="mt-6 flex flex-wrap gap-2.5">
        {group.items.map((it) => (
          <span key={it} className="cap">
            <span className="cap-dot" />
            {it}
          </span>
        ))}
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
    <section
      id="toolkit"
      data-testid="toolkit-section"
      className="border-t border-[var(--rule)] relative"
    >
      <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-16 md:py-28">
        <div className="grid grid-cols-12 gap-6 md:gap-8 items-end mb-14 md:mb-20 reveal">
          <div className="col-span-12 md:col-span-9">
            <div className="section-mark mb-6">Capabilities</div>
            <h2 className="font-tight text-[34px] sm:text-[46px] lg:text-[56px] leading-[1.05] text-[var(--ink)] max-w-[20ch]">
              What I{" "}
              <em className="font-italic text-[var(--cyan)]">work with</em>.
            </h2>
          </div>
          <div className="col-span-12 md:col-span-3 md:text-right">
            <p className="text-[14px] leading-relaxed text-[var(--ink-muted)] max-w-[32ch] md:ml-auto">
              Grouped the way I actually use them — design and development, side by side.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
          {GROUPS.map((g) => (
            <HoloCard key={g.label} group={g} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Toolkit;
