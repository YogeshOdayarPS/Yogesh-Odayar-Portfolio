export const personal = {
  name: "Yogesh Odayar P S",
  role: "Software Developer",
  tagline:
    "I build full-stack products at the intersection of web development, blockchain, and IoT — with a problem-solver's mindset shaped by IEEE TEMS leadership.",
  location: "Chennai, TN, India",
  email: "yogeshodayarps@gmail.com",
  emailLink: "https://mail.google.com/mail/?view=cm&fs=1&to=yogeshodayarps@gmail.com",
  linkedin: "https://www.linkedin.com/in/yogesh-odayar-p-s-8a2077293/",
  github: "https://github.com/YogeshOdayarPS",
  resume: "/resume.pdf",
};

export const about = {
  paragraphs: [
    "I'm a Computer Science & Business Systems engineering student who likes shipping things that actually work — from a blockchain-based credentialing platform to an IoT wearable for infant safety. I care as much about the business problem as the code that solves it.",
    "Outside coursework, I lead as Secretary for IEEE TEMS SBC, having grown through roles as Content Writer, Event Lead, and Mastermind over three years — organizing symposiums, coordinating hackathons, and mentoring first-year students into the community.",
    "I'm most energized by hackathons and fast-build sprints: two consecutive SAIHACK FEST wins, a Top-100-in-India selection at Hack4Purpose, and a published patent on autonomous rescue drones are the kind of outcomes I chase.",
  ],
  stats: [
    { label: "GPA", value: "8.60" },
    { label: "Hackathon Wins", value: "5+" },
    { label: "IEEE Roles", value: "4" },
    { label: "Published Patent", value: "1" },
  ],
};

export const skillGroups = [
  { title: "Programming", skills: ["Java", "Python", "JavaScript", "C"] },
  { title: "Frontend", skills: ["React", "HTML", "CSS", "Flutter"] },
  { title: "Backend & Database", skills: ["Node.js", "MySQL"] },
  { title: "Tools", skills: ["Git", "GitHub", "VS Code", "Power BI", "Excel"] },
  {
    title: "Relevant Coursework",
    skills: ["DSA", "DBMS", "Cloud Computing", "Web Technologies", "OOPS"],
  },
  { title: "Interests", skills: ["Data Science", "Blockchain", "Machine Learning", "AI"] },
  {
    title: "Soft Skills",
    skills: ["Problem Solving", "Leadership", "Critical Thinking", "Adaptability"],
  },
];

export const certifications = [
  { title: "Great Learning", note: "Professional Certification" },
  { title: "Accenture iAspire", note: "Professional Certification" },
  { title: "Google", note: "Professional Certification" },
  { title: "Cisco", note: "Networking Basics" },
  { title: "NPTEL — Java, DBMS, Cloud Computing, Python", note: "Academic Certification" },
  { title: "IIT Spoken Tutorial — Java, C, CSS, R, Git", note: "Academic Certification" },
];

export const experience = [
  {
    role: "Software Developer Intern",
    company: "SprintXplore Infotech Private Limited",
    date: "Jan 2026 – Apr 2026",
    problem: "Academic credentials can be difficult to verify and vulnerable to tampering.",
    solution: "Built EduChain, a secure blockchain-based academic credential platform.",
    outcome: "Enabled tamper-proof credential issuance, verification, and revocation with QR-based verification.",
    tech: ["React/Next.js", "Node.js/FastAPI", "PostgreSQL", "Polygon", "IPFS", "MetaMask"],
  },
  {
    role: "Web Developer Intern",
    company: "Hyundai Motor India Limited",
    date: "June 2025",
    problem: "Manual meeting room booking conflicts",
    solution: "Automated Room Management System",
    outcome: "Improved coordination & frontend experience",
    tech: ["HTML", "CSS", "JavaScript"],
    link: "https://roaring-sprinkles-e7d179.netlify.app/#",
  },
];

export const leadership = {
  intro:
    "As Secretary of IEEE TEMS SBC, I've spent three years turning student energy into organized, high-impact events — from technical symposiums to hackathon collaborations with industry partners.",
  stats: [
    { label: "IEEE Roles Held", value: "4" },
    { label: "Years Active", value: "3+" },
    { label: "Events Coordinated", value: "5" },
    { label: "Volunteer Drives", value: "8" },
  ],
  roles: [
    { role: "Content Writer", organization: "IEEE TEMS SBC", duration: "2023–2024" },
    { role: "Event Lead", organization: "IEEE TEMS SBC", duration: "2024–2025" },
    { role: "Mastermind", organization: "MAGIC Member, IEEE TEMS SBC", duration: "2024–2025" },
    { role: "Secretary", organization: "Office Bearer, IEEE TEMS", duration: "2025–2026" },
  ],
};

