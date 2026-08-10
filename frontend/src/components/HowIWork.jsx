import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Clock, FileCheck2, Activity, ShieldCheck } from "lucide-react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const ACCENT_VAR = {
  cyan: { color: "var(--cyan)", glow: "var(--cyan-glow)" },
  gold: { color: "var(--gold)", glow: "rgba(212,180,134,0.4)" },
  violet: { color: "var(--violet)", glow: "var(--violet-glow)" },
};

const POINTS = [
  {
    num: "01",
    icon: Clock,
    accent: "cyan",
    tag: "Fast response",
    title: "Reply within a day.",
    body: "If I can't take the work, I'll say so on the first message, not two weeks of silence or a vague maybe. You'll know where you stand before the day is out.",
  },
  {
    num: "02",
    icon: FileCheck2,
    accent: "gold",
    tag: "Clarity first",
    title: "Scope before quote.",
    body: "I ask questions until the brief is actually clear, then send one fixed price for exactly that scope. No hourly meter running quietly in the background, no line items that show up later.",
  },
  {
    num: "03",
    icon: Activity,
    accent: "cyan",
    tag: "Always in motion",
    title: "Regular progress.",
    body: "Weekly check-ins, not a black box until launch day. You'll see the real site taking shape as it's built, not a status update that just says \"on track.\"",
  },
  {
    num: "04",
    icon: ShieldCheck,
    accent: "violet",
    tag: "Transparency always",
    title: "Honest about limits.",
    body: "If something's outside what I do well (heavy backend infrastructure, say), I'll tell you plainly and point you to someone better, instead of stretching to cover it badly.",
  },
];

export const HowIWork = () => {
  const listRef = useRef(null);

  useGSAP(
    () => {
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
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-16 md:py-28">
        <div className="grid grid-cols-12 gap-6 md:gap-8 items-end mb-14 md:mb-20 reveal">
          <div className="col-span-12 md:col-span-9">
            <div className="section-mark mb-6">How I Build</div>
            <h2 className="font-hero text-[36px] sm:text-[50px] lg:text-[60px] leading-[1.02] text-[var(--ink)] max-w-[16ch]">
              No surprises.
            </h2>
          </div>
          <div className="col-span-12 md:col-span-3 md:text-right">
            <p className="text-[14px] leading-relaxed text-[var(--ink-muted)] max-w-[32ch] md:ml-auto">
              Four things you can count on, every project.
            </p>
          </div>
        </div>

        <ol className="relative space-y-5 md:space-y-6" ref={listRef}>
          <div
            aria-hidden
            className="absolute top-2 bottom-2 w-px bg-[var(--rule-strong)] hidden md:block"
            style={{ left: "26px" }}
          />
          {POINTS.map((p, i) => {
            const accent = ACCENT_VAR[p.accent];
            return (
            <li key={p.num} data-testid={`how-item-${i}`} className="reveal">
              <div
                className="how-row flex items-start gap-4 md:gap-6"
                style={{ "--accent-color": accent.color, "--accent-glow": accent.glow }}
              >
                <div className="hidden md:flex flex-col items-center w-[52px] shrink-0 pt-6">
                  <span className="how-num-dot" />
                  <span className="how-num mt-3 font-mono text-[12px] tracking-[0.22em]">
                    {p.num}
                  </span>
                </div>

                <div className="how-item-card group flex-1 grid grid-cols-12 gap-5 md:gap-6 items-center px-6 md:px-8 py-7 md:py-8">
                  <div className="col-span-12 sm:col-span-5 lg:col-span-4 flex items-center gap-4">
                    <div className="how-icon-badge shrink-0">
                      <p.icon size={22} strokeWidth={1.7} />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-[19px] md:text-[21px] leading-[1.15] text-[var(--ink)]">
                        {p.title}
                      </h3>
                      <span className="how-tag mt-2">{p.tag}</span>
                    </div>
                  </div>

                  <div className="col-span-12 sm:col-span-7 lg:col-span-8">
                    <p className="text-[14px] md:text-[14.5px] leading-[1.85] text-[var(--ink-soft)]">
                      {p.body}
                    </p>
                  </div>
                </div>
              </div>
            </li>
          );})}
        </ol>
      </div>
    </section>
  );
};

export default HowIWork;
