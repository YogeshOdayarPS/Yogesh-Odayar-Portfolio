import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, Award, ExternalLink } from "lucide-react";
import { experience } from "../data/content";
import "./Experience.css";

export default function Experience() {
  const [tab, setTab] = useState("industry");

  return (
    <section id="experience" className="section experience-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-eyebrow">Experience</span>
          <h2 className="section-title">Where I've worked and led</h2>
        </motion.div>

        <div className="experience-tabs" role="tablist">
          <button
            role="tab"
            aria-selected={tab === "industry"}
            className={`experience-tab ${tab === "industry" ? "active" : ""}`}
            onClick={() => setTab("industry")}
          >
            <Briefcase size={18} /> Industry
          </button>
          <button
            role="tab"
            aria-selected={tab === "ieee"}
            className={`experience-tab ${tab === "ieee" ? "active" : ""}`}
            onClick={() => setTab("ieee")}
          >
            <Award size={18} /> IEEE TEMS
          </button>
        </div>

        <AnimatePresence mode="wait">
          {tab === "industry" ? (
            <motion.div
              key="industry"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35 }}
              className="timeline"
            >
              {experience.industry.map((job) => (
                <div key={job.company} className="glass-card timeline-card">
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
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="ieee"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35 }}
              className="ieee-timeline"
            >
              {experience.ieee.map((role) => (
                <div key={role.role} className="glass-card ieee-card">
                  <span className="timeline-date">{role.duration}</span>
                  <h4 className="timeline-role">{role.role}</h4>
                  <p className="timeline-company">{role.organization}</p>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
