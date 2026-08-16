import { useMemo, useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree, invalidate } from "@react-three/fiber";
import * as THREE from "three";

/**
 * RobotCompanion — a cursor-following character for the Hero's right side.
 * Ported from a third-party robot-hero component: the navbar/CTA/background-
 * text wrapper it shipped with is dropped entirely (not part of this site's
 * hero), and every material is recolored to the site's own dark + cyan +
 * gold language instead of its original light-grey/mint/red palette, so it
 * reads as this site's character, not a pasted-in stock component.
 */

const SITE = {
  cyan: "#e86ce8",
  gold: "#d4b486",
  // Bolder cyan-tinted metal — the dark-grey pass still read as "dark
  // blob," not a character that stands out. Leaning into the site's own
  // primary accent for the body itself (not just the eyes/screen) makes
  // it pop against the dark page instead of blending into it.
  // Cool gunmetal body reads as an actual metal robot shell instead of a
  // warm ceramic/ clay pot. Eyes/screen use a pink-purple glow for a clear
  // attention pop.
  bodyDark: "#aab0bb",
  bodyMid: "#e4e7ec",
  headDark: "#20242f",
};

class HeartCurve extends THREE.Curve {
  getPoint(t, optionalTarget = new THREE.Vector3()) {
    t = t * Math.PI * 2;
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y =
      13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
    return optionalTarget.set(x * 0.002, (y + 6) * 0.002, 0);
  }
}
const sharedHeartCurve = new HeartCurve();

function ResponsiveGroup({ children, scale = 1 }) {
  const { viewport } = useThree();
  const s = Math.min(1.1, viewport.width / 3.5) * scale;
  return <group scale={s}>{children}</group>;
}

