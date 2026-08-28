import { FileText, Github, Linkedin, Mail } from "lucide-react";
import { FadeIn, PrimaryButton, SectionHeading, VisitButton } from "./primitives";
import { links, profile } from "../data/content";

export function ResumeSection() {
  return (
    <section
      id="resume"
      className="bg-[#0C0C0C] px-5 py-20 sm:px-8 sm:py-24 md:px-10 md:py-32"
      aria-label="Resume"
    >
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="Full record"
          title="Resume"
          blurb="A complete overview of my research, projects, and experience. Read it inline below or grab the PDF."
        />

        <FadeIn delay={0.1} className="mt-10 sm:mt-12">
          <div className="overflow-hidden rounded-[32px] border border-[#D7E2EA]/20 bg-[#090A0C] p-3 sm:rounded-[44px] sm:p-4 md:rounded-[56px]">
            <object
              data={`${profile.resume}#view=FitH`}
              type="application/pdf"
              className="h-[68vh] min-h-[440px] w-full rounded-[24px] bg-white sm:rounded-[32px] md:rounded-[40px]"
              aria-label="Sparsh Roy resume PDF"
            >
              <div className="flex min-h-[440px] flex-col items-center justify-center gap-5 p-8 text-center">
                <p className="text-[clamp(1rem,1.6vw,1.35rem)] font-light leading-relaxed text-[#D7E2EA]/75">
                  Your browser can&apos;t display the PDF inline.
                </p>
                <VisitButton href={profile.resume} label="Open PDF" />
              </div>
            </object>
          </div>
        </FadeIn>

        <FadeIn delay={0.2} className="mt-8 flex flex-wrap items-center gap-3">
          <PrimaryButton href={profile.resume} download>
            Download Resume
          </PrimaryButton>
          <ResourceChip href={profile.resume} label="Open in New Tab" icon={FileText} />
          <ResourceChip href={links.github} label="GitHub" icon={Github} />
          <ResourceChip href={links.linkedin} label="LinkedIn" icon={Linkedin} />
          <ResourceChip href={links.email} label={links.emailPlain} icon={Mail} />
        </FadeIn>
      </div>
    </section>
  );
}

function ResourceChip({
  href,
  label,
  icon: Icon,
}: {
  href: string;
  label: string;
  icon: typeof FileText;
}) {
  const isExternal = href.startsWith("http");
  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className="focus-ring inline-flex h-11 items-center justify-center gap-2 rounded-full border border-[#D7E2EA]/30 bg-[#D7E2EA]/5 px-4 text-xs font-medium uppercase tracking-widest text-[#D7E2EA] transition duration-200 hover:border-[#D7E2EA]/70 hover:bg-[#D7E2EA]/10 sm:h-12 sm:px-5"
    >
      <Icon className="h-4 w-4" aria-hidden="true" />
      <span>{label}</span>
    </a>
  );
}
