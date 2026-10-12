import { useEffect, useRef, useState } from "react";
import { techStack } from "../data/content";
import Reveal from "./Reveal";
import {
  Html5Icon,
  Css3Icon,
  JavaScriptIcon,
  JavaLogoIcon,
  PythonLogoIcon,
  GitIcon,
  CIcon,
  ReactIcon,
  FlutterIcon,
  NodeIcon,
  MySqlIcon,
  GithubIcon,
  VsCodeIcon,
  PowerBiIcon,
  ExcelIcon,
} from "./icons/TechIcons";
import "./Skills.css";

const TECH_ICONS = {
  java: JavaLogoIcon,
  python: PythonLogoIcon,
  c: CIcon,
  javascript: JavaScriptIcon,
  html5: Html5Icon,
  css3: Css3Icon,
  react: ReactIcon,
  flutter: FlutterIcon,
  node: NodeIcon,
  mysql: MySqlIcon,
  excel: ExcelIcon,
  powerbi: PowerBiIcon,
  vscode: VsCodeIcon,
  github: GithubIcon,
  git: GitIcon,
};

// Letter geometry, in design units. Each letter is its own box (height 1000)
// so the two can sit side by side on desktop and stack on mobile. Icon
// diameter is 150 units; the faint "tube" behind the icons is 184 wide.
const Y_BOX = { w: 680, h: 1000 };
const Y_SLOTS = [
  [106, 105], // left arm
  [223, 286],
  [574, 105], // right arm
  [457, 286],
  [340, 466], // fork
  [340, 681], // stem
  [340, 896],
];
const Y_TRACK = "M106 105 L340 466 L574 105 M340 466 L340 896";

const O_BOX = { w: 900, h: 1000 };
const O_CENTER = [450, 500];
const O_RADIUS = 345;
const oSlots = (count) =>
  Array.from({ length: count }, (_, i) => {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / count;
    return [O_CENTER[0] + O_RADIUS * Math.cos(a), O_CENTER[1] + O_RADIUS * Math.sin(a)];
  });

// Icons near a letter's outer edge open their card inwards so it never
// runs off narrow screens.
function alignFor(x, boxW) {
  if (x < boxW * 0.25) return "start";
  if (x > boxW * 0.75) return "end";
  return "center";
}

function TechItem({ tech, x, y, box, index, active, onToggle }) {
  const Icon = TECH_ICONS[tech.icon];
  const pointerType = useRef("");

  return (
    <li
      className="tech-item"
      data-active={active || undefined}
      style={{
        left: `${(x / box.w) * 100}%`,
        top: `${(y / box.h) * 100}%`,
        "--level": tech.level / 100,
        "--float-delay": `${index * -0.7}s`,
      }}
    >
      <div className="tech-float">
        <button
          type="button"
          className="tech-btn"
          aria-label={`${tech.name}: ${tech.level}% proficiency`}
          aria-pressed={active}
          onPointerDown={(e) => (pointerType.current = e.pointerType)}
          onClick={() => {
            // Mouse users get the hover flip; taps toggle it instead.
            if (pointerType.current !== "mouse") onToggle();
            pointerType.current = "";
          }}
        >
          <span className="tech-inner">
            <span className="tech-front">{Icon && <Icon />}</span>
            <span className="tech-back" data-align={alignFor(x, box.w)} aria-hidden="true">
              <span className="tech-back-row">
                <span className="tech-name">{tech.name}</span>
                <span className="tech-level">{tech.level}%</span>
              </span>
              <span className="tech-bar">
                <span className="tech-bar-fill" />
              </span>
            </span>
          </span>
        </button>
      </div>
    </li>
  );
}

function Letter({ label, box, track, slots, items, activeKey, setActiveKey, delay }) {
  return (
    <Reveal
      className={`yo-letter yo-letter-${label.toLowerCase()}`}
      style={{ aspectRatio: `${box.w} / ${box.h}` }}
      delay={delay}
    >
      <svg className="yo-track" viewBox={`0 0 ${box.w} ${box.h}`} aria-hidden="true">
        {track}
      </svg>
      <ul className="yo-icons" aria-label={`Letter ${label}`}>
        {items.slice(0, slots.length).map((tech, i) => {
          const key = `${label}-${tech.icon}`;
          return (
            <TechItem
              key={key}
              tech={tech}
              x={slots[i][0]}
              y={slots[i][1]}
              box={box}
              index={i}
              active={activeKey === key}
              onToggle={() => setActiveKey((k) => (k === key ? null : key))}
            />
          );
        })}
      </ul>
    </Reveal>
  );
}

// Outline, dark body, faint teal tint and a dashed centre line, drawn as
// stacked strokes of the same shape.
function Track({ children }) {
  return (
    <>
      <g className="yo-track-edge">{children}</g>
      <g className="yo-track-body">{children}</g>
      <g className="yo-track-tint">{children}</g>
      <g className="yo-track-line">{children}</g>
    </>
  );
}

export default function Skills() {
  const [activeKey, setActiveKey] = useState(null);

  // Close a tapped card on an outside tap or Escape.
  useEffect(() => {
    if (!activeKey) return undefined;
    const onPointer = (e) => {
      if (!e.target.closest?.(".tech-item")) setActiveKey(null);
    };
    const onKey = (e) => {
      if (e.key === "Escape") setActiveKey(null);
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [activeKey]);

  return (
    <section id="skills" className="section skills-section">
      <div className="container skills-container">
        <Reveal className="skills-heading">
          <span className="section-eyebrow skills-eyebrow">Skills &amp; Tools</span>
          <h2 className="section-title skills-title">What I Work With</h2>
        </Reveal>

        <div className="yo-stage">
          <Letter
            label="Y"
            box={Y_BOX}
            track={
              <Track>
                <path d={Y_TRACK} />
              </Track>
            }
            slots={Y_SLOTS}
            items={techStack.Y}
            activeKey={activeKey}
            setActiveKey={setActiveKey}
            delay={0.05}
          />
          <Letter
            label="O"
            box={O_BOX}
            track={
              <Track>
                <circle cx={O_CENTER[0]} cy={O_CENTER[1]} r={O_RADIUS} />
              </Track>
            }
            slots={oSlots(techStack.O.length)}
            items={techStack.O}
            activeKey={activeKey}
            setActiveKey={setActiveKey}
            delay={0.15}
          />
        </div>
      </div>
    </section>
  );
}
