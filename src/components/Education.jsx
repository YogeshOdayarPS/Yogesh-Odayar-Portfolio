import { GraduationCap } from "lucide-react";
import { education } from "../data/content";
import Reveal from "./Reveal";
import "./Education.css";

export default function Education() {
  return (
    <section id="education" className="section education-section">
      <div className="container">
        <Reveal>
          <span className="section-eyebrow">Education</span>
          <h2 className="section-title">Academic background</h2>
        </Reveal>

        <div className="education-list">
          {education.map((edu, i) => (
            <Reveal key={edu.degree} className="glass-card education-card" delay={i * 0.08} x={-16} y={0}>
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
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