// Glass "screen" glow on the head — cyan, matching the Engine/Signature core
// glow used everywhere else on the site instead of the original mint-teal.
function GlassCapsule({ color = SITE.cyan, power = 3.2, intensity = 1 }) {
  const materialRef = useRef(null);
  const uniforms = useMemo(
    () => ({
      color: { value: new THREE.Color(color) },
      power: { value: power },
      intensity: { value: intensity },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useFrame(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.color.value.set(color);
      materialRef.current.uniforms.power.value = power;
      materialRef.current.uniforms.intensity.value = intensity;
    }
  });

  return (
    <mesh>
      <sphereGeometry args={[0.3, 64, 64, 0, Math.PI * 2, 0, Math.PI]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={`
          varying vec3 vNormal;
          varying vec3 vViewPosition;
          void main() {
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            vViewPosition = -mvPosition.xyz;
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * mvPosition;
          }
        `}
        fragmentShader={`
          uniform vec3 color;
          uniform float power;
          uniform float intensity;
          varying vec3 vNormal;
          varying vec3 vViewPosition;
          void main() {
            vec3 normal = normalize(vNormal);
            vec3 viewDir = normalize(vViewPosition);
            float fresnel = 1.0 - max(dot(viewDir, normal), 0.0);
            fresnel = pow(fresnel, power);
            gl_FragColor = vec4(color, fresnel * intensity);
          }
        `}
        transparent
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        toneMapped={false}
      />
    </mesh>
  );
}

// Dark metallic ear parts + a gold antenna tip (was light grey + red).
const earBaseMat = new THREE.MeshStandardMaterial({ color: SITE.bodyMid, roughness: 0.5 });
const earRingMat = new THREE.MeshStandardMaterial({ color: "#2a2f42", roughness: 0.3, metalness: 0.3 });
const earCenterMat = new THREE.MeshStandardMaterial({ color: "#0e111c", roughness: 0.8 });
const antennaBaseMat = new THREE.MeshStandardMaterial({ color: "#3a3f52", roughness: 0.4, metalness: 0.5 });
const antennaStickMat = new THREE.MeshStandardMaterial({ color: "#4a4f62", roughness: 0.4, metalness: 0.2 });
const antennaTipMat = new THREE.MeshStandardMaterial({ color: SITE.gold, roughness: 0.2, toneMapped: false, emissive: SITE.gold, emissiveIntensity: 0.4 });

function RobotEar({ position, scale = 1, isLeft = false }) {
  const dir = isLeft ? -1 : 1;
  return (
    <group position={position} scale={scale}>
      <mesh rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow material={earBaseMat}>
        <cylinderGeometry args={[0.04, 0.04, 0.025, 32]} />
      </mesh>
      <mesh position={[dir * 0.012, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow material={earRingMat}>
        <torusGeometry args={[0.032, 0.008, 16, 32]} />
      </mesh>
      <mesh position={[dir * 0.012, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow material={earCenterMat}>
        <cylinderGeometry args={[0.03, 0.03, 0.005, 32]} />
      </mesh>
      <group position={[dir * 0.015, 0.035, 0]} rotation={[-0.4, 0, 0]}>
        <mesh position={[0, 0.01, 0]} castShadow receiveShadow material={antennaBaseMat}>
          <cylinderGeometry args={[0.006, 0.008, 0.02, 16]} />
        </mesh>
        <mesh position={[0, 0.06, 0]} castShadow receiveShadow material={antennaStickMat}>
          <cylinderGeometry args={[0.003, 0.003, 0.1, 8]} />
        </mesh>
        <mesh position={[0, 0.11, 0]} castShadow receiveShadow material={antennaTipMat}>
          <sphereGeometry args={[0.006, 16, 16]} />
        </mesh>
      </group>
    </group>
  );
}

// Cyan-white glowing eyes (was flat white); gold heart on click (was red).
const eyeMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(2, 1.1, 1.9), toneMapped: false, transparent: true });
const heartMat = new THREE.MeshBasicMaterial({ color: SITE.gold, toneMapped: false });

function RobotEye({ position, rotation, scale = 1, blinkDuration = 0.15, blinkCycle = 3.0, isLovedRef }) {
  const groupRef = useRef(null);
  const normalEyesRef = useRef(null);
  const heartEyeRef = useRef(null);

  // Blinking is a timer-driven animation with no user-input trigger, so under
  // frameloop="demand" nothing would ever wake the render loop for it on its
  // own. Wake it once per cycle right as a blink should start — the useFrame
  // below self-invalidates for the ~150ms the blink is actually animating,
  // then goes quiet again until the next wake-up.
  useEffect(() => {
    const id = setInterval(() => invalidate(), blinkCycle * 1000);
    return () => clearInterval(id);
  }, [blinkCycle]);

  useFrame(({ clock }) => {
    if (!groupRef.current || !normalEyesRef.current || !heartEyeRef.current) return;
    const isHeart = isLovedRef.current;
    normalEyesRef.current.visible = !isHeart;
    heartEyeRef.current.visible = isHeart;

    const cycle = clock.getElapsedTime() % blinkCycle;
    let targetScaleY = 1;
    if (cycle < blinkDuration && !isHeart) {
      const progress = cycle / blinkDuration;
      const blinkClose = Math.sin(progress * Math.PI);
      targetScaleY = Math.max(0.05, 1.0 - blinkClose);
      invalidate();
    }
    groupRef.current.scale.set(scale, scale * targetScaleY, scale);
  });

  const { topPath, bottomPath } = useMemo(() => {
    const w = 0.025, h = 0.035, r = 0.02, g = 0.005;
    const tPath = new THREE.CurvePath();
    tPath.add(new THREE.LineCurve3(new THREE.Vector3(-w, g, 0), new THREE.Vector3(-w, h - r, 0)));
    tPath.add(new THREE.QuadraticBezierCurve3(new THREE.Vector3(-w, h - r, 0), new THREE.Vector3(-w, h, 0), new THREE.Vector3(-w + r, h, 0)));
    tPath.add(new THREE.LineCurve3(new THREE.Vector3(-w + r, h, 0), new THREE.Vector3(w - r, h, 0)));
    tPath.add(new THREE.QuadraticBezierCurve3(new THREE.Vector3(w - r, h, 0), new THREE.Vector3(w, h, 0), new THREE.Vector3(w, h - r, 0)));
    tPath.add(new THREE.LineCurve3(new THREE.Vector3(w, h - r, 0), new THREE.Vector3(w, g, 0)));

    const bPath = new THREE.CurvePath();
    bPath.add(new THREE.LineCurve3(new THREE.Vector3(-w, -g, 0), new THREE.Vector3(-w, -(h - r), 0)));
    bPath.add(new THREE.QuadraticBezierCurve3(new THREE.Vector3(-w, -(h - r), 0), new THREE.Vector3(-w, -h, 0), new THREE.Vector3(-w + r, -h, 0)));
    bPath.add(new THREE.LineCurve3(new THREE.Vector3(-w + r, -h, 0), new THREE.Vector3(w - r, -h, 0)));
    bPath.add(new THREE.QuadraticBezierCurve3(new THREE.Vector3(w - r, -h, 0), new THREE.Vector3(w, -h, 0), new THREE.Vector3(w, -(h - r), 0)));
    bPath.add(new THREE.LineCurve3(new THREE.Vector3(w, -(h - r), 0), new THREE.Vector3(w, -g, 0)));
    return { topPath: tPath, bottomPath: bPath };
  }, []);

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
      <mesh ref={heartEyeRef} visible={false} material={heartMat}>
        <tubeGeometry args={[sharedHeartCurve, 64, 0.0035, 8, true]} />
      </mesh>
      <group ref={normalEyesRef}>
        <mesh material={eyeMat}>
          <tubeGeometry args={[topPath, 20, 0.0035, 8, false]} />
        </mesh>
        <mesh material={eyeMat}>
          <tubeGeometry args={[bottomPath, 20, 0.0035, 8, false]} />
        </mesh>
      </group>
    </group>
  );
}

// Dark speckled body texture (was light grey) — generated once on a canvas,
// no external image asset.
function generatePbrTexturesAsync() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const size = 512;
      const canvasC = document.createElement("canvas");
      const canvasB = document.createElement("canvas");
      canvasC.width = canvasB.width = size;
      canvasC.height = canvasB.height = size;
      const ctxC = canvasC.getContext("2d");
      const ctxB = canvasB.getContext("2d");

      if (ctxC && ctxB) {
        ctxC.fillStyle = SITE.bodyDark;
        ctxC.fillRect(0, 0, size, size);
        ctxB.fillStyle = "#808080";
        ctxB.fillRect(0, 0, size, size);

        for (let i = 0; i < 10000; i++) {
          const x = Math.random() * size;
          const y = Math.random() * size;
          const r = 0.5 + Math.random() * 1.5;
          const isDark = Math.random() > 0.15;
          ctxC.beginPath();
          ctxC.arc(x, y, r, 0, Math.PI * 2);
          ctxC.fillStyle = isDark ? SITE.bodyDark : SITE.bodyMid;
          ctxC.fill();
          ctxB.beginPath();
          ctxB.arc(x, y, r, 0, Math.PI * 2);
          ctxB.fillStyle = isDark ? "#000000" : "#ffffff";
          ctxB.fill();
        }
      }

      const texC = new THREE.CanvasTexture(canvasC);
      const texB = new THREE.CanvasTexture(canvasB);
      texC.wrapS = texB.wrapS = THREE.RepeatWrapping;
      texC.wrapT = texB.wrapT = THREE.RepeatWrapping;
      texC.repeat.set(6, 3);
      texB.repeat.set(6, 3);
      texC.needsUpdate = true;
      texB.needsUpdate = true;
      resolve({ colorMap: texC, bumpMap: texB });
    }, 0);
  });
}

