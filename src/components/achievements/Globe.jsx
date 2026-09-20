import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const CORE_RADIUS = 1.6;

function HoloGlobe({ scrollProgress, quality }) {
  const groupRef = useRef(null);
  const segments = quality === "low" ? [14, 10] : [22, 16];

  useFrame((state) => {
    if (!groupRef.current) return;
    const progress = scrollProgress.get();
    groupRef.current.rotation.y = progress * Math.PI * 2 * 1.4;

    const t = state.clock.getElapsedTime();
    groupRef.current.position.y = Math.sin(t * 0.3) * 0.12;

    const { pointer } = state;
    groupRef.current.rotation.x += (-pointer.y * 0.06 - groupRef.current.rotation.x) * 0.02;
  });

  return (
    <group ref={groupRef}>
      {/* Wireframe grid shell - the visible "holographic" surface */}
      <mesh>
        <sphereGeometry args={[CORE_RADIUS, segments[0], segments[1]]} />
        <meshBasicMaterial color="#5ce1ff" wireframe transparent opacity={0.55} />
      </mesh>
      {/* Faint solid core for depth so the wireframe reads as a volume */}
      <mesh>
        <sphereGeometry args={[CORE_RADIUS * 0.97, segments[0], segments[1]]} />
        <meshBasicMaterial color="#0b0f1c" transparent opacity={0.35} />
      </mesh>
      {/* Soft outer glow shell */}
      <mesh>
        <sphereGeometry args={[CORE_RADIUS * 1.28, 24, 24]} />
        <meshBasicMaterial color="#5ce1ff" transparent opacity={0.05} side={THREE.BackSide} />
      </mesh>
      <mesh>
        <sphereGeometry args={[CORE_RADIUS * 1.5, 24, 24]} />
        <meshBasicMaterial color="#9b6bff" transparent opacity={0.03} side={THREE.BackSide} />
      </mesh>
    </group>
  );
}

function OrbitRings({ quality }) {
  const ringRefs = useRef([]);

  const rings = useMemo(
    () => [
      { radius: CORE_RADIUS * 1.32, tilt: 0.4, speed: 0.05, color: "#5ce1ff" },
      { radius: CORE_RADIUS * 1.5, tilt: -0.55, speed: 0.035, color: "#9b6bff" },
      ...(quality === "low"
        ? []
        : [{ radius: CORE_RADIUS * 1.7, tilt: 1.15, speed: 0.025, color: "#5ce1ff" }]),
    ],
    [quality]
  );

  useFrame((_, delta) => {
    ringRefs.current.forEach((ring, i) => {
      if (ring) ring.rotation.z += delta * rings[i].speed;
    });
  });

  return (
    <group>
      {rings.map((ring, i) => (
        <mesh key={i} ref={(el) => (ringRefs.current[i] = el)} rotation={[ring.tilt, 0, 0]}>
          <torusGeometry args={[ring.radius, 0.008, 8, 72]} />
          <meshBasicMaterial color={ring.color} transparent opacity={0.4} />
        </mesh>
      ))}
    </group>
  );
}

function Particles({ count }) {
  const pointsRef = useRef(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = CORE_RADIUS * 1.6 + Math.random() * CORE_RADIUS * 1.4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += delta * 0.02;
    pointsRef.current.rotation.x += delta * 0.008;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#8fd8ff"
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function Globe({ quality = "high", scrollProgress }) {
  const particleCount = quality === "low" ? 45 : 120;

  if (!scrollProgress) return null;

  return (
    <Canvas
      dpr={[1, quality === "low" ? 1.2 : 1.6]}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      camera={{ position: [0, 0, 7], fov: 42 }}
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
    >
      <HoloGlobe scrollProgress={scrollProgress} quality={quality} />
      <OrbitRings quality={quality} />
      <Particles count={particleCount} />
    </Canvas>
  );
}
