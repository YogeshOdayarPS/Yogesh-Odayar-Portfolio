import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useReducedMotion } from "framer-motion";

function FloatingShape({ geometry, position, size, speed, color, opacity = 0.3 }) {
  const meshRef = useRef(null);
  const seed = useMemo(() => Math.random() * 100, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = t * speed;
    meshRef.current.rotation.y = t * speed * 1.3;
    meshRef.current.position.y = position[1] + Math.sin(t * 0.3 + seed) * 0.2;
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
      <meshBasicMaterial color={color} wireframe transparent opacity={opacity} />
    </mesh>
  );
}

function PointerRig({ children, intensity = 0.25 }) {
  const groupRef = useRef(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const { pointer } = state;
    groupRef.current.rotation.y += (pointer.x * intensity - groupRef.current.rotation.y) * 0.02;
    groupRef.current.rotation.x += (-pointer.y * (intensity * 0.6) - groupRef.current.rotation.x) * 0.02;
  });

  return <group ref={groupRef}>{children}</group>;
}

export default function Scene3D({ shapes, followPointer = true, className = "" }) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion || !shapes?.length) return null;

  const content = (
    <>
      {shapes.map((shape, i) => (
        <FloatingShape key={i} {...shape} />
      ))}
    </>
  );

  return (
    <Canvas
      className={`scene3d-canvas ${className}`}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      camera={{ position: [0, 0, 8], fov: 50 }}
      style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}
    >
      {followPointer ? <PointerRig>{content}</PointerRig> : content}
    </Canvas>
  );
}
