import { useRef, lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { ArrowDownRight, Sparkle, Star, Asterisk } from "lucide-react";
import { useMagnetic } from "../hooks/useMagnetic";

const RobotCompanion = lazy(() => import("./RobotCompanion"));

const PROOF_ITEMS = [
  { text: "No templates", icon: Sparkle, accent: "cyan" },
  { text: "No stock components", icon: Star, accent: "gold" },
  { text: "No handoff gaps", icon: Asterisk, accent: "violet" },
  { text: "One person, start to finish", icon: Sparkle, accent: "gold" },
  { text: "Shipped, not staged", icon: Star, accent: "cyan" },
  { text: "Ahmedabad, IN", icon: Asterisk, accent: "violet" },
];

const accentVarOf = (a) => (a === "gold" ? "var(--gold)" : a === "violet" ? "var(--violet)" : "var(--cyan)");
const accentGlowOf = (a) => (a === "gold" ? "rgba(212,180,134,0.4)" : a === "violet" ? "var(--violet-glow)" : "var(--cyan-glow)");

const ProofMarquee = () => (
  <div className="hero-marquee-mask" data-testid="hero-proof-marquee">
    <div className="marquee">
      {Array.from({ length: 2 }).map((_, k) => (
        <div key={k} className="flex items-center gap-14 pr-14">
          {PROOF_ITEMS.map((item, idx) => {
            const color = accentVarOf(item.accent);
            const glow = accentGlowOf(item.accent);
            return (
              <span key={idx} className="inline-flex items-center gap-3 font-display text-[18px] sm:text-[20px] tracking-[-0.01em] text-[var(--ink)]">
                <item.icon size={14} style={{ color }} fill="currentColor" />
                <span style={{ textShadow: `0 0 22px ${glow}` }}>{item.text}</span>
              </span>
            );
          })}
        </div>
      ))}
    </div>
  </div>
);

const LINE_1 = "I turn ideas".split(" ");
const LINE_2 = "into experiences.".split(" ");
const LINE_3 = "You remember the feeling.".split(" ");

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
                stroke="var(--cyan)"
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
      <div className="hero-light-sweep" />

      <div className="flex-1 flex items-center relative z-[2]">
        <div className="max-w-[1800px] mx-auto px-6 md:px-10 xl:px-16 w-full pt-24 md:pt-28 lg:pt-32 pb-10 md:pb-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left — content, centered within its own column rather than
                flush to the edge. */}
            <div className="lg:col-span-6 lg:pl-12 xl:pl-20 text-center lg:text-left">
              <div className="max-w-[620px] 2xl:max-w-[680px] mx-auto lg:mx-0">
                <h1
                  data-testid="hero-headline"
                  className="font-hero text-[36px] sm:text-[50px] lg:text-[58px] xl:text-[70px] 2xl:text-[82px] leading-[1.05] tracking-[-0.02em] text-[var(--ink)]"
                  style={{ perspective: 600 }}
                >
                  <div className="block hero-line-tilt-1"><WordReveal words={LINE_1} lineClass="hero-line hero-line-1" delayStart={0.1} /></div>
                  <div className="block hero-line-tilt-2"><WordReveal words={LINE_2} lineClass="hero-line hero-line-2" delayStart={0.35} /></div>
                  <div className="block hero-line-tilt-3">
                    <WordReveal words={LINE_3} lineClass="hero-line hero-line-3" delayStart={0.6} highlight="feeling." />
                  </div>
                </h1>

                <div
                  className="mt-9 md:mt-11 grid grid-cols-12 gap-x-6 gap-y-4 reveal is-visible"
                  style={{ transitionDelay: "1.2s" }}
                >
                  <p className="col-span-12 text-[16px] md:text-[18px] leading-[1.75] text-[var(--ink-soft)] max-w-[52ch] mx-auto lg:mx-0">
                    I'm <span className="text-[var(--ink)]">Kunal Jain</span>. I
                    design and build every site myself, from Ahmedabad, with no
                    handoffs and no diluted ideas. What you approve is exactly
                    what ships.
                  </p>

                  <div className="col-span-12 flex flex-wrap items-end justify-center lg:justify-start gap-2">
                    <a
                      href="#contact"
                      onClick={(e) => { const el = document.getElementById("contact"); if (el) { e.preventDefault(); el.scrollIntoView({ behavior: "smooth" }); } }}
                      data-testid="hero-cta-contact"
                      className="btn-primary btn-hero-lg magnetic"
                      data-magnetic
                    >
                      <span data-magnetic-target>Start a project</span>
                      <span className="arrow-dot" />
                    </a>
                    <a
                      href="#work"
                      onClick={(e) => { const el = document.getElementById("work"); if (el) { e.preventDefault(); el.scrollIntoView({ behavior: "smooth" }); } }}
                      data-testid="hero-cta"
                      className="btn-ghost btn-hero-lg magnetic"
                      data-magnetic
                    >
                      <span data-magnetic-target>See the work</span>
                      <ArrowDownRight size={16} strokeWidth={1.7} />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right — robot */}
            <div className="lg:col-span-6 flex justify-center lg:justify-end min-w-0">
              <motion.div
                className="relative w-full max-w-[720px] sm:max-w-[840px]"
                style={{ aspectRatio: "1 / 1.05" }}
                initial={{ opacity: 0, x: "35vw", scale: 0.7 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <Suspense fallback={null}>
                  <RobotCompanion className="absolute inset-0" scale={3.3} />
                </Suspense>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-y border-[var(--rule)] py-5 relative z-[2]">
        <ProofMarquee />
      </div>
    </section>
  );
};

export default Hero;
