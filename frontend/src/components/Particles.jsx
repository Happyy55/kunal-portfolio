import { useMemo } from "react";

/**
 * Lightweight floating particle layer.
 * Particles are positioned randomly once on mount and animated via CSS.
 */
export default function Particles({ count = 18, className = "" }) {
  const dots = useMemo(
    () =>
      Array.from({ length: count }).map(() => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 1 + Math.random() * 2.2,
        delay: -Math.random() * 14,
        duration: 10 + Math.random() * 12,
      })),
    [count]
  );

  return (
    <div className={`particles ${className}`} aria-hidden>
      {dots.map((d, i) => (
        <span
          key={i}
          style={{
            left: `${d.left}%`,
            top: `${d.top}%`,
            width: d.size,
            height: d.size,
            animationDelay: `${d.delay}s`,
            animationDuration: `${d.duration}s`,
          }}
        />
      ))}
    </div>
  );
}
