const POINTS = [
  {
    num: "01",
    title: "Reply within a day.",
    body: "If I can't take the work, I'll say so on the first message.",
  },
  {
    num: "02",
    title: "Scope before quote.",
    body: "I ask questions until the brief is clear, then send a fixed price.",
  },
  {
    num: "03",
    title: "Regular progress.",
    body: "Weekly check-ins so you always know where the project stands.",
  },
  {
    num: "04",
    title: "Honest about limits.",
    body: "I'll tell you when something is outside what I do well, and recommend someone better.",
  },
];

export const HowIWork = () => {
  return (
    <section
      id="how"
      data-testid="how-section"
      className="border-t border-[var(--rule)]"
    >
      <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-16 md:py-28">
        <div className="grid grid-cols-12 gap-6 md:gap-8 items-end mb-14 md:mb-20 reveal">
          <div className="col-span-12 md:col-span-9">
            <div className="section-mark mb-6">How I work</div>
            <h2 className="font-tight text-[34px] sm:text-[46px] lg:text-[56px] leading-[1.04] text-[var(--ink)] max-w-[16ch]">
              Working together.
            </h2>
          </div>
          <div className="col-span-12 md:col-span-3 md:text-right">
            <p className="text-[14px] leading-relaxed text-[var(--ink-muted)] max-w-[32ch] md:ml-auto">
              Four short rules I keep to on every project.
            </p>
          </div>
        </div>

        <ol className="space-y-px">
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
                  <div className="font-mono text-[var(--cyan)] text-[11px] md:text-[12px] tracking-[0.22em]"
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
