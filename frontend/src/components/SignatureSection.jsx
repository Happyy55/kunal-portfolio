import { lazy, Suspense, useRef } from "react";

const Signature3D = lazy(() => import("./Signature3D"));

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
        <div className="text-center mb-4">
          <span className="section-mark justify-center">The mark</span>
        </div>
        <Suspense
          fallback={
            <div className="flex items-center justify-center" style={{ height: 380 }}>
              <div className="w-16 h-16 rounded-full border border-[var(--rule-strong)] border-t-[var(--cyan)] animate-spin" />
            </div>
          }
        >
          <Signature3D sectionRef={sectionRef} />
        </Suspense>
        <p className="mt-4 text-center text-[13px] text-[var(--ink-muted)] font-mono tracking-[.02em]">
          move your cursor · scroll to spin
        </p>
      </div>
    </section>
  );
};

export default SignatureSection;
