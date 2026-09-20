import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import { achievements } from "../data/content";
import TiltCard from "./TiltCard";
import "./Achievements.css";

export default function Achievements() {
  const categories = useMemo(() => ["All", ...achievements.map((a) => a.category)], []);
  const [filter, setFilter] = useState("All");

  const items = useMemo(() => {
    return achievements
      .filter((group) => filter === "All" || group.category === filter)
      .flatMap((group) => group.items.map((item) => ({ ...item, category: group.category })));
  }, [filter]);

  return (
    <section id="achievements" className="section achievements-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-eyebrow">Achievements</span>
          <h2 className="section-title">Hackathons, awards & leadership</h2>
        </motion.div>

        <div className="achievements-filters">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-chip ${filter === cat ? "active" : ""}`}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="achievements-grid">
          {items.map((item, i) => (
            <TiltCard
              key={item.title + i}
              className={`glass-card achievement-card ${item.highlight ? "highlight" : ""}`}
              delay={(i % 8) * 0.04}
              strength={6}
            >
              {item.highlight && <Trophy size={16} className="achievement-icon" />}
              <span className="achievement-category">{item.category}</span>
              <h4 className="achievement-title">{item.title}</h4>
              <p className="achievement-description">{item.description}</p>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
