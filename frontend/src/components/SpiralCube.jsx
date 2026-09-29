import { Suspense, useMemo, useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { PALETTE } from "../lib/palette";

/**
 * SpiralCube — a slowly spinning wireframe cube with a particle shell and
 * an orbiting spiral of particles around it. Sits alongside the five
 * capability items in "The Craft" as the section's visual centerpiece.
 */

const CUBE_HALF = 0.95;
const SPIRAL_COUNT = 260;

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
        color={PALETTE.cyan}
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
        color={PALETTE.gold}
        transparent
        opacity={0.65}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
};

// Visible cube edges — the dot-shell alone reads as a loose cloud rather
// than an actual cube, this makes the geometry legible.
const CubeWireframe = () => {
  const geometry = useMemo(
    () => new THREE.EdgesGeometry(new THREE.BoxGeometry(CUBE_HALF * 2, CUBE_HALF * 2, CUBE_HALF * 2)),
    []
  );
  return (
    <lineSegments geometry={geometry}>
      <lineBasicMaterial color={PALETTE.violet} transparent opacity={0.5} />
    </lineSegments>
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
      <CubeWireframe />
      <SpiralField />
      <pointLight position={[0, 0, 0]} color={PALETTE.gold} intensity={3} distance={4} />
    </group>
  );
};

// The cube's rotation/spiral/badge-fade are all perpetual, time-based
// animations with no settling point — frameloop="demand" would need an
// invalidate() every single frame to keep them going anyway, which is the
// same GPU cost as "always" with more moving parts. The real waste is
// rendering at all while this scene is scrolled off-screen (e.g. the
// visitor has reached Contact/Footer), so pause the loop entirely then and
// resume the exact original always-on behavior once it's back in view.
function VisibilityFrameloop({ visible }) {
  const setFrameloop = useThree((state) => state.setFrameloop);
  useEffect(() => {
    setFrameloop(visible ? "always" : "never");
  }, [visible, setFrameloop]);
  return null;
}

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
  const [isVisible, setIsVisible] = useState(true);
  const wrapRef = useRef(null);

  useEffect(() => {
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (!reduced && canRenderWebGL()) setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled || !wrapRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin: "200px 0px" }
    );
    observer.observe(wrapRef.current);
    return () => observer.disconnect();
  }, [enabled]);

  const dpr = useMemo(() => [1, Math.min(window.devicePixelRatio || 1, 1.75)], []);

  if (!enabled) return null;

  return (
    <div ref={wrapRef} className={className} style={{ position: "relative" }}>
      <Canvas
        gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
        dpr={dpr}
        camera={{ position: [0, 0, 5.2], fov: 45 }}
        onCreated={({ gl }) => {
          gl.domElement.setAttribute("role", "img");
          gl.domElement.setAttribute(
            "aria-label",
            "Rotating wireframe cube with an orbiting spiral of particles"
          );
        }}
      >
        <VisibilityFrameloop visible={isVisible} />
        <ambientLight intensity={0.3} />
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default SpiralCube;
