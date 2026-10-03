import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { Palette, Layers, Code2, Gauge, Sparkles } from "lucide-react";
import CapabilityCard from "./CapabilityCard";

const SpiralCube = lazy(() => import("./SpiralCube"));

// Mounts children only once the box is near the viewport, so the 3D bundle
// (the heaviest script on the page) isn't fetched or run during first load.
const MountWhenNear = ({ children, fallback, className }) => {
  const ref = useRef(null);
  const [near, setNear] = useState(false);
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") { setNear(true); return; }
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setNear(true); io.disconnect(); } },
      { rootMargin: "0px 0px 100px 0px" }
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} className={className}>{near ? children : fallback}</div>;
};

const CARDS = [
  { icon: Palette, title: "Design", accent: "cyan", description: "Layout, type and colour worked out before any code, so the site has a clear point of view." },
  { icon: Layers, title: "Interaction", accent: "gold", description: "Motion with a purpose: transitions, hover states and small details that make a page feel alive." },
  { icon: Code2, title: "Development", accent: "cyan", description: "Built with React and modern tooling, and handed over as clean code your team can grow." },
  { icon: Gauge, title: "Performance", accent: "gold", description: "Fast on a phone over mobile data, accessible to everyone, and set up to be found on Google." },
];

const Spinner = () => (
  <div className="flex items-center justify-center h-full">
    <div className="w-14 h-14 rounded-full border border-[var(--rule-strong)] border-t-[var(--cyan)] animate-spin" />
  </div>
);

export const SignatureSection = () => (
  <section id="signature" data-testid="signature-section" className="relative py-20 md:py-32 overflow-hidden">
    <div className="capability-stage-glow" aria-hidden />

    <div className="relative max-w-[1400px] mx-auto px-6 md:px-10">
      <div className="text-center mb-12 md:mb-20 reveal">
        <div className="section-mark mb-6">The Craft</div>
        <h2 className="font-tight text-[36px] sm:text-[48px] lg:text-[58px] leading-[1.04] text-[var(--ink)] max-w-[18ch] mx-auto">
          What goes into <span className="text-[var(--cyan)]">every project</span>.
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-5 lg:gap-8 items-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-5">
          <CapabilityCard {...CARDS[0]} />
          <CapabilityCard {...CARDS[1]} />
        </div>

        <div className="flex items-center justify-center order-first lg:order-none" aria-hidden>
          <MountWhenNear className="mx-auto w-[260px] h-[300px] sm:w-[300px] sm:h-[340px]" fallback={<Spinner />}>
            <Suspense fallback={<Spinner />}>
              <SpiralCube className="w-full h-full" />
            </Suspense>
          </MountWhenNear>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-5">
          <CapabilityCard {...CARDS[2]} />
          <CapabilityCard {...CARDS[3]} />
        </div>
      </div>

      <div className="capability-card mt-5 lg:mt-8 flex items-start gap-4">
        <div className="capability-card-glow" style={{ background: "radial-gradient(circle at 20% 0%, var(--violet-glow), transparent 60%)" }} aria-hidden />
        <div className="capability-card-icon shrink-0 !mb-0">
          <Sparkles size={22} strokeWidth={1.6} />
        </div>
        <div>
          <h3 className="capability-card-title">Experience</h3>
          <p className="capability-card-desc">All of it together: a site people enjoy using, remember afterwards, and come back to.</p>
        </div>
      </div>
    </div>
  </section>
);

export default SignatureSection;
