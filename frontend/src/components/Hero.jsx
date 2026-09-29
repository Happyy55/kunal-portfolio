import { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useMagnetic } from "../hooks/useMagnetic";

const LINE_1 = "I turn ideas into experiences.".split(" ");
const LINE_2 = "You remember the feeling.".split(" ");

const WordReveal = ({ words, lineClass, delayStart = 0, highlight }) => (
  <span className={`inline-flex flex-wrap justify-center lg:justify-start ${lineClass}`}>
    {words.map((w, i) => {
      const isHighlight = highlight && w === highlight;
      const wordDelay = delayStart + i * 0.09;
      return (
        <motion.span
          key={i}
          className={`relative inline-block mr-[0.28em] ${isHighlight ? "hero-word-highlight" : ""}`}
          style={{ transformOrigin: "50% 60%" }}
          initial={{ opacity: 0, scale: 0.18, filter: "blur(22px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.9, delay: wordDelay, type: "spring", stiffness: 120, damping: 14, mass: 0.7 }}
        >
          {w}
          {isHighlight && (
            <motion.svg
              className="hero-underline"
              viewBox="0 0 220 22"
              preserveAspectRatio="none"
              aria-hidden
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: wordDelay + 0.45, duration: 0.2 }}
            >
              <motion.path
                d="M4 15 Q 58 4, 110 11 T 216 9"
                fill="none"
                stroke="var(--violet)"
                strokeWidth="5"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.7, delay: wordDelay + 0.45, ease: [0.22, 1, 0.36, 1] }}
              />
            </motion.svg>
          )}
        </motion.span>
      );
    })}
  </span>
);

// Hero's right-column visual — a photo with a soft ambient glow bleeding
// outward around its frame (not painted flat inside the image itself).
const HeroVisual = () => (
  <motion.div
    className="hero-visual"
    initial={{ opacity: 0, scale: 0.94, y: 16 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    transition={{ duration: 1.1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
  >
    <div className="hero-visual-glow" aria-hidden />
    <img
      src="/images/hero-visual.jpg"
      alt="A glowing glass panel displaying an interface design and code, lit in cyan and violet"
      className="hero-visual-img"
    />
  </motion.div>
);

export const Hero = () => {
  const sectionRef = useRef(null);
  useMagnetic("[data-magnetic]", 0.28);

  return (
    <section
      id="top"
      ref={sectionRef}
      data-testid="hero-section"
      className="relative min-h-[100svh] flex flex-col overflow-hidden"
    >
      <div className="flex-1 flex items-center relative z-[2]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 xl:px-16 w-full pt-28 md:pt-32 pb-10 md:pb-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-7 text-center lg:text-left">
              <h1
                data-testid="hero-headline"
                className="font-hero text-[42px] sm:text-[58px] lg:text-[68px] xl:text-[84px] leading-[1.02] tracking-[-0.03em] text-[var(--ink)]"
              >
                <div className="block"><WordReveal words={LINE_1} lineClass="hero-line" delayStart={0.1} /></div>
                <div className="block">
                  <WordReveal words={LINE_2} lineClass="hero-line" delayStart={0.45} highlight="feeling." />
                </div>
              </h1>

              <div className="mt-9 md:mt-11 reveal is-visible" style={{ transitionDelay: "1.2s" }}>
                <p className="text-[16px] md:text-[18px] leading-[1.75] text-[var(--ink-soft)] max-w-[52ch] mx-auto lg:mx-0">
                  KJ Studio designs and builds digital experiences for founders
                  who care about the details.
                </p>
                <p className="mt-3 font-mono text-[12.5px] tracking-[0.08em] text-[var(--ink-muted)]">
                  Led by Kunal Jain · Ahmedabad, India
                </p>

                <div className="mt-7 flex flex-wrap items-end justify-center lg:justify-start gap-2">
                  <a
                    href="#contact"
                    onClick={(e) => { const el = document.getElementById("contact"); if (el) { e.preventDefault(); el.scrollIntoView({ behavior: "smooth" }); } }}
                    data-testid="hero-cta-contact"
                    className="btn-primary btn-hero-lg magnetic"
                    data-magnetic
                  >
                    <span data-magnetic-target>Start a project</span>
                    <ArrowRight size={16} strokeWidth={1.7} />
                  </a>
                  <a
                    href="#work"
                    onClick={(e) => { const el = document.getElementById("work"); if (el) { e.preventDefault(); el.scrollIntoView({ behavior: "smooth" }); } }}
                    data-testid="hero-cta"
                    className="btn-ghost btn-hero-lg magnetic"
                    data-magnetic
                  >
                    <span data-magnetic-target>See the work</span>
                    <ArrowUpRight size={16} strokeWidth={1.7} />
                  </a>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center">
              <HeroVisual />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
