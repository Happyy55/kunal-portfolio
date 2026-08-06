import { Suspense, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Float, Html } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Soft radial glow texture, generated once — the "volumetric haze" behind
// the crystal that was missing before (flat single-mesh look).
function useGlowTexture(colorHex) {
  return useMemo(() => {
    const size = 256;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    const grad = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    grad.addColorStop(0, colorHex + "aa");
    grad.addColorStop(0.5, colorHex + "33");
    grad.addColorStop(1, colorHex + "00");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);
    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    return tex;
  }, [colorHex]);
}

function Crystal({ scrollSpeed }) {
  const meshRef = useRef(null);
  const groupRef = useRef(null);
  const coreRef = useRef(null);
  const target = useRef({ x: 0, y: 0 });
  const glowTex = useGlowTexture("#d4b486");

  useFrame((state, delta) => {
    if (!meshRef.current || !groupRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x += delta * (0.12 + scrollSpeed.current * 0.6);
    meshRef.current.rotation.y += delta * (0.18 + scrollSpeed.current * 0.9);

    target.current.x = (state.pointer.y * 0.25);
    target.current.y = (state.pointer.x * 0.35);
    groupRef.current.rotation.x += (target.current.x - groupRef.current.rotation.x) * 0.04;
    groupRef.current.rotation.y += (target.current.y - groupRef.current.rotation.y) * 0.04;
    groupRef.current.position.y = Math.sin(t * 0.5) * 0.12;

    // Gentle core brightness flicker — same "alive, not static" principle
    // used elsewhere: two irrational-ratio sines summed, subtle only.
    if (coreRef.current) {
      const flicker = 1 + Math.sin(t * 2.1) * 0.15 + Math.sin(t * 3.4 + 1.1) * 0.08;
      coreRef.current.material.emissiveIntensity = 0.9 * flicker;
    }
  });

  return (
    <group ref={groupRef}>
      {/* volumetric haze behind everything */}
      <sprite scale={[5.2, 5.2, 1]} position={[0, 0, -0.6]}>
        <spriteMaterial map={glowTex} transparent opacity={0.5} depthWrite={false} toneMapped={false} />
      </sprite>

      {/* outer distorted shell — now brighter, lit from within */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.4, 1]} />
        <MeshDistortMaterial
          color="#0b0e18"
          emissive="#6ce8ec"
          emissiveIntensity={0.35}
          roughness={0.15}
          metalness={0.85}
          distort={0.28}
          speed={1.6}
        />
      </mesh>

      {/* wireframe shell — now gold instead of violet, matches site accent */}
      <mesh scale={1.015}>
        <icosahedronGeometry args={[1.4, 1]} />
        <meshBasicMaterial color="#d4b486" wireframe transparent opacity={0.28} toneMapped={false} />
      </mesh>

      {/* solid glowing core — the "reactor" center that was missing */}
      <mesh ref={coreRef} scale={0.32}>
        <icosahedronGeometry args={[1.4, 0]} />
        <meshStandardMaterial color="#0b0e18" emissive="#d4b486" emissiveIntensity={0.9} toneMapped={false} />
      </mesh>

      <Html center distanceFactor={6} style={{ pointerEvents: "none" }}>
        <div
          style={{
            fontFamily: "monospace",
            fontWeight: 700,
            fontSize: 22,
            color: "#eef6f7",
            letterSpacing: "0.02em",
            textShadow: "0 0 18px rgba(108,232,236,.9), 0 0 40px rgba(212,180,134,.6)",
          }}
        >
          KJ
        </div>
      </Html>
    </group>
  );
}

function Rig({ scrollSpeed, sectionRef }) {
  useGSAP(() => {
    if (!sectionRef?.current) return;
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        scrollSpeed.current = Math.min(1, Math.abs(self.getVelocity()) / 2000);
      },
    });
  }, []);
  return null;
}

export const Signature3D = ({ sectionRef }) => {
  const scrollSpeed = useRef(0);
  const reducedMotion = useMemo(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );

  if (reducedMotion) {
    return (
      <div className="flex items-center justify-center" style={{ height: 320 }}>
        <div
          className="w-40 h-40 rounded-[28px] flex items-center justify-center font-mono font-bold text-[28px]"
          style={{
            background: "linear-gradient(135deg, rgba(108,232,236,.15), rgba(212,180,134,.15))",
            border: "1px solid var(--rule-strong)",
            color: "var(--ink)",
          }}
        >
          KJ
        </div>
      </div>
    );
  }

  return (
    <div style={{ height: 460 }} data-testid="signature-3d">
      <Canvas camera={{ position: [0, 0, 4.2], fov: 42 }} dpr={[1, 1.6]} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[3, 3, 3]} intensity={1.4} color="#6ce8ec" />
        <pointLight position={[-3, -2, 2]} intensity={1.1} color="#d4b486" />
        <Suspense fallback={null}>
          <Float speed={1.4} rotationIntensity={0.3} floatIntensity={0.6}>
            <Crystal scrollSpeed={scrollSpeed} />
          </Float>
        </Suspense>
        <Rig scrollSpeed={scrollSpeed} sectionRef={sectionRef} />
        <EffectComposer>
          <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.4} intensity={0.9} mipmapBlur />
        </EffectComposer>
      </Canvas>
    </div>
  );
};

export default Signature3D;
