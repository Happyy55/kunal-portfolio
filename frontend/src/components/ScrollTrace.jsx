import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin, useGSAP);

/**
 * ScrollTrace — replaces the plain `border-t` divider between sections.
 * A thin line draws itself left-to-right the moment it enters the
 * viewport, with a small glowing dot leading the stroke.
 */
export const ScrollTrace = () => {
  const svgRef = useRef(null);
  const lineRef = useRef(null);
  const dotRef = useRef(null);

  useGSAP(
    () => {
      const line = lineRef.current;
      if (!line) return;
      const len = line.getTotalLength();
      gsap.set(line, { strokeDasharray: len, strokeDashoffset: len });
      gsap.set(dotRef.current, { opacity: 0 });

      gsap.timeline({
        scrollTrigger: {
          trigger: svgRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      })
        .to(line, { strokeDashoffset: 0, duration: 1.1, ease: "power2.inOut" })
        .to(dotRef.current, { opacity: 1, duration: 0.15 }, 0)
        .to(dotRef.current, {
          motionPath: { path: line, align: line, alignOrigin: [0.5, 0.5] },
          duration: 1.1,
          ease: "power2.inOut",
        }, 0)
        .to(dotRef.current, { opacity: 0, duration: 0.2 }, ">-0.15");
    },
    { scope: svgRef }
  );

  return (
    <svg
      ref={svgRef}
      aria-hidden
      data-testid="scroll-trace"
      width="100%"
      height="2"
      viewBox="0 0 1200 2"
      preserveAspectRatio="none"
      style={{ display: "block", overflow: "visible" }}
    >
      <line x1="0" y1="1" x2="1200" y2="1" stroke="var(--rule)" strokeWidth="1" />
      {/* <path>, not <line> — MotionPathPlugin's shape-to-path conversion for
          <line> elements was crashing (_align reading an empty raw path);
          a real <path> is the plugin's fully-supported case. */}
      <path ref={lineRef} d="M0,1 L1200,1" fill="none" stroke="var(--cyan)" strokeWidth="1" />
      <circle ref={dotRef} r="3" fill="var(--cyan)" style={{ filter: "drop-shadow(0 0 6px var(--cyan))" }} />
    </svg>
  );
};

export default ScrollTrace;
