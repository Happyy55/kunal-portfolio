import { useEffect, useRef } from "react";

/**
 * Interactive 3D business card.
 * - Hover to flip (front ↔ back).
 * - Floats and tilts to pointer.
 * - Pure SVG + CSS — no Three.js.
 */
export const BusinessCard = () => {
  const stageRef = useRef(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    if (window.matchMedia("(hover: none)").matches) return;
    let raf = 0;
    let mx = 0, my = 0, cx = 0, cy = 0;
    const t0 = performance.now();

    const onMove = (e) => {
      const r = stage.getBoundingClientRect();
      const px = (e.clientX - (r.left + r.width / 2)) / r.width;
      const py = (e.clientY - (r.top + r.height / 2)) / r.height;
      mx = Math.max(-1, Math.min(1, px * 2));
      my = Math.max(-1, Math.min(1, py * 2));
    };
    const loop = (now) => {
      const t = (now - t0) / 1000;
      // gentle idle float
      const baseX = Math.sin(t * 0.22) * 3;
      const baseY = Math.cos(t * 0.18) * 4;
      const targetX = baseX - my * 8;
      const targetY = baseY + mx * 10;
      cx += (targetX - cx) * 0.07;
      cy += (targetY - cy) * 0.07;
      stage.style.transform = `rotateX(${cx.toFixed(2)}deg) rotateY(${cy.toFixed(2)}deg)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      data-testid="business-card-3d"
      aria-hidden
      className="relative"
      style={{ width: "100%", maxWidth: 520 }}
    >
      {/* halo */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: "-12%",
          background:
            "radial-gradient(50% 50% at 35% 40%, rgba(108,232,236,0.28) 0%, transparent 70%), radial-gradient(60% 50% at 70% 70%, rgba(168,121,255,0.35) 0%, transparent 70%)",
          filter: "blur(40px)",
          opacity: 0.95,
          pointerEvents: "none",
        }}
      />
      <div
        className="bcard-stage"
        style={{ width: "100%" }}
      >
        <div className="bcard-tilt" ref={stageRef} style={{ width: "100%", height: "100%", transformStyle: "preserve-3d", willChange: "transform" }}>
          <div className="bcard">
            {/* Front */}
            <div className="face front">
              <CardFront />
            </div>
            {/* Back */}
            <div className="face back">
              <CardBack />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const baseGradient =
  "radial-gradient(120% 100% at 0% 0%, rgba(168,121,255,0.32) 0%, transparent 55%), radial-gradient(120% 100% at 100% 100%, rgba(108,232,236,0.24) 0%, transparent 55%), linear-gradient(135deg, #0F1226 0%, #0A0B14 60%, #110A28 100%)";

const CardFront = () => (
  <div
    style={{
      position: "absolute",
      inset: 0,
      borderRadius: 16,
      background: baseGradient,
      border: "1px solid rgba(255,255,255,0.10)",
      boxShadow:
        "0 50px 120px -20px rgba(108,232,236,0.22), 0 50px 120px -20px rgba(168,121,255,0.32), inset 0 0 0 1px rgba(255,255,255,0.03)",
      overflow: "hidden",
    }}
  >
    <svg viewBox="0 0 330 200" preserveAspectRatio="xMidYMid slice"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
      <defs>
        <linearGradient id="trace" x1="0" x2="1">
          <stop offset="0" stopColor="#6CE8EC" stopOpacity="0" />
          <stop offset="0.4" stopColor="#6CE8EC" stopOpacity="0.95" />
          <stop offset="1" stopColor="#A879FF" stopOpacity="0.75" />
        </linearGradient>
        <linearGradient id="chip" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#8B7BFF" stopOpacity="0.55" />
          <stop offset="1" stopColor="#5A4FDB" stopOpacity="0.45" />
        </linearGradient>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.5" />
        </filter>
        <filter id="sg" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="0.8" />
        </filter>
        <pattern id="cardgrid" width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M24 0 L0 0 0 24" fill="none" stroke="rgba(255,255,255,0.045)" strokeWidth="1" />
        </pattern>
        <radialGradient id="cornerGlow" cx="0.85" cy="0.9" r="0.7">
          <stop offset="0" stopColor="#A879FF" stopOpacity="0.35" />
          <stop offset="1" stopColor="#A879FF" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* grid + corner glow */}
      <rect x="0" y="0" width="330" height="200" fill="url(#cardgrid)" />
      <rect x="0" y="0" width="330" height="200" fill="url(#cornerGlow)" />

      {/* corner brackets */}
      <g stroke="#6CE8EC" strokeOpacity="0.75" strokeWidth="1" fill="none">
        <path d="M10 6 L10 14 L18 14" />
        <path d="M312 6 L320 6 L320 14" />
        <path d="M10 186 L10 194 L18 194" />
        <path d="M312 194 L320 194 L320 186" />
      </g>

      {/* KJ chip — violet rounded square, top-left */}
      <g transform="translate(20 18)">
        <rect x="0" y="0" width="42" height="42" rx="11" fill="url(#chip)" stroke="rgba(160,150,255,0.55)" />
        <rect x="1" y="1" width="40" height="20" rx="10" fill="rgba(255,255,255,0.10)" />
        <text x="21" y="28" textAnchor="middle" fill="#fff" fontSize="16" fontWeight="700" fontFamily="'Geist', sans-serif">KJ</text>
      </g>

      {/* AVAILABLE pill — top right */}
      <g transform="translate(222 22)">
        <rect x="0" y="0" width="88" height="22" rx="11" fill="rgba(10,12,22,0.65)" stroke="rgba(255,255,255,0.18)" />
        <circle cx="13" cy="11" r="2.6" fill="#6CE8EC" filter="url(#sg)" />
        <circle cx="13" cy="11" r="2" fill="#6CE8EC" />
        <text x="24" y="14.5" fill="#D9DEEA" fontSize="7.5" letterSpacing="2.4" fontFamily="'JetBrains Mono', monospace">AVAILABLE</text>
      </g>

      {/* circuit trace — behind name, stepping right like reference */}
      <g filter="url(#glow)" opacity="0.6">
        <path d="M150 96 L196 96 L212 82 L262 82 L276 96 L320 96" stroke="#3E9BFF" strokeWidth="1.8" fill="none" />
      </g>
      <path d="M150 96 L196 96 L212 82 L262 82 L276 96 L320 96" stroke="url(#trace)" strokeWidth="1.2" fill="none" />
      <circle cx="196" cy="96" r="2.6" fill="#6CE8EC" filter="url(#sg)" />
      <circle cx="262" cy="82" r="2.6" fill="#A879FF" filter="url(#sg)" />

      {/* small trace above chip */}
      <path d="M78 34 L120 34 L132 24 L188 24" stroke="rgba(108,232,236,0.4)" strokeWidth="1" fill="none" />
      <circle cx="120" cy="34" r="1.7" fill="#6CE8EC" opacity="0.8" />

      {/* name + role */}
      <text x="20" y="106" fill="#fff" fontFamily="'Geist', sans-serif" fontWeight="700" fontSize="36" letterSpacing="-1.4">
        Kunal Jain
      </text>
      <text x="21" y="130" fill="#C9D0E3" fontFamily="'Geist', sans-serif" fontSize="11" fontWeight="500" letterSpacing="0.2">
        Creative Developer
      </text>

      {/* lower-left trace like reference */}
      <path d="M20 150 L58 150 L70 160 L118 160" stroke="rgba(108,232,236,0.5)" strokeWidth="1" fill="none" />
      <circle cx="118" cy="160" r="2" fill="none" stroke="#6CE8EC" strokeWidth="1" />
      <path d="M232 140 L268 140 L280 130 L320 130" stroke="rgba(168,121,255,0.45)" strokeWidth="1" fill="none" />
      <circle cx="268" cy="140" r="1.6" fill="#A879FF" opacity="0.9" />

      {/* website — arrow circle + url, bottom left */}
      <g transform="translate(20 168)">
        <circle cx="10" cy="10" r="10" fill="rgba(255,255,255,0.07)" stroke="rgba(255,255,255,0.18)" />
        <path d="M6.5 10 L13 10 M10.4 6.8 L13.6 10 L10.4 13.2" stroke="#E6E8EE" strokeWidth="1.3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <text x="28" y="13.5" fill="#C9D0E3" fontFamily="'JetBrains Mono', monospace" fontSize="9" letterSpacing="2">www.kjcreator.com</text>
      </g>

      {/* signal bars — bottom right */}
      <g transform="translate(284 164)">
        {[4, 7, 10, 14].map((h, i) => (
          <rect key={i} x={i * 6.5} y={18 - h} width="4" height={h} rx="1" fill="#3E9BFF" opacity={0.5 + i * 0.14} filter="url(#sg)" />
        ))}
      </g>
    </svg>
  </div>
);

const CardBack = () => (
  <div
    style={{
      position: "absolute",
      inset: 0,
      borderRadius: 14,
      background: baseGradient,
      border: "1px solid rgba(255,255,255,0.10)",
      boxShadow:
        "0 50px 120px -20px rgba(108,232,236,0.22), 0 50px 120px -20px rgba(168,121,255,0.32), inset 0 0 0 1px rgba(255,255,255,0.03)",
      overflow: "hidden",
    }}
  >
    <svg viewBox="0 0 330 200" preserveAspectRatio="xMidYMid slice"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
      <defs>
        <linearGradient id="edge2" x1="0" x2="1">
          <stop offset="0" stopColor="#6CE8EC" />
          <stop offset="1" stopColor="#A879FF" />
        </linearGradient>
        <filter id="sg2" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="0.8" />
        </filter>
      </defs>

      {/* brackets */}
      <g stroke="#6CE8EC" strokeOpacity="0.75" strokeWidth="1" fill="none">
        <path d="M10 6 L10 14 L18 14" />
        <path d="M312 6 L320 6 L320 14" />
        <path d="M10 186 L10 194 L18 194" />
        <path d="M312 194 L320 194 L320 186" />
      </g>

      {/* header — CONTACT // KJ.STUDIO */}
      <g transform="translate(22 22)">
        <text x="0" y="10" fill="#6CE8EC" fontFamily="'JetBrains Mono', monospace" fontSize="7" letterSpacing="2.5">CONTACT</text>
        <text x="60" y="10" fill="#E6E8EE" fontFamily="'JetBrains Mono', monospace" fontSize="7" letterSpacing="2.5">// KJ.STUDIO</text>
        <path d="M120 7 L195 7 L205 12 L260 12" stroke="#6CE8EC" strokeWidth="0.8" fill="none" />
        <circle cx="195" cy="7" r="1.4" fill="#6CE8EC" filter="url(#sg2)" />
      </g>

      {/* KJ chip top right */}
      <g transform="translate(284 14)">
        <rect x="0" y="0" width="28" height="28" rx="7" fill="rgba(108,232,236,0.16)" stroke="rgba(108,232,236,0.5)" />
        <text x="14" y="19" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="600" fontFamily="'Geist', sans-serif">KJ</text>
      </g>

      {/* rows */}
      <g transform="translate(22 56)" fontFamily="'JetBrains Mono', monospace">
        {[
          { label: "PHONE", value: "+91 63536 33045" },
          { label: "EMAIL", value: "kunalsethia73800@gmail.com" },
          { label: "WEBSITE", value: "www.kjcreator.com" },
          { label: "LINKEDIN", value: "linkedin.com/in/kunaljain" },
        ].map((row, i) => (
          <g key={row.label} transform={`translate(0 ${i * 30})`}>
            <rect x="0" y="0" width="20" height="20" rx="5" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.1)" />
            <circle cx="10" cy="10" r="2.4" fill="#6CE8EC" />
            <text x="30" y="8" fill="#8A91A6" fontSize="5.5" letterSpacing="2">{row.label}</text>
            <text x="30" y="17" fill="#fff" fontFamily="Geist, sans-serif" fontSize="8.5" fontWeight="500">{row.value}</text>
          </g>
        ))}
      </g>

      {/* QR */}
      <g transform="translate(260 96)">
        <rect x="0" y="0" width="50" height="50" fill="#FFFFFF" rx="3" />
        {/* simple QR-like pattern */}
        {Array.from({ length: 7 }).map((_, r) =>
          Array.from({ length: 7 }).map((_, c) => {
            if ((r * 13 + c * 7) % 3 === 0) {
              return <rect key={`${r}-${c}`} x={4 + c * 6} y={4 + r * 6} width="5" height="5" fill="#0A0B14" />;
            }
            return null;
          })
        )}
        {/* finder squares */}
        <rect x="3" y="3" width="13" height="13" fill="none" stroke="#0A0B14" strokeWidth="2" />
        <rect x="34" y="3" width="13" height="13" fill="none" stroke="#0A0B14" strokeWidth="2" />
        <rect x="3" y="34" width="13" height="13" fill="none" stroke="#0A0B14" strokeWidth="2" />
        <text x="25" y="58" textAnchor="middle" fill="#8A91A6" fontFamily="'JetBrains Mono', monospace" fontSize="4" letterSpacing="1.5">SCAN FOR PORTFOLIO</text>
      </g>

      {/* footer */}
      <g transform="translate(22 184)">
        <circle cx="3" cy="-3" r="2" fill="#6CE8EC" />
        <text x="12" y="0" fill="#8A91A6" fontFamily="'JetBrains Mono', monospace" fontSize="5.5" letterSpacing="2.2">INDEPENDENT STUDIO</text>
        <text x="180" y="0" fill="#5A6178" fontFamily="'JetBrains Mono', monospace" fontSize="5.5" letterSpacing="2.2">AVAILABLE FOR SELECT ENGAGEMENTS</text>
      </g>

      <rect x="14" y="195.5" width="302" height="1" fill="url(#edge2)" filter="url(#sg2)" />
    </svg>
  </div>
);

export default BusinessCard;
