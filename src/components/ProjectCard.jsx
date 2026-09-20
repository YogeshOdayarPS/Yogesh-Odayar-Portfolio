import { motion } from "framer-motion";
import useTilt from "../hooks/useTilt";

export default function ProjectCard({ project, onOpen }) {
  const { ref, onMouseMove, onMouseLeave, tiltStyle } = useTilt({ strength: 8 });

  return (
    <motion.button
      ref={ref}
      className="glass-card project-card"
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
      <span className="project-category">{project.category}</span>
      <h3 className="project-title">{project.title}</h3>
      <p className="project-description">{project.description}</p>
      <div className="project-tags">
        {project.tech.slice(0, 3).map((t) => (
          <span key={t} className="tag">
            {t}
          </span>
        ))}
      </div>
    </motion.button>
  );
}
