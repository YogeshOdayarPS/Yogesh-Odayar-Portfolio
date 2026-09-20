import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, ChevronDown } from "lucide-react";
import { achievements } from "../data/content";
import Reveal from "./Reveal";
import "./Achievements.css";

export default function Achievements() {
  const categories = useMemo(() => ["All", ...achievements.map((a) => a.category)], []);
  const [filter, setFilter] = useState("All");
  const [expandedId, setExpandedId] = useState(null);

  const items = useMemo(() => {
    return achievements
      .filter((group) => filter === "All" || group.category === filter)
      .flatMap((group) =>
        group.items.map((item) => ({ ...item, category: group.category, categoryCount: group.items.length }))
      );
  }, [filter]);

  return (
    <section id="achievements" className="section achievements-section">
      <div className="container">
        <Reveal>
          <span className="section-eyebrow">Achievements</span>
          <h2 className="section-title">Hackathons, awards &amp; leadership</h2>
        </Reveal>

        <div className="achievements-filters">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-chip ${filter === cat ? "active" : ""}`}
              onClick={() => {
                setFilter(cat);
                setExpandedId(null);
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="achievements-grid">
          {items.map((item, i) => {
            const id = item.title + i;
            const isOpen = expandedId === id;
            return (
              <Reveal
                key={id}
                layout
                role="button"
                tabIndex={0}
                aria-expanded={isOpen}
                className={`glass-card achievement-card ${item.highlight ? "highlight" : ""}`}
                delay={(i % 8) * 0.035}
                y={16}
                onClick={() => setExpandedId(isOpen ? null : id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setExpandedId(isOpen ? null : id);
                  }
                }}
              >
                {item.highlight && <Trophy size={16} className="achievement-icon" />}
                <span className="achievement-category">{item.category}</span>
                <h4 className="achievement-title">{item.title}</h4>
                <p className="achievement-description">{item.description}</p>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      className="achievement-expand"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <p>
                        {item.highlight ? "Highlighted result — " : ""}
                        One of {item.categoryCount} entries under {item.category}.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <ChevronDown size={14} className={`achievement-chevron ${isOpen ? "open" : ""}`} />
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
