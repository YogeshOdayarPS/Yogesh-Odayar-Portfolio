import { motion } from "framer-motion";
import { skillGroups, certifications } from "../data/content";
import TiltCard from "./TiltCard";
import "./Skills.css";

export default function Skills() {
  return (
    <section id="skills" className="section skills-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-eyebrow">Skills</span>
          <h2 className="section-title">Technical Skills</h2>
        </motion.div>

        <div className="skills-grid">
          {skillGroups.map((group, i) => (
            <TiltCard key={group.title} className="glass-card skill-card" delay={i * 0.05} strength={6}>
              <h3 className="skill-card-title">{group.title}</h3>
              <div className="skill-tags">
                {group.skills.map((skill) => (
                  <span key={skill} className="tag">
                    {skill}
                  </span>
                ))}
              </div>
            </TiltCard>
          ))}
        </div>

        <motion.div
          className="certifications-block"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="certifications-title">Certifications & Coursework</h3>
          <div className="certifications-grid">
            {certifications.map((cert, i) => (
              <TiltCard key={cert.title} className="glass-card certification-card" delay={i * 0.04} strength={5}>
                <p className="certification-name">{cert.title}</p>
                <p className="certification-note">{cert.note}</p>
              </TiltCard>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
