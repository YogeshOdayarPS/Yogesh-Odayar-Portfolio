import anvikshanImg from "../assets/projects/anvikshan.webp";
import cblockImg from "../assets/projects/cblock.webp";
import blockedImg from "../assets/projects/blocked.webp";
import kidbraceImg from "../assets/projects/kidbrace.webp";
import hydroguardImg from "../assets/projects/hydroguard.webp";

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
    { label: "GPA", value: "8.70" },
    { label: "Hackathon Wins", value: "5+" },
    { label: "IEEE Roles", value: "4" },
    { label: "Published Patents", value: "2" },
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

// Certifications & Coursework - cards render in this exact order.
// - icon / courses[].icon are keys into CERT_ICONS in Certifications.jsx.
// - expandable cards need courses + certificateLink; the link is only used
//   for the "View Certificates" button, never shown as text.
// - a course can take an optional `link` to its own certificate.
export const certifications = [
  {
    title: "Infosys",
    subtitle: "AI Certifications",
    icon: "infosys",
    expandable: true,
    courses: [{ name: "AI Certifications", icon: "ai" }],
    certificateLink: "https://drive.google.com/drive/folders/1GzSZfFhPYNrtPvv1XDkIF9N9WbgwMgVP?usp=drive_link",
  },
  {
    title: "Cisco",
    subtitle: "Networking Basics",
    icon: "cisco",
    expandable: true,
    courses: [{ name: "Networking Basics", icon: "network" }],
    certificateLink: "https://drive.google.com/drive/folders/1UPhcB1rMGXGc4B-vH1f4RwJWdKBNXVSW?usp=drive_link",
  },
  {
    title: "Google × Coursera",
    subtitle: "Professional Certification",
    icon: "google-coursera",
    expandable: true,
    // Replace these three with the exact course names.
    courses: [
      { name: "Course 1", icon: "coursera" },
      { name: "Course 2", icon: "coursera" },
      { name: "Course 3", icon: "coursera" },
    ],
    certificateLink: "https://drive.google.com/drive/folders/1GrKskWfzUyiWOzI4utI6OUJ6wOf_kmll?usp=drive_link",
  },
  {
    title: "NPTEL",
    subtitle: "Professional & Academic Certifications",
    icon: "academic",
    expandable: true,
    courses: [
      { name: "Java", icon: "java" },
      { name: "DBMS", icon: "database" },
      { name: "Cloud Computing", icon: "cloud" },
      { name: "Python", icon: "python" },
    ],
    certificateLink: "https://drive.google.com/drive/folders/1toYBuHAUEZwIprtWPbwrKF5rd7PsCfFT?usp=drive_link",
  },
  {
    title: "Great Learning",
    subtitle: "Full Stack Development",
    icon: "great-learning",
    expandable: true,
    courses: [
      { name: "HTML", icon: "html5" },
      { name: "CSS", icon: "css3" },
      { name: "JavaScript", icon: "javascript" },
    ],
    certificateLink: "https://drive.google.com/drive/folders/1TzLsGL7-JBSxmMA_S2QVmoEnKS2Uqtm4?usp=drive_link",
  },
  {
    title: "SkillRack",
    subtitle: "Programming Practice & Challenges",
    icon: "coding",
    expandable: true,
    courses: [
      { name: "Java Programming", icon: "java" },
      { name: "Python Programming", icon: "python" },
      { name: "Daily Challenge", icon: "challenge" },
    ],
    certificateLink: "https://drive.google.com/drive/folders/1sV1t6oJnC0fC7FCTQOk3oWbhWm7xjVoF?usp=drive_link",
  },
  {
    title: "IIT Spoken Tutorial",
    subtitle: "Programming & Technical Certifications",
    icon: "tutorial",
    expandable: true,
    courses: [
      { name: "Java", icon: "java" },
      { name: "C", icon: "c" },
      { name: "CSS", icon: "css3" },
      { name: "R", icon: "r" },
      { name: "Git", icon: "git" },
    ],
    certificateLink: "https://drive.google.com/drive/folders/1gHdvUPn0SSnr_3FK4GSBUf4DXBVZXSTR?usp=drive_link",
  },
  {
    title: "Simplilearn",
    subtitle: "Prompt Engineering",
    icon: "learning",
    expandable: true,
    courses: [{ name: "Prompt Engineering", icon: "prompt" }],
    certificateLink: "https://drive.google.com/drive/folders/1-MmPdoKZOj6_OxUOh-2EW4hAhFLQNaKU?usp=drive_link",
  },
  {
    title: "Brainovision",
    subtitle: "Data Science using Python",
    icon: "data-science",
    expandable: true,
    courses: [{ name: "Data Science using Python", icon: "python" }],
    certificateLink: "https://drive.google.com/drive/folders/1YZWznW3hcaXTPSvzdNN6G-vBLXZxFRql?usp=drive_link",
  },
  {
    title: "CodeChef",
    subtitle: "Programming Certifications",
    icon: "codechef",
    expandable: true,
    courses: [
      { name: "Java", icon: "java" },
      { name: "C++", icon: "cpp" },
      { name: "Python", icon: "python" },
    ],
    certificateLink: "https://drive.google.com/drive/folders/1I0ks_5sb86RROYC_UwNp44tqPlJayxD2?usp=drive_link",
  },
  // Keep last. No certificate proof yet, so it stays a static card.
  {
    title: "Accenture",
    subtitle: "Professional Certification",
    icon: "accenture",
    expandable: false,
  },
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
    id: "anvikshan",
    title: "ANVIKSHAN",
    category: "Statathon 2025 — Winner",
    description:
      "A statistical data privacy evaluation and enforcement system for assessing disclosure risks and applying privacy-preserving techniques while preserving the utility of sensitive datasets.",
    image: anvikshanImg,
    imagePosition: "50% 38%",
    tech: [
      "Data Privacy",
      "Anonymisation",
      "Differential Privacy",
      "t-Closeness",
      "Statistical Disclosure Control",
    ],
    details:
      "A statistical data privacy evaluation and enforcement system for assessing disclosure risks and applying privacy-preserving techniques while preserving the utility of sensitive datasets.",
    outcome: "Winner — Statathon 2025 (MoSPI × MoE)",
    // LinkedIn post for the "View Achievement" button - never shown as text.
    achievementLink: "https://www.linkedin.com/feed/update/urn:li:activity:7476539857444696065/",
  },
  {
    id: "cblock",
    title: "CBlock",
    category: "Web3 Marketplace",
    description: "Decentralized carbon credit trading platform.",
    image: cblockImg,
    imagePosition: "60% 40%",
    tech: ["Blockchain", "Smart Contracts", "Web/Mobile App"],
    link: "https://cblock.vercel.app/",
    details:
      "Decentralized carbon credit trading platform ensuring transparent issuance, verification, and trading of carbon credits. Cleared all internal SIH hackathon levels and submitted under AICTE student innovation.",
  },
  {
    id: "blocked",
    title: "BlockED",
    category: "Blockchain",
    description: "NFT microcredential framework for secure, verifiable learning.",
    image: blockedImg,
    imagePosition: "50% 32%",
    tech: ["Blockchain", "Smart Contracts", "NFTs", "IPFS"],
    link: "https://block-ed.netlify.app/",
    details:
      "A blockchain-based course learning platform enabling secure, verifiable, and personalized learning certifications using smart contracts and decentralized storage.",
  },
  {
    id: "kidbrace",
    title: "CK KidBrace",
    category: "IoT & Health",
    description: "Smart wearable system for infant health monitoring.",
    image: kidbraceImg,
    imagePosition: "50% 58%",
    tech: ["IoT Sensors", "Microcontroller", "Mobile App"],
    details:
      "A smart wearable system that monitors infant health parameters and sends real-time safety alerts to parents via a mobile application.",
    outcome: "Real-time alerts & preventive child safety",
  },
  {
    id: "hydroguard",
    title: "Hydroguard / SkyDefender",
    category: "SDG Ideathon 4.0 — 2nd Prize",
    description:
      "A hydrogen-powered defense drone designed for surveillance and emergency response, combining sustainable energy technology with autonomous aerial capabilities.",
    image: hydroguardImg,
    imagePosition: "50% 20%",
    imageAlt: "SDG Ideathon 4.0 certificate of appreciation for Hydroguard / SkyDefender",
    tech: ["Hydrogen Fuel Cell", "UAV", "IoT", "Embedded Systems", "Sustainable Technology"],
    details:
      "Published Sept 13, 2024 with the Office of the Controller General of Patents, Govt. of India. Paper: \"Homeostatic Flying Hovercraft: Efficient and Durable Solutions for Military and Rescue Missions.\"",
    outcome: "IPR Published",
    patentPdf: "/patent.pdf",
    // LinkedIn post for the "View Achievement" button - never shown as text.
    achievementLink: "",
  },
];

