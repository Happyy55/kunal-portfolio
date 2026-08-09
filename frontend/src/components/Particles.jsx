import { useMemo } from "react";

/**
 * Lightweight floating particle layer.
 * Particles are positioned randomly once on mount and animated via CSS.
 */
export default function Particles({ count = 18, starCount = 12, className = "" }) {
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

  const stars = useMemo(
    () =>
      Array.from({ length: starCount }).map(() => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 1.5 + Math.random() * 2,
        delay: -Math.random() * 6,
        duration: 2.6 + Math.random() * 3.2,
      })),
    [starCount]
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
      {stars.map((s, i) => (
        <span
          key={`star-${i}`}
          className="twinkle-star"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
          }}
        />
      ))}
    </div>
  );
}
