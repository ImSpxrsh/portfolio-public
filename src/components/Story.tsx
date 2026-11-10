import { useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import { aboutText, colors, funFacts, links, projects, quips, timeline, toolbox } from "../data/content";

/* -------------------------------- helpers --------------------------------- */

/** Letters drift in out of a blur, one by one, like they're forming out of fog. */
function TypeIn({ text, className = "", delay = 0 }: { text: string; className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  if (reduce) return <span className={className}>{text}</span>;
  return (
    <motion.span
      className={className}
      aria-label={text}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.6 }}
      transition={{ staggerChildren: 0.035, delayChildren: delay }}
    >
      {text.split(" ").map((word, wi) => (
        <span key={wi} className="inline-block whitespace-nowrap" aria-hidden="true">
          {word.split("").map((ch, ci) => (
            <motion.span
              key={ci}
              className="inline-block"
              variants={{
                hidden: { opacity: 0, y: 14, filter: "blur(10px)" },
                show: { opacity: 1, y: 0, filter: "blur(0px)" },
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              {ch}
            </motion.span>
          ))}
          {wi < text.split(" ").length - 1 && <span>&nbsp;</span>}
        </span>
      ))}
    </motion.span>
  );
}

function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 30, filter: "blur(8px)" }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: false, amount: 0.25 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Kicker({ children }: { children: ReactNode }) {
  return <p className="font-hand text-2xl text-pink sm:text-3xl">{children}</p>;
}

/** One scroll "stop". The 3D camera lines up with each of these in order. */
function Stop({
  id,
  children,
  className = "",
  align = "center",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  align?: "left" | "right" | "center";
}) {
  const justify = { left: "justify-start", right: "justify-end", center: "justify-center" }[align];
  return (
    <section
      id={id}
      data-scene
      className={`relative mx-auto flex min-h-[100svh] w-full max-w-6xl items-center px-5 py-24 sm:px-8 ${justify} ${className}`}
    >
      {children}
    </section>
  );
}

/* -------------------------------- sections -------------------------------- */

function Hero() {
  return (
    <Stop id="top">
      <div className="text-center">
        <Kicker>
          hey there <span className="wave">👋</span>
        </Kicker>
        <h1 className="mt-2 text-[clamp(3.2rem,12vw,8rem)] font-extrabold leading-[0.9] tracking-tight text-white drop-shadow-[0_4px_30px_rgba(255,122,184,0.35)]">
          <TypeIn text="Sparsh Roy" />
        </h1>
        <p className="mx-auto mt-5 max-w-md text-lg text-white/75 sm:text-xl">
          <TypeIn text="apps, robots & way too many side projects" delay={0.4} />
        </p>
        <a href="#robot" className="neon-btn mt-10 border-pink text-pink">
          take a walk with me
        </a>
        <p className="scroll-hint mt-10 text-sm uppercase tracking-[0.3em] text-white/50">scroll ↓</p>
      </div>
    </Stop>
  );
}

function RobotIntro() {
  const [q, setQ] = useState<number | null>(null);
  return (
    <Stop id="robot" align="right">
      <div className="max-w-sm text-right">
        <p className="text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-tight text-white">
          <TypeIn text="this is my robot." />
        </p>
        <p className="mt-2 text-[clamp(1.4rem,3vw,2.2rem)] font-semibold text-white/70">
          <TypeIn text="he mostly behaves." delay={0.6} />
        </p>
        <button
          type="button"
          onClick={() => setQ((v) => (v === null ? 0 : (v + 1) % quips.length))}
          className="neon-btn mt-6 border-mint text-mint"
        >
          poke him 🤖
        </button>
        <div className="mt-4 h-8" aria-live="polite">
          <AnimatePresence mode="wait">
            {q !== null && (
              <motion.p
                key={q}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="font-hand text-2xl text-white/80"
              >
                "{quips[q]}"
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Stop>
  );
}

function About() {
  return (
    <Stop id="about" align="left">
      <Reveal className="glass max-w-lg">
        <Kicker>the short version</Kicker>
        <h2 className="mt-1 text-4xl font-extrabold text-white sm:text-5xl">about me</h2>
        <p className="mt-5 text-lg leading-relaxed text-white/80">{aboutText}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {funFacts.map((f) => (
            <span
              key={f.text}
              className="rounded-full border px-3 py-1.5 text-sm font-semibold"
              style={{ borderColor: colors[f.color], color: colors[f.color] }}
            >
              {f.emoji} {f.text}
            </span>
          ))}
        </div>
      </Reveal>
    </Stop>
  );
}

function Toolbox() {
  const [active, setActive] = useState(toolbox[0].id);
  const skill = toolbox.find((s) => s.id === active) ?? toolbox[0];
  const c = colors[skill.color];
  return (
    <Stop id="toolbox" className="!items-end">
      <Reveal className="glass w-full max-w-3xl">
        <Kicker>see those signs? that's my toolbox</Kicker>
        <div className="mt-4 flex flex-wrap gap-2">
          {toolbox.map((s) => {
            const on = s.id === active;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => setActive(s.id)}
                aria-pressed={on}
                className="rounded-full border-2 px-4 py-2 font-semibold transition"
                style={{
                  borderColor: colors[s.color],
                  color: on ? "#0b0820" : colors[s.color],
                  background: on ? colors[s.color] : "transparent",
                  boxShadow: on ? `0 0 22px ${colors[s.color]}88` : "none",
                }}
              >
                {s.emoji} {s.name}
              </button>
            );
          })}
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={skill.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="mt-6"
          >
            <p className="text-xl font-semibold text-white">{skill.blurb}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {skill.tools.map((t) => (
                <span key={t} className="rounded-lg px-2.5 py-1 text-sm font-bold" style={{ background: `${c}22`, color: c }}>
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </Reveal>
    </Stop>
  );
}

function Timeline() {
  return (
    <Stop id="timeline" align="left">
      <Reveal className="glass w-full max-w-lg">
        <Kicker>how I got here</Kicker>
        <h2 className="mt-1 text-4xl font-extrabold text-white sm:text-5xl">the road so far</h2>
        <ol className="mt-6 space-y-4 border-l-2 border-dashed border-white/25 pl-5">
          {timeline.map((t) => (
            <li key={t.org} className="relative">
              <span className="absolute -left-[2.05rem] top-0 flex h-7 w-7 items-center justify-center rounded-full bg-[#1d1640] text-sm ring-2 ring-white/20">
                {t.emoji}
              </span>
              <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                <h3 className="text-lg font-bold text-white">{t.org}</h3>
                <span className="font-hand text-lg text-white/55">{t.when}</span>
              </div>
              <p className="text-sm font-semibold text-white/60">{t.role}</p>
              <p className="text-white/75">{t.note}</p>
            </li>
          ))}
        </ol>
      </Reveal>
    </Stop>
  );
}

function Projects() {
  return (
    <Stop id="projects" className="flex-col !justify-end">
      <div className="mt-[42vh] w-full">
        <Reveal className="mb-6 text-center">
          <Kicker>welcome to the workshop</Kicker>
          <h2 className="text-[clamp(2.4rem,6vw,4.5rem)] font-extrabold leading-none text-white">stuff I made</h2>
        </Reveal>
        <div className="grid gap-4 md:grid-cols-2">
          {projects.map((p, i) => {
            const c = colors[p.color];
            return (
              <Reveal key={p.name} delay={i * 0.08}>
                <a
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass group block h-full !p-5 transition hover:-translate-y-1"
                  style={{ borderColor: `${c}66`, boxShadow: `0 0 0 0 ${c}` }}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-4xl transition group-hover:rotate-12 group-hover:scale-110">{p.emoji}</span>
                    <div className="min-w-0">
                      <h3 className="text-2xl font-extrabold text-white">{p.name}</h3>
                      <p className="font-hand text-xl leading-tight" style={{ color: c }}>
                        {p.oneLiner}
                      </p>
                    </div>
                    <ArrowUpRight className="ml-auto h-6 w-6 shrink-0 text-white/60 transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-white" />
                  </div>
                  <p className="mt-3 text-white/80">{p.what}</p>
                  <p className="mt-2 text-white/60">
                    <span className="font-bold text-white/90">my part:</span> {p.myPart}
                  </p>
                </a>
              </Reveal>
            );
          })}
        </div>
      </div>
    </Stop>
  );
}

function Contact() {
  return (
    <Stop id="contact">
      <Reveal className="text-center">
        <p className="text-5xl">🌙</p>
        <h2 className="mt-3 text-[clamp(2.4rem,7vw,5rem)] font-extrabold leading-none text-white">
          <TypeIn text="wanna build something?" />
        </h2>
        <p className="mx-auto mt-4 max-w-md text-lg text-white/70">
          Ideas, questions, or just want to say hi. My inbox is open, even this late.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a href={links.email} className="neon-btn border-pink bg-pink !text-[#0b0820]">
            <Mail className="h-5 w-5" /> {links.emailPlain}
          </a>
          <a href={links.github} target="_blank" rel="noopener noreferrer" className="neon-btn border-white/60 text-white" aria-label="GitHub">
            <Github className="h-5 w-5" />
          </a>
          <a href={links.linkedin} target="_blank" rel="noopener noreferrer" className="neon-btn border-white/60 text-white" aria-label="LinkedIn">
            <Linkedin className="h-5 w-5" />
          </a>
        </div>
        <p className="mt-16 font-hand text-xl text-white/45">
          built at night with three.js · © {new Date().getFullYear()} Sparsh Roy
        </p>
      </Reveal>
    </Stop>
  );
}

export function Story() {
  return (
    <>
      <Hero />
      <RobotIntro />
      <About />
      <Toolbox />
      <Timeline />
      <Projects />
      <Contact />
    </>
  );
}
