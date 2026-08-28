import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Network } from "lucide-react";
import { FadeIn, SectionHeading } from "./primitives";
import { projects, skillMap } from "../data/content";

function polarPoint(cx: number, cy: number, r: number, deg: number) {
  const a = (deg * Math.PI) / 180;
  return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
}

const projectShort: Record<string, string> = {
  Velvt: "Velvt",
  "Reproducibility & Fairness Auditing": "Reproducibility",
    "Applied ML Research": "Applied ML",
  "Mantis": "Mantis",
  "Propagators & Explainability": "Propagators",
  Aidsense: "Aidsense",
  "FRC Team 293 Spike": "FRC 293",
  DreamIT: "DreamIT",
  "MatrAIx & PersonaBench": "MatrAIx",
};

function SkillGraph({
  activeId,
  onSelect,
}: {
  activeId: string;
  onSelect: (id: string) => void;
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
  const activeProjectSet = new Set(active.projects);
  const accent = active.accent;

  return (
    <svg
      viewBox="-110 -20 1000 700"
      className="h-auto w-full select-none"
      role="img"
      aria-label={`Skill graph. Active skill: ${active.name}, linked to ${active.projects.join(", ")}.`}
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
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: `${cx}px ${cy}px` }}
      />
      <circle cx={cx} cy={cy} r={skillR} fill="none" stroke="rgba(215,226,234,0.05)" strokeWidth={1} />

      {skillPos.map((sp) =>
        sp.skill.projects.map((pn) => {
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

      {active.projects.map((pn) => {
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
      <text x={cx} y={cy - 1} textAnchor="middle" fill="#D7E2EA" style={{ fontSize: 13, fontWeight: 800, letterSpacing: 1 }}>
        SPARSH
      </text>
      <text x={cx} y={cy + 13} textAnchor="middle" fill="rgba(215,226,234,0.45)" style={{ fontSize: 8, letterSpacing: 1.5 }}>
        SKILL GRAPH
      </text>

      {projPos.map((pp) => {
        const on = activeProjectSet.has(pp.name);
        const anchor = Math.abs(pp.x - cx) < 26 ? "middle" : pp.x < cx ? "end" : "start";
        const lx = anchor === "middle" ? pp.x : pp.x < cx ? pp.x - 15 : pp.x + 15;
        const ly = anchor === "middle" ? (pp.y < cy ? pp.y - 16 : pp.y + 24) : pp.y + 4;
        return (
          <g
            key={pp.name}
            style={{ cursor: "pointer" }}
            onClick={() => window.open(projLink[pp.name], "_blank", "noopener,noreferrer")}
          >
            {on && (
              <motion.circle
                cx={pp.x}
                cy={pp.y}
                r={13}
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
              initial={{
                r: on ? 13 : 8,
                fill: on ? accent : "#11141A",
                stroke: on ? accent : "rgba(215,226,234,0.25)",
                opacity: on ? 1 : 0.5,
              }}
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
              initial={{ opacity: on ? 1 : 0.4, fill: on ? "#FFFFFF" : "rgba(215,226,234,0.55)" }}
              animate={{ opacity: on ? 1 : 0.4, fill: on ? "#FFFFFF" : "rgba(215,226,234,0.55)" }}
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
                r={26}
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
              initial={{ r: isActive ? 28 : 20, opacity: isActive ? 1 : 0.6 }}
              animate={{ r: isActive ? 28 : 20, opacity: isActive ? 1 : 0.6 }}
              transition={{ duration: 0.35 }}
            />
            <text
              x={sp.x}
              y={labelBelow ? sp.y + (isActive ? 46 : 38) : sp.y - (isActive ? 36 : 30)}
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

export function SkillMapSection() {
  const [activeSkillId, setActiveSkillId] = useState<string>(skillMap[0].id);
  const activeSkill = skillMap.find((s) => s.id === activeSkillId) ?? skillMap[0];
  const ActiveSkillIcon = activeSkill.icon;
  const activeProjects = projects.filter((p) => activeSkill.projects.includes(p.name));

  return (
    <section
      id="skills"
      className="overflow-hidden bg-[#0C0C0C] px-5 py-20 sm:px-8 sm:py-24 md:px-10 md:py-32 lg:px-12 xl:px-16"
      aria-label="Interactive skill map"
    >
      <div className="mx-auto max-w-[1680px]">
        <SectionHeading
          eyebrow="How the work connects"
          title="Skill Map"
          blurb="Select a skill area to see the tools behind it and the projects where it actually shows up."
        />

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
                      className="focus-ring flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-medium uppercase tracking-wider transition duration-200"
                      style={{
                        borderColor: isActive ? skill.accent : "rgba(215,226,234,0.16)",
                        background: isActive ? `${skill.accent}1F` : "rgba(215,226,234,0.04)",
                        color: isActive ? "#fff" : "rgba(215,226,234,0.7)",
                      }}
                      aria-pressed={isActive}
                    >
                      <Icon className="h-4 w-4" style={{ color: skill.accent }} aria-hidden="true" />
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
                  style={{ borderColor: activeSkill.accent, background: `${activeSkill.accent}1F` }}
                >
                  <ActiveSkillIcon className="h-7 w-7" style={{ color: activeSkill.accent }} aria-hidden="true" />
                </div>
              </div>

              <p className="mt-6 text-[clamp(1rem,1.7vw,1.35rem)] font-light leading-relaxed text-[#D7E2EA]/75">
                {activeSkill.description}
              </p>

              <div className="mt-8">
                <p className="text-xs font-medium uppercase tracking-[0.24em] text-[#D7E2EA]/50">Tools</p>
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
                  Related work
                </p>
                <div className="mt-3 grid gap-3">
                  {activeProjects.map((project) => (
                    <a
                      key={project.name}
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="focus-ring group flex items-center justify-between gap-4 rounded-[22px] border border-[#D7E2EA]/15 bg-[#0C0C0C]/50 px-4 py-4 transition duration-200 hover:border-[#D7E2EA]/35 hover:bg-[#D7E2EA]/10"
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
