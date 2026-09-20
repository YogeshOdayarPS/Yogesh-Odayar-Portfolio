import { motion } from "framer-motion";
import useTilt from "../hooks/useTilt";

export default function TiltCard({
  children,
  className = "",
  delay = 0,
  as: Tag = "div",
  strength = 8,
  onClick,
  ...rest
}) {
  const { ref, onMouseMove, onMouseLeave, tiltStyle } = useTilt({ strength });
  const MotionTag = motion[Tag] ?? motion.div;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, rotateX: 10 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay }}
      style={{ transformPerspective: 900 }}
    >
      <MotionTag
        ref={ref}
        className={className}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
        style={tiltStyle}
        whileHover={{ y: -4 }}
        {...rest}
      >
        {children}
      </MotionTag>
    </motion.div>
  );
}
