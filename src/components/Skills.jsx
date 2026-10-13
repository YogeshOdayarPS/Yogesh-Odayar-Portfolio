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
  ReactIcon,
  NodeIcon,
  MySqlIcon,
  GithubIcon,
  VsCodeIcon,
  PostgreSqlIcon,
  CloudComputingIcon,
  MachineLearningIcon,
  ExcelIcon,
} from "./icons/TechIcons";
import "./Skills.css";

const TECH_ICONS = {
  java: JavaLogoIcon,
  python: PythonLogoIcon,
  cloud: CloudComputingIcon,
  javascript: JavaScriptIcon,
  html5: Html5Icon,
  css3: Css3Icon,
  react: ReactIcon,
  ml: MachineLearningIcon,
  node: NodeIcon,
  mysql: MySqlIcon,
  excel: ExcelIcon,
  postgresql: PostgreSqlIcon,
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

// ---- Proficiency card placement ----
// The card sits beside its icon on whichever side fits best: each side is
// scored by how much it would cover other icons, with sides pointing away
// from the letter's centre preferred, and sides that leave the viewport
// ruled out. The card is then nudged along that side to stay on screen.
const CARD_GAP = 14;
const EDGE = 12;

// How far a circular icon reaches into a card, squared so a deep overlap
// costs much more than a graze.
function intrusion(rect, c) {
  const nx = Math.max(rect.left, Math.min(c.x, rect.right));
  const ny = Math.max(rect.top, Math.min(c.y, rect.bottom));
  const depth = c.r + 6 - Math.hypot(nx - c.x, ny - c.y);
  return depth > 0 ? depth * depth * 8 : 0;
}

function placeCard(item, card, dx, dy) {
  const icon = item.querySelector(".tech-btn").getBoundingClientRect();
  const w = card.offsetWidth;
  const h = card.offsetHeight;
  const cx = icon.left + icon.width / 2;
  const cy = icon.top + icon.height / 2;
  const vw = document.documentElement.clientWidth;
  const vh = window.innerHeight;
  const navBottom = document.querySelector(".navbar")?.getBoundingClientRect().bottom ?? 0;
  const minY = Math.max(EDGE, navBottom + 8);
  const maxY = vh - EDGE;
  const others = [...document.querySelectorAll(".tech-item .tech-btn")]
    .filter((el) => !item.contains(el))
    .map((el) => {
      const r = el.getBoundingClientRect();
      return { x: r.left + r.width / 2, y: r.top + r.height / 2, r: r.width / 2 };
    });

  const clamp = (v, lo, hi) => Math.min(Math.max(v, lo), Math.max(lo, hi));
  // Centred on the icon by default; a card may slide part-way along its side
  // (staying level with the icon) when that clears a neighbouring icon.
  const SLIDES = [0, -0.3, 0.3, -0.5, 0.5, -0.75, 0.75];
  const candidates = [
    { side: "right", pref: dx, left: icon.right + CARD_GAP, top: cy - h / 2 },
    { side: "left", pref: -dx, left: icon.left - CARD_GAP - w, top: cy - h / 2 },
    { side: "top", pref: -dy * 0.6, left: cx - w / 2, top: icon.top - CARD_GAP - h },
    { side: "bottom", pref: dy * 0.6, left: cx - w / 2, top: icon.bottom + CARD_GAP },
  ].flatMap((c) =>
    SLIDES.map((slide) => {
      const horizontal = c.side === "left" || c.side === "right";
      const slidePx = slide * (horizontal ? h : w);
      // Also slide as needed to stay on screen, but never so far that the
      // card stops lining up with the icon's centre - another side wins then.
      const left = horizontal
        ? c.left
        : clamp(clamp(c.left + slidePx, EDGE, vw - EDGE - w), cx - w + 24, cx - 24);
      const top = horizontal
        ? clamp(clamp(c.top + slidePx, minY, maxY - h), cy - h + 12, cy - 12)
        : c.top;
      const rect = { left, top, right: left + w, bottom: top + h };
      const offscreen =
        rect.left < EDGE || rect.right > vw - EDGE || rect.top < minY || rect.bottom > maxY;
      const covered = others.reduce((sum, c) => sum + intrusion(rect, c), 0);
      return {
        side: c.side,
        shiftX: left - c.left,
        shiftY: top - c.top,
        score:
          (offscreen ? 1e9 : 0) +
          covered +
          Math.abs(horizontal ? top - c.top : left - c.left) * 12 -
          c.pref * 600,
      };
    })
  );

  return candidates.reduce((best, c) => (c.score < best.score ? c : best));
}

function TechItem({ tech, x, y, box, index, active, onToggle }) {
  const Icon = TECH_ICONS[tech.icon];
  const pointerType = useRef("");
  const itemRef = useRef(null);
  const cardRef = useRef(null);
  const [place, setPlace] = useState({ side: "right", shiftX: 0, shiftY: 0 });

  // Measured on the way in (hover, focus, tap) so it reflects the current
  // viewport and scroll position.
  const updatePlace = () => {
    if (!itemRef.current || !cardRef.current) return;
    const dx = (x - box.w / 2) / box.w;
    const dy = (y - box.h / 2) / box.h;
    setPlace(placeCard(itemRef.current, cardRef.current, dx, dy));
  };

  return (
    <li
      ref={itemRef}
      className="tech-item"
      data-active={active || undefined}
      onPointerEnter={updatePlace}
      onFocus={updatePlace}
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
            if (pointerType.current !== "mouse") {
              updatePlace();
              onToggle();
            }
            pointerType.current = "";
          }}
        >
          <span className="tech-inner">
            <span className="tech-front">{Icon && <Icon />}</span>
            <span className="tech-back" aria-hidden="true">
              {tech.level}%
            </span>
          </span>
        </button>
      </div>
      <div
        ref={cardRef}
        className="tech-card"
        data-side={place.side}
        style={{ "--shift-x": `${place.shiftX}px`, "--shift-y": `${place.shiftY}px` }}
        aria-hidden="true"
      >
        <div className="tech-card-row">
          <span className="tech-name">{tech.name}</span>
          <span className="tech-level">{tech.level}%</span>
        </div>
        <span className="tech-bar">
          <span className="tech-bar-fill" />
        </span>
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

// Outline, dark body, faint blue tint and a dashed centre line, drawn as
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
