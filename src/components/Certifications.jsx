import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  BarChart3,
  BookOpen,
  BrainCircuit,
  ChevronDown,
  Cloud,
  Code2,
  Database,
  GraduationCap,
  Laptop,
  Network,
  Sparkles,
  Trophy,
} from "lucide-react";
import { certifications } from "../data/content";
import {
  AccentureIcon,
  CIcon,
  CiscoIcon,
  CodeChefIcon,
  CourseraIcon,
  CppIcon,
  Css3Icon,
  GitIcon,
  GoogleIcon,
  GreatLearningIcon,
  Html5Icon,
  InfosysIcon,
  JavaIcon,
  JavaScriptIcon,
  PythonIcon,
  RIcon,
} from "./icons/TechIcons";
import TiltCard from "./TiltCard";
import Reveal from "./Reveal";
import "./Certifications.css";

function GoogleCourseraIcon({ size }) {
  return (
    <span className="cert-icon-pair">
      <GoogleIcon size={size * 0.8} />
      <CourseraIcon size={size * 0.8} />
    </span>
  );
}

// The Cisco and Infosys logos are wide and short, so they need more size
// to read at the same visual weight as the square icons.
function CiscoWideIcon({ size }) {
  return <CiscoIcon size={size * 1.6} />;
}

function InfosysWideIcon({ size }) {
  return <InfosysIcon size={size * 1.6} />;
}

// Keys used by the `icon` fields in content.js. Official brand glyphs where
// one exists; Lucide (in the accent colour) for generic topics.
const CERT_ICONS = {
  html5: Html5Icon,
  css3: Css3Icon,
  javascript: JavaScriptIcon,
  java: JavaIcon,
  python: PythonIcon,
  git: GitIcon,
  c: CIcon,
  cpp: CppIcon,
  r: RIcon,
  coursera: CourseraIcon,
  cisco: CiscoWideIcon,
  infosys: InfosysWideIcon,
  "great-learning": GreatLearningIcon,
  codechef: CodeChefIcon,
  accenture: AccentureIcon,
  "google-coursera": GoogleCourseraIcon,
  database: Database,
  cloud: Cloud,
  network: Network,
  ai: BrainCircuit,
  prompt: Sparkles,
  "data-science": BarChart3,
  coding: Code2,
  challenge: Trophy,
  academic: GraduationCap,
  tutorial: BookOpen,
  learning: Laptop,
};

function CertIcon({ name, size }) {
  const Icon = CERT_ICONS[name] ?? GraduationCap;
  return <Icon size={size} strokeWidth={1.8} />;
}

function CertificationCard({ cert, index, open, onToggle }) {
  const expandable = Boolean(cert.expandable && cert.courses?.length && cert.certificateLink);
  const panelId = `cert-panel-${index}`;

  const header = (
    <>
      <span className="cert-icon-tile">
        <CertIcon name={cert.icon} size={20} />
      </span>
      <span className="cert-heading">
        <span className="certification-name">{cert.title}</span>
        <span className="certification-note" title={cert.subtitle}>
          {cert.subtitle}
        </span>
      </span>
      {expandable && (
        <span className="cert-meta">
          <motion.span
            className="cert-chevron"
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <ChevronDown size={18} />
          </motion.span>
        </span>
      )}
    </>
  );

  return (
    <TiltCard
      className={`glass-card certification-card ${expandable ? "is-expandable" : ""} ${open ? "is-open" : ""}`}
      delay={index * 0.05}
      strength={open ? 2 : 4}
    >
      {expandable ? (
        <button
          type="button"
          className="cert-header"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
        >
          {header}
        </button>
      ) : (
        <div className="cert-header">{header}</div>
      )}

      <AnimatePresence initial={false}>
        {expandable && open && (
          <motion.div
            id={panelId}
            className="cert-panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="cert-panel-inner">
              <ul className="cert-courses">
                {cert.courses.map((course, i) => (
                  <li key={`${course.name}-${i}`} className="cert-course">
                    {course.link ? (
                      <a href={course.link} target="_blank" rel="noopener noreferrer" className="cert-course-link">
                        {course.name} <ArrowUpRight size={13} />
                      </a>
                    ) : (
                      <span>{course.name}</span>
                    )}
                    <span className="cert-course-icon">
                      <CertIcon name={course.icon} size={18} />
                    </span>
                  </li>
                ))}
              </ul>
              <a
                href={cert.certificateLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary cert-link"
              >
                View Certificates <ArrowUpRight size={16} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </TiltCard>
  );
}

// 3 columns on desktop, 2 on tablet, 1 on mobile (matches Certifications.css).
const COLUMN_QUERIES = [
  ["(min-width: 981px)", 3],
  ["(min-width: 721px)", 2],
];

function getColumnCount() {
  if (typeof window === "undefined") return 3;
  const match = COLUMN_QUERIES.find(([query]) => window.matchMedia(query).matches);
  return match ? match[1] : 1;
}

function useColumnCount() {
  const [count, setCount] = useState(getColumnCount);
  useEffect(() => {
    const lists = COLUMN_QUERIES.map(([query]) => window.matchMedia(query));
    const update = () => setCount(getColumnCount());
    lists.forEach((l) => l.addEventListener("change", update));
    return () => lists.forEach((l) => l.removeEventListener("change", update));
  }, []);
  return count;
}

export default function Certifications() {
  const [openTitle, setOpenTitle] = useState(null);
  const columnCount = useColumnCount();

  // Deal cards left-to-right into independent column stacks, so the first
  // row still reads in data order, but opening a card only pushes down the
  // cards below it in its own column - never the neighbouring columns.
  const columns = Array.from({ length: columnCount }, () => []);
  certifications.forEach((cert, i) => columns[i % columnCount].push({ cert, index: i }));

  return (
    <section id="certifications" className="section certifications-section">
      <div className="container">
        <Reveal>
          <span className="section-eyebrow">Certifications</span>
          <h2 className="section-title">Certifications &amp; Coursework</h2>
        </Reveal>

        <div className="certifications-columns" style={{ "--cert-columns": columnCount }}>
          {columns.map((column, c) => (
            <div key={c} className="certifications-column">
              {column.map(({ cert, index }) => (
                <CertificationCard
                  key={cert.title}
                  cert={cert}
                  index={index}
                  open={openTitle === cert.title}
                  onToggle={() => setOpenTitle((cur) => (cur === cert.title ? null : cert.title))}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
