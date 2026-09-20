import { lazy, Suspense } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import { personal } from "../data/content";
import { heroShapes } from "../lib/scene3dPresets";
import "./Hero.css";

const Scene3D = lazy(() => import("./Scene3D"));
const HeroPortraitScene = lazy(() => import("./hero/HeroPortraitScene"));

const copyContainer = {
  animate: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const copyItem = {
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
};

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  const springConfig = { stiffness: 60, damping: 18, mass: 0.6 };
  const springX = useSpring(pointerX, springConfig);
  const springY = useSpring(pointerY, springConfig);

  const bgShiftX = useTransform(springX, [-0.5, 0.5], [10, -10]);
  const bgShiftY = useTransform(springY, [-0.5, 0.5], [10, -10]);

  const handlePointerMove = (event) => {
    if (prefersReducedMotion) return;
    const x = event.clientX / window.innerWidth - 0.5;
    const y = event.clientY / window.innerHeight - 0.5;
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
      <Suspense fallback={null}>
        <Scene3D shapes={heroShapes} className="hero-scene3d" />
      </Suspense>

      <div className="container hero-grid">
        <motion.div
          className="hero-copy"
          variants={copyContainer}
          initial="initial"
          animate="animate"
        >
          <motion.p className="hero-greeting" variants={copyItem}>
            Hi, I'm
          </motion.p>
          <motion.h1 className="hero-name" variants={copyItem}>
            {personal.name}
          </motion.h1>
          <motion.h2 className="hero-role gradient-text" variants={copyItem}>
            {personal.role}
          </motion.h2>
          <motion.p className="hero-tagline" variants={copyItem}>
            {personal.tagline}
          </motion.p>

          <motion.div className="hero-actions" variants={copyItem}>
            <button className="btn btn-primary" onClick={() => scrollTo("projects")}>
              View My Work <ArrowRight size={18} />
            </button>
            <a href={personal.resume} download className="btn btn-secondary">
              Download Resume <Download size={18} />
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-visual"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          onMouseMove={handlePointerMove}
          onMouseLeave={handlePointerLeave}
        >
          <motion.div
            className="hero-visual-bg"
            style={
              prefersReducedMotion
                ? undefined
                : { x: bgShiftX, y: bgShiftY }
            }
          />

          <motion.div
            className="hero-frame"
            role="img"
            aria-label="Yogesh Odayar P S, chin resting on hand, rendered as a 3D holographic portrait with orbit rings"
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          >
            <Suspense fallback={null}>
              <HeroPortraitScene />
            </Suspense>
            <div className="hero-portrait-platform" aria-hidden="true" />
          </motion.div>
        </motion.div>
      </div>

      <div className="hero-scroll-cue" aria-hidden="true">
        <span />
      </div>
    </section>
  );
}
