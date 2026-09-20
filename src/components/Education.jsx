import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { education } from "../data/content";
import TiltCard from "./TiltCard";
import "./Education.css";

export default function Education() {
  return (
    <section id="education" className="section education-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-eyebrow">Education</span>
          <h2 className="section-title">Academic background</h2>
        </motion.div>

        <div className="education-list">
          {education.map((edu, i) => (
            <TiltCard key={edu.degree} className="glass-card education-card" delay={i * 0.08} strength={4}>
              <div className="education-icon">
                <GraduationCap size={20} />
              </div>
              <div className="education-body">
                <span className="education-year">{edu.year}</span>
                <h3 className="education-degree">{edu.degree}</h3>
                <p className="education-school">{edu.school}</p>
                {edu.description && <p className="education-description">{edu.description}</p>}
                <p className="education-score">{edu.score}</p>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
