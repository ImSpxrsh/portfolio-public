import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { FadeIn, SectionHeading, VisitButton } from "./primitives";
import { featuredProjects, moreProjects, type Project } from "../data/content";

const accentByCategory: Record<string, string> = {
  "Behavioral AI": "#B98CFF",
  Research: "#27C4A8",
  "Health AI": "#FF5D8F",
  "Social Impact": "#7DD3FC",
  Robotics: "#F8B84E",
  "AI/ML Research": "#F97316",
  Product: "#7DD3FC",
};

function ProjectVisual({ project }: { project: Project }) {
  const accent = accentByCategory[project.category] ?? "#D7E2EA";

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
              <p className="mt-3 min-w-0 break-words text-[clamp(1.2rem,2.6vw,1.7rem)] font-black uppercase leading-none text-[#D7E2EA] [overflow-wrap:anywhere]">
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
            {project.metrics.map((metric) => (
              <div key={metric.label} className="grid gap-2">
                <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 text-[0.68rem] uppercase tracking-wider text-[#D7E2EA]/50">
                  <span className="min-w-0 break-words leading-snug [overflow-wrap:anywhere]">
                    {metric.label}
                  </span>
                  <span className="shrink-0">{metric.value}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-[#D7E2EA]/10">
                  <motion.div
                    className="h-full rounded-full"
                    style={{
                      background: `linear-gradient(90deg, ${accent}, rgba(215,226,234,0.8))`,
                    }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${metric.value}%` }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
                  />
                </div>
              </div>
            ))}

            <div className="mt-auto grid gap-2 pt-4">
              <p className="text-[0.68rem] font-medium uppercase tracking-wider text-[#D7E2EA]/40">
                Architecture Flow
              </p>
              <div className="grid gap-2 sm:grid-cols-3">
                {project.flow.map((step, index) => (
                  <div
                    key={step}
                    className="relative min-w-0 rounded-2xl border border-[#D7E2EA]/12 bg-[#D7E2EA]/5 p-3"
                    style={{ boxShadow: `inset 0 0 28px ${accent}${index === 1 ? "29" : "17"}` }}
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

function ProjectCard({
  project,
  index,
  totalCards,
}: {
  project: Project;
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
              <h3 className="text-[clamp(1.3rem,3.4vw,3.6rem)] font-black uppercase leading-none tracking-tight text-[#D7E2EA]">
                {project.name}
              </h3>
            </div>
          </div>
          <div className="pb-2 sm:pb-4">
            <VisitButton href={project.link} />
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

export function ProjectsSection() {
  return (
    <section
      id="projects"
      className="rounded-t-[40px] bg-[#0C0C0C] px-5 py-20 sm:rounded-t-[50px] sm:px-8 sm:py-24 md:rounded-t-[60px] md:px-10 md:py-32"
    >
      <div className="mx-auto mb-12 max-w-7xl sm:mb-16 md:mb-20">
        <SectionHeading
          eyebrow="Selected work"
          title="Projects"
          blurb="Systems I built or lead — research tooling, health products, behavioral AI, and competition robotics."
        />
      </div>

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
            Additional work that rounds out the portfolio without making every case
            study compete for the same screen space.
          </p>
        </div>

        <div className="mt-8 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {moreProjects.map((project) => (
            <a
              key={project.name}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring group flex min-h-[180px] flex-col justify-between rounded-[28px] border border-[#D7E2EA]/15 bg-[#D7E2EA]/5 p-5 transition duration-200 hover:border-[#D7E2EA]/45 hover:bg-[#D7E2EA]/10"
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
    </section>
  );
}
