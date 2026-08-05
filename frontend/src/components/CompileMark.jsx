import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * CompileMark — replaces the floating 3D business card.
 * On load: raw code brackets < /> sit inert.
 * As the hero scrolls out of view, the brackets dissolve into particles
 * that reassemble, stroke by stroke, into a glowing "KJ" signature mark.
 * Entirely scroll-position-driven (scrub) — reverses cleanly on scroll-up.
 */
export const CompileMark = ({ heroRef }) => {
  const root = useRef(null);
  const markRef = useRef(null);

  useGSAP(
    () => {
      const mark = markRef.current;
      if (!mark) return;
      const len = mark.getTotalLength();
      gsap.set(mark, { strokeDasharray: len, strokeDashoffset: len, opacity: 0 });

      const particles = root.current.querySelectorAll(".c-particle");
      const brackets = root.current.querySelector(".c-brackets");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef?.current || root.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
      });

      tl.to(brackets, { opacity: 0, scale: 0.85, transformOrigin: "center", ease: "none" }, 0)
        .to(
          particles,
          {
            opacity: 0.95,
            x: (i, el) => 190 - parseFloat(el.getAttribute("cx")) + Math.sin(i) * 6,
            y: (i, el) => 120 - parseFloat(el.getAttribute("cy")) + Math.cos(i) * 6,
            duration: 0.5,
            ease: "none",
          },
          0.12
        )
        .to(particles, { opacity: 0, duration: 0.15, ease: "none" }, 0.55)
        .to(mark, { strokeDashoffset: 0, opacity: 1, duration: 0.6, ease: "none" }, 0.35)
        .to(mark, { filter: "drop-shadow(0 0 18px rgba(34,230,255,.6)) drop-shadow(0 0 34px rgba(139,92,246,.4))", duration: 0.3, ease: "none" }, 0.75);

      // gentle idle float, independent of scroll
      gsap.to(root.current, {
        y: -10,
        duration: 3.2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    },
    { scope: root }
  );

  return (
    <div
      ref={root}
      data-testid="compile-mark"
      aria-hidden
      className="relative w-full flex items-center justify-center"
      style={{ maxWidth: 480 }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: "-15%",
          background:
            "radial-gradient(closest-side, rgba(34,230,255,.10) 0%, transparent 70%), radial-gradient(closest-side, rgba(139,92,246,.08) 0%, transparent 75%)",
          filter: "blur(30px)",
          pointerEvents: "none",
        }}
      />
      <svg viewBox="0 0 400 240" style={{ width: "100%", height: "auto", position: "relative" }}>
        <g className="c-brackets">
          <path d="M120 40 L70 120 L120 200" fill="none" stroke="rgba(154,163,180,0.55)" strokeWidth="6" strokeLinecap="round" />
          <path d="M280 40 L330 120 L280 200" fill="none" stroke="rgba(154,163,180,0.55)" strokeWidth="6" strokeLinecap="round" />
          <path d="M175 190 L145 205" stroke="rgba(154,163,180,0.4)" strokeWidth="6" strokeLinecap="round" />
        </g>

        {[
          [120, 40], [70, 120], [120, 200],
          [280, 40], [330, 120], [280, 200],
        ].map(([cx, cy], i) => (
          <circle key={i} className="c-particle" cx={cx} cy={cy} r={i % 2 ? 2.4 : 3} fill="var(--cyan)" opacity="0" />
        ))}

        <path
          ref={markRef}
          d="M100 50 L100 190 M100 130 L180 50 M130 105 L200 190
             M240 50 L240 190 M240 120 Q240 190 300 190 Q300 150 260 150"
          fill="none"
          stroke="var(--cyan)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export default CompileMark;