export const projects = [
  {
    id: "kidbrace",
    title: "CK KidBrace",
    category: "IoT & Health",
    description: "Smart wearable system for infant health monitoring.",
    tech: ["IoT Sensors", "Microcontroller", "Mobile App"],
    details:
      "A smart wearable system that monitors infant health parameters and sends real-time safety alerts to parents via a mobile application.",
    outcome: "Real-time alerts & preventive child safety",
  },
  {
    id: "blocked",
    title: "BlockED",
    category: "Blockchain",
    description: "NFT microcredential framework for secure, verifiable learning.",
    tech: ["Blockchain", "Smart Contracts", "NFTs", "IPFS"],
    link: "https://block-ed.netlify.app/",
    details:
      "A blockchain-based course learning platform enabling secure, verifiable, and personalized learning certifications using smart contracts and decentralized storage.",
    featured: true,
  },
  {
    id: "cblock",
    title: "CBlock",
    category: "Web3 Marketplace",
    description: "Decentralized carbon credit trading platform.",
    tech: ["Blockchain", "Smart Contracts", "Web/Mobile App"],
    link: "https://cblock.vercel.app/",
    details:
      "Decentralized carbon credit trading platform ensuring transparent issuance, verification, and trading of carbon credits. Cleared all internal SIH hackathon levels and submitted under AICTE student innovation.",
    featured: true,
  },
  {
    id: "hydroguard",
    title: "HydroGuard SkyDefender",
    category: "Research / IPR",
    description: "Homeostatic flying hovercraft for military and rescue missions.",
    tech: ["IPR Publication", "Research", "Defence Tech"],
    details:
      "Published Sept 13, 2024 with the Office of the Controller General of Patents, Govt. of India. Paper: \"Homeostatic Flying Hovercraft: Efficient and Durable Solutions for Military and Rescue Missions.\"",
    outcome: "IPR Published",
    patentPdf: "/patent.pdf",
  },
];

export const education = [
  {
    year: "2023 – 2027",
    degree: "B.Tech – CS & Business Systems",
    school: "Sri Sairam Engineering College, West Tambaram, Chennai",
    score: "GPA: 8.60 (up to IV semester)",
  },
  {
    year: "2022 – 2023",
    degree: "HSC",
    school: "Sri Sankara Matriculation Higher Secondary School, Thiruvanmiyur, Chennai",
    score: "Score: 92.66%",
  },
  {
    year: "Completed",
    degree: "Praveen Uttarardh in Hindi (Full Course)",
    school: "Dakshin Bharat Hindi Prachar Sabha (DBHPS), Chennai",
    description: "Completed the full Hindi exam series up to Praveen Uttarardh.",
    score: "Equivalent to B.A. (Hindi); recognized by Central & State Governments",
  },
];

export const achievements = [
  {
    category: "Hackathons",
    items: [
      {
        title: "STATATHON 2025–26 — Winner",
        description: "MoSPI × MoE — Statistical Data Privacy & Security (ANVIKSHAN)",
        highlight: true,
      },
      {
        title: "ChemOvate '26 — Winner",
        description: "St. Joseph's College of Engineering, 2026",
        highlight: true,
      },
      { title: "SAIHACK FEST — Winner", description: "2024 & 2025 consecutive wins", highlight: true },
      { title: "MEDCHAIN", description: "Prathyusha Engineering College" },
      { title: "BLOCKED — QTUXATHON", description: "Sri Sairam Engineering College" },
      { title: "CBLOCK", description: "VIT Chennai — 24-hour hackathon" },
      { title: "Build2Learn", description: "Freshworks, Jul 2025 — 4hr hackathon" },
    ],
  },
  {
    category: "Events",
    items: [
      { title: "Ideathon SDG Goal 16 — 1st Runner-Up", description: "HydroGuard SkyDefender project", highlight: true },
      { title: "Hack4Purpose", description: "Top 100 in India selection", highlight: true },
      { title: "Phoenix'25 — 1st Prize", description: "Paper Presentation, SRM IST Ramapuram" },
      { title: "ADMAD (BIS) — 2nd Prize", description: "Sri Sairam Engineering College" },
      { title: "TEZAS 2K25 — 1st Place", description: "Technical Quiz, RMK CET" },
      { title: "ADMAD (BIS) — 1st Place", description: "Sri Sairam Engineering College" },
      { title: "Xplore'25 — 1st Place", description: "Idea Pitching, Loyola-ICAM" },
      { title: "Incognito'25 — 1st Place", description: "Echo Pitch, St. Joseph's Institute of Technology" },
      { title: "Gojan Summit", description: "1st Prize Pitching, 3rd Prize Quiz" },
      { title: "Technical Quiz — 2nd Place", description: "New Prince Shri Bhavani College" },
      { title: "CPT Tech Summit — 2nd Prize", description: "SDG Ideathon, MGR Educational & Research Institute" },
    ],
  },
  {
    category: "Coordination",
    items: [
      { title: "GUVI Hackathon Coordinator", description: "IEEE TEMS × HCL GUVI, Oct 2025", highlight: true },
      { title: "INTEMSTELLAR Coordinator", description: "IEEE TEMS One-Day Symposium, Nov 2025" },
      { title: "CONNIQXION Coordinator", description: "Online Quiz Event (1st Years), Oct 2024" },
      { title: "NeoVision 2025 Coordinator", description: "IEEE TEMS, Apr 2025" },
      { title: "Winspire 1.0 Organiser", description: "Panel host, IEEE TEMS, Feb 2025" },
    ],
  },
  {
    category: "Volunteering",
    items: [
      { title: "Winspire 1.0 — Panelist Speaker", description: "March 2025", highlight: true },
      { title: "Cognizant SPIN Event", description: "Volunteer, Nov 2025" },
      { title: "FESTX 2024", description: "CSBS Symposium — Sathura Event" },
      { title: "FESTX 2025", description: "CSBS Symposium — UnlockX Event" },
      { title: "Ascendra — 3rd Anniversary", description: "IEEE TEMS, Oct 2024" },
      { title: "Blockchain BootCamp", description: "IEEE TEMS, Apr 2025" },
      { title: "B2B Event", description: "IEEE TEMS, May 2025" },
      { title: "Ascendra — 4th Anniversary", description: "IEEE TEMS, Nov 2025" },
    ],
  },
];

export const navSections = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "leadership", label: "Leadership" },
  { id: "achievements", label: "Achievements" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "certifications", label: "Certifications" },
  { id: "contact", label: "Contact" },
];
