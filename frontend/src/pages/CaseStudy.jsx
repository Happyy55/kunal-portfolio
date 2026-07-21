import { useEffect, useRef, useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Particles from "../components/Particles";
import { getProject, projects } from "../data/projects";
import { useReveal } from "../hooks/useReveal";

export default function CaseStudy() {
  const { slug } = useParams();
  const project = getProject(slug);
  const ref = useReveal();

  useEffect(() => {
    if (project) {
      document.title = `${project.title} — Case study · Kunal Jain, Creative Developer`;
      const meta = document.querySelector('meta[name="description"]');
      if (meta) meta.setAttribute("content", `${project.title}: ${project.summary}`);
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [project]);

  useEffect(() => {
    const bar = document.querySelector(".scroll-progress");
    if (!bar) return;
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const p = max > 0 ? h.scrollTop / max : 0;
      bar.style.transform = `scaleX(${p})`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [slug]);

  if (!project) return <Navigate to="/" replace />;

  const idx = projects.findIndex((p) => p.slug === slug);
  const next = projects[(idx + 1) % projects.length];

  return (
    <div ref={ref} data-testid={`case-study-${project.slug}`}>
      <div className="scroll-progress" aria-hidden />
      <Nav />
      <main className="relative">
        <Particles count={18} className="!fixed inset-0 z-[0] pointer-events-none" />

        {/* —— HEADER —— */}
        <CaseHeader project={project} />

        {/* —— HERO MOCKUP —— */}
        <CaseHeroPlate project={project} />

        {/* —— 01 INTRODUCTION —— editorial left */}
        <IntroSection
          code="01"
          eyebrow="Introduction"
          body={project.caseStudy.introduction}
        />

        {/* —— 02 CHALLENGE —— split sticky label */}
        <ChallengeSection
          code="02"
          eyebrow="The challenge"
          body={project.caseStudy.challenge}
        />

        {/* —— PULL QUOTE —— */}
        <PullQuote text={project.pull} />

        {/* —— 03 APPROACH —— text-only, full width —— */}
        <ApproachSection
          code="03"
          eyebrow="The approach"
          body={project.caseStudy.approach}
        />

        {/* —— GALLERY —— slideshow */}
        <GallerySection project={project} />

        {/* —— 04 BUILD PROCESS —— timeline */}
        <BuildSection
          code="04"
          eyebrow="Build process"
          body={project.caseStudy.build}
          stack={project.stack}
        />

        {/* —— 05 OUTCOME —— cinematic ending */}
        <OutcomeSection project={project} />

        {/* —— FOOTER NAV —— */}
        <NextCase next={next} />
      </main>
      <Footer />
    </div>
  );
}

/* ===================================================================== */

const CaseHeader = ({ project }) => (
  <header className="max-w-[1240px] mx-auto px-6 md:px-10 pt-28 md:pt-36 pb-10 md:pb-12 relative z-10">
    <Link
      to="/#work"
      data-testid="case-back-link"
      className="inline-flex items-center gap-2 eyebrow hover:text-[var(--cyan)] transition-colors"
    >
      <ArrowLeft size={14} strokeWidth={1.6} />
      Back to index
    </Link>

    <div className="mt-10 md:mt-12 grid grid-cols-12 gap-6 md:gap-8 reveal">
      <div className="col-span-12">
        <div className="eyebrow mb-4 md:mb-5">{project.kicker}</div>
        <h1 className="font-tight text-[36px] sm:text-[58px] lg:text-[76px] leading-[1.0] text-[var(--ink)]">
          {project.title}
        </h1>
        <p className="mt-7 md:mt-10 max-w-[62ch] text-[15px] md:text-[17px] leading-[1.8] md:leading-[1.85] text-[var(--ink-soft)]">
          {project.summary}
        </p>
        <dl className="mt-9 md:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-x-10 gap-y-5 border-t border-[var(--rule-strong)] pt-6 max-w-[900px]">
          <div>
            <dt className="eyebrow text-[var(--ink-muted)] mb-2">Role</dt>
            <dd className="text-[14px] leading-[1.7] text-[var(--ink-soft)]">{project.role}</dd>
          </div>
          <div>
            <dt className="eyebrow text-[var(--ink-muted)] mb-2">Services</dt>
            <dd className="text-[14px] leading-[1.7] text-[var(--ink-soft)]">{project.services.join(", ")}</dd>
          </div>
          <div>
            <dt className="eyebrow text-[var(--ink-muted)] mb-2">Stack</dt>
            <dd className="text-[14px] leading-[1.7] text-[var(--ink-soft)]">{project.stack.join(" · ")}</dd>
          </div>
        </dl>
      </div>
    </div>
  </header>
);

/* —— hero mockup with floating frame + parallax tilt —— */
const CaseHeroPlate = ({ project }) => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(hover: none)").matches) return;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - (r.left + r.width / 2)) / r.width;
      const py = (e.clientY - (r.top + r.height / 2)) / r.height;
      el.style.transform = `perspective(1500px) rotateX(${(-py * 2).toFixed(2)}deg) rotateY(${(px * 3).toFixed(2)}deg) translateZ(0)`;
    };
    const onLeave = () => { el.style.transform = "perspective(1500px) rotateX(0) rotateY(0)"; };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <section className="max-w-[1240px] mx-auto px-6 md:px-10 pb-16 md:pb-24 relative z-10">
      <div className="relative">
        <div
          aria-hidden
          className="absolute -inset-y-10 inset-x-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(60% 50% at 50% 50%, rgba(108,232,236,0.22) 0%, transparent 70%), radial-gradient(60% 50% at 70% 80%, rgba(168,121,255,0.22) 0%, transparent 70%)",
            filter: "blur(50px)",
          }}
        />
        <figure
          ref={ref}
          className="reveal transition-transform duration-300"
          style={{ transformStyle: "preserve-3d", willChange: "transform" }}
        >
          <div
            className="relative w-full overflow-hidden rounded-[14px] border border-[var(--rule-strong)] bg-[var(--bg-elev)]"
            style={{
              aspectRatio: "16 / 9",
              boxShadow:
                "0 80px 160px -50px rgba(0,0,0,0.85), 0 40px 100px -50px rgba(108,232,236,0.32)",
            }}
            data-testid="case-hero-image-wrap"
          >
            <img
              src={project.image}
              alt={`${project.title} — primary plate`}
              className="w-full h-full object-cover"
              data-testid="case-hero-image"
            />
            <div className="grain" />
            <span className="absolute top-3 left-3 w-3 h-3 border-t border-l border-[var(--cyan)] opacity-70" />
            <span className="absolute top-3 right-3 w-3 h-3 border-t border-r border-[var(--cyan)] opacity-70" />
            <span className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-[var(--cyan)] opacity-70" />
            <span className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-[var(--cyan)] opacity-70" />
          </div>
          <figcaption className="mt-3 eyebrow">
            <span>{project.kicker}</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
};

