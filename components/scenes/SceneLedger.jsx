import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { getProject } from "../../data/projects";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const project = getProject("ledger");
const ROW_COUNT = 10;

/**
 * Scene 05 — Ledger. Art direction: continuous horizontal lines, each
 * standing in for a ledger entry, accumulate as the visitor scrolls
 * through. The last line drawn is deliberately full-width and becomes
 * the visual seed for the rule that opens Scene 06 (Closing).
 */
export const SceneLedger = () => {
  const ref = useRef(null);

  useGSAP(
    () => {
      const rows = ref.current?.querySelectorAll(".ledger-row");
      const img = ref.current?.querySelector(".lg-img");
      if (img) {
        gsap.fromTo(
          img,
          { filter: "grayscale(1) brightness(0.6)" },
          {
            filter: "grayscale(0) brightness(1)",
            ease: "none",
            scrollTrigger: { trigger: ref.current, start: "top 85%", end: "top 40%", scrub: 0.6 },
          }
        );
      }
      if (rows?.length) {
        gsap.fromTo(
          rows,
          { scaleX: 0 },
          {
            scaleX: 1,
            transformOrigin: "0% 50%",
            stagger: 0.06,
            ease: "none",
            scrollTrigger: { trigger: ref.current, start: "top 80%", end: "bottom 60%", scrub: 0.5 },
          }
        );
      }
    },
    { scope: ref }
  );

  if (!project) return null;

  return (
    <section
      ref={ref}
      data-testid="scene-ledger"
      className="relative min-h-[100svh] flex items-center border-t border-[var(--rule)] overflow-hidden"
    >
      <div className="absolute inset-6 md:inset-10 rounded-[var(--r-lg)] overflow-hidden">
        <Link
          to={`/work/${project.slug}`}
          aria-label={`View case study — ${project.title}`}
          className="lg-img block w-full h-full"
          data-testid="lg-image-link"
        >
          <img
            src={project.image}
            alt={`${project.title} — ${project.overview}`}
            className="w-full h-full object-cover"
            loading="lazy"
            style={{ opacity: 0.4 }}
          />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{ background: "linear-gradient(180deg, rgba(5,7,15,0.55) 0%, rgba(5,7,15,0.75) 100%)" }}
          />
          <div className="grain" />
        </Link>

        {/* accumulating ledger-line motif */}
        <div className="absolute inset-x-0 bottom-0 top-[18%] flex flex-col justify-end gap-[3.4%] px-[8%] pb-[10%] pointer-events-none" aria-hidden>
          {Array.from({ length: ROW_COUNT }).map((_, i) => (
            <div
              key={i}
              className="ledger-row h-px"
              style={{
                background: i === ROW_COUNT - 1 ? "var(--cyan)" : "var(--rule-strong)",
                boxShadow: i === ROW_COUNT - 1 ? "0 0 8px var(--cyan-glow)" : "none",
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-[1240px] mx-auto px-6 md:px-10 w-full">
        <div className="max-w-[44ch] mx-auto text-center reveal">
          <div className="section-mark mb-4 justify-center">05 / {project.kicker}</div>
          <h2 className="font-tight text-display-lg text-[var(--ink)] mb-4">{project.title}</h2>
          <p className="font-serif text-[18px] sm:text-[21px] leading-[1.5] text-[var(--ink-soft)] mx-auto mb-7">
            {project.pull}
          </p>
          <Link
            to={`/work/${project.slug}`}
            className="inline-flex items-center gap-3 text-[13.5px] font-display text-[var(--ink)] hover:gap-4 hover:text-[var(--cyan)] transition-all duration-400"
            data-testid="lg-view-case-study"
          >
            <span className="link">View case study</span>
            <ArrowUpRight size={15} strokeWidth={1.8} className="text-[var(--cyan)]" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SceneLedger;
