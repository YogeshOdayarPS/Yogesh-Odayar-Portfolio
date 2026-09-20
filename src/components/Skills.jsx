import { skillGroups } from "../data/content";
import Reveal from "./Reveal";
import "./Skills.css";

export default function Skills() {
  return (
    <section id="skills" className="section skills-section">
      <div className="container">
        <Reveal>
          <span className="section-eyebrow">Skills</span>
          <h2 className="section-title">Technical Skills</h2>
        </Reveal>

        <div className="skills-grid">
          {skillGroups.map((group, i) => (
            <Reveal key={group.title} className="glass-card skill-card" delay={i * 0.05} y={16}>
              <h3 className="skill-card-title">{group.title}</h3>
              <div className="skill-tags">
                {group.skills.map((skill, si) => (
                  <span
                    key={skill}
                    className="tag skill-tag"
                    style={{ transitionDelay: `${si * 20}ms` }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
