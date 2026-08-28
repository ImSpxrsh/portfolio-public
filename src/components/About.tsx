import { Fragment, useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { FileText, Mail } from "lucide-react";
import { ContactButton, FadeIn, ResourceLink } from "./primitives";
import { awards, links } from "../data/content";

const ABOUT_TEXT =
  "I am a high school researcher and builder working across AI/ML, health, and systems. I hold research appointments in five labs at MIT, the University of Illinois Urbana-Champaign, and a Google-sponsored lab in Vienna, and I serve as COO of Velvt. In 2026 I published six papers, won the 2025 Congressional App Challenge, earned a gold medal at the 2026 House of Code, was named an NJ Top 100 Innovator, and raised $10,000 for the Leukemia & Lymphoma Society.";

/* Inline decorative shapes — no external asset host, so they never break. */
function Orb({
  className,
  accent,
  drift = 12,
  duration = 8,
  delay = 0,
  variant = "ring",
}: {
  className: string;
  accent: string;
  drift?: number;
  duration?: number;
  delay?: number;
  variant?: "ring" | "grid" | "blob" | "arc";
}) {
  const shouldReduceMotion = useReducedMotion();

  const shape = {
    ring: (
      <>
        <circle cx="60" cy="60" r="46" stroke={accent} strokeWidth="1.5" opacity="0.5" />
        <circle cx="60" cy="60" r="30" stroke={accent} strokeWidth="1" opacity="0.32" />
        <circle cx="60" cy="60" r="9" fill={accent} opacity="0.6" />
      </>
    ),
    grid: (
      <>
        {[0, 1, 2, 3].map((row) =>
          [0, 1, 2, 3].map((col) => (
            <circle
              key={`${row}-${col}`}
              cx={24 + col * 24}
              cy={24 + row * 24}
              r={3.2}
              fill={accent}
              opacity={0.18 + ((row + col) % 4) * 0.16}
            />
          )),
        )}
      </>
    ),
    blob: (
      <path
        d="M60 14c24 0 46 20 46 44s-18 48-44 48-48-22-48-46S36 14 60 14Z"
        stroke={accent}
        strokeWidth="1.5"
        opacity="0.45"
        fill={`${accent}12`}
      />
    ),
    arc: (
      <>
        <path d="M14 84a46 46 0 0 1 92 0" stroke={accent} strokeWidth="1.5" opacity="0.5" />
        <path d="M32 84a28 28 0 0 1 56 0" stroke={accent} strokeWidth="1" opacity="0.3" />
        <circle cx="60" cy="84" r="5" fill={accent} opacity="0.6" />
      </>
    ),
  }[variant];

  const svg = (
    <svg viewBox="0 0 120 120" fill="none" className="h-full w-full" aria-hidden="true">
      {shape}
    </svg>
  );

  if (shouldReduceMotion) {
    return <div className={className}>{svg}</div>;
  }

  return (
    <motion.div
      className={className}
      style={{ willChange: "transform" }}
      animate={{
        y: [0, -drift, 0, drift * 0.8, 0],
        x: [0, drift * 0.6, 0, -drift * 0.6, 0],
        rotate: [0, 4, 0, -4, 0],
      }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
    >
      {svg}
    </motion.div>
  );
}

export function AboutSection() {
  return (
    <section
      id="about"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0C0C0C] px-5 py-24 sm:px-8 md:px-10"
    >
      <Orb
        className="pointer-events-none absolute left-[2%] top-[8%] z-0 h-[120px] w-[120px] sm:h-[160px] sm:w-[160px] md:left-[5%] md:h-[200px] md:w-[200px]"
        accent="#FF5D8F"
        variant="ring"
        duration={7.5}
      />
      <Orb
        className="pointer-events-none absolute bottom-[10%] left-[4%] z-0 h-[100px] w-[100px] sm:h-[140px] sm:w-[140px] md:left-[10%] md:h-[170px] md:w-[170px]"
        accent="#27C4A8"
        variant="grid"
        duration={9}
        delay={0.6}
      />
      <Orb
        className="pointer-events-none absolute right-[2%] top-[8%] z-0 h-[120px] w-[120px] sm:h-[160px] sm:w-[160px] md:right-[5%] md:h-[200px] md:w-[200px]"
        accent="#7DD3FC"
        variant="blob"
        duration={6.5}
        delay={0.3}
      />
      <Orb
        className="pointer-events-none absolute bottom-[10%] right-[4%] z-0 h-[110px] w-[110px] sm:h-[150px] sm:w-[150px] md:right-[10%] md:h-[190px] md:w-[190px]"
        accent="#B98CFF"
        variant="arc"
        duration={8.5}
        delay={0.9}
      />

      <div className="relative z-10 flex max-w-4xl flex-col items-center text-center">
        <FadeIn delay={0} y={40}>
          <h2 className="hero-heading text-center text-[clamp(3rem,12vw,160px)] font-black uppercase leading-none tracking-tight">
            About me
          </h2>
        </FadeIn>

        <div className="mt-10 sm:mt-14">
          <AnimatedText text={ABOUT_TEXT} />
        </div>

        <FadeIn delay={0.2} y={20} className="mt-12 w-full sm:mt-16">
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {awards.map((award) => (
              <li
                key={award.label}
                className="rounded-2xl border border-[#D7E2EA]/15 bg-[#D7E2EA]/[0.04] px-4 py-5 text-left"
              >
                <p className="text-sm font-semibold leading-snug text-[#D7E2EA]">
                  {award.label}
                </p>
                <p className="mt-1.5 text-xs font-light uppercase tracking-wider text-[#D7E2EA]/50">
                  {award.detail}
                </p>
              </li>
            ))}
          </ul>
        </FadeIn>

        <FadeIn delay={0.3} y={20} className="mt-12 sm:mt-14">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <ContactButton />
            <ResourceLink
              href={links.publications}
              label="Publications"
              icon={FileText}
            />
            <ResourceLink href={links.email} label="Email" icon={Mail} />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function AnimatedText({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.35"],
  });
  const words = text.split(" ");
  const total = text.length;
  let cursor = 0;

  if (shouldReduceMotion) {
    return (
      <p className="mx-auto max-w-[620px] text-center text-[clamp(1rem,2vw,1.35rem)] font-medium leading-relaxed text-[#D7E2EA]">
        {text}
      </p>
    );
  }

  return (
    <p
      ref={ref}
      aria-label={text}
      className="mx-auto max-w-[620px] text-center text-[clamp(1rem,2vw,1.35rem)] font-medium leading-relaxed text-[#D7E2EA]"
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
  const start = index / total;
  const end = (index + 1) / total;
  const opacity = useTransform(progress, [start, end], [0.16, 1]);

  return (
    <motion.span style={{ opacity }} className="inline-block">
      {character}
    </motion.span>
  );
}
