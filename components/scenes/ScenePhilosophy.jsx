/**
 * Scene 02 — Philosophy.
 * Not "About". No portrait, no bio. One editorial line, centered,
 * maximal whitespace. The Engine (connect state) does the emotional
 * work of "entering another layer" — this scene just gets out of the way.
 */
export const ScenePhilosophy = () => {
  return (
    <section
      id="philosophy"
      data-testid="scene-philosophy"
      className="relative min-h-[100svh] flex items-center justify-center"
    >
      <div className="relative z-10 max-w-[1240px] mx-auto px-6 md:px-10 w-full text-center">
        <p className="reveal font-serif italic text-[26px] sm:text-[36px] lg:text-[44px] leading-[1.4] text-[var(--ink)] max-w-[26ch] mx-auto">
          Thoughtful products are built through clarity, collaboration, and careful engineering.
        </p>
      </div>
    </section>
  );
};

export default ScenePhilosophy;
