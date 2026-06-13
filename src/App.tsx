import {
  type ComponentPropsWithoutRef,
  type ElementType,
  type ReactNode,
  Fragment,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import {
  ArrowUpRight,
  BarChart3,
  BrainCircuit,
  Cloud,
  Code2,
  Database,
  FileText,
  Github,
  Linkedin,
  type LucideIcon,
  Mail,
  Network,
} from "lucide-react";

const portraitUrl =
  "/avatar.png";

const resumeLinks = {
  software: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=6892259",
  aiMl: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=6892259",
};

const resumeFile = "/Sparsh_Roy_Resume.pdf";

const profileLinks = {
  github: "https://github.com/ImSpxrsh",
  linkedin: "https://linkedin.com/in/roysparsh",
  email: "mailto:gokuvsninja@gmail.com",
};

const aboutImages = {
  moon: "https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png",
  object: "https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png",
  lego: "https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png",
  group: "https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png",
};

type ExperienceRole = { title: string; period: string; body: string };
type ExperienceOrg = {
  org: string;
  meta: string;
  location?: string;
  roles: ExperienceRole[];
};

const experience: ExperienceOrg[] = [
  {
    org: "Massachusetts Institute of Technology",
    meta: "Full-time · 2 mos",
    location: "Massachusetts, United States",
    roles: [
      {
        title: "SDoH Researcher",
        period: "May 2026 — Present",
        body: "Building AI systems for healthcare, focused on integrating Social Determinants of Health (SDOH).",
      },
      {
        title: "Research Assistant",
        period: "May 2026 — Present",
        body: "On the “This Is Not a Webinar” series under Dr. Celi — reframing the AI-accelerated crisis in education and academic research as a philosophical one, and proposing a model built on genuine, purposeful learning and collaborative knowledge-making over the prestige economy.",
      },
    ],
  },
  {
    org: "MIT CSAIL",
    meta: "Full-time · 2 mos",
    location: "Cambridge, Massachusetts, United States",
    roles: [
      {
        title: "Developer",
        period: "May 2026 — Present",
        body: "AI/ML developer at the MIT Computer Science & Artificial Intelligence Laboratory, focused on software infrastructure and machine learning.",
      },
    ],
  },
  {
    org: "SAID Lab",
    meta: "Full-time · 1 mo · Google-sponsored",
    location: "Vienna, Austria",
    roles: [
      {
        title: "Researcher",
        period: "Jun 2026 — Present",
        body: "Researching mathematics and AI/ML papers across investigative and scholarly research.",
      },
    ],
  },
  {
    org: "ARC Labs",
    meta: "Full-time · 2 mos",
    roles: [
      {
        title: "Principal Investigator",
        period: "May 2026 — Present",
        body: "Leading research direction as Principal Investigator.",
      },
    ],
  },
  {
    org: "Velvt",
    meta: "Full-time · 3 mos",
    location: "Princeton, New Jersey · On-site",
    roles: [
      {
        title: "Chief Operating Officer & Co-Founder",
        period: "Apr 2026 — Present",
        body: "COO of a local-first behavioral intelligence system that passively models focus and attention fragmentation on-device. Own operations, product execution, infrastructure planning, and the scale from private beta to production — plus growth systems, privacy architecture coordination, and cross-functional execution across product, engineering, and go-to-market. Core principles: neutrality, local-first privacy, low-noise behavioral insight.",
      },
    ],
  },
  {
    org: "SPIKE Robotics — FRC Team 293",
    meta: "Full-time · 1 yr 11 mos",
    location: "New Jersey, United States · On-site",
    roles: [
      {
        title: "Chief Sustainability Officer",
        period: "Apr 2026 — Present",
        body: "Lead sustainability, operational continuity, and technical development for FIRST Robotics Competition Team 293 SPIKE — long-term resource planning, sponsorships, documentation, and team infrastructure. Also engineer robot control systems, autonomous functionality, and tooling, collaborating across mechanical, electrical, and strategy teams under strict deadlines.",
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
    meta: "Full-time · 8 mos",
    location: "Berkeley, California · Hybrid",
    roles: [
      {
        title: "Lead Founding Engineer & Co-Founder",
        period: "Nov 2025 — Present",
        body: "Drive development of AI-driven software across frontend and backend, collaborate with the founders on product strategy, and own end-to-end delivery of a seamless, high-performance experience.",
      },
    ],
  },
  {
    org: "AidSense",
    meta: "Full-time · 1 yr 2 mos",
    location: "Jersey City, New Jersey · Hybrid",
    roles: [
      {
        title: "Chief Financial Officer",
        period: "May 2025 — Present",
        body: "CFO of AidSense, an AI/ML platform connecting people to nearby food, housing, and medical aid.",
      },
    ],
  },
  {
    org: "Minorities in STEM",
    meta: "Full-time · 6 mos",
    roles: [
      {
        title: "New Jersey State Executive Director",
        period: "Jan 2026 — Present",
        body: "Lead New Jersey operations and programming for Minorities in STEM.",
      },
    ],
  },
  {
    org: "Institute for Youth in Policy",
    meta: "Full-time · 11 mos",
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
    meta: "Full-time · 3 mos",
    location: "Brooklyn, New York, United States",
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
    location: "Massachusetts, United States",
    roles: [
      {
        title: "Cognitive Assistants",
        period: "Mar 2025 — Sep 2025",
        body: "Selected for the Cognitive Assistants program at MIT Beaver Works Summer Institute.",
      },
    ],
  },
];

const skillMap = [
  {
    id: "aiml",
    name: "AI / ML",
    shortName: "AI/ML",
    icon: BrainCircuit,
    accent: "#FF5D8F",
    description:
      "Applied AI and machine-learning research, agentic LLM workflows, ML pipelines, and prompt engineering across multimodal problems.",
    tools: ["Python", "PyTorch", "LLM APIs", "ML Pipelines", "Prompt Engineering"],
    projects: ["MIT CSAIL", "Substrate-Coevolving Neural Dynamics"],
  },
  {
    id: "research",
    name: "Research",
    shortName: "Research",
    icon: BarChart3,
    accent: "#27C4A8",
    description:
      "Research across AI, health equity, and social computing at MIT CSAIL, MIT Critical Data, SAID Labs, and UIUC's SALT Lab.",
    tools: ["MIT CSAIL", "MIT Critical Data", "UIUC SALT", "SSRN", "XAI"],
    projects: [
      "MIT Critical Data",
      "UIUC SALT Lab",
      "SAID Labs",
      "Substrate-Coevolving Neural Dynamics",
    ],
  },
  {
    id: "backend",
    name: "Backend + Agents",
    shortName: "Backend",
    icon: Database,
    accent: "#F8B84E",
    description:
      "Backend extensions, APIs, and platform tooling that power LLM-based agentic data exploration and product infrastructure.",
    tools: ["Python", "FastAPI", "REST APIs", "Firebase", "Backend AI"],
    projects: ["MIT CSAIL", "Aidsense"],
  },
  {
    id: "product",
    name: "Product + Mobile",
    shortName: "Product",
    icon: Code2,
    accent: "#7DD3FC",
    description:
      "Building usable products and mobile apps end-to-end, from natural-language interfaces to local-first behavioral systems.",
    tools: ["Flutter", "Dart", "React", "TypeScript", "Figma"],
    projects: ["Aidsense", "Velvt"],
  },
  {
    id: "robotics",
    name: "Robotics + Ops",
    shortName: "Robotics",
    icon: Cloud,
    accent: "#B98CFF",
    description:
      "Competition robot software for FRC Team 293 Spike, plus operations and execution leadership as COO of Velvt.",
    tools: ["Java", "FRC", "Control Systems", "Operations"],
    projects: ["FRC Team 293 Spike", "Velvt"],
  },
] as const;

const projects = [
  {
    number: "01",
    category: "Behavioral AI",
    name: "Velvt",
    description:
      "A local-first behavioral intelligence system that passively models focus patterns and attention fragmentation entirely on-device.",
    tags: ["Local-First", "Behavioral AI", "Privacy", "Operations"],
    details: [
      "As COO, owns operations, product execution, infrastructure planning, and the scale from private beta to production.",
      "Coordinates growth systems, privacy architecture, and cross-functional execution across product, engineering, and go-to-market.",
      "Built around neutrality, local-first privacy, and low-noise behavioral insight.",
    ],
    link: "https://github.com/ImSpxrsh",
  },
  {
    number: "02",
    category: "Research",
    name: "MIT CSAIL",
    description:
      "Research and development on an AI-powered cognitive cartography and visual data science platform at MIT CSAIL's Kellis Lab.",
    tags: ["LLM Agents", "Python", "Backend", "Research"],
    details: [
      "Builds backend extensions and platform tooling for agentic data exploration.",
      "Powers LLM-based exploration across multimodal knowledge spaces.",
      "Work done within MIT CSAIL's Kellis Lab.",
    ],
    link: "https://compbio.mit.edu/",
  },
  {
    number: "03",
    category: "Health AI",
    name: "MIT Critical Data",
    description:
      "Clinical health data, health equity, and research-infrastructure work with Dr. Leo Celi's team.",
    tags: ["Health Equity", "Clinical AI", "SDOH", "Dev"],
    details: [
      "Contributes development and tech operations across ongoing projects.",
      "Supports webinar programming and research infrastructure.",
      "Focuses on health equity and social determinants of health.",
    ],
    link: "https://criticaldata.mit.edu/",
  },
  {
    number: "04",
    category: "Social Impact",
    name: "Aidsense",
    description:
      "An AI/ML-powered Flutter app that helps people in the Tri-State area find nearby food, housing, and medical aid through natural-language queries.",
    tags: ["Flutter", "Dart", "AI/ML", "SDOH"],
    details: [
      "Built end-to-end, including backend infrastructure and ML integration.",
      "Lets users find aid resources through natural-language search.",
      "Designed for social good across the Tri-State area.",
    ],
    link: "https://aidsense.app/",
  },
  {
    number: "05",
    category: "Robotics",
    name: "FRC Team 293 Spike",
    description:
      "Java programmer for FRC Team 293 Spike, building competition robot software across multiple seasons.",
    tags: ["Java", "FRC", "Robotics", "Control Systems"],
    details: [
      "Programs competition robots in Java across multiple seasons.",
      "Contributes to the Rebuilt and Reefscape robot codebases.",
      "Works on control systems and on-robot software.",
    ],
    link: "https://github.com/Team293/Reefscape",
  },
  {
    number: "06",
    category: "AI/ML Research",
    name: "Substrate-Coevolving Neural Dynamics",
    description:
      "A first-author SSRN paper studying self-modifying computation where latent state and a matrix-valued substrate evolve together.",
    tags: ["Neural Dynamics", "Self-Modifying Computation", "AI/ML", "SSRN"],
    details: [
      "Makes the computational interaction substrate an explicit state variable updated during the forward pass.",
      "Analyzes failure modes, optimization barriers, and gated, latch-like substrate updates.",
      "First-author publication on SSRN.",
    ],
    link: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=6892259",
  },
  {
    number: "07",
    category: "Research",
    name: "UIUC SALT Lab",
    description:
      "Research at the Social Computing Systems Lab at the University of Illinois Urbana-Champaign.",
    tags: ["Social Computing", "Privacy", "HCI", "Research"],
    details: [
      "Works on social computing, privacy, and human-centered systems.",
      "Contributes to lab research at the Illinois iSchool.",
    ],
    link: "https://salt.ischool.illinois.edu/",
  },
  {
    number: "08",
    category: "Research",
    name: "SAID Labs",
    description:
      "Research and development contributions at SAID Labs across ongoing projects.",
    tags: ["Research", "Development"],
    details: [
      "Contributes to research and development work at SAID Labs.",
    ],
    link: "https://github.com/saidlaboratory",
  },
];

const featuredProjectNames = new Set([
  "Velvt",
  "MIT CSAIL",
  "MIT Critical Data",
  "Aidsense",
  "FRC Team 293 Spike",
  "Substrate-Coevolving Neural Dynamics",
]);

const featuredProjects = projects.filter((project) =>
  featuredProjectNames.has(project.name),
);
const moreProjects = projects.filter(
  (project) => !featuredProjectNames.has(project.name),
);

type FadeInProps<T extends ElementType = "div"> = {
  as?: T;
  children: ReactNode;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children">;

function FadeIn<T extends ElementType = "div">({
  as,
  children,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  ...props
}: FadeInProps<T>) {
  const shouldReduceMotion = useReducedMotion();
  const MotionElement = useMemo(
    () => motion.create((as ?? "div") as ElementType),
    [as],
  );

  return (
    <MotionElement
      initial={shouldReduceMotion ? false : { opacity: 0, x, y }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, x: 0, y: 0 }}
      transition={
        shouldReduceMotion
          ? undefined
          : { duration, delay, ease: [0.25, 0.1, 0.25, 1] }
      }
      viewport={{ once: true, margin: "50px", amount: 0 }}
      {...props}
    >
      {children}
    </MotionElement>
  );
}

type MagnetProps = {
  children: ReactNode;
  padding?: number;
  strength?: number;
  activeTransition?: string;
  inactiveTransition?: string;
  className?: string;
};

function Magnet({
  children,
  padding = 150,
  strength = 3,
  activeTransition = "transform 0.3s ease-out",
  inactiveTransition = "transform 0.6s ease-in-out",
  className = "",
}: MagnetProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isActive, setIsActive] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) {
      return;
    }

    const handleMouseMove = (event: MouseEvent) => {
      const element = ref.current;

      if (!element) {
        return;
      }

      const rect = element.getBoundingClientRect();
      const withinBounds =
        event.clientX >= rect.left - padding &&
        event.clientX <= rect.right + padding &&
        event.clientY >= rect.top - padding &&
        event.clientY <= rect.bottom + padding;

      if (!withinBounds) {
        setIsActive(false);
        setPosition({ x: 0, y: 0 });
        return;
      }

      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      setIsActive(true);
      setPosition({
        x: (event.clientX - centerX) / strength,
        y: (event.clientY - centerY) / strength,
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [padding, shouldReduceMotion, strength]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform: shouldReduceMotion
          ? undefined
          : `translate3d(${position.x}px, ${position.y}px, 0)`,
        transition: shouldReduceMotion
          ? undefined
          : isActive
            ? activeTransition
            : inactiveTransition,
        willChange: shouldReduceMotion ? undefined : "transform",
      }}
    >
      {children}
    </div>
  );
}

function ContactButton() {
  return (
    <a
      href={profileLinks.email}
      className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-3 text-xs font-medium uppercase tracking-widest text-white outline outline-2 outline-offset-[-3px] outline-white transition duration-200 hover:scale-[1.02] sm:px-10 sm:py-3.5 sm:text-sm md:px-12 md:py-4 md:text-base"
      style={{
        background:
          "linear-gradient(123deg, #2A0A12 6%, #EC4899 42%, #F97316 100%)",
        boxShadow:
          "0px 4px 4px rgba(236, 72, 153, 0.25), 4px 4px 12px #F97316 inset",
      }}
    >
      <span>Contact Me</span>
      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
    </a>
  );
}

function ResourceLink({
  href,
  label,
  icon: Icon,
}: {
  href: string;
  label: string;
  icon: LucideIcon;
}) {
  const isExternal = href.startsWith("http");

  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-[#D7E2EA]/30 bg-[#D7E2EA]/5 px-4 text-xs font-medium uppercase tracking-widest text-[#D7E2EA] transition duration-200 hover:border-[#D7E2EA]/70 hover:bg-[#D7E2EA]/10 sm:h-12 sm:px-5"
    >
      <Icon className="h-4 w-4" aria-hidden="true" />
      <span>{label}</span>
    </a>
  );
}

function LiveProjectButton({ href }: { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#D7E2EA] px-8 py-3 text-sm font-medium uppercase tracking-widest text-[#D7E2EA] transition duration-200 hover:bg-[#D7E2EA]/10 sm:px-10 sm:py-3.5 sm:text-base"
    >
      <span>Visit</span>
      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
    </a>
  );
}

function ProjectVisual({ project }: { project: (typeof projects)[number] }) {
  const accentByCategory: Record<string, string> = {
    "Behavioral AI": "#B98CFF",
    Research: "#27C4A8",
    "Health AI": "#FF5D8F",
    "Social Impact": "#7DD3FC",
    Robotics: "#F8B84E",
    "AI/ML Research": "#F97316",
  };
  const accent = accentByCategory[project.category] ?? "#D7E2EA";
  const metricsByProject: Record<string, { label: string; value: number }[]> = {
    Velvt: [
      { label: "On-device privacy", value: 94 },
      { label: "Focus modeling", value: 88 },
      { label: "Beta to production", value: 72 },
    ],
    "MIT CSAIL": [
      { label: "Agentic exploration", value: 90 },
      { label: "Backend tooling", value: 86 },
      { label: "Multimodal coverage", value: 82 },
    ],
    "MIT Critical Data": [
      { label: "Health equity focus", value: 88 },
      { label: "Clinical data work", value: 80 },
      { label: "Research infra", value: 84 },
    ],
    Aidsense: [
      { label: "Natural-language search", value: 89 },
      { label: "Aid coverage", value: 84 },
      { label: "ML integration", value: 78 },
    ],
    "FRC Team 293 Spike": [
      { label: "Robot software", value: 86 },
      { label: "Control systems", value: 80 },
      { label: "Season delivery", value: 90 },
    ],
    "Substrate-Coevolving Neural Dynamics": [
      { label: "Novel formulation", value: 91 },
      { label: "Diagnostic depth", value: 86 },
      { label: "Publication", value: 92 },
    ],
  };
  const metrics =
    metricsByProject[project.name] ??
    project.tags.slice(0, 3).map((tag, index) => ({
      label: tag,
      value: [84, 73, 88][index] ?? 76,
    }));
  const architectureStepsByProject: Record<string, string[]> = {
    Velvt: ["Capture On-Device", "Model Focus", "Surface Insight"],
    "MIT CSAIL": ["Ingest Knowledge", "Run LLM Agents", "Map & Explore"],
    "MIT Critical Data": ["Clinical Data", "Build Infra", "Advance Equity"],
    Aidsense: ["Parse Query", "Match Resources", "Connect Aid"],
    "FRC Team 293 Spike": ["Read Sensors", "Run Control Loop", "Drive Robot"],
    "Substrate-Coevolving Neural Dynamics": ["Define Substrate", "Coevolve State", "Diagnose Dynamics"],
  };
  const architectureSteps =
    architectureStepsByProject[project.name] ??
    project.tags.slice(0, 3).map((tag) => `Use ${tag}`);

  return (
    <div className="relative flex min-h-[280px] overflow-hidden rounded-[32px] border border-[#D7E2EA]/20 bg-[#090A0C] p-4 sm:min-h-[360px] sm:rounded-[44px] sm:p-5 md:rounded-[56px]">
      <div
        className="absolute inset-x-8 top-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
        aria-hidden="true"
      />
      <div className="grid w-full grid-rows-[auto_1fr] gap-4">
        <div className="flex min-w-0 items-center justify-between gap-3 rounded-[24px] border border-[#D7E2EA]/15 bg-[#D7E2EA]/5 px-4 py-3">
          <div className="flex min-w-0 items-center gap-2">
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-full"
              style={{ backgroundColor: accent }}
              aria-hidden="true"
            />
            <span className="min-w-0 break-words text-xs font-medium uppercase tracking-wider text-[#D7E2EA]/70 [overflow-wrap:anywhere]">
              {project.category}
            </span>
          </div>
          <span className="shrink-0 text-xs font-light uppercase tracking-wider text-[#D7E2EA]/45">
            Preview
          </span>
        </div>

        <div className="grid gap-4 md:grid-cols-[0.9fr_1.1fr]">
          <div className="flex min-w-0 flex-col justify-between rounded-[28px] border border-[#D7E2EA]/15 bg-[#D7E2EA]/5 p-4">
            <div className="min-w-0">
              <p className="text-xs font-medium uppercase tracking-[0.24em] text-[#D7E2EA]/45">
                Project System
              </p>
              <p className="mt-3 min-w-0 break-words text-[clamp(1.35rem,3vw,1.85rem)] font-black uppercase leading-none text-[#D7E2EA] [overflow-wrap:anywhere]">
                {project.name}
              </p>
            </div>
            <div className="mt-8 grid gap-2">
              {project.tags.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className="min-w-0 rounded-full border border-[#D7E2EA]/15 px-3 py-2 text-[0.68rem] font-medium uppercase leading-snug tracking-wider text-[#D7E2EA]/70 [overflow-wrap:anywhere]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="grid min-w-0 gap-3 rounded-[28px] border border-[#D7E2EA]/15 bg-[#0C0C0C] p-4">
            {metrics.map((metric, index) => (
              <div key={metric.label} className="grid gap-2">
                <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 text-[0.68rem] uppercase tracking-wider text-[#D7E2EA]/50">
                  <span className="min-w-0 break-words leading-snug [overflow-wrap:anywhere]">
                    {metric.label}
                  </span>
                  <span className="shrink-0">{metric.value}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-[#D7E2EA]/10">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${metric.value}%`,
                      background: `linear-gradient(90deg, ${accent}, rgba(215,226,234,0.8))`,
                    }}
                  />
                </div>
              </div>
            ))}

            <div className="mt-auto grid gap-2 pt-4">
              <p className="text-[0.68rem] font-medium uppercase tracking-wider text-[#D7E2EA]/40">
                Architecture Flow
              </p>
              <div className="grid gap-2 sm:grid-cols-3">
                {architectureSteps.map((step, index) => (
                  <div
                    key={step}
                    className="relative min-w-0 rounded-2xl border border-[#D7E2EA]/12 bg-[#D7E2EA]/5 p-3"
                    style={{
                      boxShadow: `inset 0 0 28px ${accent}${index === 1 ? "29" : "17"}`,
                    }}
                  >
                    <span
                      className="flex h-6 w-6 items-center justify-center rounded-full text-[0.65rem] font-black text-[#0C0C0C]"
                      style={{ backgroundColor: accent }}
                    >
                      {index + 1}
                    </span>
                    <span className="mt-3 block min-w-0 break-words text-[0.68rem] font-semibold uppercase leading-snug tracking-wider text-[#D7E2EA]/75 [overflow-wrap:anywhere]">
                      {step}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function HeroSection() {
  const navItems = [
    { label: "About", href: "#about" },
    { label: "Skill Map", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Resume", href: "#resume" },
    { label: "Paper", href: resumeLinks.software },
    { label: "Contact", href: profileLinks.email },
  ];

  return (
    <section className="relative flex h-screen flex-col overflow-x-clip bg-[#0C0C0C]">
      <FadeIn
        as="nav"
        delay={0}
        y={-20}
        className="relative z-30 flex w-full flex-wrap justify-center gap-x-5 gap-y-3 px-6 pt-6 text-xs font-medium uppercase tracking-wider text-[#D7E2EA] sm:justify-between sm:text-sm md:px-10 md:pt-8 md:text-base lg:text-[1.1rem] xl:text-[1.25rem]"
        aria-label="Primary navigation"
      >
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="transition-opacity duration-200 hover:opacity-70"
          >
            {item.label}
          </a>
        ))}
      </FadeIn>

      <FadeIn
        delay={0.15}
        y={40}
        className="relative z-20 mt-16 w-full overflow-hidden sm:mt-14 md:mt-10"
      >
        <h1 className="hero-heading w-full whitespace-nowrap text-center text-[9vw] font-black uppercase leading-none tracking-tight sm:text-[9.6vw] md:text-[10.2vw] lg:text-[11.2vw]">
          Hi, Sparsh here !
        </h1>
      </FadeIn>

      <div className="absolute left-1/2 top-1/2 z-10 w-[300px] -translate-x-1/2 -translate-y-1/2 sm:w-[380px] md:w-[460px] lg:w-[520px]">
        <FadeIn delay={0.6} y={30}>
          <Magnet
            padding={150}
            strength={3}
            activeTransition="transform 0.3s ease-out"
            inactiveTransition="transform 0.6s ease-in-out"
          >
            <img
              src={portraitUrl}
              alt="Portrait of Sparsh Roy"
              className="w-full select-none object-contain"
              draggable={false}
            />
          </Magnet>
        </FadeIn>
      </div>

      <div className="relative z-20 mt-auto flex items-end justify-between px-6 pb-7 sm:pb-8 md:px-10 md:pb-10">
        <FadeIn delay={0.35} y={20}>
          <div className="max-w-[210px] sm:max-w-[360px] md:max-w-[520px]">
            <p className="text-[clamp(0.75rem,1.4vw,1.5rem)] font-light uppercase leading-snug tracking-wide text-[#D7E2EA]">
              Researcher at MIT CSAIL &amp; MIT Critical Data, builder, and COO of Velvt
            </p>
            <div className="mt-4 hidden flex-wrap gap-2 sm:flex">
              <ResourceLink href={resumeLinks.software} label="Newest Paper" icon={FileText} />
              <ResourceLink href={profileLinks.github} label="GitHub" icon={Github} />
              <ResourceLink href={profileLinks.linkedin} label="LinkedIn" icon={Linkedin} />
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.5} y={20}>
          <div className="flex flex-col items-end gap-3">
            <ContactButton />
            <div className="flex gap-2 sm:hidden">
              <a
                href={resumeLinks.software}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#D7E2EA]/35 bg-[#D7E2EA]/5 text-[#D7E2EA]"
                aria-label="Read research paper"
              >
                <FileText className="h-5 w-5" aria-hidden="true" />
              </a>
              <a
                href={profileLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#D7E2EA]/35 bg-[#D7E2EA]/5 text-[#D7E2EA]"
                aria-label="Open GitHub profile"
              >
                <Github className="h-5 w-5" aria-hidden="true" />
              </a>
              <a
                href={profileLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#D7E2EA]/35 bg-[#D7E2EA]/5 text-[#D7E2EA]"
                aria-label="Open LinkedIn profile"
              >
                <Linkedin className="h-5 w-5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function polarPoint(cx: number, cy: number, r: number, deg: number) {
  const a = (deg * Math.PI) / 180;
  return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
}

const projectShort: Record<string, string> = {
  Velvt: "Velvt",
  "MIT CSAIL": "MIT CSAIL",
  "MIT Critical Data": "MIT Critical Data",
  "UIUC SALT Lab": "UIUC SALT",
  "SAID Labs": "SAID Labs",
  Aidsense: "Aidsense",
  "FRC Team 293 Spike": "FRC 293",
  "Substrate-Coevolving Neural Dynamics": "SSRN Paper",
};

function SkillGraph({
  activeId,
  onSelect,
}: {
  activeId: (typeof skillMap)[number]["id"];
  onSelect: (id: (typeof skillMap)[number]["id"]) => void;
}) {
  const cx = 390;
  const cy = 330;
  const skillR = 158;
  const projR = 272;

  const skillPos = skillMap.map((skill, i) => {
    const deg = -90 + (i * 360) / skillMap.length;
    return { skill, deg, ...polarPoint(cx, cy, skillR, deg) };
  });

  const projNames = Array.from(new Set(projects.map((p) => p.name)));
  const projPos = projNames.map((name, i) => {
    const step = 360 / projNames.length;
    const deg = -90 + i * step + step / 2;
    return { name, ...polarPoint(cx, cy, projR, deg) };
  });
  const projLink = Object.fromEntries(projects.map((p) => [p.name, p.link]));

  const active = skillMap.find((s) => s.id === activeId) ?? skillMap[0];
  const activeProjectSet = new Set(active.projects as readonly string[]);
  const accent = active.accent;

  return (
    <svg
      viewBox="-100 -16 980 692"
      className="h-auto w-full select-none"
      role="img"
      aria-label="Interactive skill graph"
    >
      <defs>
        <radialGradient id="hubGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={accent} stopOpacity="0.4" />
          <stop offset="100%" stopColor={accent} stopOpacity="0" />
        </radialGradient>
      </defs>

      <motion.circle
        cx={cx}
        cy={cy}
        r={projR + 28}
        fill="none"
        stroke="rgba(215,226,234,0.06)"
        strokeWidth={1}
        strokeDasharray="3 11"
        animate={{ rotate: 360 }}
        transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: `${cx}px ${cy}px` }}
      />
      <circle
        cx={cx}
        cy={cy}
        r={skillR}
        fill="none"
        stroke="rgba(215,226,234,0.05)"
        strokeWidth={1}
      />

      {skillPos.map((sp) =>
        (sp.skill.projects as readonly string[]).map((pn) => {
          const pp = projPos.find((p) => p.name === pn);
          if (!pp) return null;
          return (
            <line
              key={`base-${sp.skill.id}-${pn}`}
              x1={sp.x}
              y1={sp.y}
              x2={pp.x}
              y2={pp.y}
              stroke="rgba(215,226,234,0.05)"
              strokeWidth={1}
            />
          );
        }),
      )}

      {skillPos.map((sp) => {
        const isActive = sp.skill.id === active.id;
        return (
          <line
            key={`hub-${sp.skill.id}`}
            x1={cx}
            y1={cy}
            x2={sp.x}
            y2={sp.y}
            stroke={isActive ? accent : "rgba(215,226,234,0.10)"}
            strokeWidth={isActive ? 1.6 : 1}
            strokeOpacity={isActive ? 0.55 : 1}
          />
        );
      })}

      {(active.projects as readonly string[]).map((pn) => {
        const sp = skillPos.find((s) => s.skill.id === active.id);
        const pp = projPos.find((p) => p.name === pn);
        if (!sp || !pp) return null;
        return (
          <motion.line
            key={`active-${pn}`}
            x1={sp.x}
            y1={sp.y}
            x2={pp.x}
            y2={pp.y}
            stroke={accent}
            strokeWidth={2}
            strokeLinecap="round"
            strokeDasharray="5 9"
            initial={{ strokeDashoffset: 0, opacity: 0 }}
            animate={{ strokeDashoffset: [0, -28], opacity: 0.9 }}
            transition={{
              strokeDashoffset: { duration: 0.9, repeat: Infinity, ease: "linear" },
              opacity: { duration: 0.3 },
            }}
          />
        );
      })}

      <circle cx={cx} cy={cy} r={72} fill="url(#hubGlow)" />
      <circle cx={cx} cy={cy} r={34} fill="#0C0C0C" stroke={accent} strokeWidth={1.5} />
      <text
        x={cx}
        y={cy - 1}
        textAnchor="middle"
        fill="#D7E2EA"
        style={{ fontSize: 13, fontWeight: 800, letterSpacing: 1 }}
      >
        SPARSH
      </text>
      <text
        x={cx}
        y={cy + 13}
        textAnchor="middle"
        fill="rgba(215,226,234,0.45)"
        style={{ fontSize: 8, letterSpacing: 1.5 }}
      >
        SKILL GRAPH
      </text>

      {projPos.map((pp) => {
        const on = activeProjectSet.has(pp.name);
        const anchor =
          Math.abs(pp.x - cx) < 26 ? "middle" : pp.x < cx ? "end" : "start";
        const lx = anchor === "middle" ? pp.x : pp.x < cx ? pp.x - 15 : pp.x + 15;
        const ly =
          anchor === "middle" ? (pp.y < cy ? pp.y - 16 : pp.y + 24) : pp.y + 4;
        return (
          <g
            key={pp.name}
            style={{ cursor: "pointer" }}
            onClick={() =>
              window.open(projLink[pp.name], "_blank", "noopener,noreferrer")
            }
          >
            {on && (
              <motion.circle
                cx={pp.x}
                cy={pp.y}
                fill="none"
                stroke={accent}
                strokeWidth={1.2}
                initial={{ r: 13, opacity: 0.6 }}
                animate={{ r: [13, 24], opacity: [0.6, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
              />
            )}
            <motion.circle
              cx={pp.x}
              cy={pp.y}
              strokeWidth={on ? 2 : 1}
              animate={{
                r: on ? 13 : 8,
                fill: on ? accent : "#11141A",
                stroke: on ? accent : "rgba(215,226,234,0.25)",
                opacity: on ? 1 : 0.5,
              }}
              transition={{ duration: 0.35 }}
            />
            <motion.text
              x={lx}
              y={ly}
              textAnchor={anchor}
              animate={{
                opacity: on ? 1 : 0.4,
                fill: on ? "#FFFFFF" : "rgba(215,226,234,0.55)",
              }}
              transition={{ duration: 0.35 }}
              style={{ fontSize: on ? 13 : 11, fontWeight: 600 }}
            >
              {projectShort[pp.name] ?? pp.name}
            </motion.text>
          </g>
        );
      })}

      {skillPos.map((sp) => {
        const isActive = sp.skill.id === active.id;
        const labelBelow = sp.y >= cy;
        return (
          <g
            key={sp.skill.id}
            style={{ cursor: "pointer" }}
            onClick={() => onSelect(sp.skill.id)}
            onMouseEnter={() => onSelect(sp.skill.id)}
          >
            {isActive && (
              <motion.circle
                cx={sp.x}
                cy={sp.y}
                fill="none"
                stroke={sp.skill.accent}
                strokeWidth={1.5}
                initial={{ r: 26, opacity: 0.5 }}
                animate={{ r: [26, 42], opacity: [0.5, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
              />
            )}
            <motion.circle
              cx={sp.x}
              cy={sp.y}
              fill={`${sp.skill.accent}${isActive ? "33" : "14"}`}
              stroke={sp.skill.accent}
              strokeWidth={isActive ? 2.5 : 1.5}
              animate={{ r: isActive ? 28 : 20, opacity: isActive ? 1 : 0.6 }}
              transition={{ duration: 0.35 }}
            />
            <text
              x={sp.x}
              y={
                labelBelow
                  ? sp.y + (isActive ? 46 : 38)
                  : sp.y - (isActive ? 36 : 30)
              }
              textAnchor="middle"
              fill={isActive ? "#FFFFFF" : "rgba(215,226,234,0.7)"}
              style={{ fontSize: 12, fontWeight: 700, letterSpacing: 0.5 }}
            >
              {sp.skill.shortName.toUpperCase()}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function SkillMapSection() {
  const [activeSkillId, setActiveSkillId] =
    useState<(typeof skillMap)[number]["id"]>(skillMap[0].id);
  const activeSkill =
    skillMap.find((skill) => skill.id === activeSkillId) ?? skillMap[0];
  const ActiveSkillIcon = activeSkill.icon;
  const activeSkillProjects: readonly string[] = activeSkill.projects;
  const activeProjects = projects.filter((project) =>
    activeSkillProjects.includes(project.name),
  );

  return (
    <section
      id="skills"
      className="overflow-hidden bg-[#0C0C0C] px-5 py-20 sm:px-8 sm:py-24 md:px-10 md:py-32 lg:px-12 xl:px-16 2xl:px-20"
      aria-label="Interactive skill map"
    >
      <div className="mx-auto max-w-[1680px]">
        <FadeIn>
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <h2 className="hero-heading text-[clamp(3rem,12vw,150px)] font-black uppercase leading-none tracking-tight">
              Skill Map
            </h2>
            <p className="max-w-2xl text-[clamp(0.95rem,1.5vw,1.2rem)] font-light leading-relaxed text-[#D7E2EA]/70">
              Select a skill area to see the tools I use and the projects where
              that skill shows up.
            </p>
          </div>
        </FadeIn>

        <div className="mt-10 grid items-start gap-6 lg:mt-14 lg:grid-cols-[1.25fr_0.78fr] lg:gap-10">
          <FadeIn delay={0.1}>
            <div className="rounded-[32px] border border-[#D7E2EA]/15 bg-[#0E1014] p-4 shadow-2xl shadow-black/30 sm:p-6">
              <div className="flex items-center gap-3 px-1">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#D7E2EA]/20 bg-[#D7E2EA]/5">
                  <Network className="h-5 w-5 text-[#D7E2EA]" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.24em] text-[#D7E2EA]/50">
                    Knowledge Graph
                  </p>
                  <p className="text-base font-bold uppercase leading-none text-[#D7E2EA]">
                    Skill &harr; Work
                  </p>
                </div>
              </div>

              <SkillGraph activeId={activeSkill.id} onSelect={setActiveSkillId} />

              <div className="mt-2 flex flex-wrap gap-2">
                {skillMap.map((skill) => {
                  const Icon = skill.icon;
                  const isActive = skill.id === activeSkill.id;

                  return (
                    <button
                      key={skill.id}
                      type="button"
                      onClick={() => setActiveSkillId(skill.id)}
                      className="flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-medium uppercase tracking-wider transition duration-200"
                      style={{
                        borderColor: isActive
                          ? skill.accent
                          : "rgba(215,226,234,0.16)",
                        background: isActive
                          ? `${skill.accent}1F`
                          : "rgba(215,226,234,0.04)",
                        color: isActive ? "#fff" : "rgba(215,226,234,0.7)",
                      }}
                      aria-pressed={isActive}
                    >
                      <Icon
                        className="h-4 w-4"
                        style={{ color: skill.accent }}
                        aria-hidden="true"
                      />
                      {skill.name}
                    </button>
                  );
                })}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <motion.article
              key={activeSkill.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col rounded-[32px] border border-[#D7E2EA]/15 bg-[#D7E2EA]/5 p-6 text-[#D7E2EA] sm:p-8 xl:p-10"
            >
              <div className="flex items-start justify-between gap-5">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.24em] text-[#D7E2EA]/50">
                    Active skill
                  </p>
                  <h3 className="mt-3 text-[clamp(2rem,4vw,4.4rem)] font-black uppercase leading-none tracking-tight">
                    {activeSkill.name}
                  </h3>
                </div>
                <div
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border"
                  style={{
                    borderColor: activeSkill.accent,
                    background: `${activeSkill.accent}1F`,
                  }}
                >
                  <ActiveSkillIcon
                    className="h-7 w-7"
                    style={{ color: activeSkill.accent }}
                    aria-hidden="true"
                  />
                </div>
              </div>

              <p className="mt-6 text-[clamp(1rem,1.7vw,1.35rem)] font-light leading-relaxed text-[#D7E2EA]/75">
                {activeSkill.description}
              </p>

              <div className="mt-8">
                <p className="text-xs font-medium uppercase tracking-[0.24em] text-[#D7E2EA]/50">
                  Tools
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {activeSkill.tools.map((tool) => (
                    <span
                      key={tool}
                      className="rounded-full border border-[#D7E2EA]/20 px-4 py-2 text-xs font-medium uppercase tracking-widest text-[#D7E2EA]/80"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8">
                <p className="text-xs font-medium uppercase tracking-[0.24em] text-[#D7E2EA]/50">
                  Related projects
                </p>
                <div className="mt-3 grid gap-3">
                  {activeProjects.map((project) => (
                    <a
                      key={project.name}
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between gap-4 rounded-[22px] border border-[#D7E2EA]/15 bg-[#0C0C0C]/50 px-4 py-4 transition duration-200 hover:border-[#D7E2EA]/35 hover:bg-[#D7E2EA]/10"
                    >
                      <span>
                        <span className="block text-sm font-light uppercase tracking-widest text-[#D7E2EA]/45">
                          {project.category}
                        </span>
                        <span className="mt-1 block text-lg font-semibold leading-tight text-[#D7E2EA]">
                          {project.name}
                        </span>
                      </span>
                      <ArrowUpRight
                        className="h-5 w-5 shrink-0 text-[#D7E2EA]/60 transition duration-200 group-hover:text-[#D7E2EA]"
                        aria-hidden="true"
                      />
                    </a>
                  ))}
                </div>
              </div>
            </motion.article>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function FloatingImage({
  src,
  drift = 12,
  rotate = 4,
  duration = 7,
  delay = 0,
}: {
  src: string;
  drift?: number;
  rotate?: number;
  duration?: number;
  delay?: number;
}) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <img src={src} alt="" loading="lazy" />;
  }

  return (
    <motion.img
      src={src}
      alt=""
      loading="lazy"
      style={{ willChange: "transform" }}
      animate={{
        y: [0, -drift, 0, drift * 0.8, 0],
        x: [0, drift * 0.6, 0, -drift * 0.6, 0],
        rotate: [0, rotate, 0, -rotate, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

function AboutSection() {
  return (
    <section
      id="about"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0C0C0C] px-5 py-20 sm:px-8 md:px-10"
    >
      <FadeIn
        delay={0.1}
        duration={0.9}
        x={-80}
        y={0}
        className="pointer-events-none absolute left-[1%] top-[4%] z-0 w-[120px] sm:left-[2%] sm:w-[160px] md:left-[4%] md:w-[210px]"
      >
        <FloatingImage src={aboutImages.moon} drift={13} rotate={5} duration={7.5} delay={0} />
      </FadeIn>
      <FadeIn
        delay={0.25}
        duration={0.9}
        x={-80}
        y={0}
        className="pointer-events-none absolute bottom-[8%] left-[3%] z-0 w-[100px] sm:left-[6%] sm:w-[140px] md:left-[10%] md:w-[180px]"
      >
        <FloatingImage src={aboutImages.object} drift={10} rotate={3} duration={9} delay={0.6} />
      </FadeIn>
      <FadeIn
        delay={0.15}
        duration={0.9}
        x={80}
        y={0}
        className="pointer-events-none absolute right-[1%] top-[4%] z-0 w-[120px] sm:right-[2%] sm:w-[160px] md:right-[4%] md:w-[210px]"
      >
        <FloatingImage src={aboutImages.lego} drift={15} rotate={6} duration={6.5} delay={0.3} />
      </FadeIn>
      <FadeIn
        delay={0.3}
        duration={0.9}
        x={80}
        y={0}
        className="pointer-events-none absolute bottom-[8%] right-[3%] z-0 w-[130px] sm:right-[6%] sm:w-[170px] md:right-[10%] md:w-[220px]"
      >
        <FloatingImage src={aboutImages.group} drift={11} rotate={4} duration={8.5} delay={0.9} />
      </FadeIn>

      <div className="relative z-10 flex max-w-4xl flex-col items-center text-center">
        <FadeIn delay={0} y={40}>
          <h2 className="hero-heading text-center text-[clamp(3rem,12vw,160px)] font-black uppercase leading-none tracking-tight">
            About me
          </h2>
        </FadeIn>

        <div className="mt-10 sm:mt-14 md:mt-16">
          <AnimatedText text="I am a high school researcher and builder working across AI/ML, health, and systems. I do research at MIT CSAIL and MIT Critical Data, contribute at SAID Labs and UIUC's SALT Lab, and serve as COO of Velvt. I published my first paper on SSRN, won the 2025 Congressional App Challenge, earned a gold medal at the 2026 House of Code, was named an NJ Top 100 Innovator, and raised $10,000 for the Leukemia & Lymphoma Society." />
        </div>

        <FadeIn delay={0.25} y={20} className="mt-16 sm:mt-20 md:mt-24">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <ContactButton />
            <ResourceLink href={resumeLinks.aiMl} label="Newest Paper" icon={FileText} />
            <ResourceLink href={profileLinks.email} label="Email" icon={Mail} />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function AnimatedText({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.2"],
  });
  const words = text.split(" ");
  const total = text.length;
  let cursor = 0;

  return (
    <p
      ref={ref}
      aria-label={text}
      className="mx-auto max-w-[560px] text-center text-[clamp(1rem,2vw,1.35rem)] font-medium leading-relaxed text-[#D7E2EA]"
    >
      {words.map((word, wi) => {
        const startIndex = cursor;
        cursor += word.length + 1;
        return (
          <Fragment key={wi}>
            <span className="inline-block whitespace-nowrap" aria-hidden="true">
              {word.split("").map((character, ci) => (
                <AnimatedCharacter
                  key={ci}
                  character={character}
                  index={startIndex + ci}
                  total={total}
                  progress={scrollYProgress}
                />
              ))}
            </span>
            {wi < words.length - 1 ? " " : null}
          </Fragment>
        );
      })}
    </p>
  );
}

function AnimatedCharacter({
  character,
  index,
  total,
  progress,
}: {
  character: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const shouldReduceMotion = useReducedMotion();
  const start = index / total;
  const end = Math.min(start + 0.14, 1);
  const opacity = useTransform(progress, [start, end], [0.15, 1]);

  return (
    <motion.span style={{ opacity: shouldReduceMotion ? 1 : opacity }}>
      {character}
    </motion.span>
  );
}

function ExperienceSection() {
  return (
    <section
      id="experience"
      className="rounded-t-[40px] bg-white px-5 py-20 text-[#0C0C0C] sm:rounded-t-[50px] sm:px-8 sm:py-24 md:rounded-t-[60px] md:px-10 md:py-32"
    >
      <FadeIn>
        <h2 className="mb-16 text-center text-[clamp(3rem,12vw,160px)] font-black uppercase leading-none tracking-tight sm:mb-20 md:mb-28">
          Experience
        </h2>
      </FadeIn>

      <div className="mx-auto max-w-5xl">
        {experience.map((org, index) => (
          <FadeIn
            key={org.org}
            as="article"
            delay={Math.min(index * 0.05, 0.3)}
            className="grid gap-4 border-t border-[rgba(12,12,12,0.15)] py-8 last:border-b sm:py-10 md:grid-cols-[0.85fr_1.4fr] md:gap-10 md:py-12"
          >
            <div>
              <h3 className="text-[clamp(1.2rem,2.4vw,2rem)] font-bold uppercase leading-tight">
                {org.org}
              </h3>
              <p className="mt-2 text-xs font-medium uppercase tracking-wider opacity-50 sm:text-sm">
                {org.meta}
              </p>
              {org.location && (
                <p className="mt-1 text-xs font-light opacity-50 sm:text-sm">
                  {org.location}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-6">
              {org.roles.map((role) => (
                <div key={role.title}>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h4 className="text-[clamp(1rem,1.8vw,1.45rem)] font-semibold leading-tight">
                      {role.title}
                    </h4>
                    <span className="text-xs font-medium uppercase tracking-wider opacity-50">
                      {role.period}
                    </span>
                  </div>
                  <p className="mt-2 text-[clamp(0.85rem,1.5vw,1.05rem)] font-light leading-relaxed opacity-60">
                    {role.body}
                  </p>
                </div>
              ))}
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

function ProjectsSection() {
  return (
    <section
      id="projects"
      className="rounded-t-[40px] bg-[#0C0C0C] px-5 py-20 sm:rounded-t-[50px] sm:px-8 sm:py-24 md:rounded-t-[60px] md:px-10 md:py-32"
    >
      <FadeIn>
        <h2 className="hero-heading mb-16 text-center text-[clamp(3rem,12vw,160px)] font-black uppercase leading-none tracking-tight sm:mb-20 md:mb-28">
          Projects
        </h2>
      </FadeIn>

      <div className="mx-auto max-w-7xl">
        {featuredProjects.map((project, index) => (
          <ProjectCard
            key={project.number}
            project={project}
            index={index}
            totalCards={featuredProjects.length}
          />
        ))}
      </div>

      <MoreProjects />
    </section>
  );
}

function MoreProjects() {
  return (
    <FadeIn className="mx-auto mt-12 max-w-7xl sm:mt-16 md:mt-24">
      <div className="flex flex-col gap-4 border-t border-[#D7E2EA]/20 pt-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-[#D7E2EA]/45">
            More projects
          </p>
          <h3 className="mt-3 text-[clamp(2rem,5vw,4.8rem)] font-black uppercase leading-none text-[#D7E2EA]">
            Supporting Work
          </h3>
        </div>
        <p className="max-w-xl text-sm font-light leading-relaxed text-[#D7E2EA]/65 sm:text-base">
          Additional projects that round out the portfolio without making every
          case study compete for the same screen space.
        </p>
      </div>

      <div className="mt-8 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {moreProjects.map((project) => (
          <a
            key={project.name}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex min-h-[180px] flex-col justify-between rounded-[28px] border border-[#D7E2EA]/15 bg-[#D7E2EA]/5 p-5 transition duration-200 hover:border-[#D7E2EA]/45 hover:bg-[#D7E2EA]/10"
          >
            <span>
              <span className="text-xs font-light uppercase tracking-widest text-[#D7E2EA]/45">
                {project.category}
              </span>
              <span className="mt-2 block text-xl font-semibold uppercase leading-tight text-[#D7E2EA]">
                {project.name}
              </span>
              <span className="mt-3 block text-sm font-light leading-relaxed text-[#D7E2EA]/65">
                {project.description}
              </span>
            </span>
            <span className="mt-5 flex flex-wrap items-center gap-2">
              {project.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[#D7E2EA]/15 px-3 py-1.5 text-[0.68rem] font-medium uppercase tracking-widest text-[#D7E2EA]/65"
                >
                  {tag}
                </span>
              ))}
              <ArrowUpRight
                className="ml-auto h-5 w-5 text-[#D7E2EA]/45 transition duration-200 group-hover:text-[#D7E2EA]"
                aria-hidden="true"
              />
            </span>
          </a>
        ))}
      </div>
    </FadeIn>
  );
}

function ProjectCard({
  project,
  index,
  totalCards,
}: {
  project: (typeof projects)[number];
  index: number;
  totalCards: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const targetScale = 1 - (totalCards - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  return (
    <div ref={ref} className="mb-6 md:mb-0 md:h-[85vh]">
      <motion.article
        className="project-sticky-card relative rounded-[32px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:rounded-[44px] sm:p-6 md:sticky md:rounded-[60px] md:p-8"
        style={{
          top: `calc(var(--project-sticky-top) + ${index * 28}px)`,
          scale: shouldReduceMotion ? undefined : scale,
          zIndex: index + 1,
          transformOrigin: "top center",
        }}
      >
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="flex flex-wrap items-end gap-4 sm:gap-8">
            <span className="text-[clamp(3rem,10vw,140px)] font-black leading-none text-[#D7E2EA]">
              {project.number}
            </span>
            <div className="pb-2 sm:pb-4">
              <p className="text-xs font-light uppercase tracking-widest text-[#D7E2EA]/70 sm:text-sm">
                {project.category}
              </p>
              <h3 className="text-[clamp(1.4rem,4vw,4.2rem)] font-black uppercase leading-none tracking-tight text-[#D7E2EA]">
                {project.name}
              </h3>
            </div>
          </div>
          <div className="pb-2 sm:pb-4">
            <LiveProjectButton href={project.link} />
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:mt-8 sm:gap-4 md:grid-cols-[0.45fr_0.55fr]">
          <ProjectVisual project={project} />
          <div className="flex min-h-[320px] flex-col justify-between rounded-[32px] border border-[#D7E2EA]/30 bg-[#D7E2EA]/5 p-6 text-[#D7E2EA] sm:rounded-[44px] sm:p-8 md:rounded-[60px]">
            <div>
              <p className="text-[clamp(1rem,1.6vw,1.35rem)] font-light leading-relaxed text-[#D7E2EA]/80">
                {project.description}
              </p>
              <ul className="mt-6 grid gap-3 text-sm font-light leading-relaxed text-[#D7E2EA]/70 sm:text-base">
                {project.details.map((detail) => (
                  <li key={detail} className="border-t border-[#D7E2EA]/15 pt-3">
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[#D7E2EA]/25 px-4 py-2 text-xs font-medium uppercase tracking-widest text-[#D7E2EA]/80"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.article>
    </div>
  );
}

function ResumeSection() {
  return (
    <section
      id="resume"
      className="bg-[#0C0C0C] px-5 py-20 sm:px-8 sm:py-24 md:px-10 md:py-32"
      aria-label="Resume"
    >
      <div className="mx-auto max-w-5xl">
        <FadeIn>
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <h2 className="hero-heading text-[clamp(3rem,12vw,160px)] font-black uppercase leading-none tracking-tight">
              Resume
            </h2>
            <p className="max-w-md text-[clamp(0.95rem,1.5vw,1.2rem)] font-light leading-relaxed text-[#D7E2EA]/70">
              A full overview of my research, projects, and experience. Read it
              inline below or grab the PDF.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.1} className="mt-10 sm:mt-12">
          <div className="overflow-hidden rounded-[32px] border border-[#D7E2EA]/20 bg-[#090A0C] p-3 sm:rounded-[44px] sm:p-4 md:rounded-[56px]">
            <object
              data={`${resumeFile}#view=FitH`}
              type="application/pdf"
              className="h-[68vh] min-h-[440px] w-full rounded-[24px] bg-white sm:rounded-[32px] md:rounded-[40px]"
              aria-label="Sparsh Roy resume PDF"
            >
              <div className="flex min-h-[440px] flex-col items-center justify-center gap-5 p-8 text-center">
                <p className="text-[clamp(1rem,1.6vw,1.35rem)] font-light leading-relaxed text-[#D7E2EA]/75">
                  Your browser can&apos;t display the PDF inline.
                </p>
                <LiveProjectButton href={resumeFile} />
              </div>
            </object>
          </div>
        </FadeIn>

        <FadeIn delay={0.2} className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href={resumeFile}
            download
            className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-3 text-xs font-medium uppercase tracking-widest text-white outline outline-2 outline-offset-[-3px] outline-white transition duration-200 hover:scale-[1.02] sm:px-10 sm:py-3.5 sm:text-sm md:px-12 md:py-4 md:text-base"
            style={{
              background:
                "linear-gradient(123deg, #2A0A12 6%, #EC4899 42%, #F97316 100%)",
              boxShadow:
                "0px 4px 4px rgba(236, 72, 153, 0.25), 4px 4px 12px #F97316 inset",
            }}
          >
            <span>Download Resume</span>
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
          <a
            href={resumeFile}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-[#D7E2EA]/30 bg-[#D7E2EA]/5 px-4 text-xs font-medium uppercase tracking-widest text-[#D7E2EA] transition duration-200 hover:border-[#D7E2EA]/70 hover:bg-[#D7E2EA]/10 sm:h-12 sm:px-5"
          >
            <FileText className="h-4 w-4" aria-hidden="true" />
            <span>Open in New Tab</span>
          </a>
        </FadeIn>
      </div>
    </section>
  );
}

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-[#D7E2EA]/10 bg-[#0C0C0C] px-5 py-10 sm:px-8 md:px-10">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-5 text-center sm:flex-row sm:justify-between sm:text-left">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-[#D7E2EA]">
            Sparsh Roy
          </p>
          <p className="mt-1 text-xs font-light text-[#D7E2EA]/50">
            &copy; {year} Sparsh Roy. All rights reserved.
          </p>
        </div>
        <div className="flex items-center gap-5">
          <a
            href={profileLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#D7E2EA]/55 transition duration-200 hover:text-[#D7E2EA]"
            aria-label="GitHub"
          >
            <Github className="h-5 w-5" aria-hidden="true" />
          </a>
          <a
            href={profileLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#D7E2EA]/55 transition duration-200 hover:text-[#D7E2EA]"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-5 w-5" aria-hidden="true" />
          </a>
          <a
            href={profileLinks.email}
            className="text-[#D7E2EA]/55 transition duration-200 hover:text-[#D7E2EA]"
            aria-label="Email"
          >
            <Mail className="h-5 w-5" aria-hidden="true" />
          </a>
        </div>
      </div>
      <p className="mx-auto mt-6 max-w-5xl text-center text-[0.7rem] font-light leading-relaxed text-[#D7E2EA]/35 sm:text-left">
        The content, design, and source code of this site are the intellectual
        property of Sparsh Roy and are protected under copyright law. No part may
        be reproduced, distributed, or reused without prior written permission.
      </p>
    </footer>
  );
}

export default function App() {
  return (
    <main
      className="min-h-screen bg-[#0C0C0C] font-kanit text-[#D7E2EA]"
      style={{ overflowX: "clip" }}
    >
      <HeroSection />
      <SkillMapSection />
      <AboutSection />
      <ProjectsSection />
      <ExperienceSection />
      <ResumeSection />
      <Footer />
    </main>
  );
}