/* —— 01 INTRODUCTION —— editorial intro, oversize statement —— */
const IntroSection = ({ code, eyebrow, body }) => (
  <section
    data-testid={`case-section-${code}`}
    className="border-t border-[var(--rule)] relative z-10"
  >
    <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-16 md:py-32">
      <div className="grid grid-cols-12 gap-6 md:gap-8 reveal">
        <div className="col-span-12 md:col-span-3">
          <div className="section-mark">{code}</div>
          <div className="font-display text-[var(--ink)] mt-3">{eyebrow}</div>
          <div className="mt-6 h-px bg-gradient-to-r from-[var(--cyan)] via-[var(--violet)] to-transparent w-32 reveal" style={{ boxShadow: "0 0 14px var(--cyan-glow)" }} />
        </div>
        <div className="col-span-12 md:col-span-9">
          <p className="font-tight text-[26px] sm:text-[34px] lg:text-[42px] leading-[1.25] text-[var(--ink)] max-w-[24ch]">
            {firstSentence(body)}
          </p>
          <p className="mt-8 max-w-[62ch] text-[15.5px] leading-[1.9] text-[var(--ink-soft)]">
            {restOfBody(body)}
          </p>
        </div>
      </div>
    </div>
  </section>
);

/* —— 02 CHALLENGE —— sticky left label, glass panel right —— */
const ChallengeSection = ({ code, eyebrow, body }) => (
  <section
    data-testid={`case-section-${code}`}
    className="border-t border-[var(--rule)] relative z-10"
  >
    <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-16 md:py-32">
      <div className="grid grid-cols-12 gap-6 md:gap-8 items-start">
        <div className="col-span-12 md:col-span-4 md:sticky md:top-28 reveal">
          <div className="section-mark">{code}</div>
          <h3 className="font-tight text-[32px] sm:text-[44px] leading-[1.06] text-[var(--ink)] mt-4 max-w-[14ch]">
            {eyebrow}
          </h3>
          <p className="mt-5 text-[13.5px] leading-[1.7] text-[var(--ink-muted)] max-w-[34ch]">
            What was broken, and where the project actually started.
          </p>
        </div>
        <div className="col-span-12 md:col-span-8 reveal" style={{ transitionDelay: "120ms" }}>
          <div className="glass p-8 md:p-12 relative overflow-hidden">
            {/* corner brackets */}
            <span className="absolute top-3 left-3 w-3 h-3 border-t border-l border-[var(--cyan)] opacity-60" />
            <span className="absolute top-3 right-3 w-3 h-3 border-t border-r border-[var(--cyan)] opacity-60" />
            <span className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-[var(--cyan)] opacity-60" />
            <span className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-[var(--cyan)] opacity-60" />

            <p className="font-tight text-[22px] sm:text-[28px] leading-[1.45] text-[var(--ink)]">
              {body}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

/* —— Pull quote moment —— */
const PullQuote = ({ text }) => (
  <section className="border-t border-[var(--rule)] relative z-10">
    <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-16 md:py-32 text-center reveal">
      <div className="font-italic text-[var(--cyan)] text-[36px] sm:text-[64px] md:text-[80px] leading-[1.06] tracking-[-0.02em] mx-auto max-w-[22ch]"
        style={{ textShadow: "0 0 32px var(--cyan-glow)" }}>
          “{text}”
      </div>
    </div>
  </section>
);

/* —— 03 APPROACH —— editorial, text-only —— */
const ApproachSection = ({ code, eyebrow, body }) => (
  <section
    data-testid={`case-section-${code}`}
    className="border-t border-[var(--rule)] relative z-10"
  >
    <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-16 md:py-32">
      <div className="grid grid-cols-12 gap-6 md:gap-8 reveal">
        <div className="col-span-12 md:col-span-3">
          <div className="section-mark">{code}</div>
          <div className="font-display text-[var(--ink)] mt-3">{eyebrow}</div>
          <div className="mt-6 h-px bg-gradient-to-r from-[var(--cyan)] via-[var(--violet)] to-transparent w-32" style={{ boxShadow: "0 0 14px var(--cyan-glow)" }} />
        </div>
        <div className="col-span-12 md:col-span-9">
          <p className="font-tight text-[26px] sm:text-[34px] lg:text-[40px] leading-[1.2] text-[var(--ink)] max-w-[24ch]">
            {firstSentence(body)}
          </p>
          <p className="mt-8 max-w-[62ch] text-[15.5px] leading-[1.9] text-[var(--ink-soft)]">
            {restOfBody(body)}
          </p>
        </div>
      </div>
    </div>
  </section>
);

/* —— Gallery —— slideshow / carousel —— */
const GallerySection = ({ project }) => {
  const gallery = project.gallery?.length ? project.gallery : [project.image];
  const [i, setI] = useState(0);
  const total = gallery.length;

  const go = (dir) => setI((p) => (p + dir + total) % total);

  // keyboard navigation — only while slideshow is visible in viewport
  const stageRef = useRef(null);
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    let visible = false;
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { threshold: 0.25 });
    io.observe(stage);
    const onKey = (e) => {
      if (!visible) return;
      if (e.key === "ArrowLeft") setI((p) => (p - 1 + total) % total);
      if (e.key === "ArrowRight") setI((p) => (p + 1) % total);
    };
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("keydown", onKey); io.disconnect(); };
  }, [total]);

  return (
    <section
      data-testid="case-section-gallery"
      className="border-t border-[var(--rule)] relative z-10"
    >
      <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-16 md:py-32">
        <div className="flex items-end justify-between mb-12 reveal">
          <div>
            <div className="section-mark mb-4">Gallery</div>
            <h3 className="font-tight text-[26px] sm:text-[36px] leading-[1.05] text-[var(--ink)] max-w-[22ch]">
              From the project.
            </h3>
            {project.imageLabels?.[i] && (
              <div className="flex items-center gap-2 mt-3">
                <span style={{ display:"inline-block", width:"3px", height:"12px", borderRadius:"99px", background:"var(--cyan)", flexShrink:0 }} />
                <span className="eyebrow" style={{ color:"var(--cyan)", letterSpacing:"0.12em" }}>
                  {project.imageLabels[i]}
                </span>
              </div>
            )}
          </div>
          <div />
        </div>

        <div className="reveal relative" data-testid="case-gallery-slideshow" ref={stageRef}>
          {/* ambient glow */}
          <div
            aria-hidden
            className="absolute -inset-6 pointer-events-none opacity-80"
            style={{
              background:
                "radial-gradient(45% 40% at 30% 50%, rgba(108,232,236,0.18) 0%, transparent 70%), radial-gradient(45% 40% at 70% 50%, rgba(168,121,255,0.16) 0%, transparent 70%)",
              filter: "blur(40px)",
            }}
          />

          {/* stage */}
          <div
            className="relative overflow-hidden rounded-[12px] border border-[var(--rule-strong)] bg-[var(--bg-elev)] mx-auto"
            style={{
              aspectRatio: project.slug === "ledger" ? "9 / 16" : "16 / 9",
              maxWidth: project.slug === "ledger" ? "380px" : "100%",
              boxShadow: "0 60px 120px -50px rgba(0,0,0,0.85), 0 30px 80px -50px rgba(108,232,236,0.32)",
            }}
          >
            {gallery.map((src, idx) => (
              <img
                key={src + idx}
                src={src}
                alt={`${project.title} plate ${idx + 1}`}
                loading={idx === 0 ? "eager" : "lazy"}
                data-testid={`case-gallery-image-${idx}`}
                className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-700 ease-out ${idx === i ? "opacity-100" : "opacity-0"}`}
              />
            ))}
            <div className="grain pointer-events-none" />
            <span className="absolute top-3 left-3 w-3 h-3 border-t border-l border-[var(--cyan)] opacity-70" />
            <span className="absolute top-3 right-3 w-3 h-3 border-t border-r border-[var(--cyan)] opacity-70" />
            <span className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-[var(--cyan)] opacity-70" />
            <span className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-[var(--cyan)] opacity-70" />

            {total > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => go(-1)}
                  data-testid="case-gallery-prev"
                  aria-label="Previous frame"
                  className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center border border-[rgba(108,232,236,0.4)] bg-[rgba(0,0,0,0.45)] backdrop-blur-md text-[var(--ink)] hover:text-[var(--cyan)] hover:border-[var(--cyan)] transition-colors"
                  style={{ boxShadow: "0 0 24px rgba(108,232,236,0.18)" }}
                >
                  <ChevronLeft size={20} strokeWidth={1.6} />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  data-testid="case-gallery-next"
                  aria-label="Next frame"
                  className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center border border-[rgba(108,232,236,0.4)] bg-[rgba(0,0,0,0.45)] backdrop-blur-md text-[var(--ink)] hover:text-[var(--cyan)] hover:border-[var(--cyan)] transition-colors"
                  style={{ boxShadow: "0 0 24px rgba(108,232,236,0.18)" }}
                >
                  <ChevronRight size={20} strokeWidth={1.6} />
                </button>
              </>
            )}
          </div>

          {/* dots */}
          {total > 1 && (
            <div className="mt-6 flex items-center justify-center gap-2.5">
              {gallery.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setI(idx)}
                  data-testid={`case-gallery-dot-${idx}`}
                  aria-label={`Go to frame ${idx + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-500 ${idx === i ? "w-8 bg-[var(--cyan)]" : "w-1.5 bg-[var(--rule-strong)] hover:bg-[var(--ink-muted)]"}`}
                  style={idx === i ? { boxShadow: "0 0 12px var(--cyan-glow)" } : undefined}
                />
              ))}
            </div>
          )}

          <div className="mt-5 eyebrow flex items-center justify-between">
            <span>{project.imageLabels?.[i] ?? project.title}</span>
            <span className="text-[var(--ink-muted)]">Use ← → keys</span>
          </div>
        </div>
      </div>
    </section>
  );
};

/* —— 04 BUILD —— timeline-inspired list —— */
const BuildSection = ({ code, eyebrow, body, stack }) => {
  // Split body into 3 phases by sentence
  const sentences = body.split(/(?<=\.) +/).filter(Boolean);
  const phases = [
    { label: "Foundation", text: sentences.slice(0, 1).join(" ") },
    { label: "Interface", text: sentences.slice(1, 2).join(" ") },
    { label: "Performance", text: sentences.slice(2).join(" ") || sentences[sentences.length - 1] },
  ];

  return (
    <section
      data-testid={`case-section-${code}`}
      className="border-t border-[var(--rule)] relative z-10"
    >
      <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-16 md:py-32">
        <div className="grid grid-cols-12 gap-6 md:gap-8 mb-14 reveal">
          <div className="col-span-12 md:col-span-5">
            <div className="section-mark mb-4">{code}</div>
            <h3 className="font-tight text-[32px] sm:text-[48px] lg:text-[60px] leading-[1.04] text-[var(--ink)] max-w-[16ch]">
              {eyebrow}
            </h3>
          </div>
          <div className="col-span-12 md:col-span-6 md:col-start-7 flex flex-wrap gap-2.5 self-end">
            {stack.map((s) => (
              <span key={s} className="cap"><span className="cap-dot" />{s}</span>
            ))}
          </div>
        </div>

        {/* timeline */}
        <div className="relative">
          <div className="absolute left-[15px] sm:left-[19px] top-0 bottom-0 w-px bg-gradient-to-b from-[var(--cyan)] via-[var(--violet)] to-transparent opacity-60" style={{ boxShadow: "0 0 12px var(--cyan-glow)" }} />
          <ol className="space-y-12">
            {phases.map((p, i) => (
              <li key={i} className="grid grid-cols-12 gap-6 reveal" data-testid={`build-phase-${i}`}>
                <div className="col-span-12 md:col-span-3 flex items-baseline gap-4 pl-1 sm:pl-2">
                  <span className="relative inline-flex items-center justify-center mt-[6px]">
                    <span className="w-3 h-3 rounded-full bg-[var(--cyan)]" style={{ boxShadow: "0 0 14px var(--cyan-glow)" }} />
                  </span>
                  <div>
                    <div className="font-mono text-[10px] tracking-[0.24em] text-[var(--cyan)] uppercase">
                      Phase 0{i + 1}
                    </div>
                    <div className="font-display text-[var(--ink)] mt-1 text-[15px]">{p.label}</div>
                  </div>
                </div>
                <div className="col-span-12 md:col-span-9 md:col-start-4">
                  <p className="text-[15.5px] leading-[1.9] text-[var(--ink)] max-w-[60ch]">
                    {p.text}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};

/* —— 05 OUTCOME —— cinematic ending —— */
const OutcomeSection = ({ project }) => (
  <section
    data-testid="case-section-05"
    className="border-t border-[var(--rule)] relative overflow-hidden z-10"
  >
    <div
      aria-hidden
      className="absolute pointer-events-none"
      style={{
        top: "-10%", left: "50%", transform: "translateX(-50%)",
        width: "80%", height: "80%",
        background:
          "radial-gradient(closest-side, rgba(108,232,236,0.18) 0%, transparent 70%), radial-gradient(closest-side, rgba(168,121,255,0.16) 0%, transparent 70%)",
        filter: "blur(60px)",
      }}
    />
    <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-20 md:py-44 relative">
      <div className="reveal">
        <div className="section-mark mb-6 md:mb-7">05 · Final outcome</div>
        <h3 className="font-tight text-[36px] sm:text-[68px] lg:text-[96px] leading-[1.02] text-[var(--ink)] max-w-[18ch]">
          {firstSentence(project.caseStudy.outcome)}
        </h3>
        <p className="mt-8 md:mt-10 max-w-[62ch] text-[15px] md:text-[16.5px] leading-[1.85] md:leading-[1.9] text-[var(--ink-soft)]">
          {restOfBody(project.caseStudy.outcome)}
        </p>
      </div>

      {/* highlight metrics */}
      {project.highlights && (
        <div className="mt-12 md:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-px bg-[var(--rule-strong)] border border-[var(--rule-strong)] rounded-[12px] overflow-hidden reveal">
          {project.highlights.map((h, i) => (
            <div key={h.label} className="bg-[var(--bg)] p-6 md:p-9" data-testid={`case-metric-${i}`}>
              <div className="eyebrow text-[var(--ink-muted)]">{h.label}</div>
              <div className="mt-3 font-tight text-[30px] sm:text-[44px] text-[var(--ink)] lining-nums"
                style={{ textShadow: "0 0 18px rgba(108,232,236,0.18)" }}>
                {h.value}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  </section>
);

const NextCase = ({ next }) => (
  <nav
    className="max-w-[1240px] mx-auto px-6 md:px-10 py-16 border-t border-[var(--rule)] flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 relative z-10"
    data-testid="case-next-nav"
  >
    <Link to="/#work" className="eyebrow hover:text-[var(--cyan)] transition-colors">
      ← Back to index
    </Link>
    <Link
      to={`/work/${next.slug}`}
      className="text-right group"
      data-testid="case-next-link"
    >
      <div className="eyebrow">Next case</div>
      <div className="mt-2 font-tight text-[28px] sm:text-[44px] leading-[1.05] text-[var(--ink)] group-hover:text-[var(--cyan)] transition-colors duration-500 inline-flex items-center gap-3">
        {next.title}
        <svg width="32" height="14" viewBox="0 0 22 10" fill="none" className="text-[var(--cyan)] group-hover:translate-x-1 transition-transform duration-500">
          <path d="M0 5h20m0 0L16 1m4 4l-4 4" stroke="currentColor" strokeLinecap="round" />
        </svg>
      </div>
    </Link>
  </nav>
);

/* helpers — split a paragraph into a strong first sentence + the rest */
function firstSentence(body) {
  const m = body.match(/^([^.]+\.)/);
  return m ? m[1] : body;
}
function restOfBody(body) {
  const m = body.match(/^[^.]+\.\s*(.*)$/);
  return m ? m[1] : "";
}
