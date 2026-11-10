import { ArrowUpRight } from "lucide-react";
import { Pop, SectionTitle } from "./primitives";
import { colors, projects, timeline } from "../data/content";

export function ProjectsSection() {
  return (
    <section id="projects" className="mx-auto max-w-5xl px-5 py-24">
      <SectionTitle kicker="things I've built (or am building)">stuff I made</SectionTitle>

      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((p, i) => (
          <Pop key={p.name} delay={(i % 2) * 0.08}>
            <a
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
              className="sticker sticker-hover group flex h-full flex-col bg-white"
              style={{ rotate: `${i % 2 ? 0.8 : -0.8}deg` }}
            >
              <div
                className="flex items-center gap-4 rounded-t-[13px] border-b-[2.5px] border-ink p-5"
                style={{ backgroundColor: colors[p.color] }}
              >
                <span className="text-5xl transition group-hover:rotate-12 group-hover:scale-110">
                  {p.emoji}
                </span>
                <div className="min-w-0">
                  <h3 className="text-2xl font-extrabold leading-tight">{p.name}</h3>
                  <p className="font-hand text-xl leading-tight">{p.oneLiner}</p>
                </div>
                <ArrowUpRight className="ml-auto h-6 w-6 shrink-0 transition group-hover:-translate-y-1 group-hover:translate-x-1" />
              </div>
              <div className="flex flex-1 flex-col gap-3 p-5">
                <p className="leading-relaxed">{p.what}</p>
                <p className="leading-relaxed text-ink/70">
                  <span className="font-bold text-ink">my part:</span> {p.myPart}
                </p>
                <div className="mt-auto flex flex-wrap gap-2 pt-2">
                  {p.tags.map((t) => (
                    <span key={t} className="rounded-full border-2 border-ink/20 px-2.5 py-0.5 text-sm font-semibold text-ink/70">
                      #{t}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          </Pop>
        ))}
      </div>
    </section>
  );
}

export function TimelineSection() {
  return (
    <section id="timeline" className="mx-auto max-w-3xl px-5 py-24">
      <SectionTitle kicker="how I got here">the timeline</SectionTitle>

      <ol className="relative border-l-[3px] border-dashed border-ink/40 pl-8 sm:pl-10">
        {timeline.map((t, i) => (
          <li key={t.org} className="relative mb-6 last:mb-0">
            <span
              className="sticker absolute -left-[3.15rem] top-2 flex h-10 w-10 items-center justify-center rounded-full text-xl sm:-left-[3.65rem]"
              style={{ backgroundColor: Object.values(colors).slice(2)[i % 6] }}
            >
              {t.emoji}
            </span>
            <Pop delay={0.04}>
              <div className="sticker bg-white p-4 sm:p-5">
                <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                  <h3 className="text-xl font-extrabold">{t.org}</h3>
                  <span className="font-hand text-xl text-ink/60">{t.when}</span>
                </div>
                <p className="font-semibold text-ink/70">{t.role}</p>
                <p className="mt-1 leading-relaxed">{t.note}</p>
              </div>
            </Pop>
          </li>
        ))}
      </ol>
    </section>
  );
}
