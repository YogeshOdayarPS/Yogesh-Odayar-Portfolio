import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { experience } from "../data/content";
import Reveal from "./Reveal";
import "./Experience.css";

export default function Experience() {
  const timelineRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 80%", "end 60%"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="experience" className="section experience-section">
      <div className="container">
        <Reveal>
          <span className="section-eyebrow">Experience</span>
          <h2 className="section-title">Where I've worked</h2>
        </Reveal>

        <div className="timeline" ref={timelineRef}>
          <div className="timeline-track">
            <motion.div className="timeline-track-fill" style={{ scaleY: lineScale }} />
          </div>

          {experience.map((job, i) => (
            <Reveal key={job.company} className="timeline-row" delay={i * 0.1} x={-24} y={0}>
              <span className="timeline-marker" />
              <div className="glass-card timeline-card">
                <span className="timeline-date">{job.date}</span>
                <h3 className="timeline-role">{job.role}</h3>
                <p className="timeline-company">{job.company}</p>
                <div className="timeline-details">
                  <p>
                    <strong>Problem:</strong> {job.problem}
                  </p>
                  <p>
                    <strong>Solution:</strong> {job.solution}
                  </p>
                  <p>
                    <strong>Outcome:</strong> {job.outcome}
                  </p>
                </div>
                <div className="timeline-tags">
                  {job.tech.map((t) => (
                    <span key={t} className="tag">
                      {t}
                    </span>
                  ))}
                </div>
                {job.link && (
                  <a href={job.link} target="_blank" rel="noopener noreferrer" className="timeline-link">
                    View Project <ExternalLink size={14} />
                  </a>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
