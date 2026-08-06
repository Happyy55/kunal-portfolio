import { lazy, Suspense, useRef } from "react";

const SpiralCube = lazy(() => import("./SpiralCube"));

const gridBg = {
  backgroundImage:
    "linear-gradient(rgba(255,255,255,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.04) 1px, transparent 1px)",
  backgroundSize: "36px 36px",
};

export const SignatureSection = () => {
  const sectionRef = useRef(null);

  return (
    <section
      ref={sectionRef}
      id="signature"
      data-testid="signature-section"
      className="relative py-16 md:py-24 overflow-hidden"
    >
      <div className="absolute inset-0" style={gridBg} aria-hidden />
      <div
        aria-hidden
        className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px"
        style={{ background: "linear-gradient(90deg, transparent, var(--rule-strong) 20%, var(--rule-strong) 80%, transparent)" }}
      />
      <div className="relative max-w-[1240px] mx-auto px-6 md:px-10">
        <div className="text-center mb-6 md:mb-8">
          <span className="section-mark justify-center mb-5">The Philosophy</span>
          <h2 className="font-tight text-[26px] sm:text-[36px] lg:text-[42px] leading-[1.15] text-[var(--ink)] max-w-[20ch] mx-auto">
            A good idea is worth nothing{" "}
            <em className="font-italic text-[var(--cyan)]">until it's built well</em>.
          </h2>
          <p className="mt-4 text-[14px] md:text-[15px] leading-[1.85] text-[var(--ink-soft)] max-w-[46ch] mx-auto">
            I don't split thinking from making. Both happen in the same
            sitting, on the same screen — it's the only way the small
            decisions survive all the way to the end.
          </p>
        </div>
        <div className="mx-auto" style={{ height: 380, maxWidth: 480 }}>
          <Suspense
            fallback={
              <div className="flex items-center justify-center" style={{ height: 380 }}>
                <div className="w-16 h-16 rounded-full border border-[var(--rule-strong)] border-t-[var(--cyan)] animate-spin" />
              </div>
            }
          >
            <SpiralCube className="w-full h-full" />
          </Suspense>
        </div>
        <p className="mt-4 text-center text-[13px] text-[var(--ink-muted)] font-mono tracking-[.02em]">
          same cube · still building
        </p>
      </div>
    </section>
  );
};

export default SignatureSection;
