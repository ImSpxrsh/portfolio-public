import {
  BarChart3,
  BrainCircuit,
  Cloud,
  Code2,
  Database,
  type LucideIcon,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/*  Identity                                                                    */
/* -------------------------------------------------------------------------- */

export const SITE_URL = "https://sparshr.scripts.mit.edu";

export const profile = {
  name: "Sparsh Roy",
  tagline: "Researcher & Builder",
  role: "Research across multiple labs at MIT, UIUC, and UCSC, and COO of Velvt",
  location: "Princeton, New Jersey",
  portrait: "/avatar.png",
  resume: "/Sparsh_Roy_Resume.pdf",
} as const;

export const links = {
  github: "https://github.com/ImSpxrsh",
  linkedin: "https://linkedin.com/in/roysparsh",
  email: "mailto:sparshr@mit.edu",
  emailPlain: "sparshr@mit.edu",
  mitSite: "https://sites.mit.edu/sparsh/",
  publications: "https://sites.mit.edu/sparsh/publications/",
  courses: "https://sites.mit.edu/sparsh/courses/",
  blog: "https://sites.mit.edu/sparsh/blog/",
  latestPaper: "https://arxiv.org/abs/2607.27169",
  mantis: "https://mantis.csail.mit.edu/",
  dreamit: "https://dreamit.build/",
} as const;

/* -------------------------------------------------------------------------- */
/*  Affiliations — institutions, deliberately not individual lab names          */
/* -------------------------------------------------------------------------- */

export type Affiliation = {
  institution: string;
  focus: string;
  place: string;
  since: string;
};

export const affiliations: Affiliation[] = [
  {
    institution: "Massachusetts Institute of Technology",
    focus: "AI systems, research infrastructure, and visual data science",
    place: "Cambridge, MA",
    since: "2026",
  },
  {
    institution: "University of Illinois Urbana-Champaign",
    focus: "Human–computer interaction",
    place: "Urbana, IL",
    since: "2026",
  },
  {
    institution: "University of California, Santa Cruz",
    focus: "Propagator networks and AI explainability",
    place: "Santa Cruz, CA",
    since: "2026",
  },
  {
    institution: "Google-sponsored research laboratory",
    focus: "Mathematics and machine-learning theory",
    place: "Vienna, Austria",
    since: "2026",
  },
];

export const affiliationSummary =
  "I hold research appointments in four labs — at MIT, the University of Illinois Urbana-Champaign, UC Santa Cruz, and a Google-sponsored laboratory in Vienna.";

/* -------------------------------------------------------------------------- */
/*  Publications — canonical home is the MIT site                               */
/* -------------------------------------------------------------------------- */

export type Publication = {
  title: string;
  authors: string[];
  venue: string;
  year: string;
  kind: "Journal" | "Conference" | "Preprint";
  summary: string;
  href: string;
  authorRole?: "First author" | "Co-author";
};

export const publications: Publication[] = [
  {
    title:
      "When Do Learned Diffusion Proposals Help Constraint Solving? A Controlled Study on Continuous Algebraic Systems",
    authors: ["Quang Bui", "Sparsh Roy", "Akash Gundimeda", "Davin Yin"],
    venue: "Under review, AAAI Conference on Artificial Intelligence",
    year: "2026",
    kind: "Conference",
    summary:
      "A controlled comparison of learned diffusion proposals against classical solvers on continuous algebraic constraint systems, isolating the regimes where learning actually pays for itself.",
    href: "https://arxiv.org/abs/2607.27169",
  },
  {
    title: "KAISER: Reproducible Subgroup Fairness Auditing for Clinical Risk Models",
    authors: ["Nishita Chavan", "Samuel Girmachew", "Sparsh Roy"],
    venue: "Preprint — arXiv",
    year: "2026",
    kind: "Preprint",
    summary:
      "A reproducible auditing framework that surfaces subgroup performance gaps in clinical risk models across demographic strata, with fixed protocols so audits can be rerun and compared.",
    href: "https://arxiv.org/abs/2607.28608",
  },
  {
    title:
      "MOSAIC — The Garden of Forking Tissues: A Specification-Curve Multiverse Reveals and Quantifies the Fragility of Biological Conclusions in Spatial Transcriptomics",
    authors: ["Adharv Pemmasani", "Sparsh Roy"],
    venue: "Spatial transcriptomics / computational biology",
    year: "2026",
    kind: "Conference",
    summary:
      "A specification-curve multiverse over spatial transcriptomics pipelines, quantifying how much of a biological conclusion survives reasonable analytic choices — and how much does not.",
    href: links.publications,
  },
  {
    title:
      "Belief-Space Perception Routing under Coupled Sensor Faults and Compute Contention",
    authors: ["Davin Yin", "Sparsh Roy", "Vihan Aggarwal"],
    venue: "Under review, IEEE MIT Undergraduate Research Technology Conference",
    year: "2026",
    kind: "Conference",
    summary:
      "Models perception routing under belief uncertainty where sensor faults and compute contention are coupled rather than independent, so inference still lands inside its deadline.",
    href: "https://arxiv.org/abs/2608.00322",
  },
  {
    title:
      "Aura Farming the Good Life: Toward a Community-Based Epistemology of Learning in the Age of AI",
    authors: ["Alexa Q. Xiang", "Anthony Nguyen", "Boya Zhang", "Sparsh Roy", "et al."],
    venue:
      "Submitted to Nature Humanities & Social Sciences Communications",
    year: "2026",
    kind: "Journal",
    summary:
      "Reframes the AI-accelerated crisis in education and academic research as a philosophical one, arguing for purposeful learning and collaborative knowledge-making over the prestige economy.",
    href: links.publications,
  },
  {
    title:
      "Substrate-Coevolving Neural Dynamics: A Diagnostic Study of Self-Modifying Computation",
    authors: ["Sparsh Roy"],
    venue: "SSRN",
    year: "2026",
    kind: "Preprint",
    summary:
      "Makes the computational interaction substrate an explicit state variable updated during the forward pass, then diagnoses the failure modes, optimization barriers, and latch-like updates that follow.",
    href: "https://ssrn.com/abstract=6892259",
    authorRole: "First author",
  },
];

/* -------------------------------------------------------------------------- */
/*  Recognition                                                                 */
/* -------------------------------------------------------------------------- */

export const awards = [
  {
    label: "Congressional App Challenge",
    detail: "Winner 2025 · showcased at the U.S. Capitol",
  },
  { label: "NJ INNOVATE100", detail: "Top Innovator, 2026" },
  {
    label: "U.S. Medical Disease Olympiad",
    detail: "Bronze medalist · top 150 nationally",
  },
  { label: "Leukemia & Lymphoma Society", detail: "$10,000 raised" },
] as const;

export const stats = [
  { value: "6", label: "Papers in 2026" },
  { value: "4", label: "Research labs" },
  { value: "3", label: "Ventures co-founded" },
  { value: "2", label: "Continents" },
] as const;

/* -------------------------------------------------------------------------- */
/*  Skill map                                                                   */
/* -------------------------------------------------------------------------- */

export type Skill = {
  id: string;
  name: string;
  shortName: string;
  icon: LucideIcon;
  accent: string;
  description: string;
  tools: readonly string[];
  projects: readonly string[];
};

export const skillMap: readonly Skill[] = [
  {
    id: "aiml",
    name: "AI / ML",
    shortName: "AI/ML",
    icon: BrainCircuit,
    accent: "#FF5D8F",
    description:
      "Applied machine-learning research: diffusion proposals for constraint solving, self-modifying neural dynamics, agentic LLM workflows, and multimodal pipelines.",
    tools: ["Python", "PyTorch", "LLM APIs", "Diffusion Models", "ML Pipelines"],
    projects: ["Applied ML Research", "Mantis", "Velvt"],
  },
  {
    id: "research",
    name: "Research",
    shortName: "Research",
    icon: BarChart3,
    accent: "#27C4A8",
    description:
      "Research across four labs — reproducibility, fairness auditing, explainability, and the epistemology of learning under AI.",
    tools: ["Reproducibility", "Fairness Auditing", "Spatial Omics", "arXiv", "SSRN"],
    projects: [
      "Reproducibility & Fairness Auditing",
      "Propagators & Explainability",
      "Applied ML Research",
    ],
  },
  {
    id: "backend",
    name: "Backend + Agents",
    shortName: "Backend",
    icon: Database,
    accent: "#F8B84E",
    description:
      "Backend extensions, APIs, and platform tooling that power agentic data exploration and the infrastructure research actually runs on.",
    tools: ["Python", "FastAPI", "REST APIs", "Firebase", "Data Infra"],
    projects: ["Mantis", "Aidsense"],
  },
  {
    id: "product",
    name: "Product + Mobile",
    shortName: "Product",
    icon: Code2,
    accent: "#7DD3FC",
    description:
      "Shipping usable products end-to-end, from natural-language interfaces for aid discovery to local-first behavioral systems.",
    tools: ["Flutter", "Dart", "React", "TypeScript", "Swift"],
    projects: ["Aidsense", "Velvt"],
  },
  {
    id: "robotics",
    name: "Robotics + Ops",
    shortName: "Robotics",
    icon: Cloud,
    accent: "#B98CFF",
    description:
      "Competition robot software and control systems for FRC Team 293, plus operations and execution leadership as COO of Velvt.",
    tools: ["Java", "FRC", "Control Systems", "Operations"],
    projects: ["FRC Team 293 Spike", "Velvt"],
  },
];

/* -------------------------------------------------------------------------- */
/*  Projects                                                                    */
/* -------------------------------------------------------------------------- */

export type Project = {
  number: string;
  category: string;
  name: string;
  description: string;
  tags: readonly string[];
  details: readonly string[];
  link: string;
  metrics: readonly { label: string; value: number }[];
  flow: readonly string[];
};

export const projects: readonly Project[] = [
  {
    number: "01",
    category: "Behavioral AI",
    name: "Velvt",
    description:
      "A local-first behavioral intelligence system that passively models focus patterns and attention fragmentation entirely on-device.",
    tags: ["Local-First", "Behavioral AI", "Privacy", "Operations"],
    details: [
      "As COO, I own operations, product execution, infrastructure planning, and the scale from private beta to production.",
      "Coordinate growth systems, privacy architecture, and execution across product, engineering, and go-to-market.",
      "Built around neutrality, local-first privacy, and low-noise behavioral insight.",
    ],
    link: "https://github.com/ImSpxrsh",
    metrics: [
      { label: "On-device privacy", value: 94 },
      { label: "Focus modeling", value: 88 },
      { label: "Beta to production", value: 72 },
    ],
    flow: ["Capture On-Device", "Model Focus", "Surface Insight"],
  },
  {
    number: "02",
    category: "Research",
    name: "Reproducibility & Fairness Auditing",
    description:
      "Tooling that asks whether a published result survives the analytic choices behind it — specification-curve multiverses for spatial transcriptomics, and reproducible subgroup fairness audits for clinical risk models.",
    tags: ["Reproducibility", "Fairness", "Clinical AI", "Spatial Omics"],
    details: [
      "MOSAIC sweeps a multiverse of defensible pipeline specifications and quantifies how fragile the resulting biological conclusions are.",
      "KAISER fixes an auditing protocol so subgroup performance gaps in clinical risk models can be rerun and compared across studies.",
      "Both live as public preprints with the analysis code as the unit of record.",
    ],
    link: "https://arxiv.org/abs/2607.28608",
    metrics: [
      { label: "Specifications swept", value: 92 },
      { label: "Subgroups audited", value: 85 },
      { label: "Reruns reproduced", value: 96 },
    ],
    flow: ["Enumerate Specs", "Sweep Multiverse", "Quantify Fragility"],
  },
  {
    number: "03",
    category: "Research",
    name: "Mantis",
    description:
      "Backend extensions and platform tooling for an AI-powered cognitive cartography and visual data-science system, powering agentic exploration across multimodal knowledge spaces.",
    tags: ["LLM Agents", "Python", "Backend", "Research"],
    details: [
      "Builds the backend that lets LLM agents traverse and annotate multimodal knowledge spaces.",
      "Focuses on the infrastructure layer: APIs, extensions, and reproducible tooling.",
      "Turns exploratory analysis into a navigable map rather than a pile of notebooks.",
    ],
    link: links.mantis,
    metrics: [
      { label: "Agentic exploration", value: 90 },
      { label: "Backend tooling", value: 86 },
      { label: "Multimodal coverage", value: 82 },
    ],
    flow: ["Ingest Knowledge", "Run LLM Agents", "Map & Explore"],
  },
  {
    number: "04",
    category: "AI/ML Research",
    name: "Applied ML Research",
    description:
      "First-author and collaborative work on self-modifying computation, learned diffusion proposals for constraint solving, and deadline-constrained adaptive inference.",
    tags: ["Neural Dynamics", "Diffusion", "Adaptive Inference", "Theory"],
    details: [
      "Substrate-coevolving dynamics treat the interaction substrate as an explicit state variable updated during the forward pass.",
      "A controlled study isolates when learned diffusion proposals beat classical constraint solvers — and when they do not.",
      "Belief-space routing couples sensor-fault and compute-contention beliefs to hold inference deadlines.",
    ],
    link: links.publications,
    metrics: [
      { label: "Novel formulation", value: 91 },
      { label: "Diagnostic depth", value: 86 },
      { label: "Published 2026", value: 92 },
    ],
    flow: ["Define Substrate", "Coevolve State", "Diagnose Dynamics"],
  },
  {
    number: "05",
    category: "Social Impact",
    name: "Aidsense",
    description:
      "An AI/ML-powered Flutter app that helps people in the Tri-State area find nearby food, housing, and medical aid through plain-language questions.",
    tags: ["Flutter", "Dart", "AI/ML", "Social Good"],
    details: [
      "Built end-to-end, including backend infrastructure and ML integration.",
      "Turns natural-language queries into matched, nearby aid resources.",
      "Serves as CFO alongside the engineering work.",
    ],
    link: "https://aidsense.app/",
    metrics: [
      { label: "Natural-language search", value: 89 },
      { label: "Aid coverage", value: 84 },
      { label: "ML integration", value: 78 },
    ],
    flow: ["Parse Query", "Match Resources", "Connect Aid"],
  },
  {
    number: "06",
    category: "Robotics",
    name: "FRC Team 293 Spike",
    description:
      "Java programmer and Chief Sustainability Officer for FIRST Robotics Competition Team 293, building competition robot software across multiple seasons.",
    tags: ["Java", "FRC", "Robotics", "Control Systems"],
    details: [
      "Engineers robot control systems, autonomous routines, and team tooling.",
      "Contributes to the Rebuilt and Reefscape robot codebases.",
      "Runs sustainability, sponsorships, and operational continuity for the team.",
    ],
    link: "https://github.com/Team293/Reefscape",
    metrics: [
      { label: "Robot software", value: 86 },
      { label: "Control systems", value: 80 },
      { label: "Season delivery", value: 90 },
    ],
    flow: ["Read Sensors", "Run Control Loop", "Drive Robot"],
  },
  {
    number: "07",
    category: "Research",
    name: "Propagators & Explainability",
    description:
      "Work on propagator networks and AI explainability at UC Santa Cruz — using propagation to carry the provenance of a value alongside the value itself, so a model's output can explain where it came from.",
    tags: ["Propagators", "Explainability", "Interpretability"],
    details: [
      "Explores propagator networks as a substrate for explanations that are computed, not reconstructed after the fact.",
      "Contributed for the problem's own sake rather than for authorship.",
    ],
    link: "https://www.ucsc.edu/",
    metrics: [
      { label: "Provenance tracking", value: 88 },
      { label: "Explanation fidelity", value: 83 },
      { label: "Exploratory", value: 76 },
    ],
    flow: ["Propagate Values", "Carry Provenance", "Explain Output"],
  },
  {
    number: "09",
    category: "Simulation",
    name: "MatrAIx & PersonaBench",
    description:
      "A population-scale world simulation running 8.3 billion persona agents, plus PersonaBench — a benchmark for evaluating persona-agent behavior at that scale.",
    tags: ["Agent Simulation", "Benchmarks", "Scale"],
    details: [
      "Contributes to the simulation and to the benchmark that measures whether its agents behave coherently at scale.",
      "Supported promotion for a release that reached viral distribution.",
    ],
    link: links.mitSite,
    metrics: [
      { label: "Agents simulated", value: 96 },
      { label: "Benchmark coverage", value: 81 },
      { label: "Release reach", value: 89 },
    ],
    flow: ["Spawn Personas", "Simulate World", "Benchmark Behavior"],
  },
  {
    number: "08",
    category: "Product",
    name: "DreamIT",
    description:
      "Lead founding engineer on AI-driven software, owning end-to-end delivery across frontend and backend alongside the founding team.",
    tags: ["Full-Stack", "AI Product", "Founding"],
    details: [
      "Drives development across frontend and backend as lead founding engineer.",
      "Collaborates with founders on product strategy and delivery.",
    ],
    link: links.dreamit,
    metrics: [
      { label: "Full-stack delivery", value: 87 },
      { label: "Product velocity", value: 82 },
      { label: "AI integration", value: 79 },
    ],
    flow: ["Scope Product", "Build Full-Stack", "Ship"],
  },
];

export const featuredProjects = projects.filter((p) =>
  ["01", "02", "03", "04", "05", "06"].includes(p.number),
);
export const moreProjects = projects.filter((p) =>
  ["07", "08", "09"].includes(p.number),
);

/* -------------------------------------------------------------------------- */
/*  Experience                                                                  */
/* -------------------------------------------------------------------------- */

export type ExperienceRole = { title: string; period: string; body: string };
export type ExperienceOrg = {
  org: string;
  meta: string;
  location?: string;
  roles: readonly ExperienceRole[];
};

export const experience: readonly ExperienceOrg[] = [
  {
    org: "Massachusetts Institute of Technology",
    meta: "Research · 2026 — Present",
    location: "Cambridge, Massachusetts",
    roles: [
      {
        title: "Research Affiliate",
        period: "May 2026 — Present",
        body: "Software infrastructure and machine learning for an AI-powered cognitive cartography and visual data-science platform, plus research support on a faculty-led seminar series reframing the AI-accelerated crisis in education and academic research as a philosophical one — arguing for genuine, purposeful learning and collaborative knowledge-making over the prestige economy.",
      },
    ],
  },
  {
    org: "University of Illinois Urbana-Champaign",
    meta: "Research · 2026 — Present",
    location: "Urbana, Illinois · Remote",
    roles: [
      {
        title: "Research Assistant",
        period: "2026 — Present",
        body: "Human–computer interaction research, spanning interaction design, privacy, and human-centered systems.",
      },
    ],
  },
  {
    org: "University of California, Santa Cruz",
    meta: "Research · 2026 — Present",
    location: "Santa Cruz, California · Remote",
    roles: [
      {
        title: "Researcher",
        period: "2026 — Present",
        body: "Work on propagator networks and AI explainability — using propagation to carry the provenance of a value alongside the value itself, so a system can account for how it reached an output instead of having an explanation reconstructed afterward. Contributed for the problem's own sake rather than for authorship.",
      },
    ],
  },
  {
    org: "Google-Sponsored Research Laboratory",
    meta: "Research · Google-sponsored",
    location: "Vienna, Austria",
    roles: [
      {
        title: "Researcher",
        period: "Jun 2026 — Present",
        body: "Investigative and scholarly research across mathematics and machine learning.",
      },
    ],
  },
  {
    org: "Velvt",
    meta: "Full-time · Co-founded",
    location: "Princeton, New Jersey · On-site",
    roles: [
      {
        title: "Chief Operating Officer & Co-Founder",
        period: "Apr 2026 — Present",
        body: "COO of a local-first behavioral intelligence system that passively models focus and attention fragmentation on-device. I own operations, product execution, infrastructure planning, and the scale from private beta to production — plus growth systems, privacy architecture coordination, and cross-functional execution across product, engineering, and go-to-market.",
      },
    ],
  },
  {
    org: "SPIKE Robotics — FRC Team 293",
    meta: "1 yr 11 mos",
    location: "New Jersey · On-site",
    roles: [
      {
        title: "Chief Sustainability Officer",
        period: "Apr 2026 — Present",
        body: "Lead sustainability, operational continuity, and technical development — long-term resource planning, sponsorships, documentation, and team infrastructure — while engineering robot control systems, autonomous functionality, and tooling under competition deadlines.",
      },
      {
        title: "Strategy Co-Lead / Software Engineer",
        period: "May 2025 — Mar 2026",
        body: "Co-led competition strategy while engineering robot software.",
      },
      {
        title: "Software Engineer",
        period: "Aug 2024 — May 2025",
        body: "Developed, tested, and maintained competition robot software in Java.",
      },
    ],
  },
  {
    org: "DreamIT",
    meta: "Full-time · Co-founded",
    location: "Berkeley, California · Hybrid",
    roles: [
      {
        title: "Lead Founding Engineer & Co-Founder",
        period: "Nov 2025 — Present",
        body: "Drive development of AI-driven software across frontend and backend, collaborate with the founders on product strategy, and own end-to-end delivery.",
      },
    ],
  },
  {
    org: "AidSense",
    meta: "1 yr 2 mos",
    location: "Jersey City, New Jersey · Hybrid",
    roles: [
      {
        title: "Chief Financial Officer",
        period: "May 2025 — Present",
        body: "CFO of an AI/ML platform connecting people to nearby food, housing, and medical aid.",
      },
    ],
  },
  {
    org: "Minorities in STEM",
    meta: "Leadership",
    roles: [
      {
        title: "New Jersey State Executive Director",
        period: "Jan 2026 — Present",
        body: "Lead New Jersey operations and programming.",
      },
    ],
  },
  {
    org: "Institute for Youth in Policy",
    meta: "11 mos",
    location: "San Francisco, California · Remote",
    roles: [
      {
        title: "Technology Manager",
        period: "Jan 2026 — May 2026",
        body: "Managed technology systems and internal tooling.",
      },
      {
        title: "Innovative Projects & Technology Intern",
        period: "Jul 2025 — Jan 2026",
        body: "Built and supported innovative technology projects.",
      },
    ],
  },
  {
    org: "BYCIG",
    meta: "3 mos",
    location: "Brooklyn, New York",
    roles: [
      {
        title: "Investment Analyst",
        period: "Sep 2025 — Nov 2025",
        body: "Analyzed investments as part of the BYCIG team.",
      },
    ],
  },
  {
    org: "MIT Beaver Works Summer Institute",
    meta: "Internship · 7 mos",
    location: "Cambridge, Massachusetts",
    roles: [
      {
        title: "Cognitive Assistants",
        period: "Mar 2025 — Sep 2025",
        body: "Selected for the Cognitive Assistants program.",
      },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/*  Navigation                                                                  */
/* -------------------------------------------------------------------------- */

export const navItems = [
  { label: "About", href: "#about" },
  { label: "Research", href: "#publications" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Resume", href: "#resume" },
] as const;
