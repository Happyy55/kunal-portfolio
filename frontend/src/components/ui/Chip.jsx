const ACCENT = { cyan: "var(--cyan)", gold: "var(--gold)", violet: "var(--violet)" };

export const Chip = ({ children, accent = "cyan" }) => (
  <span className="ui-chip" style={{ "--chip-accent": ACCENT[accent] || ACCENT.cyan }}>
    <span className="ui-chip-dot" />
    {children}
  </span>
);

export default Chip;
