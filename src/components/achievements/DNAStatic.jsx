export default function DNAStatic({ className = "" }) {
  const rungs = Array.from({ length: 9 }).map((_, i) => {
    const y = 18 + i * 26;
    const bow = i % 2 === 0 ? 14 : -14;
    return (
      <line
        key={i}
        x1={60 + bow}
        y1={y}
        x2={60 - bow}
        y2={y}
        stroke="#8fd8ff"
        strokeWidth="2"
        opacity="0.45"
      />
    );
  });

  return (
    <svg
      viewBox="0 0 120 250"
      className={`dna-static ${className}`}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="dnaStaticGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5ce1ff" />
          <stop offset="100%" stopColor="#9b6bff" />
        </linearGradient>
      </defs>
      <path
        d="M46 6 C 90 40, 90 80, 46 112 S 2 176, 46 210 S 90 236, 46 244"
        stroke="url(#dnaStaticGrad)"
        strokeWidth="3.5"
        fill="none"
        opacity="0.9"
      />
      <path
        d="M74 6 C 30 40, 30 80, 74 112 S 118 176, 74 210 S 30 236, 74 244"
        stroke="url(#dnaStaticGrad)"
        strokeWidth="3.5"
        fill="none"
        opacity="0.6"
      />
      {rungs}
    </svg>
  );
}
