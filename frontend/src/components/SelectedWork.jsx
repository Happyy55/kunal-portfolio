import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { projects } from "../data/projects";
import { webpSrcSet, COVER_WIDTHS } from "../lib/responsiveImage";
import { Chip } from "./ui/Chip";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const ACCENTS = ["cyan", "violet", "gold", "cyan"];

export const SelectedWork = () => {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      const plates = gsap.utils.toArray(".plate-img-wrap");
      plates.forEach((el) => {
        gsap.fromTo(
          el,
          { filter: "grayscale(1) brightness(0.55) blur(2px)", rotateX: 6, rotateY: -4, transformPerspective: 900 },
          {
            filter: "grayscale(0) brightness(1) blur(0px)",
            rotateX: 0,
            rotateY: 0,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top 88%", end: "top 45%", scrub: 0.6 },
          }
        );
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="work"
      data-testid="work-section"
      className="max-w-[1640px] mx-auto px-6 md:px-10 xl:px-14 py-16 md:py-28"
    >
      <div className="grid grid-cols-12 gap-6 md:gap-8 items-end mb-12 md:mb-20 reveal">
        <div className="col-span-12 md:col-span-9">
          <div className="section-mark mb-5">Work</div>
          <h2 className="font-tight text-[36px] sm:text-[48px] lg:text-[60px] leading-[1.05] text-[var(--ink)] max-w-[20ch]">
            Projects built{" "}
            <em className="font-italic text-[var(--cyan)]">end to end</em>.
          </h2>
        </div>
        <div className="col-span-12 md:col-span-3 md:text-right">
          <p className="text-[14px] leading-relaxed text-[var(--ink-muted)] max-w-[32ch] md:ml-auto">
            Design and development handled together, from first idea to launch.
          </p>
        </div>
      </div>

      <ul className="space-y-px">
        {projects.map((p, idx) => {
          const accent = ACCENTS[idx % ACCENTS.length];
          const accentVar = accent === "gold" ? "var(--gold)" : accent === "violet" ? "var(--violet)" : "var(--cyan)";
          return (
          <li
            key={p.slug}
            className={`reveal border-t border-[var(--rule-strong)] ${
              idx === projects.length - 1 ? "border-b" : ""
            }`}
            data-testid={`project-row-wrapper-${p.slug}`}
          >
            <div className="grid grid-cols-12 gap-6 md:gap-8 xl:gap-10 items-stretch py-8 md:py-14 group">
              {/* index number */}
              <div className="hidden md:flex col-span-1 flex-col items-center self-stretch pt-2">
                <span className="font-mono text-[15px] tracking-[.05em]" style={{ color: accentVar }}>{p.number}</span>
                <span className="mt-3 flex-1 w-px" style={{ background: `linear-gradient(${accentVar}, transparent)` }} />
              </div>

              {/* image — locked to its own 16:9 crop and centered in the
                  column, so it's never stretched, cropped, or letterboxed
                  unevenly regardless of how tall the content column runs */}
              <Link
                to={`/work/${p.slug}`}
                data-testid={`project-row-${p.slug}`}
                className="col-span-12 md:col-span-4 plate-wrap block overflow-hidden rounded-2xl h-full"
              >
                <div className="plate h-full flex items-center" data-testid={`project-plate-${p.slug}`}>
                  <div
                    className="plate-img-wrap aspect-video w-full"
                    style={{ background: "var(--bg-elev)" }}
                  >
                    <picture className="contents">
                      <source
                        type="image/webp"
                        srcSet={webpSrcSet(p.image, COVER_WIDTHS)}
                        sizes="(max-width: 767px) 100vw, 500px"
                      />
                      <img
                        src={p.image}
                        alt={`${p.title}: ${p.overview}`}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                        loading="lazy"
                        data-testid={`project-image-${p.slug}`}
                      />
                    </picture>
                    <div className="grain" />
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(5,7,15,0.2) 0%, transparent 30%, transparent 70%, rgba(5,7,15,0.6) 100%)",
                      }}
                    />
                  </div>
                </div>
              </Link>

              {/* content */}
              <div className="col-span-12 md:col-span-7">
                <div className="eyebrow mb-3 text-[var(--ink-muted)]">{p.kicker}</div>
                <Link to={`/work/${p.slug}`} className="block">
                  <h3 className="font-tight text-[28px] sm:text-[38px] lg:text-[46px] leading-[1.06] text-[var(--ink)] group-hover:text-[var(--cyan)] transition-colors duration-500">
                    {p.title}
                  </h3>
                </Link>
                <p className="mt-4 md:mt-5 max-w-[56ch] text-[14.5px] md:text-[15px] leading-[1.8] text-[var(--ink-soft)]">
                  {p.summary}
                </p>

                {p.pull && (
                  <blockquote
                    className="mt-5 pl-4 max-w-[52ch] text-[15px] md:text-[16.5px] italic leading-[1.6] text-[var(--ink)]"
                    style={{ borderLeft: `2px solid ${accentVar}` }}
                  >
                    "{p.pull}"
                  </blockquote>
                )}

                {p.highlights?.length > 0 && (
                  <div className="mt-5 flex flex-wrap gap-2.5">
                    {p.highlights.map((h) => (
                      <Chip key={h.label} accent={accent}>
                        <span className="text-[var(--ink-muted)]">{h.label}</span>{" "}
                        <span className="text-[var(--ink)]">{h.value}</span>
                      </Chip>
                    ))}
                  </div>
                )}

                {/* case-study meta — a technical meta-list rather than another
                    round of glass cards; CapabilityCard already owns that
                    language up in The Craft, and repeating it 16x here (4
                    projects × 4 fields) read as a re-skinned copy of that
                    section instead of project-specific data. */}
                <dl className="mt-7 md:mt-8 pt-6 border-t border-[var(--rule)] grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
                  {[
                    { label: "Goal", value: p.businessGoal, accent: "var(--cyan)" },
                    { label: "Outcome", value: p.outcome, accent: "var(--gold)" },
                    { label: "Role & Services", value: `${p.role}: ${p.services.join(", ")}`, accent: "var(--cyan)" },
                    { label: "Stack", value: p.stack.join(" · "), accent: "var(--gold)" },
                  ].map((item) => (
                    <div key={item.label}>
                      <dt
                        className="font-mono text-[10.5px] tracking-[0.2em] uppercase mb-1.5"
                        style={{ color: item.accent }}
                      >
                        <span className="sr-only">{p.title}: </span>
                        {item.label}
                      </dt>
                      <dd className="text-[13.5px] leading-[1.65] text-[var(--ink-soft)]">{item.value}</dd>
                    </div>
                  ))}
                </dl>

                {/* actions */}
                <div className="mt-7 md:mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                  <Link
                    to={`/work/${p.slug}`}
                    className="relative inline-flex items-center gap-3 text-[13.5px] font-display text-[var(--ink)] hover:gap-4 hover:text-[var(--cyan)] transition-all duration-400 after:content-[''] after:absolute after:inset-x-0 after:-top-3 after:-bottom-3"
                    data-testid={`project-view-${p.slug}`}
                  >
                    <span className="link">View project</span>
                    <svg width="22" height="10" viewBox="0 0 22 10" fill="none" className="text-[var(--cyan)]">
                      <path d="M0 5h20m0 0L16 1m4 4l-4 4" stroke="currentColor" strokeLinecap="round" />
                    </svg>
                  </Link>
                  {p.links?.live && (
                    <a
                      href={p.links.live}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-[13.5px] font-display text-[var(--ink-soft)] hover:text-[var(--cyan)] transition-colors"
                    >
                      Live website <ArrowUpRight size={13} strokeWidth={1.8} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </li>
          );
        })}
      </ul>
    </section>
  );
};

export default SelectedWork;
