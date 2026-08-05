import { useEffect, useRef, lazy, Suspense } from "react";
import { ArrowDownRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMagnetic } from "../hooks/useMagnetic";
import CompileMark from "./CompileMark";
import Particles from "./Particles";

const Scene3D = lazy(() => import("./Scene3D"));

gsap.registerPlugin(ScrollTrigger);

export const Hero = () => {
  const headlineRef = useRef(null);
  const sectionRef = useRef(null);
  const compileProgress = useRef(0);
  useMagnetic("[data-magnetic]", 0.28);

  useEffect(() => {
    const root = headlineRef.current;
    if (!root) return;
    const lines = root.querySelectorAll(".mask-line");
    lines.forEach((l, i) => {
      setTimeout(() => l.classList.add("is-visible"), 120 + i * 130);
    });
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;
    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: "bottom top",
      onUpdate: (self) => {
        compileProgress.current = self.progress;
      },
    });
    return () => st.kill();
  }, []);

  return (
    <section
      id="top"
      ref={sectionRef}
      data-testid="hero-section"
      className="relative min-h-[100svh] flex flex-col"
    >
      <Particles count={20} className="z-[1]" />

      <div className="flex-1 flex items-center relative z-[2]">
        <div className="max-w-[1240px] mx-auto px-6 md:px-10 w-full pt-20 md:pt-24 pb-10 md:pb-14">
          <div className="grid grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="col-span-12 lg:col-span-7 min-w-0" ref={headlineRef}>
              <h1
                data-testid="hero-headline"
                className="font-tight text-[32px] sm:text-[50px] lg:text-[64px] xl:text-[72px] leading-[1.05] text-[var(--ink)]"
              >
                <span className="mask-line"><span>Designing brands.</span></span>
                <span className="mask-line"><span>Building digital experiences.</span></span>
                <span className="mask-line">
                  <span>Creating work people{" "}
                    <em className="font-italic text-[var(--cyan)]">remember</em>.
                  </span>
                </span>
              </h1>

              <div className="mt-8 md:mt-10 grid grid-cols-12 gap-x-6 gap-y-7 reveal" style={{ transitionDelay: "450ms" }}>
                <p className="col-span-12 sm:col-span-8 lg:col-span-7 text-[15px] leading-[1.85] text-[var(--ink-soft)] max-w-[52ch]">
                  I'm <span className="text-[var(--ink)]">Kunal Jain</span>, a
                  creative developer from Ahmedabad. I design brand
                  identities and build the websites around them — for
                  founders and small businesses who care how their work
                  looks and feels.
                </p>

                <div className="col-span-12 sm:col-span-4 lg:col-span-5 flex flex-wrap items-end gap-3 sm:justify-end">
                  <a
                    href="#contact"
                    onClick={(e) => { const el = document.getElementById("contact"); if (el) { e.preventDefault(); el.scrollIntoView({ behavior: "smooth" }); } }}
                    data-testid="hero-cta-contact"
                    className="magnetic"
                    data-magnetic
                  >
                    <span className="btn-primary" data-magnetic-target>
                      <span>Start a project</span>
                      <span className="arrow-dot" />
                    </span>
                  </a>
                  <a
                    href="#work"
                    onClick={(e) => { const el = document.getElementById("work"); if (el) { e.preventDefault(); el.scrollIntoView({ behavior: "smooth" }); } }}
                    data-testid="hero-cta"
                    className="btn-ghost magnetic"
                    data-magnetic
                  >
                    <span data-magnetic-target>See the work</span>
                    <ArrowDownRight size={14} strokeWidth={1.7} />
                  </a>
                </div>
              </div>
            </div>

            <div className="col-span-12 lg:col-span-5 flex lg:justify-end min-w-0 reveal lg:-mt-4" style={{ transitionDelay: "350ms" }}>
              <div className="relative w-full max-w-[340px] sm:max-w-[420px] lg:max-w-[480px] mx-auto lg:mx-0" style={{ aspectRatio: "1 / 1" }}>
                <Suspense fallback={null}>
                  <Scene3D progressRef={compileProgress} className="absolute inset-0 z-0" />
                </Suspense>
                <div className="absolute inset-0 z-10 flex items-center justify-center">
                  <CompileMark heroRef={sectionRef} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-y border-[var(--rule)] overflow-hidden py-5 relative z-[2]">
        <div className="marquee items-center text-[var(--ink)]">
          {Array.from({ length: 2 }).map((_, k) => (
            <div key={k} className="flex items-center gap-16 pr-16 font-display text-[19px] tracking-[-0.01em]" style={{ textShadow: "0 0 24px rgba(108,232,236,0.25)" }}>
              <span>Responsive across devices</span>
              <span className="text-[var(--cyan)] font-serif italic">—</span>
              <span>Fast-loading interfaces</span>
              <span className="text-[var(--violet)] font-serif italic">—</span>
              <span>Designed for clarity</span>
              <span className="text-[var(--cyan)] font-serif italic">—</span>
              <span>Built for modern businesses</span>
              <span className="text-[var(--violet)] font-serif italic">—</span>
              <span>Available for selected projects</span>
              <span className="text-[var(--cyan)] font-serif italic">—</span>
              <span>Focused on usability and performance</span>
              <span className="text-[var(--cyan)] font-serif italic">—</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
