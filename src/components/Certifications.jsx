import { ShieldCheck } from "lucide-react";
import { certifications } from "../data/content";
import TiltCard from "./TiltCard";
import Reveal from "./Reveal";
import "./Certifications.css";

export default function Certifications() {
  return (
    <section id="certifications" className="section certifications-section">
      <div className="container">
        <Reveal>
          <span className="section-eyebrow">Certifications</span>
          <h2 className="section-title">Certifications &amp; Coursework</h2>
        </Reveal>

        <div className="certifications-grid">
          {certifications.map((cert, i) => (
            <TiltCard key={cert.title} className="glass-card certification-card" delay={i * 0.05} strength={4}>
              <ShieldCheck size={18} className="certification-icon" />
              <p className="certification-name">{cert.title}</p>
              <p className="certification-note">{cert.note}</p>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
