import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const POINTS = [
  {
    num: "01",
    title: "Reply within a day.",
    body: "If I can't take the work, I'll say so on the first message — not two weeks of silence, not a vague maybe. You'll know where you stand before the day is out.",
  },
  {
    num: "02",
    title: "Scope before quote.",
    body: "I ask questions until the brief is actually clear, then send one fixed price for exactly that scope. No hourly meter running quietly in the background, no line items that show up later.",
  },
  {
    num: "03",
    title: "Regular progress.",
    body: "Weekly check-ins, not a black box until launch day. You'll see the real site taking shape as it's built, not a status update that just says \"on track.\"",
  },
  {
    num: "04",
    title: "Honest about limits.",
    body: "If something's outside what I do well — heavy backend infrastructure, say — I'll tell you plainly and point you to someone better, instead of stretching to cover it badly.",
  },
];

export const HowIWork = () => {
  const listRef = useRef(null);

  useGSAP(
    () => {
      const rail = listRef.current.querySelector(".how-rail-fill");
      if (rail) {
        gsap.fromTo(
          rail,
          { scaleY: 0 },
          {
            scaleY: 1,
            transformOrigin: "top",
            ease: "none",
            scrollTrigger: {
              trigger: listRef.current,
              start: "top 75%",
              end: "bottom 65%",
              scrub: 0.6,
            },
          }
        );
      }

      const nums = listRef.current.querySelectorAll(".how-num");
      nums.forEach((n) => {
        gsap.fromTo(
          n,
          { opacity: 0.35, scale: 0.9 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.4,
            ease: "power2.out",
            scrollTrigger: {
              trigger: n,
              start: "top 78%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    },
    { scope: listRef }
  );
  return (
    <section
      id="how"
      data-testid="how-section"
      className=""
    >
      <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-16 md:py-28">
        <div className="grid grid-cols-12 gap-6 md:gap-8 items-end mb-14 md:mb-20 reveal">
          <div className="col-span-12 md:col-span-9">
            <div className="section-mark mb-6">How I Build</div>
            <h2 className="font-tight text-[34px] sm:text-[46px] lg:text-[56px] leading-[1.04] text-[var(--ink)] max-w-[16ch]">
              No surprises.
            </h2>
          </div>
          <div className="col-span-12 md:col-span-3 md:text-right">
            <p className="text-[14px] leading-relaxed text-[var(--ink-muted)] max-w-[32ch] md:ml-auto">
              Four things you can count on, every project.
            </p>
          </div>
        </div>

        <ol className="relative space-y-px" ref={listRef}>
          <div
            aria-hidden
            className="absolute top-0 bottom-0 w-px bg-[var(--rule-strong)] hidden md:block"
            style={{ left: "calc(1/12 * 100% - 1px)" }}
          >
            <div
              className="how-rail-fill absolute top-0 left-0 w-full"
              style={{
                height: "100%",
                background: "linear-gradient(180deg, var(--cyan) 0%, var(--gold) 100%)",
                boxShadow: "0 0 10px var(--cyan-glow)",
                transform: "scaleY(0)",
              }}
            />
          </div>
          {POINTS.map((p, i) => (
            <li
              key={p.num}
              data-testid={`how-item-${i}`}
              className={`border-t border-[var(--rule-strong)] ${
                i === POINTS.length - 1 ? "border-b" : ""
              } reveal`}
            >
              <div className="grid grid-cols-12 gap-4 md:gap-6 py-8 md:py-14 items-baseline group">
                <div className="col-span-2 md:col-span-1">
                  <div className="how-num font-mono text-[var(--cyan)] text-[11px] md:text-[12px] tracking-[0.22em]"
                    style={{ textShadow: "0 0 14px var(--cyan-glow)" }}>
                    {p.num}
                  </div>
                </div>
                <div className="col-span-10 md:col-span-7">
                  <h3 className="font-tight text-[22px] sm:text-[32px] lg:text-[40px] leading-[1.08] text-[var(--ink)]">
                    {p.title}
                  </h3>
                </div>
                <div className="col-span-12 md:col-span-4 md:col-start-9">
                  <p className="text-[14px] md:text-[14.5px] leading-[1.85] text-[var(--ink-soft)] max-w-[44ch]">
                    {p.body}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default HowIWork;
