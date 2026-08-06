import { useMagnetic } from "../../hooks/useMagnetic";

/**
 * Scene 07 — Let's Build Together. Lowest cognitive load of the page.
 * The Engine is at rest here, fully resolved into the KJ mark (see
 * Engine.jsx "mark" state) — the destination, not a recurring brand asset.
 */
export const SceneCTA = () => {
  useMagnetic("#scene-cta-magnetic", 0.28);

  return (
    <section
      id="contact"
      data-testid="scene-cta"
      className="relative min-h-[100svh] flex items-center justify-center"
    >
      <div className="relative z-10 max-w-[1240px] mx-auto px-6 md:px-10 w-full text-center">
        <h2 className="reveal font-tight text-display-lg text-[var(--ink)] max-w-[16ch] mx-auto mb-9">
          Let's build something worth remembering.
        </h2>
        <div className="reveal" style={{ transitionDelay: "150ms" }}>
          <a
            href="mailto:kunalsethia73800@gmail.com"
            data-testid="cta-start-conversation"
            id="scene-cta-magnetic"
            className="magnetic inline-block"
            data-magnetic
          >
            <span className="btn-primary" data-magnetic-target>
              <span>Start a conversation</span>
              <span className="arrow-dot" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default SceneCTA;
