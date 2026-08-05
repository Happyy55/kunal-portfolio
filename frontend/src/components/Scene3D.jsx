import { Suspense, useMemo, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Sparkles } from "@react-three/drei";
import * as THREE from "three";

/**
 * Ambient WebGL core behind CompileMark — a distorted icosahedron that
 * idles, drifts toward the pointer, and hardens (less distortion, more
 * emissive) as the hero scrolls out and the signature mark compiles in.
 * Skips entirely for prefers-reduced-motion or when WebGL is unavailable.
 */
const Core = ({ progressRef }) => {
  const meshRef = useRef(null);
  const materialRef = useRef(null);
  const target = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    target.current.x = state.pointer.y * 0.35;
    target.current.y = state.pointer.x * 0.45;
    mesh.rotation.x += (target.current.x - mesh.rotation.x) * 0.04;
    mesh.rotation.y += delta * 0.18 + (target.current.y - mesh.rotation.y) * 0.04;

    const p = progressRef?.current ?? 0;
    if (materialRef.current) {
      materialRef.current.distort = THREE.MathUtils.lerp(0.42, 0.12, p);
      materialRef.current.emissiveIntensity = THREE.MathUtils.lerp(0.35, 1.1, p);
    }
    const s = 1 + p * 0.08;
    mesh.scale.setScalar(s);
  });

  return (
    <>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.3, 6]} />
        <MeshDistortMaterial
          ref={materialRef}
          color="#1c2140"
          emissive="#6ce8ec"
          emissiveIntensity={0.35}
          distort={0.42}
          speed={1.6}
          roughness={0.25}
          metalness={0.4}
          wireframe
        />
      </mesh>
      <Sparkles count={40} scale={3.2} size={2} speed={0.25} color="#a879ff" opacity={0.6} />
    </>
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

export const Scene3D = ({ progressRef, className = "" }) => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (!reduced && canRenderWebGL()) setEnabled(true);
  }, []);

  const dpr = useMemo(() => [1, Math.min(window.devicePixelRatio || 1, 1.75)], []);

  if (!enabled) return null;

  return (
    <div aria-hidden className={`pointer-events-none ${className}`}>
      <Canvas
        gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
        dpr={dpr}
        camera={{ position: [0, 0, 4], fov: 42 }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[3, 2, 4]} color="#6ce8ec" intensity={12} />
        <pointLight position={[-3, -2, -2]} color="#a879ff" intensity={10} />
        <Suspense fallback={null}>
          <Core progressRef={progressRef} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Scene3D;
