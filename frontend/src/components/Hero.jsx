import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowDown } from "lucide-react";
import { useMagnetic } from "../hooks/useMagnetic";
import { useSectionNav } from "../hooks/useSectionNav";
import { HeroWorkspace } from "./HeroWorkspace";

const LINE_1 = "I turn ideas into experiences.".split(" ");
const LINE_2 = "You remember the feeling.".split(" ");

const EASE = [0.16, 1, 0.3, 1];

// Each word rises out of its own clipping mask. The text is fully opaque
// from the first frame, so the browser counts the headline as painted
// immediately instead of after the animation.
const WordReveal = ({ words, lineClass, delayStart = 0, highlight, reduce }) => (
  <span className={`inline-flex flex-wrap justify-center lg:justify-start ${lineClass}`}>
    {words.map((w, i) => {
      const isHighlight = highlight && w === highlight;
      const wordDelay = delayStart + i * 0.07;
      return (
        <span key={i} className={`relative inline-block mr-[0.28em] ${isHighlight ? "hero-word-highlight" : ""}`}>
          <span className="inline-block overflow-hidden align-bottom pb-[0.12em] -mb-[0.12em]">
            <motion.span
              className="inline-block"
              initial={reduce ? false : { y: "105%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, delay: wordDelay, ease: EASE }}
            >
              {w}
            </motion.span>
          </span>
          {isHighlight && (
            <motion.svg
              className="hero-underline"
              viewBox="0 0 220 22"
              preserveAspectRatio="none"
              aria-hidden
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: wordDelay + 0.35, duration: 0.2 }}
            >
              <motion.path
                d="M4 15 Q 58 4, 110 11 T 216 9"
                fill="none"
                stroke="var(--violet)"
                strokeWidth="5"
                strokeLinecap="round"
                initial={reduce ? false : { pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.7, delay: wordDelay + 0.35, ease: [0.22, 1, 0.36, 1] }}
              />
            </motion.svg>
          )}
        </span>
      );
    })}
  </span>
);

const HeroAtmosphere = ({ reduce }) => (
  <motion.div
    className="hero-atmosphere"
    aria-hidden
    initial={reduce ? false : { opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1.2, delay: 0.1, ease: EASE }}
  />
);

export const Hero = () => {
  const reduce = useReducedMotion();
  const { goTo } = useSectionNav();
  useMagnetic("[data-magnetic]", 0.28);

  return (
    <section id="top" data-testid="hero-section" className="relative min-h-[100svh] flex flex-col overflow-hidden">
      <HeroAtmosphere reduce={reduce} />
      <div className="relative z-[5] flex-1 flex items-center">
        <div className="w-full max-w-[1400px] mx-auto px-6 md:px-10 xl:px-16 pt-28 md:pt-36 pb-12 md:pb-16">
          <div className="lg:max-w-[58%] text-center lg:text-left">
            <p className="eyebrow mb-6 md:mb-8">KJ Studio · Creative development</p>
            <h1
              data-testid="hero-headline"
              className="font-hero text-[42px] sm:text-[58px] lg:text-[68px] xl:text-[84px] leading-[1.02] tracking-[-0.03em] text-[var(--ink)]"
            >
              <span className="block"><WordReveal words={LINE_1} lineClass="hero-line" delayStart={0.05} reduce={reduce} /></span>
              <span className="block"><WordReveal words={LINE_2} lineClass="hero-line" delayStart={0.3} highlight="feeling." reduce={reduce} /></span>
            </h1>

            <p className="mt-7 md:mt-10 text-[16px] md:text-[18px] leading-[1.75] text-[var(--ink-soft)] max-w-[48ch] mx-auto lg:mx-0">
              KJ Studio designs and builds websites, brands and apps for founders
              who care about the details.
            </p>
            <p className="mt-3 font-mono text-[12.5px] tracking-[0.08em] text-[var(--ink-muted)]">
              Led by Kunal Jain · Ahmedabad, India
            </p>

            <div className="mt-8 flex flex-wrap justify-center lg:justify-start gap-3">
              <a href="#contact" onClick={(e) => goTo(e, "#contact")} data-testid="hero-cta-contact" className="btn-primary btn-hero-lg" data-magnetic>
                <span data-magnetic-target>Start a project</span>
                <ArrowRight size={16} strokeWidth={1.7} />
              </a>
              <a href="#work" onClick={(e) => goTo(e, "#work")} data-testid="hero-cta" className="btn-ghost btn-hero-lg" data-magnetic>
                <span data-magnetic-target>See the work</span>
                <ArrowDown size={16} strokeWidth={1.7} />
              </a>
            </div>

            <HeroWorkspace reduce={reduce} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
