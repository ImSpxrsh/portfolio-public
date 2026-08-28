import { FileText, Github, Linkedin } from "lucide-react";
import {
  ContactButton,
  FadeIn,
  Magnet,
  ResourceLink,
} from "./primitives";
import { links, profile } from "../data/content";

export function HeroSection() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col overflow-x-clip bg-[#0C0C0C] pt-20"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[70vh] opacity-60"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 0%, rgba(236,72,153,0.13), transparent 70%)",
        }}
        aria-hidden="true"
      />

      <FadeIn
        delay={0.1}
        y={40}
        className="relative z-20 mt-10 w-full overflow-hidden sm:mt-8"
      >
        <h1 className="hero-heading w-full whitespace-nowrap text-center text-[9vw] font-black uppercase leading-none tracking-tight sm:text-[9.6vw] md:text-[10.2vw] lg:text-[11.2vw]">
          Hi, Sparsh here !
        </h1>
      </FadeIn>

      <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 w-[280px] -translate-x-1/2 -translate-y-1/2 sm:w-[360px] md:w-[440px] lg:w-[500px]">
        <FadeIn delay={0.5} y={30}>
          <Magnet padding={150} strength={3}>
            <img
              src={profile.portrait}
              alt="Portrait of Sparsh Roy"
              className="w-full select-none object-contain"
              width={500}
              height={500}
              draggable={false}
            />
          </Magnet>
        </FadeIn>
      </div>

      <div className="relative z-20 mt-auto px-5 pb-8 sm:px-8 md:px-10 md:pb-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <FadeIn delay={0.3} y={20}>
            <div className="max-w-[220px] sm:max-w-[400px] md:max-w-[560px]">
              <p className="text-[clamp(0.78rem,1.4vw,1.45rem)] font-light uppercase leading-snug tracking-wide text-[#D7E2EA]">
                {profile.role}
              </p>
              <div className="mt-4 hidden flex-wrap gap-2 sm:flex">
                <ResourceLink
                  href={links.publications}
                  label="Publications"
                  icon={FileText}
                />
                <ResourceLink href={links.github} label="GitHub" icon={Github} />
                <ResourceLink
                  href={links.linkedin}
                  label="LinkedIn"
                  icon={Linkedin}
                />
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.45} y={20}>
            <div className="flex flex-col items-end gap-3">
              <ContactButton />
              <div className="flex gap-2 sm:hidden">
                <IconLink
                  href={links.publications}
                  label="Publications"
                  icon={FileText}
                />
                <IconLink href={links.github} label="GitHub" icon={Github} />
                <IconLink href={links.linkedin} label="LinkedIn" icon={Linkedin} />
              </div>
            </div>
          </FadeIn>
        </div>

      </div>
    </section>
  );
}

function IconLink({
  href,
  label,
  icon: Icon,
}: {
  href: string;
  label: string;
  icon: typeof FileText;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="focus-ring flex h-11 w-11 items-center justify-center rounded-full border border-[#D7E2EA]/35 bg-[#D7E2EA]/5 text-[#D7E2EA]"
      aria-label={label}
    >
      <Icon className="h-5 w-5" aria-hidden="true" />
    </a>
  );
}
