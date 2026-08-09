import { lazy, Suspense, useRef } from "react";
import { Palette, Layers, Code2, Gauge, Sparkles } from "lucide-react";
import CapabilityCard from "./CapabilityCard";
import { Chip } from "./ui/Chip";

const SpiralCube = lazy(() => import("./SpiralCube"));

const CARDS = [
  { icon: Palette, number: "01", title: "Design", accent: "cyan", description: "Crafting intuitive, elegant interfaces with a strong focus on visual hierarchy, usability, and modern aesthetics." },
  { icon: Layers, number: "02", title: "Interaction", accent: "gold", description: "Creating immersive micro-interactions, smooth animations, 3D experiences, and meaningful motion." },
  { icon: Code2, number: "03", title: "Development", accent: "cyan", description: "Building scalable, high-performance applications using React, Three.js, GSAP, and modern frontend architecture." },
  { icon: Gauge, number: "04", title: "Performance", accent: "gold", description: "Optimized for speed, accessibility, responsiveness, SEO, and production-ready code." },
];

const TECH = ["UI / UX", "React", "Three.js", "GSAP", "Motion", "Tailwind"];

export const SignatureSection = () => {
  const sectionRef = useRef(null);

  return (
    <section
      ref={sectionRef}
      id="signature"
      data-testid="signature-section"
      className="relative py-20 md:py-32 overflow-hidden"
    >
      <div className="capability-stage-glow" aria-hidden />

      <div className="relative max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="text-center mb-14 md:mb-20">
          <span className="section-mark justify-center mb-5">The Craft</span>
          <h2 className="font-tight text-[26px] sm:text-[36px] lg:text-[42px] leading-[1.15] text-[var(--ink)] max-w-[36ch] mx-auto">
            Design <span className="text-[var(--cyan)]">·</span> Interaction{" "}
            <span className="text-[var(--gold)]">·</span> Development{" "}
            <span className="text-[var(--cyan)]">·</span> Performance{" "}
            <span className="text-[var(--gold)]">·</span> Experience
          </h2>
          <p className="mt-5 text-[14px] md:text-[15px] leading-[1.85] text-[var(--ink-soft)] max-w-[52ch] mx-auto">
            Every product I build blends thoughtful design, meaningful
            interaction, clean engineering, optimized performance, and
            memorable user experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-6 lg:gap-8 items-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-5">
            <CapabilityCard {...CARDS[0]} />
            <CapabilityCard {...CARDS[1]} />
          </div>

          <div className="relative flex items-center justify-center order-first lg:order-none">
            <div className="mx-auto" style={{ height: 340, width: 300 }}>
              <Suspense
                fallback={
                  <div className="flex items-center justify-center h-full">
                    <div className="w-14 h-14 rounded-full border border-[var(--rule-strong)] border-t-[var(--cyan)] animate-spin" />
                  </div>
                }
              >
                <SpiralCube className="w-full h-full" />
              </Suspense>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-5">
            <CapabilityCard {...CARDS[2]} />
            <CapabilityCard {...CARDS[3]} />
          </div>
        </div>

        <div className="mt-6 md:mt-8">
          <div className="capability-card flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
            <div className="capability-card-glow" style={{ background: "radial-gradient(circle at 20% 0%, var(--violet-glow), transparent 60%)" }} aria-hidden />
            <div className="flex items-start gap-4 md:min-w-[280px]">
              <div className="capability-card-icon shrink-0">
                <Sparkles size={22} strokeWidth={1.6} />
              </div>
              <div>
                <span className="capability-card-number" style={{ position: "static", display: "block", marginBottom: 4 }}>05</span>
                <h3 className="capability-card-title">Experience</h3>
                <p className="capability-card-desc">Delivering complete digital products that users enjoy, remember, and return to.</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 md:ml-auto">
              {TECH.map((t) => (
                <Chip key={t}>{t}</Chip>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignatureSection;
