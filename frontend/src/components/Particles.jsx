import { useMemo } from "react";

// Drifting dots + twinkling stars behind the whole site. CSS-animated and
// placed once on mount; hidden on phones (see .particles in index.css).
function scatter(n, minSize, sizeRange, minDuration, durationRange, delayRange) {
  return Array.from({ length: n }, () => {
    const size = minSize + Math.random() * sizeRange;
    return {
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      width: size,
      height: size,
      animationDelay: `${-Math.random() * delayRange}s`,
      animationDuration: `${minDuration + Math.random() * durationRange}s`,
    };
  });
}

export default function Particles({ count = 18, starCount = 12 }) {
  const dots = useMemo(() => scatter(count, 1, 2.2, 10, 12, 14), [count]);
  const stars = useMemo(() => scatter(starCount, 1.5, 2, 2.6, 3.2, 6), [starCount]);

  return (
    <div className="particles" style={{ position: "fixed", zIndex: 0 }} aria-hidden>
      {dots.map((style, i) => <span key={`d${i}`} className="particle" style={style} />)}
      {stars.map((style, i) => <span key={`s${i}`} className="twinkle-star" style={style} />)}
    </div>
  );
}
