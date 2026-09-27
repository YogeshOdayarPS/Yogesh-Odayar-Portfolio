import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useReducedMotion } from "framer-motion";
import characterTexUrl from "../../assets/hero-character-3d.webp";

// The cutout has a real per-pixel alpha (background, desk and props
// removed offline, lower body faded out) - so the character sits straight
// on the page background with no rectangle, outline or glow around it.
const CAMERA_FOV = 38;
const CAMERA_DISTANCE = 7;
const FRUSTUM_HEIGHT = 2 * Math.tan((CAMERA_FOV * Math.PI) / 360) * CAMERA_DISTANCE;

// Character fills 92% of the canvas height, unless the canvas is too
// narrow for that - then it shrinks so the shoulders stay inside.
const HEIGHT_FILL = 0.95;
const WIDTH_FILL = 0.98;
const BASE_Y = 0;

function usePointer(enabled) {
  // Tracked on window (not the canvas, which has pointer-events: none so
  // it never blocks the hero buttons it overlaps).
  const pointer = useRef({ x: 0, y: 0, hover: 0 });
  const { gl } = useThree();

  useEffect(() => {
    if (!enabled) return undefined;
    const onMove = (e) => {
      const rect = gl.domElement.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      pointer.current.x = THREE.MathUtils.clamp(nx, -1.5, 1.5);
      pointer.current.y = THREE.MathUtils.clamp(ny, -1.5, 1.5);
      // "Hovering" = pointer over the central part of the figure.
      pointer.current.hover = Math.abs(nx) < 0.55 && Math.abs(ny) < 0.85 ? 1 : 0;
    };
    const onLeave = () => {
      pointer.current.x = 0;
      pointer.current.y = 0;
      pointer.current.hover = 0;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled, gl]);

  return pointer;
}

function Character({ texture, animate }) {
  const rigRef = useRef(null);
  const floatRef = useRef(null);
  const charRef = useRef(null);
  const pointer = usePointer(animate);
  const hover = useRef(0);
  const viewport = useThree((state) => state.viewport);

  const imgAspect = texture.image.width / texture.image.height;
  const charHeight = Math.min(FRUSTUM_HEIGHT * HEIGHT_FILL, (viewport.width * WIDTH_FILL) / imgAspect);
  const charWidth = charHeight * imgAspect;

  useFrame((state, delta) => {
    if (!animate) return;
    const t = state.clock.getElapsedTime();
    const p = pointer.current;
    const k = 1 - Math.exp(-delta * 3.2);

    hover.current += (p.hover - hover.current) * k;

    // Parallax tilt toward the pointer.
    const tilt = 0.09 + hover.current * 0.04;
    rigRef.current.rotation.y += (p.x * tilt - rigRef.current.rotation.y) * k;
    rigRef.current.rotation.x += (-p.y * tilt * 0.5 - rigRef.current.rotation.x) * k;
    rigRef.current.position.x += (p.x * 0.08 - rigRef.current.position.x) * k;

    // Float + breathing (uniform scale, so proportions never change).
    floatRef.current.position.y = BASE_Y + Math.sin(t * 0.6) * 0.06;
    const s = (1 + hover.current * 0.012) * (1 + Math.sin(t * 1.15) * 0.004);
    charRef.current.scale.setScalar(s);
  });

  return (
    <group ref={rigRef}>
      <group ref={floatRef} position={[0, BASE_Y, 0]}>
        <mesh ref={charRef}>
          <planeGeometry args={[charWidth, charHeight]} />
          <meshBasicMaterial map={texture} transparent depthWrite={false} toneMapped={false} />
        </mesh>
      </group>
    </group>
  );
}

export default function HeroPortraitScene() {
  const reducedMotion = useReducedMotion();
  const [texture, setTexture] = useState(null);

  useEffect(() => {
    let cancelled = false;
    new THREE.TextureLoader().load(characterTexUrl, (tex) => {
      if (cancelled) return;
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.anisotropy = 4;
      tex.needsUpdate = true;
      setTexture(tex);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  if (!texture) return null;

  return (
    <Canvas
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      camera={{ position: [0, 0, CAMERA_DISTANCE], fov: CAMERA_FOV }}
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
    >
      <Character texture={texture} animate={!reducedMotion} />
    </Canvas>
  );
}