export const education = [
  {
    year: "2023 – 2027",
    degree: "B.Tech – CS & Business Systems",
    school: "Sri Sairam Engineering College, West Tambaram, Chennai",
    score: "GPA: 8.70 (up to IV semester)",
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

const ACHV_IMG = "/achievements/";

export const achievements = [
  {
    category: "Hackathons",
    items: [
      {
        title: "STATATHON 2025–26 — Winner",
        description: "MoSPI × MoE — Statistical Data Privacy & Security (ANVIKSHAN)",
        highlight: true,
        image: ACHV_IMG + "statathonprize.jpeg",
      },
      {
        title: "ChemOvate '26 — Winner",
        description: "St. Joseph's College of Engineering, 2026",
        highlight: true,
        image: ACHV_IMG + "chemovate.jpeg",
      },
      {
        title: "SAIHACK FEST — Winner",
        description: "2024 & 2025 consecutive wins",
        highlight: true,
        image: ACHV_IMG + "saihack.jpeg",
      },
      { title: "MEDCHAIN", description: "Prathyusha Engineering College", image: ACHV_IMG + "PRATHYUSHA.jpeg" },
      {
        title: "BLOCKED — QTUXATHON",
        description: "Sri Sairam Engineering College",
        image: ACHV_IMG + "qtuxathon.jpeg",
      },
      {
        title: "CBLOCK",
        description: "VIT Chennai — 24-hour hackathon",
        image: ACHV_IMG + "vithackathon.jpeg",
      },
      {
        title: "Build2Learn",
        description: "Freshworks, Jul 2025 — 4hr hackathon",
        image: ACHV_IMG + "build2gether.jpeg",
      },
    ],
  },
  {
    category: "Awards",
    items: [
      {
        title: "Ideathon SDG Goal 16 — 1st Runner-Up",
        description: "HydroGuard SkyDefender project",
        highlight: true,
        image: ACHV_IMG + "ideathonwin.jpeg",
      },
      { title: "Hack4Purpose", description: "Top 100 in India selection", highlight: true },
      {
        title: "ADMAD (BIS) — 2nd Prize",
        description: "Sri Sairam Engineering College",
        image: ACHV_IMG + "ADMAD-2ND.png",
      },
      {
        title: "TEZAS 2K25 — 1st Place",
        description: "Technical Quiz, RMK CET",
        image: ACHV_IMG + "TEZAS.jpeg",
      },
      {
        title: "ADMAD (BIS) — 1st Place",
        description: "Sri Sairam Engineering College",
        image: ACHV_IMG + "ADMAD-1ST.jpeg",
      },
      {
        title: "Xplore'25 — 1st Place",
        description: "Idea Pitching, Loyola-ICAM",
        image: ACHV_IMG + "XPLORE.jpeg",
      },
      {
        title: "Incognito'25 — 1st Place",
        description: "Echo Pitch, St. Joseph's Institute of Technology",
        image: ACHV_IMG + "INCOGNITO.jpeg",
      },
      {
        title: "Gojan Summit",
        description: "1st Prize Pitching, 3rd Prize Quiz",
        image: ACHV_IMG + "GHOJAN.jpeg",
      },
      {
        title: "Technical Quiz — 2nd Place",
        description: "New Prince Shri Bhavani College",
        image: ACHV_IMG + "TECHNICAL QUIZ.jpeg",
      },
      {
        title: "CPT Tech Summit — 2nd Prize",
        description: "SDG Ideathon, MGR Educational & Research Institute",
        image: ACHV_IMG + "CPT TECH SUMMIT.jpeg",
      },
    ],
  },
  {
    category: "IEEE & Leadership",
    items: [
      {
        title: "GUVI Hackathon Coordinator",
        description: "IEEE TEMS × HCL GUVI, Oct 2025",
        highlight: true,
        image: ACHV_IMG + "GUVI.jpeg",
      },
      {
        title: "INTEMSTELLAR Coordinator",
        description: "IEEE TEMS One-Day Symposium, Nov 2025",
        image: ACHV_IMG + "INTEMSTELLAR.jpeg",
      },
      {
        title: "CONNIQXION Coordinator",
        description: "Online Quiz Event (1st Years), Oct 2024",
        image: ACHV_IMG + "connixqion.jpeg",
      },
      {
        title: "NeoVision 2025 Coordinator",
        description: "IEEE TEMS, Apr 2025",
        image: ACHV_IMG + "neovision.jpeg",
      },
      {
        title: "Winspire 1.0 Organiser",
        description: "Panel host, IEEE TEMS, Feb 2025",
        image: ACHV_IMG + "winspire organiser.jpeg",
      },
    ],
  },
  {
    category: "Events",
    items: [
      {
        title: "Winspire 1.0 — Panelist Speaker",
        description: "March 2025",
        highlight: true,
        image: ACHV_IMG + "winspirepanelist.jpeg",
      },
      {
        title: "Cognizant SPIN Event",
        description: "Volunteer, Nov 2025",
        image: ACHV_IMG + "cognizant spin.jpeg",
      },
      {
        title: "FESTX 2024",
        description: "CSBS Symposium — Sathura Event",
        image: ACHV_IMG + "festx2024.jpeg",
      },
      {
        title: "FESTX 2025",
        description: "CSBS Symposium — UnlockX Event",
        image: ACHV_IMG + "festx2026.jpg",
      },
      {
        title: "Ascendra — 3rd Anniversary",
        description: "IEEE TEMS, Oct 2024",
        image: ACHV_IMG + "ascendra3rd.jpeg",
      },
      {
        title: "Blockchain BootCamp",
        description: "IEEE TEMS, Apr 2025",
        image: ACHV_IMG + "blockchain bootcamp.jpeg",
      },
      { title: "B2B Event", description: "IEEE TEMS, May 2025", image: ACHV_IMG + "b2b.jpeg" },
      {
        title: "Ascendra — 4th Anniversary",
        description: "IEEE TEMS, Nov 2025",
        image: ACHV_IMG + "ascendra4th.jpeg",
      },
    ],
  },
  {
    category: "Presentations",
    items: [
      {
        title: "Phoenix'25 — 1st Prize",
        description: "Paper Presentation, SRM IST Ramapuram",
        highlight: true,
        image: ACHV_IMG + "pheonix.jpeg",
      },
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
