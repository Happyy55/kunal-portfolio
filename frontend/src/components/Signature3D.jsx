import { Suspense, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Float, Html } from "@react-three/drei";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger, useGSAP);

function Crystal({ scrollSpeed }) {
  const meshRef = useRef(null);
  const groupRef = useRef(null);
  const target = useRef({ x: 0, y: 0 });

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
  });

  return (
    <group ref={groupRef}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.4, 1]} />
        <MeshDistortMaterial
          color="#0b0e18"
          emissive="#22e6ff"
          emissiveIntensity={0.18}
          roughness={0.15}
          metalness={0.85}
          distort={0.28}
          speed={1.6}
        />
      </mesh>
      <mesh scale={1.012}>
        <icosahedronGeometry args={[1.4, 1]} />
        <meshBasicMaterial color="#8b5cf6" wireframe transparent opacity={0.18} />
      </mesh>
      <Html center distanceFactor={6} style={{ pointerEvents: "none" }}>
        <div
          style={{
            fontFamily: "monospace",
            fontWeight: 700,
            fontSize: 22,
            color: "#eef6f7",
            letterSpacing: "0.02em",
            textShadow: "0 0 18px rgba(34,230,255,.9), 0 0 40px rgba(139,92,246,.6)",
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
            background: "linear-gradient(135deg, rgba(34,230,255,.15), rgba(139,92,246,.15))",
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
    <div style={{ height: 380 }} data-testid="signature-3d">
      <Canvas camera={{ position: [0, 0, 4.2], fov: 42 }} dpr={[1, 1.6]} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[3, 3, 3]} intensity={1.4} color="#22e6ff" />
        <pointLight position={[-3, -2, 2]} intensity={1.1} color="#8b5cf6" />
        <Suspense fallback={null}>
          <Float speed={1.4} rotationIntensity={0.3} floatIntensity={0.6}>
            <Crystal scrollSpeed={scrollSpeed} />
          </Float>
        </Suspense>
        <Rig scrollSpeed={scrollSpeed} sectionRef={sectionRef} />
      </Canvas>
    </div>
  );
};

export default Signature3D;
