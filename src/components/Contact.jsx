import { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { Mail, ArrowUpRight } from "lucide-react";
import { GithubGlyph, LinkedinGlyph } from "./icons/BrandIcons";
import { personal } from "../data/content";
import { contactShapes } from "../lib/scene3dPresets";
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

export default function Contact() {
  return (
    <section id="contact" className="section contact-section">
      <div className="contact-glow" aria-hidden="true" />
      <Suspense fallback={null}>
        <Scene3D shapes={contactShapes} className="contact-scene3d" />
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
