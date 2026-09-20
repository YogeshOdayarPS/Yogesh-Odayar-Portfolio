import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { leadership } from "../data/content";
import Reveal from "./Reveal";
import CountUp from "./CountUp";
import leadershipPhoto from "../assets/leadership-photo.jpg";
import "./Leadership.css";

export default function Leadership() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const photoY = useTransform(scrollYProgress, [0, 1], [-28, 28]);

  return (
    <section id="leadership" ref={sectionRef} className="section leadership-section">
      <div className="container">
        <Reveal>
          <span className="section-eyebrow">IEEE &amp; Leadership</span>
          <h2 className="section-title">Leading beyond the classroom</h2>
        </Reveal>

        <div className="leadership-grid">
          <div className="leadership-photo-frame">
            <motion.div className="leadership-photo-parallax" style={{ y: photoY }}>
              <motion.div
                className="leadership-photo-wrap"
                initial={{ opacity: 0, scale: 1.08 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              >
                <img src={leadershipPhoto} alt="Yogesh Odayar P S" className="leadership-photo" loading="lazy" />
              </motion.div>
            </motion.div>
          </div>

          <div className="leadership-content">
            <Reveal as="p" className="leadership-intro" delay={0.1}>
              {leadership.intro}
            </Reveal>

            <div className="leadership-stats">
              {leadership.stats.map((stat, i) => (
                <Reveal key={stat.label} className="leadership-stat" delay={0.2 + i * 0.06} y={14}>
                  <span className="leadership-stat-value gradient-text">
                    <CountUp value={stat.value} />
                  </span>
                  <span className="leadership-stat-label">{stat.label}</span>
                </Reveal>
              ))}
            </div>

            <div className="leadership-roles">
              {leadership.roles.map((role, i) => (
                <Reveal key={role.role} className="leadership-role-row" delay={0.3 + i * 0.07} y={12}>
                  <span className="leadership-role-duration">{role.duration}</span>
                  <div>
                    <h4 className="leadership-role-title">{role.role}</h4>
                    <p className="leadership-role-org">{role.organization}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
