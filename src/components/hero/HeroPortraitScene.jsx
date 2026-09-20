import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useReducedMotion } from "framer-motion";
import portraitTexUrl from "../../assets/hero-portrait-3d.webp";

const IMG_ASPECT = 1220 / 1007;

// The photo's own baked-in alpha (real per-pixel cutout, pre-computed
// offline) is the only thing that makes the edge disappear - no CSS glow,
// outline, drop-shadow or halo is added anywhere in this scene.
function Portrait({ texture, floatEnabled }) {
  const meshRef = useRef(null);
  const width = 3.5;
  const height = width / IMG_ASPECT;

  useFrame((state) => {
    if (!meshRef.current || !floatEnabled) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.position.y = Math.sin(t * 0.55) * 0.09;
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
      camera={{ position: [0, 0, 7], fov: 38 }}
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
    >
      <SceneContent texture={texture} reducedMotion={reducedMotion} />
    </Canvas>
  );
}
