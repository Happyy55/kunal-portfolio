import { useRef, useState } from "react";
import { motion } from "framer-motion";

export const CapabilityCard = ({ icon: Icon, number, title, description, accent = "cyan", className = "", srPrefix }) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setRotation({ x: -(y / rect.height) * 6, y: (x / rect.width) * 6 });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
  };

  const glow = accent === "gold" ? "var(--gold)" : "var(--cyan)";
  const glowSoft = accent === "gold" ? "rgba(212,180,134,0.35)" : "var(--cyan-glow)";

  return (
    <motion.div
      ref={cardRef}
      className={`capability-card ${className}`}
      style={{ transformStyle: "preserve-3d" }}
      initial={{ y: 0 }}
      animate={{ y: isHovered ? -6 : 0, rotateX: rotation.x, rotateY: rotation.y }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      <div className="capability-card-glow" style={{ background: `radial-gradient(circle at 30% 0%, ${glowSoft}, transparent 60%)` }} aria-hidden />
      <span className="capability-card-number" style={{ color: glow }}>{number}</span>

      <motion.div
        className="capability-card-icon"
        animate={{ rotate: isHovered ? -8 : 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <Icon size={22} strokeWidth={1.6} />
      </motion.div>

      <h3 className="capability-card-title">
        {srPrefix && <span className="sr-only">{srPrefix} — </span>}
        {title}
      </h3>
      <p className="capability-card-desc">{description}</p>
    </motion.div>
  );
};

export default CapabilityCard;
