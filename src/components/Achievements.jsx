import { useMemo, useRef, useState, lazy, Suspense } from "react";
import { useScroll, useReducedMotion } from "framer-motion";
import { Trophy } from "lucide-react";
import { achievements } from "../data/content";
import DNAStatic from "./achievements/DNAStatic";
import AchievementCard from "./achievements/AchievementCard";
import useIsMobile from "./achievements/useIsMobile";
import "./Achievements.css";

const DNAScene = lazy(() => import("./achievements/DNAScene"));

export default function Achievements() {
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const sectionRef = useRef(null);

  const categories = useMemo(() => ["All", ...achievements.map((g) => g.category)], []);
  const [filter, setFilter] = useState("All");

  const items = useMemo(() => {
    return achievements
      .filter((group) => filter === "All" || group.category === filter)
      .flatMap((group) => group.items.map((item) => ({ ...item, category: group.category })));
  }, [filter]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const handleFilterChange = (cat) => {
    setFilter(cat);
    requestAnimationFrame(() => {
      sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  if (prefersReducedMotion) {
    return (
      <section id="achievements" className="section achievements-section achv-static">
        <div className="container">
          <span className="section-eyebrow">Achievements</span>
          <h2 className="section-title">Hackathons, awards &amp; leadership</h2>

          <div className="achv-static-dna">
            <DNAStatic />
          </div>

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

          <div className="achv-static-grid">
            {items.map((item, i) => (
              <div
                key={item.title + i}
                className={`glass-card achv-static-card ${item.highlight ? "highlight" : ""}`}
              >
                {item.highlight && <Trophy size={16} className="achv-card-icon" />}
                <span className="achv-card-category">{item.category}</span>
                <h4 className="achv-card-title">{item.title}</h4>
                <p className="achv-card-description">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const vhPerCard = isMobile ? 42 : 55;
  const outerHeight = `${Math.max(items.length, 1) * vhPerCard + 100}vh`;
  const spread = isMobile ? 240 : 620;

  return (
    <section
      id="achievements"
      ref={sectionRef}
      className="achv-pin-outer"
      style={{ height: outerHeight }}
    >
      <div className="achv-pin-inner">
        <div className="achv-header container">
          <span className="section-eyebrow">Achievements</span>
          <h2 className="section-title">Hackathons, awards &amp; leadership</h2>
          <div className="achievements-filters">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`filter-chip ${filter === cat ? "active" : ""}`}
                onClick={() => handleFilterChange(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="achv-stage">
          <div className="achv-dna-layer">
            <Suspense fallback={null}>
              <DNAScene quality={isMobile ? "low" : "high"} />
            </Suspense>
          </div>

          <div className="achv-cards-layer">
            {items.map((item, i) => (
              <AchievementCard
                key={item.title + i}
                item={item}
                index={i}
                total={items.length}
                scrollProgress={scrollYProgress}
                spread={spread}
                isMobile={isMobile}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
