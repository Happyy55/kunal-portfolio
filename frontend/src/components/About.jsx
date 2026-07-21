export const About = () => {
  return (
    <section
      id="about"
      data-testid="about-section"
      className="border-t border-[var(--rule)]"
    >
      <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-16 md:py-28">
        <div className="grid grid-cols-12 gap-6 md:gap-16 items-start">
          <div className="col-span-12 md:col-span-5 lg:col-span-4 min-w-0 reveal">
            <div className="section-mark mb-6">About</div>
            <figure className="relative max-w-[320px] sm:max-w-none mx-auto sm:mx-0">
              <div
                className="relative overflow-hidden rounded-[10px] border border-[var(--rule-strong)]"
                style={{
                  aspectRatio: "4 / 5",
                  boxShadow:
                    "0 50px 100px -50px rgba(0,0,0,0.8), 0 30px 60px -30px rgba(108,232,236,0.18)",
                }}
              >
                <img
                  src="https://customer-assets.emergentagent.com/job_magazine-dev/artifacts/mlpz2bq4_WhatsApp%20Image%202026-05-07%20at%201.09.19%20PM.jpeg"
                  alt="Portrait — Kunal Jain"
                  data-testid="about-portrait"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="grain" />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: "linear-gradient(180deg, transparent 60%, rgba(5,7,15,0.85) 100%)" }}
                />
              </div>
            </figure>
          </div>

          <div className="col-span-12 md:col-span-7 lg:col-span-8 min-w-0 reveal" style={{ transitionDelay: "150ms" }}>
            <h2 className="font-tight text-[32px] sm:text-[44px] lg:text-[54px] leading-[1.06] text-[var(--ink)] max-w-[18ch] mb-7 md:mb-9">
              Between design{" "}
              <em className="font-italic text-[var(--cyan)]">and</em> code.
            </h2>

            <div className="space-y-6 md:space-y-7 text-[15px] md:text-[16px] leading-[1.85] md:leading-[1.9] text-[var(--ink)] max-w-[62ch]">
              <p>
                I started by making things I wanted to exist — logos first,
                then layouts, then the code to bring them to life. Somewhere
                along the way the two halves merged, and now I work in the
                space between design and engineering.
              </p>
              <p className="text-[var(--ink-soft)]">
                That overlap is the point. Because I both design and build,
                nothing gets lost in a handoff — the type, the spacing, the
                small interactions that make a site feel considered survive
                all the way to production.
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
                idea and I'll give you an honest read — what's worth
                building, what isn't, and what it should look like when
                it's done.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
