import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { getProject } from "../../data/projects";
import { webpSrcSet, COVER_WIDTHS } from "../../lib/responsiveImage";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const project = getProject("alpha-radar-india");

/**
 * Scene 03 — Alpha Radar. Art direction: a slow rotating radial sweep
 * over the full-bleed image, echoing the product's own "radar scanning
 * for opportunity" metaphor. Type sits lower-left, image is the hero.
 */
export const SceneAlphaRadar = () => {
  const ref = useRef(null);

  useGSAP(
    () => {
      const img = ref.current?.querySelector(".ar-img");
      const sweep = ref.current?.querySelector(".ar-sweep");
      if (img) {
        gsap.fromTo(
          img,
          { filter: "grayscale(1) brightness(0.5)" },
          {
            filter: "grayscale(0) brightness(1)",
            ease: "none",
            scrollTrigger: { trigger: ref.current, start: "top 85%", end: "top 35%", scrub: 0.6 },
          }
        );
      }
      if (sweep && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.to(sweep, { rotate: 360, duration: 22, ease: "none", repeat: -1 });
      }
    },
    { scope: ref }
  );

  if (!project) return null;

  return (
    <section
      ref={ref}
      id="work"
      data-testid="scene-alpha-radar"
      className="relative min-h-[100svh] flex items-end border-t border-[var(--rule)] overflow-hidden"
    >
      <Link
        to={`/work/${project.slug}`}
        aria-label={`View case study — ${project.title}`}
        className="ar-img absolute inset-6 md:inset-10 block overflow-hidden rounded-[var(--r-lg)]"
        data-testid="ar-image-link"
      >
        <picture className="contents">
          <source type="image/webp" srcSet={webpSrcSet(project.image, COVER_WIDTHS)} sizes="100vw" />
          <img
            src={project.image}
            alt={`${project.title} — ${project.overview}`}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </picture>
        <div
          aria-hidden
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, transparent 40%, rgba(5,7,15,0.85) 100%)" }}
        />
        {/* radar sweep motif — a soft rotating conic gradient wedge */}
        <div
          className="ar-sweep absolute pointer-events-none"
          aria-hidden
          style={{
            top: "8%",
            right: "6%",
            width: "38%",
            aspectRatio: "1 / 1",
            borderRadius: "50%",
            background:
              "conic-gradient(from 0deg, rgba(95,217,221,0.28) 0deg, transparent 55deg, transparent 360deg)",
            mixBlendMode: "screen",
          }}
        />
        <div
          aria-hidden
          className="absolute pointer-events-none rounded-full border border-[rgba(95,217,221,0.25)]"
          style={{ top: "8%", right: "6%", width: "38%", aspectRatio: "1 / 1" }}
        />
        <div className="grain" />
      </Link>

      <div className="relative z-10 max-w-[1240px] mx-auto px-6 md:px-10 w-full pb-14 md:pb-20">
        <div className="max-w-[54ch] reveal">
          <div className="section-mark mb-4">03 / {project.kicker}</div>
          <h2 className="font-tight text-display-lg text-[var(--ink)] mb-4">{project.title}</h2>
          <p className="font-serif text-[18px] sm:text-[21px] leading-[1.5] text-[var(--ink-soft)] max-w-[42ch] mb-7">
            {project.pull}
          </p>
          <Link
            to={`/work/${project.slug}`}
            className="inline-flex items-center gap-3 text-[13.5px] font-display text-[var(--ink)] hover:gap-4 hover:text-[var(--cyan)] transition-all duration-400"
            data-testid="ar-view-case-study"
          >
            <span className="link">View case study</span>
            <ArrowUpRight size={15} strokeWidth={1.8} className="text-[var(--cyan)]" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SceneAlphaRadar;
