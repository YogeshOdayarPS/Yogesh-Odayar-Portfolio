import { motion } from "framer-motion";
import { Mail, ArrowUpRight } from "lucide-react";
import { GithubGlyph, LinkedinGlyph } from "./icons/BrandIcons";
import { personal } from "../data/content";
import TiltCard from "./TiltCard";
import "./Contact.css";

const links = [
  { label: "Email", value: personal.email, href: personal.emailLink, icon: Mail },
  { label: "LinkedIn", value: "Yogesh Odayar P S", href: personal.linkedin, icon: LinkedinGlyph },
  { label: "GitHub", value: "@YogeshOdayarPS", href: personal.github, icon: GithubGlyph },
];

export default function Contact() {
  return (
    <section id="contact" className="section contact-section">
      <div className="container">
        <motion.div
          className="glass-card contact-panel"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-eyebrow">Contact</span>
          <h2 className="section-title contact-title">Let's build something.</h2>
          <p className="contact-subtitle">
            Whether you have a question, want to collaborate, or just want to say hi — I'll get back to you.
          </p>

          <div className="contact-links">
            {links.map(({ label, value, href, icon: Icon }, i) => (
              <TiltCard
                key={label}
                as="a"
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-item"
                delay={i * 0.06}
                strength={6}
              >
                <div className="contact-item-icon">
                  <Icon size={22} />
                </div>
                <div className="contact-item-body">
                  <span className="contact-item-label">{label}</span>
                  <span className="contact-item-value">{value}</span>
                </div>
                <ArrowUpRight size={18} className="contact-item-arrow" />
              </TiltCard>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
