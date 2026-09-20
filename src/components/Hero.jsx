import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import { personal } from "../data/content";
import heroImage from "../assets/hero-character.webp";
import "./Hero.css";

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const frameRef = useRef(null);

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  const springConfig = { stiffness: 60, damping: 18, mass: 0.6 };
  const springX = useSpring(pointerX, springConfig);
  const springY = useSpring(pointerY, springConfig);

  const rotateX = useTransform(springY, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-6, 6]);
  const glowX = useTransform(springX, [-0.5, 0.5], [-18, 18]);
  const glowY = useTransform(springY, [-0.5, 0.5], [-18, 18]);
  const bgShiftX = useTransform(springX, [-0.5, 0.5], [10, -10]);
  const bgShiftY = useTransform(springY, [-0.5, 0.5], [10, -10]);

  const handlePointerMove = (event) => {
    if (prefersReducedMotion || !frameRef.current) return;
    const rect = frameRef.current.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    pointerX.set(x);
    pointerY.set(y);
  };

  const handlePointerLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="hero">
      <div className="container hero-grid">
        <motion.div
          className="hero-copy"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <p className="hero-greeting">Hi, I'm</p>
          <h1 className="hero-name">{personal.name}</h1>
          <h2 className="hero-role gradient-text">{personal.role}</h2>
          <p className="hero-tagline">{personal.tagline}</p>

          <div className="hero-actions">
            <button className="btn btn-primary" onClick={() => scrollTo("projects")}>
              View My Work <ArrowRight size={18} />
            </button>
            <a href={personal.resume} download className="btn btn-secondary">
              Download Resume <Download size={18} />
            </a>
          </div>
        </motion.div>

        <motion.div
          className="hero-visual"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="hero-visual-bg"
            style={
              prefersReducedMotion
                ? undefined
                : { x: bgShiftX, y: bgShiftY }
            }
          />

          <div
            ref={frameRef}
            className="hero-frame"
            onMouseMove={handlePointerMove}
            onMouseLeave={handlePointerLeave}
          >
            <motion.div
              className="hero-image-wrap"
              style={
                prefersReducedMotion
                  ? undefined
                  : { rotateX, rotateY, transformPerspective: 900 }
              }
              initial={{ opacity: 0, scale: 1.12, filter: "blur(14px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            >
              <motion.img
                src={heroImage}
                alt="Yogesh Odayar P S at his desk, chin resting on hand, in a cinematic dark-blue developer workspace"
                className="hero-image"
                width={1100}
                height={1355}
                fetchPriority="high"
                animate={
                  prefersReducedMotion
                    ? undefined
                    : { y: [0, -6, 0] }
                }
                transition={
                  prefersReducedMotion
                    ? undefined
                    : { duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1.6 }
                }
              />

              <motion.div
                className="hero-screen-glow"
                style={
                  prefersReducedMotion
                    ? undefined
                    : { x: glowX, y: glowY }
                }
                animate={
                  prefersReducedMotion
                    ? { opacity: 0.5 }
                    : { opacity: [0.35, 0.65, 0.35] }
                }
                transition={
                  prefersReducedMotion
                    ? undefined
                    : { duration: 4, repeat: Infinity, ease: "easeInOut" }
                }
              />
            </motion.div>

            <div className="hero-frame-border" />
          </div>
        </motion.div>
      </div>

      <div className="hero-scroll-cue" aria-hidden="true">
        <span />
      </div>
    </section>
  );
}
