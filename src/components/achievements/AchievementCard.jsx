import { motion, useTransform } from "framer-motion";
import { Trophy } from "lucide-react";

export default function AchievementCard({ item, index, total, scrollProgress, spread, isMobile }) {
  const perCard = 1 / total;
  const windowLen = Math.min(1, perCard * 1.6);
  const start = index * perCard - (windowLen - perCard) / 2;
  const end = start + windowLen;

  const localT = useTransform(scrollProgress, (v) => {
    const raw = (v - start) / (end - start || 1);
    return Math.min(1, Math.max(0, raw));
  });

  // Alternate cards take opposite diagonal corners of a curved figure-8-style
  // pass around the DNA: side 0 sweeps bottom-right -> top-left, side 1 sweeps
  // top-right -> bottom-left. Both also alternate whether their closest
  // approach passes in front of or behind the DNA, for real depth.
  const side = index % 2;
  const radiusX = spread;
  const radiusY = spread * (isMobile ? 0.32 : 0.42);
  const bulge = spread * (isMobile ? 0.18 : 0.32);
  const startY = side === 0 ? radiusY : -radiusY;
  const bulgeSign = side === 0 ? 1 : -1;

  const dx = -2 * radiusX;
  const dy = -2 * startY;
  const lineLen = Math.hypot(dx, dy) || 1;
  const perpX = -dy / lineLen;
  const perpY = dx / lineLen;

  const zEdge = -260;
  const zFront = isMobile ? 90 : 180;
  const zBehind = isMobile ? -360 : -560;
  const passesInFront = side === 0;
  const zMid = passesInFront ? zFront : zBehind;
  const zMin = Math.min(zEdge, zBehind);
  const zMax = Math.max(zEdge, zFront);
  const zRange = zMax - zMin || 1;

  const x = useTransform(localT, (t) => {
    const base = radiusX * (1 - 2 * t);
    const arc = Math.sin(t * Math.PI) * bulge * bulgeSign;
    return base + perpX * arc;
  });

  const y = useTransform(localT, (t) => {
    const base = startY * (1 - 2 * t);
    const arc = Math.sin(t * Math.PI) * bulge * bulgeSign;
    return base + perpY * arc;
  });

  const z = useTransform(localT, (t) => {
    const hump = Math.sin(t * Math.PI);
    return zEdge + (zMid - zEdge) * hump;
  });

  const zIndex = useTransform(z, (v) => (v > -40 ? 3 : 1));

  const scale = useTransform(z, (v) => {
    const t = (v - zMin) / zRange;
    return 0.42 + t * 0.68;
  });

  const filter = useTransform(z, (v) => {
    const t = (v - zMin) / zRange;
    const blur = Math.max(0, 6 * (1 - t));
    return `blur(${blur.toFixed(1)}px)`;
  });

  const rotateY = useTransform(localT, [0, 0.5, 1], [26, 0, -26]);
  const rotateX = useTransform(
    localT,
    [0, 0.5, 1],
    side === 0 ? [-9, 0, 9] : [9, 0, -9]
  );
  const opacity = useTransform(localT, [0, 0.08, 0.5, 0.92, 1], [0, 1, 1, 1, 0]);

  return (
    <motion.div
      className={`achv-card glass-card ${item.highlight ? "highlight" : ""}`}
      style={{
        x,
        y,
        z,
        zIndex,
        scale,
        rotateY,
        rotateX,
        opacity,
        filter,
      }}
    >
      {item.highlight && <Trophy size={16} className="achv-card-icon" />}
      <span className="achv-card-category">{item.category}</span>
      <h4 className="achv-card-title">{item.title}</h4>
      <p className="achv-card-description">{item.description}</p>
    </motion.div>
  );
}
