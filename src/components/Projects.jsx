import { useState, useEffect, useRef, useCallback, lazy, Suspense } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, FileText } from "lucide-react";
import { projects } from "../data/content";
import { projectsShapes } from "../lib/scene3dPresets";
import ProjectCard from "./ProjectCard";
import Reveal from "./Reveal";
import "./Projects.css";

const Scene3D = lazy(() => import("./Scene3D"));

// Single-column project details popup: team photo first, then category,
// title, description, outcome, tech stack and links.
function ProjectModal({ project, onClose }) {
  const closeRef = useRef(null);
  const titleId = `project-modal-title-${project.id}`;

  useEffect(() => {
    // Keep the page itself from scrolling behind the modal, without the
    // layout jumping when the scrollbar disappears.
    const { body } = document;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    const prev = { overflow: body.style.overflow, paddingRight: body.style.paddingRight };
    body.style.overflow = "hidden";
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;
    closeRef.current?.focus();

    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      body.style.overflow = prev.overflow;
      body.style.paddingRight = prev.paddingRight;
    };
  }, [onClose]);

  return (
    <motion.div
      className="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
    >
      <motion.div
        className="glass-card project-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        initial={{ opacity: 0, scale: 0.95, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 8 }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <button ref={closeRef} type="button" className="modal-close" onClick={onClose} aria-label="Close project details">
          <X size={20} />
        </button>

        {project.teamPhoto && (
          <figure className="modal-team">
            <img
              className="modal-team-photo"
              src={project.teamPhoto}
              alt={`The ${project.title} team`}
              decoding="async"
              style={{ objectPosition: project.teamPhotoPosition ?? "50% 50%" }}
            />
            <figcaption className="modal-team-label">The Team</figcaption>
          </figure>
        )}

        <span className="project-category">{project.category}</span>
        <h3 id={titleId} className="modal-title">
          {project.title}
        </h3>
        <p className="modal-details">{project.details ?? project.description}</p>

        {project.outcome && (
          <div className="modal-outcome">
            <h4>Outcome</h4>
            <p>{project.outcome}</p>
          </div>
        )}

        <h4 className="modal-subheading">Tech Stack</h4>
        <div className="modal-tags">
          {project.tech.map((t) => (
            <span key={t} className="tag">
              {t}
            </span>
          ))}
        </div>

        {(project.link || project.achievementLink || project.patentPdf) && (
          <div className="modal-actions">
            {project.achievementLink && (
              <a href={project.achievementLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                View Achievement <ExternalLink size={16} />
              </a>
            )}
            {project.link && (
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                View Live <ExternalLink size={16} />
              </a>
            )}
            {project.patentPdf && (
              <a href={project.patentPdf} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                View Patent Paper <FileText size={16} />
              </a>
            )}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const [active, setActive] = useState(null);
  const openerRef = useRef(null);

  const open = (project) => {
    openerRef.current = document.activeElement;
    setActive(project);
  };

  const close = useCallback(() => {
    setActive(null);
    // Give focus back to the card that opened the modal.
    openerRef.current?.focus?.({ preventScroll: true });
  }, []);

  return (
    <section id="projects" className="section projects-section">
      <Suspense fallback={null}>
        <Scene3D shapes={projectsShapes} followPointer={false} className="projects-scene3d" />
      </Suspense>

      <div className="container">
        <Reveal>
          <span className="section-eyebrow">Projects</span>
          <h2 className="section-title projects-title">Work I've Been Part Of</h2>
          <p className="projects-subtitle">Projects, collaborations, and ideas I've contributed to.</p>
        </Reveal>

        <div className="projects-grid">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} onOpen={open} />
          ))}
        </div>
      </div>

      {createPortal(
        <AnimatePresence>{active && <ProjectModal key={active.id} project={active} onClose={close} />}</AnimatePresence>,
        document.body
      )}
    </section>
  );
}
