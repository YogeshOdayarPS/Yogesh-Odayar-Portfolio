import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, FileText } from "lucide-react";
import { projects } from "../data/content";
import ProjectCard from "./ProjectCard";
import "./Projects.css";

export default function Projects() {
  const [active, setActive] = useState(null);

  useEffect(() => {
    if (!active) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  return (
    <section id="projects" className="section projects-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-eyebrow">Projects</span>
          <h2 className="section-title">Things I've built</h2>
        </motion.div>

        <div className="projects-grid">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} onOpen={setActive} />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <motion.div
              className="glass-card project-modal"
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 16 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="modal-close" onClick={() => setActive(null)} aria-label="Close">
                <X size={20} />
              </button>
              <span className="project-category">{active.category}</span>
              <h3 className="modal-title">{active.title}</h3>
              <p className="modal-details">{active.details}</p>
              {active.outcome && (
                <div className="modal-outcome">
                  <h4>Outcome</h4>
                  <p>{active.outcome}</p>
                </div>
              )}
              <div className="modal-tags">
                {active.tech.map((t) => (
                  <span key={t} className="tag">
                    {t}
                  </span>
                ))}
              </div>
              <div className="modal-actions">
                {active.link && (
                  <a href={active.link} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                    View Live <ExternalLink size={16} />
                  </a>
                )}
                {active.patentPdf && (
                  <a href={active.patentPdf} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                    View Patent Paper <FileText size={16} />
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
