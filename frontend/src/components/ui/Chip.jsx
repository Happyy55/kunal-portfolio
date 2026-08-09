const ACCENT_VAR = {
  cyan: { color: "var(--cyan)", glow: "var(--cyan-glow)" },
  gold: { color: "var(--gold)", glow: "rgba(212,180,134,0.5)" },
  violet: { color: "var(--violet)", glow: "var(--violet-glow)" },
};

/**
 * Shared pill-with-a-dot chip. Replaces the four near-identical hand-rolled
 * versions that used to live in Toolkit (.cap), SelectedWork/SignatureSection
 * (.capability-pill), and CaseStudy — same shape everywhere, personality
 * comes from the `accent` prop and whatever's passed as children.
 */
export const Chip = ({ children, accent = "cyan", className = "", testId }) => {
  const a = ACCENT_VAR[accent] || ACCENT_VAR.cyan;
  return (
    <span
      className={`ui-chip ${className}`}
      style={{ "--chip-accent": a.color, "--chip-accent-glow": a.glow }}
      data-testid={testId}
    >
      <span className="ui-chip-dot" />
      {children}
    </span>
  );
};

export default Chip;
