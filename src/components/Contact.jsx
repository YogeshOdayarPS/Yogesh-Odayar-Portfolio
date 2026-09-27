import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Mail, ArrowUpRight } from "lucide-react";
import { GithubGlyph, LinkedinGlyph } from "./icons/BrandIcons";
import { personal } from "../data/content";
import { contactShapes } from "../lib/scene3dPresets";
import placeShapes from "../lib/placeShapes";
import "./Contact.css";

const Scene3D = lazy(() => import("./Scene3D"));

const links = [
  { label: "Email", value: personal.email, href: personal.emailLink, icon: Mail },
  { label: "LinkedIn", value: "Yogesh Odayar P S", href: personal.linkedin, icon: LinkedinGlyph },
  { label: "GitHub", value: "@YogeshOdayarPS", href: personal.github, icon: GithubGlyph },
];

const container = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const item = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

// Layout offset of `el` inside `ancestor`, ignoring transforms - so the
// panel's entrance animation doesn't skew the measurement.
function offsetWithin(el, ancestor) {
  let x = 0;
  let y = 0;
  for (let node = el; node && node !== ancestor; node = node.offsetParent) {
    x += node.offsetLeft;
    y += node.offsetTop;
  }
  return { x, y };
}

const CONTENT_MARGIN = 14;

// Keeps the decorative shapes in the empty space around the contact text
// and cards, re-placing them whenever the section or content resizes.
function useContactShapes(sectionRef, contentRef) {
  const [shapes, setShapes] = useState(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content) return undefined;

    const update = () => {
      const { x, y } = offsetWithin(content, section);
      const box = {
        left: x - CONTENT_MARGIN,
        top: y - CONTENT_MARGIN,
        right: x + content.offsetWidth + CONTENT_MARGIN,
        bottom: y + content.offsetHeight + CONTENT_MARGIN,
      };
      setShapes(placeShapes(contactShapes, section.clientWidth, section.clientHeight, box));
    };

    const observer = new ResizeObserver(update);
    observer.observe(section);
    observer.observe(content);
    return () => observer.disconnect();
  }, [sectionRef, contentRef]);

  return shapes;
}

export default function Contact() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const shapes = useContactShapes(sectionRef, contentRef);

  return (
    <section id="contact" className="section contact-section" ref={sectionRef}>
      <div className="contact-glow" aria-hidden="true" />
      <Suspense fallback={null}>
        {/* No pointer tilt here: it would swing the shapes toward the cards. */}
        <Scene3D shapes={shapes} followPointer={false} className="contact-scene3d" />
      </Suspense>

      <div className="container">
        <motion.div
          className="glass-card contact-panel"
          initial={{ opacity: 0, scale: 0.96, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            ref={contentRef}
            variants={container}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.span className="section-eyebrow" variants={item}>
              Contact
            </motion.span>
            <motion.h2 className="section-title contact-title" variants={item}>
              Let's build something.
            </motion.h2>
            <motion.p className="contact-subtitle" variants={item}>
              Whether you have a question, want to collaborate, or just want to say hi — I'll get back to you.
            </motion.p>

            <motion.div className="contact-links" variants={item}>
              {links.map(({ label, value, href, icon: Icon }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="contact-item">
                  <div className="contact-item-icon">
                    <Icon size={22} />
                  </div>
                  <div className="contact-item-body">
                    <span className="contact-item-label">{label}</span>
                    <span className="contact-item-value">{value}</span>
                  </div>
                  <ArrowUpRight size={18} className="contact-item-arrow" />
                </a>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
