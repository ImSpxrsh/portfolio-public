/* -------------------------------------------------------------------------- */
/*  Palette — candy colors used across stickers and cards                       */
/* -------------------------------------------------------------------------- */

export const colors = {
  ink: "#1B1B1F",
  paper: "#FFF6E9",
  pink: "#FF7AB8",
  yellow: "#FFD23F",
  mint: "#4BE0A0",
  sky: "#7CCBFF",
  lilac: "#B9A2FF",
  orange: "#FF9548",
} as const;

export type Candy = Exclude<keyof typeof colors, "ink" | "paper">;

/* -------------------------------------------------------------------------- */
/*  Identity                                                                    */
/* -------------------------------------------------------------------------- */

export const profile = {
  name: "Sparsh Roy",
  location: "Princeton, NJ",
  portrait: "/avatar.png",
} as const;

export const links = {
  github: "https://github.com/ImSpxrsh",
  linkedin: "https://linkedin.com/in/roysparsh",
  email: "mailto:sparshr@mit.edu",
  emailPlain: "sparshr@mit.edu",
  mitSite: "https://sites.mit.edu/sparsh/",
  publications: "https://sites.mit.edu/sparsh/publications/",
  blog: "https://sites.mit.edu/sparsh/blog/",
  dreamit: "https://dreamit.build/",
} as const;

/** Little things floating around the portrait. */
export const heroStickers: { text: string; color: Candy }[] = [
  { text: "builds apps 📱", color: "sky" },
  { text: "codes robots 🤖", color: "mint" },
  { text: "starts too many things 🌀", color: "yellow" },
  { text: "high schooler 🎒", color: "pink" },
];

/** Click the portrait to cycle through these. */
export const quips = [
  "hi! you clicked me 👋",
  "currently: fighting a merge conflict",
  "the robot works. mostly.",
  "yes, I do sleep (sometimes)",
  "ok you can stop clicking now",
  "fine. one more.",
  "go look at the projects ↓",
];

/* -------------------------------------------------------------------------- */
/*  About                                                                       */
/* -------------------------------------------------------------------------- */

export const aboutText =
  "I'm a high schooler in New Jersey who likes building stuff: apps, robots, the occasional startup. I write Java for my FRC team, help run a small company called Velvt, and tinker with AI on the side. I like problems that are a little weird and people who are fun to build with.";

export const funFacts: { emoji: string; text: string; color: Candy }[] = [
  { emoji: "☕", text: "runs on snacks, not coffee", color: "yellow" },
  { emoji: "🐛", text: "has written more bugs than features", color: "pink" },
  { emoji: "🔧", text: "owns way too many zip ties", color: "mint" },
  { emoji: "📍", text: "Princeton, NJ", color: "sky" },
];

/* -------------------------------------------------------------------------- */
/*  Toolbox                                                                     */
/* -------------------------------------------------------------------------- */

export type Skill = {
  id: string;
  emoji: string;
  name: string;
  color: Candy;
  blurb: string;
  tools: readonly string[];
};

export const toolbox: readonly Skill[] = [
  {
    id: "apps",
    emoji: "📱",
    name: "Apps",
    color: "sky",
    blurb: "Making stuff real people can tap on.",
    tools: ["Flutter", "React", "TypeScript", "Swift"],
  },
  {
    id: "backend",
    emoji: "🛠️",
    name: "Backend",
    color: "yellow",
    blurb: "APIs and plumbing. The unglamorous stuff that makes everything else work.",
    tools: ["Python", "FastAPI", "Firebase", "REST"],
  },
  {
    id: "robots",
    emoji: "🤖",
    name: "Robots",
    color: "lilac",
    blurb: "Java for a competition robot, usually finished the night before a match.",
    tools: ["Java", "WPILib", "Control loops", "Zip ties"],
  },
  {
    id: "ai",
    emoji: "🧠",
    name: "AI tinkering",
    color: "pink",
    blurb: "Poking at models to see what they do and why they break.",
    tools: ["Python", "PyTorch", "LLM APIs"],
  },
];

/* -------------------------------------------------------------------------- */
/*  Projects                                                                    */
/* -------------------------------------------------------------------------- */

export type Project = {
  emoji: string;
  name: string;
  color: Candy;
  oneLiner: string;
  what: string;
  myPart: string;
  tags: readonly string[];
  link: string;
};

export const projects: readonly Project[] = [
  {
    emoji: "🍎",
    name: "AidSense",
    color: "orange",
    oneLiner: "find food, housing and care near you",
    what: "Ask a question in plain English and get pointed to nearby aid in the NY/NJ area.",
    myPart: "Built the app, backend and all. Also somehow ended up doing the finances.",
    tags: ["flutter", "social good", "ML"],
    link: "https://aidsense.app/",
  },
  {
    emoji: "🦾",
    name: "FRC Team 293",
    color: "yellow",
    oneLiner: "big robot, small sleep schedule",
    what: "Competition robots for FIRST Robotics. I write the code that makes them drive (and ideally not crash).",
    myPart: "Programmer since 2024. These days I also help keep the team funded and organized.",
    tags: ["java", "robotics", "team"],
    link: "https://github.com/Team293/Reefscape",
  },
  {
    emoji: "🎧",
    name: "Velvt",
    color: "lilac",
    oneLiner: "notices when your focus is falling apart",
    what: "An app that learns your focus patterns on your own device. Nothing gets shipped off to a server.",
    myPart: "Co-founder. I handle ops and help keep things moving toward launch.",
    tags: ["on-device", "privacy", "startup"],
    link: "https://github.com/ImSpxrsh",
  },
  {
    emoji: "🚀",
    name: "DreamIT",
    color: "sky",
    oneLiner: "AI software, built with friends",
    what: "A small team building AI-powered software.",
    myPart: "Engineer on the founding team: frontend, backend, whatever needs doing.",
    tags: ["full-stack", "startup"],
    link: links.dreamit,
  },
];

/* -------------------------------------------------------------------------- */
/*  Timeline                                                                    */
/* -------------------------------------------------------------------------- */

export type TimelineItem = {
  emoji: string;
  org: string;
  role: string;
  when: string;
  note: string;
};

export const timeline: readonly TimelineItem[] = [
  { emoji: "🦾", org: "FRC Team 293", role: "Programmer", when: "2024 – now", note: "Started writing robot code, never stopped." },
  { emoji: "🍎", org: "AidSense", role: "Builder", when: "2025 – now", note: "Wrote the app and the spreadsheets." },
  { emoji: "🚀", org: "DreamIT", role: "Founding engineer", when: "2025 – now", note: "Frontend, backend, and whatever else." },
  { emoji: "🎧", org: "Velvt", role: "Co-founder", when: "2026 – now", note: "Ops, product, keeping the wheels on." },
  { emoji: "🔬", org: "A few research labs", role: "Helping out", when: "2026 – now", note: "Learning a ton from people way smarter than me. Papers are on my MIT site if you're curious." },
  { emoji: "🌱", org: "Minorities in STEM", role: "NJ organizer", when: "2026 – now", note: "Running programs around New Jersey." },
];

/* -------------------------------------------------------------------------- */
/*  Navigation                                                                  */
/* -------------------------------------------------------------------------- */

export const navItems = [
  { label: "about", href: "#about" },
  { label: "toolbox", href: "#toolbox" },
  { label: "timeline", href: "#timeline" },
  { label: "workshop", href: "#projects" },
] as const;
