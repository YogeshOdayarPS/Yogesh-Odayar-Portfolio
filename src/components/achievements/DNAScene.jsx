import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const RADIUS = 1.15;
const HEIGHT = 5.6;
const TURNS = 3;

function buildHelixPoints(phase, segments) {
  const points = [];
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const angle = t * Math.PI * 2 * TURNS + phase;
    const y = (t - 0.5) * HEIGHT;
    points.push(new THREE.Vector3(Math.cos(angle) * RADIUS, y, Math.sin(angle) * RADIUS));
  }
  return points;
}

function Strand({ phase, segments, color }) {
  const geometry = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3(buildHelixPoints(phase, segments));
    return new THREE.TubeGeometry(curve, segments, 0.045, 8, false);
  }, [phase, segments]);

  return (
    <mesh geometry={geometry}>
      <meshBasicMaterial color={color} transparent opacity={0.85} />
    </mesh>
  );
}

function Rung({ pA, pB }) {
  const { mid, quaternion, length } = useMemo(() => {
    const dir = new THREE.Vector3().subVectors(pB, pA);
    const len = dir.length();
    const q = new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      dir.clone().normalize()
    );
    const m = new THREE.Vector3().addVectors(pA, pB).multiplyScalar(0.5);
    return { mid: m, quaternion: q, length: len };
  }, [pA, pB]);

  return (
    <group position={mid} quaternion={quaternion}>
      <mesh>
        <cylinderGeometry args={[0.016, 0.016, length, 6]} />
        <meshBasicMaterial color="#8fd8ff" transparent opacity={0.45} />
      </mesh>
      <mesh position={[0, length / 2, 0]}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshBasicMaterial color="#5ce1ff" />
      </mesh>
      <mesh position={[0, -length / 2, 0]}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshBasicMaterial color="#b18bff" />
      </mesh>
    </group>
  );
}

function Rungs({ count }) {
  const rungs = useMemo(() => {
    const arr = [];
    for (let i = 0; i < count; i++) {
      const t = i / (count - 1);
      const angle = t * Math.PI * 2 * TURNS;
      const y = (t - 0.5) * HEIGHT;
      arr.push({
        key: i,
        pA: new THREE.Vector3(Math.cos(angle) * RADIUS, y, Math.sin(angle) * RADIUS),
        pB: new THREE.Vector3(Math.cos(angle + Math.PI) * RADIUS, y, Math.sin(angle + Math.PI) * RADIUS),
      });
    }
    return arr;
  }, [count]);

  return rungs.map(({ key, pA, pB }) => <Rung key={key} pA={pA} pB={pB} />);
}

function Particles({ count }) {
  const pointsRef = useRef(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 2.1 + Math.random() * 2.4;
      const theta = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * (HEIGHT + 2);
      arr[i * 3] = Math.cos(theta) * r;
      arr[i * 3 + 1] = y;
      arr[i * 3 + 2] = Math.sin(theta) * r;
    }
    return arr;
  }, [count]);

  useFrame((_, delta) => {
    const geom = pointsRef.current?.geometry;
    if (!geom) return;
    const arr = geom.attributes.position.array;
    const limit = (HEIGHT + 2) / 2;
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] += delta * 0.05;
      if (arr[i * 3 + 1] > limit) arr[i * 3 + 1] = -limit;
    }
    geom.attributes.position.needsUpdate = true;
    pointsRef.current.rotation.y += delta * 0.01;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
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

function DNAGroup({ quality }) {
  const groupRef = useRef(null);
  const segments = quality === "low" ? 70 : 150;
  const rungCount = quality === "low" ? 14 : 26;

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.14;
    groupRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.35) * 0.14;

    const { pointer } = state;
    groupRef.current.rotation.x += (-pointer.y * 0.08 - groupRef.current.rotation.x) * 0.02;
  });

  return (
    <group ref={groupRef}>
      <Strand phase={0} segments={segments} color="#5ce1ff" />
      <Strand phase={Math.PI} segments={segments} color="#7c8bff" />
      <Rungs count={rungCount} />
    </group>
  );
}

export default function DNAScene({ quality = "high" }) {
  const particleCount = quality === "low" ? 55 : 150;

  return (
    <Canvas
      dpr={[1, quality === "low" ? 1.2 : 1.6]}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      camera={{ position: [0, 0, 7.2], fov: 42 }}
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
    >
      <DNAGroup quality={quality} />
      <Particles count={particleCount} />
    </Canvas>
  );
}
