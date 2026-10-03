export const About = () => (
  <section id="about" data-testid="about-section">
    <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-20 md:py-32">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
        <div className="lg:col-span-5 reveal">
          <div className="lg:sticky lg:top-32">
            <div className="section-mark mb-6">About</div>
            <h2 className="font-tight text-[36px] sm:text-[48px] lg:text-[58px] leading-[1.04] text-[var(--ink)] max-w-[14ch]">
              Between design <span className="text-[var(--cyan)]">and</span> code.
            </h2>
            <p className="mt-6 font-mono text-[12.5px] tracking-[0.08em] text-[var(--ink-muted)]">
              Kunal Jain · Founder, KJ Studio · Ahmedabad
            </p>
          </div>
        </div>

        <div className="lg:col-span-7 reveal space-y-6 text-[16px] md:text-[17px] leading-[1.85] max-w-[62ch]">
          <p className="text-[var(--ink)]">
            I started by making things I wanted to exist: logos first, then
            layouts, then the code to bring them to life. Somewhere along the
            way the two halves merged, and now I work in the space between
            design and engineering. Because I both design and build, nothing
            gets lost in a handoff. The type, the spacing and the small
            interactions that make a site feel considered survive all the way
            to production.
          </p>
          <p className="text-[var(--ink-soft)]">
            Everything on this site was made for real use: a cloud product's
            public face, a consultancy's new home, a ledger app shopkeepers
            open every morning. Real clients, real problems, shipped work.
          </p>
          <p className="text-[var(--ink-soft)]">
            I work best with founders and small teams who want one person to
            care about the whole picture. Bring me a rough idea and I'll give
            you an honest read: what's worth building, what isn't, and what it
            should look like when it's done.
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default About;
