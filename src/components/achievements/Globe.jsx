import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const CORE_RADIUS = 1.6;

// A clean latitude ring (horizontal circle) at a given angle, instead of a
// dense triangulated wireframe - reads as a real "globe grid" line, not a
// faceted mesh edge.
function buildLatitudeRing(radius, latDeg, segments = 64) {
  const lat = (latDeg * Math.PI) / 180;
  const y = radius * Math.sin(lat);
  const r = radius * Math.cos(lat);
  const pts = [];
  for (let i = 0; i <= segments; i++) {
    const a = (i / segments) * Math.PI * 2;
    pts.push(new THREE.Vector3(r * Math.cos(a), y, r * Math.sin(a)));
  }
  return new THREE.BufferGeometry().setFromPoints(pts);
}

// A clean longitude arc (pole-to-pole half circle) at a given rotation.
function buildLongitudeArc(radius, lonDeg, segments = 48) {
  const lon = (lonDeg * Math.PI) / 180;
  const pts = [];
  for (let i = 0; i <= segments; i++) {
    const t = -Math.PI / 2 + (i / segments) * Math.PI;
    const y = radius * Math.sin(t);
    const r = radius * Math.cos(t);
    pts.push(new THREE.Vector3(r * Math.cos(lon), y, r * Math.sin(lon)));
  }
  return new THREE.BufferGeometry().setFromPoints(pts);
}

// Latitude/longitude angles deliberately skip 0deg so no line runs straight
// through the front-center of the globe, where the quote sits.
const LATITUDES = { low: [-45, 15, 50], high: [-60, -38, -16, 16, 38, 60] };
const LONGITUDES = {
  low: [25, 115, 205, 295],
  high: [22, 67, 112, 157, 202, 247, 292, 337],
};

function HoloGlobe({ scrollProgress, quality }) {
  const groupRef = useRef(null);
  const key = quality === "low" ? "low" : "high";

  const latGeometries = useMemo(
    () => LATITUDES[key].map((deg) => buildLatitudeRing(CORE_RADIUS, deg)),
    [key]
  );
  const lonGeometries = useMemo(
    () => LONGITUDES[key].map((deg) => buildLongitudeArc(CORE_RADIUS, deg)),
    [key]
  );

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
      {/* Neon holographic grid - no fill behind it, the dark page background
          and stars show straight through the globe */}
      {latGeometries.map((geo, i) => (
        <lineLoop key={`lat-${i}`} geometry={geo}>
          <lineBasicMaterial
            color="#7ce8ff"
            transparent
            opacity={0.55}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </lineLoop>
      ))}
      {lonGeometries.map((geo, i) => (
        <line key={`lon-${i}`} geometry={geo}>
          <lineBasicMaterial
            color="#7ce8ff"
            transparent
            opacity={0.55}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </line>
      ))}
      {/* Soft outer glow shell - keeps the "holographic atmosphere" feel
          without ever reading as a solid sphere */}
      <mesh>
        <sphereGeometry args={[CORE_RADIUS * 1.28, 24, 24]} />
        <meshBasicMaterial
          color="#5ce1ff"
          transparent
          opacity={0.05}
          side={THREE.BackSide}
          depthWrite={false}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[CORE_RADIUS * 1.5, 24, 24]} />
        <meshBasicMaterial
          color="#9b6bff"
          transparent
          opacity={0.03}
          side={THREE.BackSide}
          depthWrite={false}
        />
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
