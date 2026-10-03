import { Clock, FileCheck2, Activity, ShieldCheck } from "lucide-react";

const POINTS = [
  {
    num: "01",
    icon: Clock,
    color: "var(--cyan)",
    tag: "Fast response",
    title: "Reply within a day.",
    body: "If I can't take the work, I'll say so on the first message, not two weeks of silence or a vague maybe.",
  },
  {
    num: "02",
    icon: FileCheck2,
    color: "var(--gold)",
    tag: "Clarity first",
    title: "Scope before quote.",
    body: "I ask questions until the brief is clear, then send one fixed price for exactly that scope.",
  },
  {
    num: "03",
    icon: Activity,
    color: "var(--violet)",
    tag: "Always in motion",
    title: "Regular progress.",
    body: "Weekly check-ins, not a black box until launch day. You'll see the real site taking shape as it's built.",
  },
  {
    num: "04",
    icon: ShieldCheck,
    color: "var(--cyan)",
    tag: "Transparency always",
    title: "Honest about limits.",
    body: "If something's outside what I do well, I'll tell you plainly and point you to someone better.",
  },
];

export const HowIWork = () => (
  <section id="how" data-testid="how-section">
    <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-20 md:py-32">
      <div className="mb-12 md:mb-20 reveal">
        <div className="section-mark mb-6">Process</div>
        <h2 className="font-tight text-[36px] sm:text-[48px] lg:text-[58px] leading-[1.04] text-[var(--ink)] max-w-[16ch]">
          No surprises.
        </h2>
      </div>

      <ol className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {POINTS.map((p, i) => (
          <li key={p.num} data-testid={`how-item-${i}`} className="reveal">
            <div className="how-item-card h-full flex flex-col p-6 md:p-8" style={{ "--accent-color": p.color }}>
              <div className="flex items-start justify-between">
                <div className="how-icon-badge">
                  <p.icon size={22} strokeWidth={1.7} />
                </div>
                <span className="font-mono text-[12px] tracking-[0.2em] text-[var(--ink-muted)]">{p.num}</span>
              </div>
              <h3 className="mt-7 font-display font-semibold text-[21px] md:text-[24px] leading-[1.15] text-[var(--ink)]">
                {p.title}
              </h3>
              <p className="mt-3 text-[15px] leading-[1.75] text-[var(--ink-soft)] max-w-[44ch]">{p.body}</p>
              <span className="how-tag mt-6 self-start">{p.tag}</span>
            </div>
          </li>
        ))}
      </ol>
    </div>
  </section>
);

export default HowIWork;
