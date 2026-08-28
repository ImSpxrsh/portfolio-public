import { FadeIn } from "./primitives";
import { affiliationSummary, stats } from "../data/content";

export function AffiliationBand() {
  return (
    <section
      className="border-y border-[#D7E2EA]/10 bg-[#0C0C0C] px-5 py-14 sm:px-8 sm:py-16 md:px-10"
      aria-label="Research affiliations at a glance"
    >
      <div className="mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-[1fr_1.15fr] lg:items-center lg:gap-16">
        <FadeIn>
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-[#D7E2EA]/45">
            Where I work
          </p>
          <p className="mt-5 text-[clamp(1.15rem,2.4vw,1.9rem)] font-light leading-snug text-[#D7E2EA]">
            {affiliationSummary}
          </p>
        </FadeIn>

        <FadeIn delay={0.12}>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="border-l border-[#D7E2EA]/15 pl-4">
                <dt className="sr-only">{stat.label}</dt>
                <dd className="text-[clamp(2.25rem,5vw,3.75rem)] font-black leading-none text-[#D7E2EA]">
                  {stat.value}
                </dd>
                <p className="mt-3 text-[0.68rem] font-medium uppercase leading-snug tracking-widest text-[#D7E2EA]/45">
                  {stat.label}
                </p>
              </div>
            ))}
          </dl>
        </FadeIn>
      </div>
    </section>
  );
}
