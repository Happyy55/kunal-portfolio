import { useEffect, useRef } from "react";
import { ArrowDownRight } from "lucide-react";
import { useMagnetic } from "../hooks/useMagnetic";

export const Hero = () => {
  const headlineRef = useRef(null);
  const sectionRef = useRef(null);
  useMagnetic("[data-magnetic]", 0.28);

  useEffect(() => {
    const root = headlineRef.current;
    if (!root) return;
    const lines = root.querySelectorAll(".mask-line");
    lines.forEach((l, i) => {
      setTimeout(() => l.classList.add("is-visible"), 120 + i * 130);
    });
  }, []);

  return (
    <section
      id="top"
      ref={sectionRef}
      data-testid="hero-section"
      className="relative min-h-[100svh] flex flex-col"
    >
      <div className="flex-1 flex items-center relative z-[2]">
        <div className="max-w-[1240px] mx-auto px-6 md:px-10 w-full pt-20 md:pt-24 pb-10 md:pb-14">
          <div className="max-w-[820px]" ref={headlineRef}>
            <h1
              data-testid="hero-headline"
              className="font-tight text-[32px] sm:text-[50px] lg:text-[64px] xl:text-[72px] leading-[1.05] text-[var(--ink)]"
            >
              <span className="mask-line"><span>Most ideas lose something</span></span>
              <span className="mask-line"><span>on the way to becoming</span></span>
              <span className="mask-line">
                <span>a <em className="font-italic text-[var(--cyan)]">website</em>.</span>
              </span>
            </h1>

            <div
              className="mt-8 md:mt-10 grid grid-cols-12 gap-x-6 gap-y-7 reveal is-visible"
              style={{ transitionDelay: "450ms" }}
            >
              <p className="col-span-12 sm:col-span-8 lg:col-span-7 text-[15px] leading-[1.85] text-[var(--ink-soft)] max-w-[52ch]">
                I'm <span className="text-[var(--ink)]">Kunal Jain</span>. I
                design and build every site myself, from Ahmedabad — so
                nothing gets lost between the idea and the thing you
                actually ship.
              </p>

              <div className="col-span-12 sm:col-span-4 lg:col-span-5 flex flex-wrap items-end gap-3 sm:justify-start">
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
        </div>
      </div>

      <div className="border-y border-[var(--rule)] overflow-hidden py-5 relative z-[2]">
        <div className="marquee items-center text-[var(--ink)]">
          {Array.from({ length: 2 }).map((_, k) => (
            <div key={k} className="flex items-center gap-16 pr-16 font-display text-[19px] tracking-[-0.01em]" style={{ textShadow: "0 0 24px rgba(108,232,236,0.25)" }}>
              <span>No templates</span>
              <span className="text-[var(--cyan)] font-serif italic">—</span>
              <span>No stock components</span>
              <span className="text-[var(--gold)] font-serif italic">—</span>
              <span>No handoff gaps</span>
              <span className="text-[var(--cyan)] font-serif italic">—</span>
              <span>One person, start to finish</span>
              <span className="text-[var(--gold)] font-serif italic">—</span>
              <span>Shipped, not staged</span>
              <span className="text-[var(--cyan)] font-serif italic">—</span>
              <span>Ahmedabad, IN</span>
              <span className="text-[var(--cyan)] font-serif italic">—</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
