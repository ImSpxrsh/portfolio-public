import { useMemo, useState } from "react";
import { ArrowUpRight, ExternalLink, Quote } from "lucide-react";
import { FadeIn, SectionHeading } from "./primitives";
import { links, publications, type Publication } from "../data/content";

const FILTERS = ["All", "Conference", "Journal", "Preprint"] as const;
type Filter = (typeof FILTERS)[number];

const accentByKind: Record<Publication["kind"], string> = {
  Conference: "#27C4A8",
  Journal: "#FF5D8F",
  Preprint: "#7DD3FC",
};

function Authors({ authors }: { authors: readonly string[] }) {
  return (
    <p className="text-sm font-light leading-relaxed text-[#D7E2EA]/55">
      {authors.map((author, index) => (
        <span key={author}>
          {author === "Sparsh Roy" ? (
            <span className="font-semibold text-[#D7E2EA]">{author}</span>
          ) : (
            author
          )}
          {index < authors.length - 1 ? ", " : ""}
        </span>
      ))}
    </p>
  );
}

export function PublicationsSection() {
  const [filter, setFilter] = useState<Filter>("All");

  const visible = useMemo(
    () =>
      filter === "All"
        ? publications
        : publications.filter((item) => item.kind === filter),
    [filter],
  );

  return (
    <section
      id="publications"
      className="rounded-t-[40px] bg-[#0C0C0C] px-5 py-20 sm:rounded-t-[50px] sm:px-8 sm:py-24 md:rounded-t-[60px] md:px-10 md:py-32"
      aria-label="Publications"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Peer-reviewed & preprint"
          title="Research"
          blurb="Six papers in 2026 across machine learning, computational biology, clinical fairness, and the epistemology of learning. The full, maintained list lives on my MIT site."
        />

        <FadeIn delay={0.08} className="mt-8">
          <a
            href={links.publications}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring group flex flex-col gap-4 rounded-[28px] border border-[#D7E2EA]/20 bg-gradient-to-br from-[#D7E2EA]/[0.07] to-transparent p-6 transition duration-200 hover:border-[#D7E2EA]/45 sm:flex-row sm:items-center sm:justify-between sm:p-8"
          >
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.24em] text-[#D7E2EA]/45">
                Canonical publication list
              </p>
              <p className="mt-3 text-[clamp(1.15rem,2.4vw,1.85rem)] font-bold leading-tight text-[#D7E2EA]">
                sites.mit.edu/sparsh/publications
              </p>
              <p className="mt-2 text-sm font-light leading-relaxed text-[#D7E2EA]/60">
                Searchable, filterable, and kept current — including anything not
                yet mirrored here.
              </p>
            </div>
            <span className="inline-flex shrink-0 items-center gap-2 rounded-full border-2 border-[#D7E2EA] px-6 py-3 text-xs font-medium uppercase tracking-widest text-[#D7E2EA] transition duration-200 group-hover:bg-[#D7E2EA]/10 sm:text-sm">
              View all
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </span>
          </a>
        </FadeIn>

        <FadeIn delay={0.12} className="mt-10 flex flex-wrap gap-2">
          {FILTERS.map((option) => {
            const isActive = option === filter;
            const count =
              option === "All"
                ? publications.length
                : publications.filter((item) => item.kind === option).length;
            return (
              <button
                key={option}
                type="button"
                onClick={() => setFilter(option)}
                aria-pressed={isActive}
                className={`focus-ring rounded-full border px-4 py-2 text-xs font-medium uppercase tracking-widest transition duration-200 ${
                  isActive
                    ? "border-[#D7E2EA] bg-[#D7E2EA]/10 text-white"
                    : "border-[#D7E2EA]/20 text-[#D7E2EA]/60 hover:border-[#D7E2EA]/45 hover:text-[#D7E2EA]"
                }`}
              >
                {option}
                <span className="ml-2 opacity-50">{count}</span>
              </button>
            );
          })}
        </FadeIn>

        <ol className="mt-8 grid gap-4">
          {visible.map((paper, index) => {
            const accent = accentByKind[paper.kind];
            return (
              <FadeIn
                as="li"
                key={paper.title}
                delay={Math.min(index * 0.05, 0.25)}
                y={20}
              >
                <a
                  href={paper.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring group grid gap-4 rounded-[28px] border border-[#D7E2EA]/15 bg-[#D7E2EA]/[0.04] p-6 transition duration-200 hover:border-[#D7E2EA]/40 hover:bg-[#D7E2EA]/[0.07] sm:p-8"
                >
                  <div className="flex flex-wrap items-center gap-3">
                    <span
                      className="rounded-full px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-widest"
                      style={{ background: `${accent}22`, color: accent }}
                    >
                      {paper.kind}
                    </span>
                    <span className="text-[0.68rem] font-medium uppercase tracking-widest text-[#D7E2EA]/40">
                      {paper.year}
                    </span>
                    {paper.authorRole && (
                      <span className="rounded-full border border-[#D7E2EA]/20 px-3 py-1 text-[0.62rem] font-medium uppercase tracking-widest text-[#D7E2EA]/55">
                        {paper.authorRole}
                      </span>
                    )}
                    <ArrowUpRight
                      className="ml-auto h-5 w-5 shrink-0 text-[#D7E2EA]/35 transition duration-200 group-hover:text-[#D7E2EA]"
                      aria-hidden="true"
                    />
                  </div>

                  <h3 className="text-[clamp(1.05rem,2vw,1.5rem)] font-bold leading-snug text-[#D7E2EA]">
                    {paper.title}
                  </h3>

                  <Authors authors={paper.authors} />

                  <p className="border-l-2 pl-4 text-sm font-light leading-relaxed text-[#D7E2EA]/70 sm:text-base"
                     style={{ borderColor: `${accent}66` }}>
                    {paper.summary}
                  </p>

                  <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-[#D7E2EA]/45">
                    <Quote className="h-3.5 w-3.5" aria-hidden="true" />
                    {paper.venue}
                  </p>
                </a>
              </FadeIn>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