function RobotPrototype({
  neckParams = {
    baseR: 0.215, baseH: -0.05, midR: 0.28, midH: 0.02,
    lipBottomR: 0.295, lipBottomH: 0.045, lipTopR: 0.27, lipTopH: 0.055,
    innerR: 0.1, innerDropH: 0.0,
  },
  bodyParams = { bodyBevelR: 0.235, bodyBevelY: 0.34, bodyBevelT: 0.025 },
  color = SITE.bodyDark,
  pantallaColor = SITE.cyan,
  pantallaBrillo = 1.3,
  blinkCycle = 3.0,
  metalness = 0.78,
  allowInteraction = true,
  pointerRef = null,
}) {
  const isLovedRef = useRef(false);
  const timeoutRef = useRef(null);
  const bodyRef = useRef(null);
  const headRef = useRef(null);
  const [textures, setTextures] = useState({ colorMap: null, bumpMap: null });

  const design = {
    pantallaColor,
    pantallaGrosor: 3.8,
    pantallaBrillo,
    separacionOjos: 0.07,
    tamañoOrejas: 1.3,
    escalaOjos: 1.1,
    parpadeoFrecuencia: blinkCycle,
    parpadeoDuracion: 0.45,
    colorChasis: color,
    alturaCabeza: 0.6,
  };

  const config = {
    // Slower, gentler follow — the previous 0.12/1.8 travel let the body
    // drift far enough left on wide viewports to visually cross into the
    // headline text's column (confirmed by hiding the canvas: the text
    // itself never overflows, the robot was just reaching it).
    moveSpeed: 0.05,
    bodyRotSpeed: 3.2,
    headRotSpeed: 5.0,
    bodyTiltX: 0.0,
    bodyTiltY: 0.95,
    headLookX: 0.3,
    headLookY: 1.8,
  };

  useFrame((state, delta) => {
    if (!bodyRef.current || !headRef.current) return;
    const dt = Math.min(delta, 0.1);
    const tx = pointerRef?.current.x ?? state.pointer.x;
    const ty = pointerRef?.current.y ?? state.pointer.y;

    const prevPosX = bodyRef.current.position.x;
    const prevBodyRotY = bodyRef.current.rotation.y;
    const prevBodyRotX = bodyRef.current.rotation.x;
    const prevBodyRotZ = bodyRef.current.rotation.z;
    const prevHeadRotY = headRef.current.rotation.y;
    const prevHeadRotX = headRef.current.rotation.x;

    // Capped tighter than viewport.width/3.5 (the old value let the body
    // reach the canvas's own left edge, right where the headline column
    // sits) so the sphere stays clear of the text even at full cursor
    // deflection.
    const maxMoveX = state.viewport.width / 7;
    const targetPosX = tx * maxMoveX;
    bodyRef.current.position.x = THREE.MathUtils.lerp(bodyRef.current.position.x, targetPosX, config.moveSpeed * dt);

    const relativeX = tx - bodyRef.current.position.x / 2.5;
    const bodyTargetRotY = -relativeX * config.bodyTiltY;
    const bodyTargetRotX = relativeX * relativeX * config.bodyTiltX - ty * 0.25;
    const bodyTargetRotZ = -relativeX * 0.15;

    bodyRef.current.rotation.y = THREE.MathUtils.lerp(bodyRef.current.rotation.y, bodyTargetRotY, config.bodyRotSpeed * dt);
    bodyRef.current.rotation.x = THREE.MathUtils.lerp(bodyRef.current.rotation.x, bodyTargetRotX, config.bodyRotSpeed * dt);
    bodyRef.current.rotation.z = THREE.MathUtils.lerp(bodyRef.current.rotation.z, bodyTargetRotZ, config.bodyRotSpeed * dt);

    const headTargetRotY = relativeX * config.headLookY;
    const headTargetRotX = -ty * config.headLookX;
    headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, headTargetRotY, config.headRotSpeed * dt);
    headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, headTargetRotX, config.headRotSpeed * dt);

    // Cursor-follow is driven by real pointer movement, not autonomous
    // motion — once a frame's lerp step stops moving anything by a visible
    // amount, we've caught up to the target and can let the render loop go
    // idle. It wakes back up on the next pointermove (see the global
    // listener below) or the next blink (see RobotEye).
    const settled =
      Math.abs(bodyRef.current.position.x - prevPosX) < 0.0008 &&
      Math.abs(bodyRef.current.rotation.y - prevBodyRotY) < 0.0008 &&
      Math.abs(bodyRef.current.rotation.x - prevBodyRotX) < 0.0008 &&
      Math.abs(bodyRef.current.rotation.z - prevBodyRotZ) < 0.0008 &&
      Math.abs(headRef.current.rotation.y - prevHeadRotY) < 0.0008 &&
      Math.abs(headRef.current.rotation.x - prevHeadRotX) < 0.0008;
    if (!settled) invalidate();
  });

  useEffect(() => {
    let mounted = true;
    let generatedMaps = null;
    generatePbrTexturesAsync().then((res) => {
      if (mounted) {
        generatedMaps = res;
        setTextures(res);
      } else {
        res.colorMap.dispose();
        res.bumpMap.dispose();
      }
    });
    return () => {
      mounted = false;
      if (generatedMaps) {
        generatedMaps.colorMap.dispose();
        generatedMaps.bumpMap.dispose();
      }
    };
  }, []);

  const handlePointerDown = (e) => {
    if (!allowInteraction) return;
    e.stopPropagation();
    isLovedRef.current = true;
    invalidate();
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      isLovedRef.current = false;
      invalidate();
    }, 2000);
  };

  const neckProfile = useMemo(() => {
    const points = [];
    points.push(new THREE.Vector2(neckParams.innerR, neckParams.baseH));
    points.push(new THREE.Vector2(neckParams.baseR, neckParams.baseH));
    points.push(new THREE.Vector2(neckParams.midR, neckParams.midH));
    points.push(new THREE.Vector2(neckParams.lipBottomR, neckParams.lipBottomH));
    points.push(new THREE.Vector2(neckParams.lipTopR, neckParams.lipTopH));
    points.push(new THREE.Vector2(neckParams.innerR, neckParams.lipTopH));
    points.push(new THREE.Vector2(neckParams.innerR, neckParams.lipTopH - neckParams.innerDropH));
    return points;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [neckParams]);

  const headMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: SITE.headDark, roughness: 0.9, metalness: 0.1 }),
    []
  );

  if (!textures.colorMap) return null;

  return (
    <group
      ref={bodyRef}
      position={[0, -0.3, 0]}
      onPointerDown={handlePointerDown}
      onPointerOver={() => { if (allowInteraction) document.body.style.cursor = "pointer"; }}
      onPointerOut={() => { document.body.style.cursor = "auto"; }}
    >
      <mesh castShadow receiveShadow>
        <sphereGeometry args={[0.43, 64, 64, 0, Math.PI * 2, Math.PI * 0.15, Math.PI * 0.85]} />
        <meshStandardMaterial
          color={design.colorChasis}
          map={textures.colorMap || undefined}
          bumpMap={textures.bumpMap || undefined}
          bumpScale={0.005}
          roughness={0.42}
          metalness={metalness}
          envMapIntensity={0.0}
        />
      </mesh>

      {bodyParams.bodyBevelT > 0 && (
        <mesh position={[0, bodyParams.bodyBevelY, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow>
          <torusGeometry args={[bodyParams.bodyBevelR, bodyParams.bodyBevelT, 32, 64]} />
          <meshStandardMaterial
            color={design.colorChasis}
            map={textures.colorMap || undefined}
            bumpMap={textures.bumpMap || undefined}
            bumpScale={0.005}
            roughness={0.42}
            metalness={metalness}
            envMapIntensity={0.0}
          />
        </mesh>
      )}

      <mesh position={[0, 0.38, 0]} receiveShadow castShadow>
        <latheGeometry args={[neckProfile, 64]} />
        <meshStandardMaterial
          color={design.colorChasis}
          map={textures.colorMap || undefined}
          bumpMap={textures.bumpMap || undefined}
          bumpScale={0.005}
          roughness={0.42}
          metalness={metalness}
          envMapIntensity={0.0}
        />
      </mesh>

      <group ref={headRef} position={[0, design.alturaCabeza, 0]}>
        <mesh material={headMat} castShadow receiveShadow>
          <sphereGeometry args={[0.28, 64, 64, 0, Math.PI * 2, 0, Math.PI]} />
        </mesh>

        <GlassCapsule color={design.pantallaColor} power={design.pantallaGrosor} intensity={design.pantallaBrillo} />

        <group position={[0, -0.02, 0.29]}>
          <RobotEye
            position={[-design.separacionOjos, 0, 0]}
            rotation={[0, -0.2, 0]}
            scale={design.escalaOjos}
            blinkDuration={design.parpadeoDuracion}
            blinkCycle={design.parpadeoFrecuencia}
            isLovedRef={isLovedRef}
          />
          <RobotEye
            position={[design.separacionOjos, 0, 0]}
            rotation={[0, 0.2, 0]}
            scale={design.escalaOjos}
            blinkDuration={design.parpadeoDuracion}
            blinkCycle={design.parpadeoFrecuencia}
            isLovedRef={isLovedRef}
          />
        </group>

        <RobotEar position={[-0.29, 0, 0]} isLeft scale={design.tamañoOrejas} />
        <RobotEar position={[0.29, 0, 0]} isLeft={false} scale={design.tamañoOrejas} />
      </group>
    </group>
  );
}

const canRenderWebGL = () => {
  try {
    const canvas = document.createElement("canvas");
    return !!(window.WebGLRenderingContext && (canvas.getContext("webgl") || canvas.getContext("experimental-webgl")));
  } catch {
    return false;
  }
};

/**
 * Drop-in Hero visual — transparent background so the site's own dark bg
 * and ambient dust show through, cyan/gold point lights (no external HDRI),
 * cursor-follow built in via RobotPrototype's own pointer tracking.
 */
export const RobotCompanion = ({ className = "", scale = 1 }) => {
  const [enabled, setEnabled] = useState(false);
  // Tracked across the whole page (not just the canvas box) so the robot
  // keeps following the cursor even when it's behind other page content.
  const pointerRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    setEnabled(!reduced && canRenderWebGL());
  }, []);

  useEffect(() => {
    const handleMove = (e) => {
      pointerRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointerRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
      // pointerRef is a plain ref mutated outside React/R3F, so under
      // frameloop="demand" nothing else would wake the canvas up for it.
      invalidate();
    };
    window.addEventListener("pointermove", handleMove);
    return () => window.removeEventListener("pointermove", handleMove);
  }, []);

  const dpr = useMemo(() => [1, Math.min(window.devicePixelRatio || 1, 1.75)], []);

  if (!enabled) {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <div
          className="w-32 h-32 rounded-full flex items-center justify-center font-mono font-bold text-[22px]"
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
    <div className={className} data-testid="robot-companion">
      <Canvas
        shadows
        frameloop="demand"
        camera={{ position: [0, -0.1, 7.4], fov: 42 }}
        dpr={dpr}
        gl={{ alpha: true, antialias: true }}
        onCreated={({ gl }) => {
          gl.domElement.setAttribute("role", "img");
          gl.domElement.setAttribute(
            "aria-label",
            "Animated 3D robot character that follows your cursor"
          );
        }}
      >
        {/* Recent three.js defaults to physically-correct lighting, where
            point-light intensity is in candela — the old "intensity: 2-3"
            scale (fine pre-r155) renders as almost nothing at these
            distances now. Bumped an order of magnitude so the body
            actually catches light instead of reading as a black blob. */}
        <ambientLight intensity={3.2} color="#ffffff" />
        <pointLight position={[2.2, 2, 3]} intensity={11} color={SITE.cyan} distance={12} decay={1.5} />
        <pointLight position={[-2, -1, 2]} intensity={8} color={SITE.gold} distance={12} decay={1.5} />
        <pointLight position={[0, 1.5, -2]} intensity={6} color={SITE.cyan} distance={12} decay={1.5} />
        <directionalLight position={[0, 4, 3]} intensity={2} color="#ffffff" castShadow shadow-mapSize={[1024, 1024]} />

        <ResponsiveGroup scale={scale}>
          <RobotPrototype pointerRef={pointerRef} />
        </ResponsiveGroup>
      </Canvas>
    </div>
  );
};

export default RobotCompanion;
