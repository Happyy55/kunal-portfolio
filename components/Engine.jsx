import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * The Engine — one particle system, alive from frame one, that morphs
 * through named states as the visitor scrolls the whole homepage.
 * It is never re-mounted between scenes; scroll progress (0-1 across
 * the full page) drives which target shape the particles move toward.
 *
 * States, in story order:
 *   orbit        — Scene 01 Hero: loose orbiting shell, forming
 *   connect      — Scene 02 Philosophy: pairs draw quiet connecting lines
 *   sweep        — Scene 03 Alpha Radar: radar-style rotating sweep
 *   recognition  — Scene 04 Attendly: sparse face-landmark-like points
 *   lines        — Scene 05 Ledger: particles align into horizontal rows
 *   converge     — Scene 06 Closing: rows draw inward toward center
 *   mark         — Scene 07 CTA: resolved into the KJ glyph, at rest
 *
 * A single scroll-progress float (0-1) is mapped to these seven states;
 * particles always interpolate toward their *current* target position,
 * so transitions are continuous motion, not a cut between shapes.
 */

const PARTICLE_COUNT = 900;
const RADIUS = 1.7;

function orbitTargets() {
  const pos = new Float32Array(PARTICLE_COUNT * 3);
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const y = 1 - (i / (PARTICLE_COUNT - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = Math.PI * (1 + Math.sqrt(5)) * i;
    const jitter = 0.18;
    pos[i * 3] = (Math.cos(theta) * r + (Math.random() - 0.5) * jitter) * RADIUS;
    pos[i * 3 + 1] = (y + (Math.random() - 0.5) * jitter) * RADIUS;
    pos[i * 3 + 2] = (Math.sin(theta) * r + (Math.random() - 0.5) * jitter) * RADIUS;
  }
  return pos;
}

function connectTargets() {
  const base = orbitTargets();
  const pos = new Float32Array(PARTICLE_COUNT * 3);
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const pairIdx = i % 2 === 0 ? i + 1 : i - 1;
    const px = base[i * 3], py = base[i * 3 + 1], pz = base[i * 3 + 2];
    const qx = base[pairIdx * 3] ?? px, qy = base[pairIdx * 3 + 1] ?? py, qz = base[pairIdx * 3 + 2] ?? pz;
    pos[i * 3] = px * 0.7 + qx * 0.3;
    pos[i * 3 + 1] = py * 0.7 + qy * 0.3;
    pos[i * 3 + 2] = pz * 0.7 + qz * 0.3;
  }
  return pos;
}

function sweepTargets() {
  const pos = new Float32Array(PARTICLE_COUNT * 3);
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const a = (i / PARTICLE_COUNT) * Math.PI * 2 * 6.2;
    const r = RADIUS * (0.15 + 0.85 * ((i % 300) / 300));
    pos[i * 3] = Math.cos(a) * r;
    pos[i * 3 + 1] = Math.sin(a * 0.5) * 0.12 * RADIUS;
    pos[i * 3 + 2] = Math.sin(a) * r;
  }
  return pos;
}

function recognitionTargets() {
  const anchors = [
    [-0.5, 0.4, 0.3], [0.5, 0.4, 0.3], [0, 0.05, 0.5],
    [-0.35, -0.35, 0.3], [0.35, -0.35, 0.3], [0, -0.55, 0.25],
    [-0.8, 0, -0.2], [0.8, 0, -0.2],
  ];
  const pos = new Float32Array(PARTICLE_COUNT * 3);
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const a = anchors[i % anchors.length];
    const spread = 0.22;
    pos[i * 3] = (a[0] + (Math.random() - 0.5) * spread) * RADIUS;
    pos[i * 3 + 1] = (a[1] + (Math.random() - 0.5) * spread) * RADIUS;
    pos[i * 3 + 2] = (a[2] + (Math.random() - 0.5) * spread) * RADIUS;
  }
  return pos;
}

function linesTargets() {
  const rows = 14;
  const perRow = Math.ceil(PARTICLE_COUNT / rows);
  const pos = new Float32Array(PARTICLE_COUNT * 3);
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const row = Math.floor(i / perRow);
    const col = i % perRow;
    pos[i * 3] = ((col / perRow) - 0.5) * RADIUS * 2.1;
    pos[i * 3 + 1] = (1 - (row / rows) * 2) * RADIUS * 0.85;
    pos[i * 3 + 2] = (Math.random() - 0.5) * 0.08;
  }
  return pos;
}

function convergeTargets() {
  const lines = linesTargets();
  const pos = new Float32Array(PARTICLE_COUNT * 3);
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    pos[i * 3] = lines[i * 3] * 0.35;
    pos[i * 3 + 1] = lines[i * 3 + 1] * 0.5;
    pos[i * 3 + 2] = lines[i * 3 + 2] + (Math.random() - 0.5) * 0.3;
  }
  return pos;
}

function sampleLine([x1, y1], [x2, y2], n) {
  const out = [];
  for (let i = 0; i < n; i++) {
    const t = i / (n - 1);
    out.push([x1 + (x2 - x1) * t, y1 + (y2 - y1) * t]);
  }
  return out;
}

function sampleArc([cx, cy], r, a0, a1, n) {
  const out = [];
  for (let i = 0; i < n; i++) {
    const t = a0 + (a1 - a0) * (i / (n - 1));
    out.push([cx + Math.cos(t) * r, cy + Math.sin(t) * r]);
  }
  return out;
}

