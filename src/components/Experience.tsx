import { FadeIn } from "./primitives";
import { affiliations, experience } from "../data/content";

export function ExperienceSection() {
  return (
    <section
      id="experience"
      className="rounded-t-[40px] bg-white px-5 py-20 text-[#0C0C0C] sm:rounded-t-[50px] sm:px-8 sm:py-24 md:rounded-t-[60px] md:px-10 md:py-32"
    >
      <FadeIn>
        <p className="mb-4 text-center text-xs font-medium uppercase tracking-[0.24em] text-[#0C0C0C]/45">
          Five labs, three institutions
        </p>
        <h2 className="mb-10 text-center text-[clamp(3rem,12vw,160px)] font-black uppercase leading-none tracking-tight sm:mb-14">
          Experience
        </h2>
      </FadeIn>

      <FadeIn delay={0.08} className="mx-auto mb-16 max-w-5xl sm:mb-20">
        <p className="mb-6 text-center text-xs font-medium uppercase tracking-[0.24em] text-[#0C0C0C]/45">
          Research appointments
        </p>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {affiliations.map((affiliation, index) => (
            <li
              key={`${affiliation.institution}-${index}`}
              className="rounded-2xl border border-[rgba(12,12,12,0.14)] p-5"
            >
              <p className="text-sm font-bold uppercase leading-snug tracking-tight">
                {affiliation.institution}
              </p>
              <p className="mt-2 text-sm font-light leading-relaxed opacity-60">
                {affiliation.focus}
              </p>
              <p className="mt-3 text-[0.68rem] font-medium uppercase tracking-widest opacity-40">
                {affiliation.place} · {affiliation.since}
              </p>
            </li>
          ))}
        </ul>
      </FadeIn>

      <div className="mx-auto max-w-5xl">
        {experience.map((org, index) => (
          <FadeIn
            key={`${org.org}-${index}`}
            as="article"
            delay={Math.min(index * 0.04, 0.24)}
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
