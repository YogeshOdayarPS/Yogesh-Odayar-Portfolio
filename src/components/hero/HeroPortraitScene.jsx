import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useReducedMotion } from "framer-motion";
import portraitTexUrl from "../../assets/hero-portrait-3d.webp";

const IMG_ASPECT = 1220 / 1007;
// Camera widened (fov 38 -> 52) to give the wider orbit ring room to sit
// fully inside the frame without clipping at the canvas edge. Portrait and
// all ring/float values are scaled by the same factor so the person's
// on-screen size is unchanged - only the surrounding margin grew.
const SCALE = 1.417;

// The photo's own baked-in alpha (real per-pixel cutout, pre-computed
// offline) is the only thing that makes the edge disappear - no CSS glow,
// outline, drop-shadow or halo is added anywhere in this scene.
function Portrait({ texture, floatEnabled }) {
  const meshRef = useRef(null);
  const width = 3.5 * SCALE;
  const height = width / IMG_ASPECT;

  useFrame((state) => {
    if (!meshRef.current || !floatEnabled) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.position.y = Math.sin(t * 0.55) * (0.09 * SCALE);
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[width, height]} />
      <meshBasicMaterial
        map={texture}
        transparent
        alphaTest={0.12}
        toneMapped={false}
        side={THREE.FrontSide}
      />
    </mesh>
  );
}

// Wide, flat "Saturn ring" style orbit - deliberately kept well below the
// chin (yOffset) so it can never touch the hair/face, regardless of how
// wide the radius is. Positioned behind the portrait via z-order (Portrait
// renders after it in the group), and alphaTest on the Portrait material
// still gives correct occlusion where the two overlap near the torso.
function OrbitRing({ radius, tilt, speed, color, opacity, thickness = 0.012, yOffset = 0 }) {
  const ref = useRef(null);
  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.z += delta * speed;
  });
  return (
    <mesh ref={ref} position={[0, yOffset, -0.3]} rotation={[tilt, 0, 0]}>
      <torusGeometry args={[radius, thickness, 10, 96]} />
      <meshBasicMaterial color={color} transparent opacity={opacity} toneMapped={false} />
    </mesh>
  );
}

function ParallaxRig({ children, intensity, enabled }) {
  const groupRef = useRef(null);
  useFrame((state) => {
    if (!groupRef.current || !enabled) return;
    const { pointer } = state;
    const targetY = pointer.x * intensity;
    const targetX = -pointer.y * intensity * 0.6;
    groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * 0.04;
    groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.04;
  });
  return <group ref={groupRef}>{children}</group>;
}

function SceneContent({ texture, reducedMotion }) {
  return (
    <ParallaxRig intensity={0.09} enabled={!reducedMotion}>
      <OrbitRing
        radius={3.05}
        tilt={1.2}
        speed={0.15}
        color="#7b8fff"
        opacity={0.42}
        thickness={0.012 * SCALE}
        yOffset={-1.25}
      />
      <Portrait texture={texture} floatEnabled={!reducedMotion} />
    </ParallaxRig>
  );
}

export default function HeroPortraitScene() {
  const reducedMotion = useReducedMotion();
  const [texture, setTexture] = useState(null);

  useEffect(() => {
    let cancelled = false;
    const loader = new THREE.TextureLoader();
    loader.load(portraitTexUrl, (tex) => {
      if (cancelled) return;
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.anisotropy = 4;
      tex.needsUpdate = true;
      setTexture(tex);
    });
    return () => {
      cancelled = true;
      loader.manager.itemStart = () => {};
    };
  }, []);

  if (!texture) return null;

  return (
    <Canvas
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      camera={{ position: [0, 0, 7], fov: 52 }}
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
    >
      <SceneContent texture={texture} reducedMotion={reducedMotion} />
    </Canvas>
  );
}
