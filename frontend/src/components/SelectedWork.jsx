import { Link } from "react-router-dom";
import { projects } from "../data/projects";
import { webpSrcSet, COVER_WIDTHS } from "../lib/responsiveImage";
import { Chip } from "./ui/Chip";

export const SelectedWork = () => {
  return (
    <section
      id="work"
      data-testid="work-section"
      className="max-w-[1400px] mx-auto px-6 md:px-10 py-20 md:py-32"
    >
      <div className="mb-12 md:mb-20 reveal">
        <div className="section-mark mb-6">Work</div>
        <h2 className="font-tight text-[36px] sm:text-[48px] lg:text-[58px] leading-[1.04] text-[var(--ink)] max-w-[20ch]">
          Projects built <span className="text-[var(--cyan)]">end to end</span>.
        </h2>
      </div>

      <ul>
        {projects.map((p) => (
          <li
            key={p.slug}
            className="reveal border-t border-[var(--rule-strong)]"
            data-testid={`project-row-wrapper-${p.slug}`}
          >
            <div className="grid grid-cols-12 gap-6 md:gap-8 xl:gap-10 items-stretch py-8 md:py-14 group">
              {/* index number */}
              <div className="hidden md:flex col-span-1 flex-col items-center self-stretch pt-2">
                <span className="font-mono text-[15px] tracking-[.05em] text-[var(--cyan)]">{p.number}</span>
                <span className="mt-3 flex-1 w-px" style={{ background: "linear-gradient(var(--cyan), transparent)" }} />
              </div>

              <Link
                to={`/work/${p.slug}`}
                data-testid={`project-row-${p.slug}`}
                aria-label={`${p.title} case study`}
                className="col-span-12 md:col-span-5 lg:col-span-4 plate-wrap block self-start"
              >
                <div className="plate aspect-[4/3]" data-testid={`project-plate-${p.slug}`}>
                  <picture>
                    <source
                      type="image/webp"
                      srcSet={webpSrcSet(p.image, COVER_WIDTHS)}
                      sizes="(max-width: 767px) 100vw, 500px"
                    />
                    <img
                      src={p.image}
                      alt={`${p.title}: ${p.overview}`}
                      width="1600"
                      height="1200"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover"
                      data-testid={`project-image-${p.slug}`}
                    />
                  </picture>
                  <div className="grain" />
                </div>
              </Link>

              <div className="col-span-12 md:col-span-6 lg:col-span-7">
                <div className="eyebrow mb-3 text-[var(--ink-muted)]">{p.kicker}</div>
                <Link to={`/work/${p.slug}`} className="block">
                  <h3 className="font-tight text-[28px] sm:text-[38px] lg:text-[46px] leading-[1.06] text-[var(--ink)] group-hover:text-[var(--cyan)] transition-colors duration-500">
                    {p.title}
                  </h3>
                </Link>

                {p.pull && (
                  <p className="mt-4 md:mt-5 max-w-[52ch] text-[16px] md:text-[17px] leading-[1.6] text-[var(--ink-soft)]">
                    {p.pull}
                  </p>
                )}

                {p.highlights?.length > 0 && (
                  <div className="mt-5 flex flex-wrap gap-2.5">
                    {p.highlights.map((h) => (
                      <Chip key={h.label}>
                        <span className="text-[var(--ink-muted)]">{h.label}</span>{" "}
                        <span className="text-[var(--ink)]">{h.value}</span>
                      </Chip>
                    ))}
                  </div>
                )}

                <div className="mt-5 md:mt-6">
                  <Link
                    to={`/work/${p.slug}`}
                    className="inline-flex items-center gap-3 py-3 text-[14px] font-display text-[var(--ink)] hover:gap-4 hover:text-[var(--cyan)] transition-all duration-300"
                    data-testid={`project-view-${p.slug}`}
                  >
                    <span className="link">View case study</span>
                    <svg width="22" height="10" viewBox="0 0 22 10" fill="none" className="text-[var(--cyan)]">
                      <path d="M0 5h20m0 0L16 1m4 4l-4 4" stroke="currentColor" strokeLinecap="round" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default SelectedWork;