function markTargets() {
  const strokes = [
    ...sampleLine([-0.55, 0.55], [-0.55, -0.55], 60),
    ...sampleLine([-0.55, 0.05], [-0.05, 0.55], 42),
    ...sampleLine([-0.55, -0.05], [-0.05, -0.55], 42),
    ...sampleLine([0.15, 0.55], [0.55, 0.55], 34),
    ...sampleLine([0.5, 0.55], [0.5, -0.15], 55),
    // shorter, more open hook (~117°, not a near-full circle) — an
    // earlier version swept ~189° and read ambiguously close to an "O"
    // when verified as a rendered point cloud; this reads unambiguously
    // as a J-hook instead.
    ...sampleArc([0.32, -0.15], 0.18, Math.PI * 0.5, Math.PI * 1.15, 30),
  ];
  const pos = new Float32Array(PARTICLE_COUNT * 3);
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const s = strokes[i % strokes.length];
    const jitter = 0.012;
    pos[i * 3] = s[0] * RADIUS + (Math.random() - 0.5) * jitter;
    pos[i * 3 + 1] = s[1] * RADIUS + (Math.random() - 0.5) * jitter;
    pos[i * 3 + 2] = (Math.random() - 0.5) * 0.04;
  }
  return pos;
}

const STATE_ORDER = ["orbit", "connect", "sweep", "recognition", "lines", "converge", "mark"];
// All seven scenes share the same min-h-[100svh] contract, so total page
// height is ~7 equal viewport-heights. Breakpoints are therefore i/6 —
// verified against actual scene markup rather than estimated by eye.
const BREAKPOINTS = [0, 1 / 6, 2 / 6, 3 / 6, 4 / 6, 5 / 6, 1];

function stateBlend(progress) {
  const p = Math.min(1, Math.max(0, progress));
  for (let i = 0; i < BREAKPOINTS.length - 1; i++) {
    if (p >= BREAKPOINTS[i] && p <= BREAKPOINTS[i + 1]) {
      const local = (p - BREAKPOINTS[i]) / (BREAKPOINTS[i + 1] - BREAKPOINTS[i] || 1);
      return { from: STATE_ORDER[i], to: STATE_ORDER[i + 1], t: local };
    }
  }
  return { from: "mark", to: "mark", t: 1 };
}

function EngineParticles({ scrollRef }) {
  const pointsRef = useRef(null);
  const targets = useMemo(
    () => ({
      orbit: orbitTargets(),
      connect: connectTargets(),
      sweep: sweepTargets(),
      recognition: recognitionTargets(),
      lines: linesTargets(),
      converge: convergeTargets(),
      mark: markTargets(),
    }),
    []
  );

  const positions = useMemo(() => new Float32Array(targets.orbit), [targets]);
  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return g;
  }, [positions]);

  const colorCyan = useMemo(() => new THREE.Color(0x5fd9dd), []);
  const colorViolet = useMemo(() => new THREE.Color(0x9a78e8), []);
  const colorFaint = useMemo(() => new THREE.Color(0x8a8fa0), []);

  const material = useMemo(
    () =>
      new THREE.PointsMaterial({
        size: 0.022,
        transparent: true,
        opacity: 0.85,
        color: colorFaint,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    [colorFaint]
  );

  useFrame((state, delta) => {
    const group = pointsRef.current;
    if (!group) return;

    const progress = scrollRef.current ?? 0;
    const { from, to, t } = stateBlend(progress);
    const fromArr = targets[from];
    const toArr = targets[to];
    const arr = geometry.attributes.position.array;

    const eased = t * t * (3 - 2 * t);

    for (let i = 0; i < PARTICLE_COUNT * 3; i++) {
      const targetVal = fromArr[i] + (toArr[i] - fromArr[i]) * eased;
      arr[i] += (targetVal - arr[i]) * Math.min(1, delta * 2.6);
    }
    geometry.attributes.position.needsUpdate = true;

    const spin = Math.max(0.02, 0.12 * (1 - progress * 0.85));
    group.rotation.y += delta * spin;

    const tt = state.clock.getElapsedTime();
    const breathAmp = 0.03 * (1 - progress * 0.6);
    const s = 1 + Math.sin(tt * 0.9) * breathAmp;
    group.scale.setScalar(s);

    const liveMix = Math.min(1, progress * 2.2);
    const resolvedMix = Math.max(0, (progress - 0.82) / 0.18);
    const c = colorFaint.clone().lerp(colorCyan, liveMix * 0.7);
    c.lerp(colorViolet, Math.sin(tt * 0.3) * 0.15 + 0.15);
    c.lerp(colorCyan, resolvedMix * 0.5);
    material.color.copy(c);
    material.opacity = 0.55 + liveMix * 0.35 - resolvedMix * 0.05;
  });

  return (
    <group ref={pointsRef}>
      <points geometry={geometry} material={material} />
    </group>
  );
}

/**
 * Engine — mount once at the page root. `scrollRef` is a ref containing
 * a 0-1 float (page scroll progress); the consumer is responsible for
 * updating it (see useEngineScroll hook). Rendered as a fixed full-
 * viewport Canvas sitting behind all scene content.
 */
export const Engine = ({ scrollRef, className = "" }) => {
  return (
    <div
      className={`pointer-events-none ${className}`}
      data-testid="engine-canvas"
      aria-hidden
      style={{ position: "fixed", inset: 0, zIndex: 1 }}
    >
      <Canvas
        camera={{ position: [0, 0, 4.4], fov: 40 }}
        dpr={[1, 1.6]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <EngineParticles scrollRef={scrollRef} />
      </Canvas>
    </div>
  );
};

export default Engine;
