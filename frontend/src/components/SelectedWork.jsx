import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { projects } from "../data/projects";

export const SelectedWork = () => {
  return (
    <section
      id="work"
      data-testid="work-section"
      className="max-w-[1240px] mx-auto px-6 md:px-10 py-16 md:py-28"
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
        {projects.map((p, idx) => (
          <li
            key={p.slug}
            className={`reveal border-t border-[var(--rule-strong)] ${
              idx === projects.length - 1 ? "border-b" : ""
            }`}
            data-testid={`project-row-wrapper-${p.slug}`}
          >
            <div className="grid grid-cols-12 gap-6 md:gap-10 items-start py-8 md:py-14 group">
              {/* image */}
              <Link
                to={`/work/${p.slug}`}
                data-testid={`project-row-${p.slug}`}
                className="col-span-12 md:col-span-5 plate-wrap block"
              >
                <div className="plate" data-testid={`project-plate-${p.slug}`}>
                  <div
                    className="plate-img-wrap"
                    style={{ aspectRatio: "4 / 3", background: "var(--bg-elev)" }}
                  >
                    <img
                      src={p.image}
                      alt={`${p.title} — ${p.overview}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      data-testid={`project-image-${p.slug}`}
                    />
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

                {/* case-study meta */}
                <dl className="mt-6 md:mt-7 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 max-w-[60ch]">
                  <div>
                    <dt className="eyebrow text-[var(--ink-muted)] mb-1">Goal</dt>
                    <dd className="text-[13.5px] leading-[1.65] text-[var(--ink-soft)]">{p.businessGoal}</dd>
                  </div>
                  <div>
                    <dt className="eyebrow text-[var(--ink-muted)] mb-1">Outcome</dt>
                    <dd className="text-[13.5px] leading-[1.65] text-[var(--ink-soft)]">{p.outcome}</dd>
                  </div>
                  <div>
                    <dt className="eyebrow text-[var(--ink-muted)] mb-1">Role · Services</dt>
                    <dd className="text-[13.5px] leading-[1.65] text-[var(--ink-soft)]">
                      {p.role} — {p.services.join(", ")}
                    </dd>
                  </div>
                  <div>
                    <dt className="eyebrow text-[var(--ink-muted)] mb-1">Stack</dt>
                    <dd className="text-[13.5px] leading-[1.65] text-[var(--ink-soft)]">{p.stack.join(" · ")}</dd>
                  </div>
                </dl>

                {/* actions */}
                <div className="mt-7 md:mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                  <Link
                    to={`/work/${p.slug}`}
                    className="inline-flex items-center gap-3 text-[13.5px] font-display text-[var(--ink)] hover:gap-4 hover:text-[var(--cyan)] transition-all duration-400"
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
        ))}
      </ul>
    </section>
  );
};

export default SelectedWork;
