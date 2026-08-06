/**
 * Scene 06 — Closing Philosophy. Rhymes with Scene 02's restraint, but
 * this is a conclusion, not a thesis — shorter, quieter. The Engine
 * (converge state, transitioning toward mark) does the emotional work
 * of "the story completing" — this scene stays almost still.
 */
export const SceneClosing = () => {
  return (
    <section
      id="closing"
      data-testid="scene-closing"
      className="relative min-h-[100svh] flex items-center justify-center"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-[var(--cyan)]" style={{ boxShadow: "0 0 8px var(--cyan-glow)" }} aria-hidden />
      <div className="relative z-10 max-w-[1240px] mx-auto px-6 md:px-10 w-full text-center">
        <p className="reveal font-serif italic text-[22px] sm:text-[30px] lg:text-[36px] leading-[1.4] text-[var(--ink-soft)] max-w-[22ch] mx-auto">
          Good work looks inevitable. It rarely happens by accident.
        </p>
      </div>
    </section>
  );
};

export default SceneClosing;
