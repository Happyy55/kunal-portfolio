const GLOW = {
  cyan: "var(--cyan-glow)",
  gold: "rgba(212,180,134,0.35)",
};

export const CapabilityCard = ({ icon: Icon, title, description, accent = "cyan", className = "" }) => (
  <div className={`capability-card ${className}`}>
    <div
      className="capability-card-glow"
      style={{ background: `radial-gradient(circle at 30% 0%, ${GLOW[accent] || GLOW.cyan}, transparent 60%)` }}
      aria-hidden
    />
    <div className="capability-card-icon">
      <Icon size={22} strokeWidth={1.6} />
    </div>
    <h3 className="capability-card-title">{title}</h3>
    <p className="capability-card-desc">{description}</p>
  </div>
);

export default CapabilityCard;
