import { Suspense, useMemo, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";

/**
 * SpiralCube — the same cube from the hero, arrived here. It spins slowly,
 * a spiral of particles orbits it climbing and looping, and four capability
 * words cross-fade in sequence around it. This is a companion piece to
 * ParticleCube.jsx (shares the same shell-sampling approach) rather than a
 * literal persisted WebGL object — two synced components reading as one
 * continuous idea across the section boundary.
 */

const CUBE_HALF = 0.95;
const SPIRAL_COUNT = 260;
const LABELS = ["We Learn", "We Design", "We Build", "We Ship"];
const LABEL_CYCLE = 2.6; // seconds per label

function mulberry32(seed) {
  let a = seed;
  return function () {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const buildCubeShellPoint = (rand) => {
  const face = Math.floor(rand() * 6);
  const u = (rand() * 2 - 1) * CUBE_HALF;
  const v = (rand() * 2 - 1) * CUBE_HALF;
  switch (face) {
    case 0: return [CUBE_HALF, u, v];
    case 1: return [-CUBE_HALF, u, v];
    case 2: return [u, CUBE_HALF, v];
    case 3: return [u, -CUBE_HALF, v];
    case 4: return [u, v, CUBE_HALF];
    default: return [u, v, -CUBE_HALF];
  }
};

const CubeShell = () => {
  const geometry = useMemo(() => {
    const rand = mulberry32(2024);
    const count = 900;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const [x, y, z] = buildCubeShellPoint(rand);
      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return geo;
  }, []);

  return (
    <points geometry={geometry}>
      <pointsMaterial
        size={0.028}
        color="#6ce8ec"
        transparent
        opacity={0.85}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
};

// particles climbing a spiral around the cube, looping continuously
const SpiralField = () => {
  const ref = useRef(null);

  const { geometry, radii, speeds, heights, angles } = useMemo(() => {
    const rand = mulberry32(77);
    const pos = new Float32Array(SPIRAL_COUNT * 3);
    const radii = new Float32Array(SPIRAL_COUNT);
    const speeds = new Float32Array(SPIRAL_COUNT);
    const heights = new Float32Array(SPIRAL_COUNT);
    const angles = new Float32Array(SPIRAL_COUNT);
    for (let i = 0; i < SPIRAL_COUNT; i++) {
      radii[i] = 1.5 + rand() * 0.9;
      speeds[i] = 0.25 + rand() * 0.35;
      heights[i] = rand() * 3.2 - 1.6;
      angles[i] = rand() * Math.PI * 2;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return { geometry: geo, radii, speeds, heights, angles };
  }, []);

  useFrame((state, delta) => {
    const posAttr = ref.current?.geometry?.attributes?.position;
    if (!posAttr) return;
    for (let i = 0; i < SPIRAL_COUNT; i++) {
      angles[i] += delta * speeds[i];
      heights[i] += delta * speeds[i] * 0.35;
      if (heights[i] > 1.6) heights[i] = -1.6;
      const r = radii[i];
      posAttr.array[i * 3] = Math.cos(angles[i]) * r;
      posAttr.array[i * 3 + 1] = heights[i];
      posAttr.array[i * 3 + 2] = Math.sin(angles[i]) * r;
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial
        size={0.02}
        color="#d4b486"
        transparent
        opacity={0.65}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
};

const FloatingLabels = () => {
  const [active, setActive] = useState(0);
  const groupRef = useRef(null);
  const t = useRef(0);

  useEffect(() => {
    const id = setInterval(() => setActive((v) => (v + 1) % LABELS.length), LABEL_CYCLE * 1000);
    return () => clearInterval(id);
  }, []);

  useFrame((state, delta) => {
    t.current += delta;
    if (groupRef.current) groupRef.current.rotation.y = t.current * 0.05;
  });

  const anchors = [
    [0, 1.5, 0.4],
    [1.6, 0, 0.2],
    [0, -1.5, 0.4],
    [-1.6, 0, 0.2],
  ];

  return (
    <group ref={groupRef}>
      {anchors.map((pos, i) => (
        <Html
          key={LABELS[i]}
          position={pos}
          center
          style={{
            pointerEvents: "none",
            transition: "opacity 600ms ease, transform 600ms ease",
            opacity: active === i ? 1 : 0,
            transform: active === i ? "translateY(0)" : "translateY(6px)",
            fontFamily: "JetBrains Mono, ui-monospace, monospace",
            fontSize: "13px",
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "#6ce8ec",
            textShadow: "0 0 14px rgba(108,232,236,0.55)",
            whiteSpace: "nowrap",
          }}
        >
          {LABELS[i]}
        </Html>
      ))}
    </group>
  );
};

const Scene = () => {
  const groupRef = useRef(null);
  const target = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.12;
    target.current.x = state.pointer.y * 0.08;
    target.current.y = state.pointer.x * 0.1;
    groupRef.current.rotation.x += (target.current.x - groupRef.current.rotation.x) * 0.04;
  });

  return (
    <group ref={groupRef}>
      <CubeShell />
      <SpiralField />
      <FloatingLabels />
      <pointLight position={[0, 0, 0]} color="#d4b486" intensity={3} distance={4} />
    </group>
  );
};

const canRenderWebGL = () => {
  try {
    const canvas = document.createElement("canvas");
    return !!(window.WebGLRenderingContext && (canvas.getContext("webgl") || canvas.getContext("experimental-webgl")));
  } catch {
    return false;
  }
};

export const SpiralCube = ({ className = "" }) => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (!reduced && canRenderWebGL()) setEnabled(true);
  }, []);

  const dpr = useMemo(() => [1, Math.min(window.devicePixelRatio || 1, 1.75)], []);

  if (!enabled) return null;

  return (
    <div className={className}>
      <Canvas
        gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
        dpr={dpr}
        camera={{ position: [0, 0, 5.2], fov: 45 }}
        onCreated={({ gl }) => {
          gl.domElement.setAttribute("role", "img");
          gl.domElement.setAttribute(
            "aria-label",
            "Rotating cube with an orbiting spiral of particles, cycling through the words: We Learn, We Design, We Build, We Ship"
          );
        }}
      >
        <ambientLight intensity={0.3} />
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default SpiralCube;
