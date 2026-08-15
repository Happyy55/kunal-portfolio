export const About = () => {
  return (
    <section
      id="about"
      data-testid="about-section"
      className=""
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-16 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-[5fr_7fr] lg:grid-cols-[4fr_8fr] gap-8 md:gap-16 items-start">
          <div className="min-w-0 reveal">
            <div className="section-mark mb-6">The Beginning</div>
            <figure className="relative max-w-[320px] sm:max-w-none mx-auto sm:mx-0">
              <div
                aria-hidden
                className="absolute pointer-events-none -inset-10 -z-10"
                style={{
                  background: "radial-gradient(circle at center, var(--cyan-glow) 0%, transparent 65%)",
                  filter: "blur(50px)",
                  opacity: 0.5,
                }}
              />
              <div
                className="relative overflow-hidden rounded-[10px] border border-[var(--rule-strong)] flex items-center justify-center"
                style={{
                  aspectRatio: "4 / 5",
                  background: "linear-gradient(140deg, rgba(108, 232, 236, 0.14) 0%, rgba(168, 121, 255, 0.10) 100%)",
                  boxShadow:
                    "0 50px 100px -50px rgba(0,0,0,0.8), 0 30px 60px -30px rgba(108,232,236,0.18)",
                }}
              >
                {/* Placeholder — swap for a real portrait when ready. Deliberately not a
                    stock photo or a hotlinked URL (the previous version pointed at a
                    third-party artifact link, which is exactly the kind of thing that
                    breaks silently). Uses the site's own KJ monogram rather than a
                    "broken image" glyph, so the empty slot reads as a deliberate
                    placeholder rather than a bug until there's a real one. */}
                <img
                  src="/images/kj-mark.png"
                  alt="KJ"
                  data-testid="about-portrait"
                  aria-label="Portrait placeholder, coming soon"
                  className="w-[34%] max-w-[120px] h-auto"
                  style={{ filter: "drop-shadow(0 0 24px rgba(108,232,236,0.18))" }}
                />
                <div className="grain" />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: "linear-gradient(180deg, transparent 60%, rgba(5,7,15,0.85) 100%)" }}
                />
                <span className="absolute bottom-4 left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-[0.18em] uppercase text-[var(--ink-muted)]">
                  portrait · coming soon
                </span>
              </div>
            </figure>
          </div>

          <div className="min-w-0 reveal" style={{ transitionDelay: "150ms" }}>
            <h2 className="font-tight text-[32px] sm:text-[44px] lg:text-[54px] leading-[1.06] text-[var(--ink)] max-w-[18ch] mb-7 md:mb-9">
              Between design{" "}
              <em className="font-italic text-[var(--cyan)]">and</em> code.
            </h2>

            <div className="space-y-6 md:space-y-7 text-[15px] md:text-[16px] leading-[1.85] md:leading-[1.9] text-[var(--ink)] max-w-[62ch]">
              <p>
                I started by making things I wanted to exist: logos first,
                then layouts, then the code to bring them to life. Somewhere
                along the way the two halves merged, and now I work in the
                space between design and engineering. That overlap is the
                point: because I both design and build, nothing gets lost in
                a handoff. The type, the spacing, the small interactions
                that make a site feel considered survive all the way to
                production.
              </p>
              <p className="text-[var(--ink-soft)]">
                Everything on this site was made for real use: a cloud
                product's public face, a consultancy's new home, a ledger app
                shopkeepers open every morning. Real clients, real problems,
                shipped work.
              </p>
              <p className="text-[var(--ink-soft)]">
                I work best with founders and small teams who want one
                person to care about the whole picture. Bring me a rough
                idea and I'll give you an honest read: what's worth
                building, what isn't, and what it should look like when
                it's done.
              </p>
            </div>

            <div className="mt-8 md:mt-10 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[11px] md:text-[12px] tracking-[0.08em] uppercase text-[var(--ink-muted)]">
              {["One person, start to finish", "Ahmedabad, India", "Real clients only"].map((fact, i) => (
                <span key={fact} className="inline-flex items-center gap-3">
                  <span className="inline-flex items-center gap-2">
                    <span
                      className="w-[5px] h-[5px] rounded-full"
                      style={{
                        background: i % 2 === 0 ? "var(--cyan)" : "var(--gold)",
                        boxShadow: `0 0 6px ${i % 2 === 0 ? "var(--cyan-glow)" : "var(--gold)"}`,
                      }}
                    />
                    {fact}
                  </span>
                  {i < 2 && <span className="w-6 h-px bg-[var(--rule-strong)]" />}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
