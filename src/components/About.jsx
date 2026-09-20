import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { about } from "../data/content";
import Reveal from "./Reveal";
import CountUp from "./CountUp";
import "./About.css";

export default function About() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const textY = useTransform(scrollYProgress, [0, 1], [24, -24]);
  const statsY = useTransform(scrollYProgress, [0, 1], [-16, 16]);

  return (
    <section id="about" ref={sectionRef} className="section about-section">
      <div className="container">
        <Reveal>
          <span className="section-eyebrow">About</span>
          <h2 className="section-title">Not just building software — building outcomes.</h2>
        </Reveal>

        <div className="about-grid">
          <motion.div className="about-text" style={{ y: textY }}>
            {about.paragraphs.map((p, i) => (
              <Reveal key={i} as="p" delay={0.1 + i * 0.08}>
                {p}
              </Reveal>
            ))}
          </motion.div>

          <motion.div className="about-stats" style={{ y: statsY }}>
            {about.stats.map((stat, i) => (
              <Reveal key={stat.label} className="glass-card about-stat" delay={0.15 + i * 0.06} y={16}>
                <span className="about-stat-value gradient-text">
                  <CountUp value={stat.value} />
                </span>
                <span className="about-stat-label">{stat.label}</span>
              </Reveal>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
