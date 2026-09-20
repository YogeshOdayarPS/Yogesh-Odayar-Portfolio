import { useRef } from "react";
import { useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";

export default function useTilt({ strength = 8, spring = { stiffness: 150, damping: 16 } } = {}) {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, spring);
  const springY = useSpring(y, spring);
  const rotateX = useTransform(springY, [-0.5, 0.5], [strength, -strength]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-strength, strength]);

  const onMouseMove = (e) => {
    if (prefersReducedMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const onMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const tiltStyle = prefersReducedMotion
    ? undefined
    : { rotateX, rotateY, transformPerspective: 800 };

  return { ref, onMouseMove, onMouseLeave, tiltStyle, prefersReducedMotion };
}
