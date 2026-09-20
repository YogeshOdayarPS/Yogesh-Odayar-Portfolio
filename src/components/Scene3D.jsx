import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useReducedMotion } from "framer-motion";

const SHAPES = [
  { geometry: "icosahedron", position: [-4.2, 2.2, -2], size: 1.1, speed: 0.06, color: "#5b7fff" },
  { geometry: "octahedron", position: [4.5, -1.6, -3], size: 1.4, speed: 0.045, color: "#9b6bff" },
  { geometry: "torus", position: [3.2, 2.6, -4], size: 0.9, speed: 0.07, color: "#5b7fff" },
  { geometry: "icosahedron", position: [-3.6, -2.4, -3.5], size: 0.8, speed: 0.05, color: "#9b6bff" },
  { geometry: "tetrahedron", position: [0.2, 3.4, -5], size: 1, speed: 0.055, color: "#5b7fff" },
];

function FloatingShape({ geometry, position, size, speed, color }) {
  const meshRef = useRef(null);
  const seed = useMemo(() => Math.random() * 100, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = t * speed;
    meshRef.current.rotation.y = t * speed * 1.3;
    meshRef.current.position.y = position[1] + Math.sin(t * 0.3 + seed) * 0.25;
  });

  const geo = (() => {
    switch (geometry) {
      case "octahedron":
        return <octahedronGeometry args={[size, 0]} />;
      case "torus":
        return <torusGeometry args={[size, size * 0.35, 8, 24]} />;
      case "tetrahedron":
        return <tetrahedronGeometry args={[size, 0]} />;
      default:
        return <icosahedronGeometry args={[size, 0]} />;
    }
  })();

  return (
    <mesh ref={meshRef} position={position}>
      {geo}
      <meshBasicMaterial color={color} wireframe transparent opacity={0.28} />
    </mesh>
  );
}

function PointerRig({ children }) {
  const groupRef = useRef(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const { pointer } = state;
    groupRef.current.rotation.y += (pointer.x * 0.25 - groupRef.current.rotation.y) * 0.02;
    groupRef.current.rotation.x += (-pointer.y * 0.15 - groupRef.current.rotation.x) * 0.02;
  });

  return <group ref={groupRef}>{children}</group>;
}

export default function Scene3D() {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) return null;

  return (
    <Canvas
      className="scene3d-canvas"
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      camera={{ position: [0, 0, 8], fov: 50 }}
      style={{ position: "fixed", inset: 0, zIndex: -1, pointerEvents: "none" }}
    >
      <PointerRig>
        {SHAPES.map((shape, i) => (
          <FloatingShape key={i} {...shape} />
        ))}
      </PointerRig>
    </Canvas>
  );
}
