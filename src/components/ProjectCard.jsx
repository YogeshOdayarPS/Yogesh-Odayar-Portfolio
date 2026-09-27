import { motion, useTransform } from "framer-motion";
import { ExternalLink, HeartPulse, Link2, Globe, FlaskConical, ShieldCheck } from "lucide-react";
import useTilt from "../hooks/useTilt";

const CATEGORY_ICON = {
  "IoT & Health": HeartPulse,
  Blockchain: Link2,
  "Web3 Marketplace": Globe,
  "Research / IPR": FlaskConical,
  "Statathon 2025 — Winner": ShieldCheck,
  "SDG Ideathon 4.0 — 2nd Prize": FlaskConical,
};

export default function ProjectCard({ project, onOpen }) {
  const strength = project.featured ? 10 : 6;
  const { ref, onMouseMove, onMouseLeave, tiltStyle, springX, springY } = useTilt({ strength });
  const Icon = CATEGORY_ICON[project.category] ?? Globe;

  const iconX = useTransform(springX, [-0.5, 0.5], [-14, 14]);
  const iconY = useTransform(springY, [-0.5, 0.5], [-10, 10]);
  const blobX = useTransform(springX, [-0.5, 0.5], [8, -8]);
  const blobY = useTransform(springY, [-0.5, 0.5], [6, -6]);

  return (
    <motion.button
      ref={ref}
      className={`glass-card project-card ${project.featured ? "featured" : ""}`}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onClick={() => onOpen(project)}
      style={tiltStyle}
      whileHover={{ y: -6 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
    >
      <div className="project-preview">
        {project.image ? (
          <img
            className="project-preview-img"
            src={project.image}
            alt={project.imageAlt ?? `${project.title} team`}
            loading="lazy"
            decoding="async"
            style={{ objectPosition: project.imagePosition ?? "50% 50%" }}
          />
        ) : (
          <>
            <motion.div className="project-preview-blob" style={{ x: blobX, y: blobY }} />
            <motion.div className="project-preview-icon" style={{ x: iconX, y: iconY }}>
              <Icon size={project.featured ? 56 : 42} strokeWidth={1.4} />
            </motion.div>
          </>
        )}
      </div>

      <div className="project-body">
        <span className="project-category">{project.category}</span>
        <h3 className="project-title">{project.title}</h3>

        <div className="project-reveal">
          <p className="project-description">{project.description}</p>
          <div className="project-tags">
            {project.tech.slice(0, 4).map((t) => (
              <span key={t} className="tag">
                {t}
              </span>
            ))}
          </div>
          {project.link && (
            <span className="project-live-hint">
              View live <ExternalLink size={13} />
            </span>
          )}
          {project.achievementLink && (
            <span className="project-live-hint">
              View achievement <ExternalLink size={13} />
            </span>
          )}
        </div>
      </div>
    </motion.button>
  );
}
