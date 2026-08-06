import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { useRef, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { getProject } from "../../data/projects";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const project = getProject("attendly");

// Sparse landmark-style anchor points — irregular, not a grid. Positions
// as percentages within the image frame, loosely evoking a face-recognition
// scan without literally drawing a face.
const POINTS = [
  { x: 42, y: 30 }, { x: 58, y: 30 }, { x: 50, y: 42 },
  { x: 40, y: 55 }, { x: 60, y: 55 }, { x: 50, y: 68 },
  { x: 30, y: 40 }, { x: 70, y: 40 },
];
const LINKS = [[0, 2], [1, 2], [2, 5], [3, 5], [4, 5], [0, 6], [1, 7]];

export const SceneAttendly = () => {
  const ref = useRef(null);
  const pathIds = useMemo(() => LINKS.map((_, i) => `attendly-link-${i}`), []);

  useGSAP(
    () => {
      const img = ref.current?.querySelector(".at-img");
      const paths = ref.current?.querySelectorAll(".at-link-path");
      if (img) {
        gsap.fromTo(
          img,
          { filter: "grayscale(1) brightness(0.55)" },
          {
            filter: "grayscale(0) brightness(1)",
            ease: "none",
            scrollTrigger: { trigger: ref.current, start: "top 85%", end: "top 35%", scrub: 0.6 },
          }
        );
      }
      if (paths?.length) {
        paths.forEach((p, i) => {
          const len = p.getTotalLength();
          gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
          gsap.to(p, {
            strokeDashoffset: 0,
            duration: 1.4,
            delay: i * 0.15,
            ease: "power2.out",
            scrollTrigger: { trigger: ref.current, start: "top 70%", toggleActions: "play none none reverse" },
          });
        });
      }
    },
    { scope: ref }
  );

  if (!project) return null;

  return (
    <section
      ref={ref}
      data-testid="scene-attendly"
      className="relative min-h-[100svh] flex items-center border-t border-[var(--rule)] overflow-hidden"
    >
      <div className="absolute inset-6 md:inset-10 md:right-[8%] md:left-auto md:w-[52%] rounded-[var(--r-lg)] overflow-hidden">
        <Link
          to={`/work/${project.slug}`}
          aria-label={`View case study — ${project.title}`}
          className="at-img block w-full h-full"
          data-testid="at-image-link"
        >
          <img
            src={project.image}
            alt={`${project.title} — ${project.overview}`}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{ background: "linear-gradient(160deg, rgba(5,7,15,0.35) 0%, transparent 45%, rgba(5,7,15,0.5) 100%)" }}
          />
          <div className="grain" />
        </Link>

        {/* recognition-point overlay — quiet, almost invisible scan */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          aria-hidden
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          {LINKS.map(([a, b], i) => (
            <line
              key={pathIds[i]}
              className="at-link-path"
              x1={POINTS[a].x}
              y1={POINTS[a].y}
              x2={POINTS[b].x}
              y2={POINTS[b].y}
              stroke="rgba(95,217,221,0.55)"
              strokeWidth="0.15"
              vectorEffect="non-scaling-stroke"
            />
          ))}
          {POINTS.map((p, i) => (
            <circle key={i} cx={p.x} cy={p.y} r="0.5" fill="var(--cyan)" opacity="0.8" />
          ))}
        </svg>
      </div>

      <div className="relative z-10 max-w-[1240px] mx-auto px-6 md:px-10 w-full">
        <div className="max-w-[46ch] md:pr-[46%] reveal">
          <div className="section-mark mb-4">04 / {project.kicker}</div>
          <h2 className="font-tight text-display-lg text-[var(--ink)] mb-4">{project.title}</h2>
          <p className="font-serif text-[18px] sm:text-[21px] leading-[1.5] text-[var(--ink-soft)] mb-7">
            {/* Poster scenes carry one tight line — the full pull-quote
                (with its second, explanatory sentence) lives on the case
                study page. Using only the first sentence here keeps this
                scene's text weight matched to Alpha Radar's and Ledger's,
                rather than running 2x longer. */}
            {project.pull.split(". ")[0]}.
          </p>
          <Link
            to={`/work/${project.slug}`}
            className="inline-flex items-center gap-3 text-[13.5px] font-display text-[var(--ink)] hover:gap-4 hover:text-[var(--cyan)] transition-all duration-400"
            data-testid="at-view-case-study"
          >
            <span className="link">View case study</span>
            <ArrowUpRight size={15} strokeWidth={1.8} className="text-[var(--cyan)]" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SceneAttendly;
