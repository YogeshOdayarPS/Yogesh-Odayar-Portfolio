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

  const x = useTransform(localT, [0, 0.5, 1], [spread, 0, -spread]);
  const z = useTransform(localT, [0, 0.5, 1], [-260, 90, -260]);
  const scale = useTransform(localT, [0, 0.15, 0.5, 0.85, 1], [0.5, 0.72, 1, 0.72, 0.5]);
  const rotateY = useTransform(localT, [0, 0.5, 1], isMobile ? [10, 0, -10] : [30, 0, -30]);
  const opacity = useTransform(localT, [0, 0.1, 0.5, 0.9, 1], [0, 1, 1, 1, 0]);
  const blurAmount = useTransform(localT, [0, 0.5, 1], [5, 0, 5]);
  const filter = useTransform(blurAmount, (v) => `blur(${v.toFixed(1)}px)`);

  return (
    <motion.div
      className={`achv-card glass-card ${item.highlight ? "highlight" : ""}`}
      style={{
        x,
        z,
        scale,
        rotateY,
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
