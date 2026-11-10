import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Github, Linkedin } from "lucide-react";
import { colors, heroStickers, links, profile, quips } from "../data/content";

const stickerSpots = [
  "left-[-8%] top-[8%] [--r:-8deg]",
  "right-[-10%] top-[18%] [--r:6deg]",
  "left-[-12%] bottom-[22%] [--r:5deg]",
  "right-[-6%] bottom-[6%] [--r:-5deg]",
];

export function HeroSection() {
  const [quip, setQuip] = useState<number | null>(null);
  const nextQuip = () => setQuip((q) => (q === null ? 0 : (q + 1) % quips.length));

  return (
    <section
      id="top"
      className="relative mx-auto flex min-h-[100svh] max-w-5xl flex-col items-center justify-center gap-10 px-5 pb-16 pt-28 md:flex-row md:gap-16"
    >
      <div className="max-w-md text-center md:text-left">
        <p className="font-hand text-3xl text-ink/70">
          hey there <span className="wave">👋</span>
        </p>
        <h1 className="mt-2 text-[clamp(3rem,10vw,6rem)] font-extrabold leading-[0.95] tracking-tight">
          I'm <span className="squiggle">Sparsh</span>.
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-ink/80 sm:text-xl">
          I build apps, write robot code, and say yes to too many side projects.
          Welcome to my little corner of the internet.
        </p>

        <div className="mt-7 flex flex-wrap justify-center gap-3 md:justify-start">
          <a href="#projects" className="btn bg-yellow">
            see my stuff ↓
          </a>
          <a href={links.github} target="_blank" rel="noopener noreferrer" className="btn bg-white" aria-label="GitHub">
            <Github className="h-5 w-5" />
          </a>
          <a href={links.linkedin} target="_blank" rel="noopener noreferrer" className="btn bg-white" aria-label="LinkedIn">
            <Linkedin className="h-5 w-5" />
          </a>
        </div>
      </div>

      <div className="relative w-[240px] shrink-0 sm:w-[300px]">
        <button
          type="button"
          onClick={nextQuip}
          aria-label="Click me"
          className="sticker sticker-hover block aspect-square w-full overflow-hidden rounded-[40%_60%_55%_45%/50%_45%_55%_50%] bg-sky"
        >
          <img
            src={profile.portrait}
            alt="Sparsh Roy"
            className="h-full w-full object-cover"
            draggable={false}
          />
        </button>

        {heroStickers.map((s, i) => (
          <span
            key={s.text}
            className={`sticker bob pointer-events-none absolute whitespace-nowrap px-3 py-1 text-sm font-bold ${stickerSpots[i]}`}
            style={{ backgroundColor: colors[s.color], animationDelay: `${i * 0.4}s` }}
          >
            {s.text}
          </span>
        ))}

        <div className="absolute -top-14 left-1/2 h-10 -translate-x-1/2" aria-live="polite">
          <AnimatePresence mode="wait">
            {quip !== null && (
              <motion.span
                key={quip}
                initial={{ opacity: 0, y: 8, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6 }}
                className="sticker block whitespace-nowrap bg-white px-3 py-1.5 text-sm font-semibold"
              >
                {quips[quip]}
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        <p className="mt-6 text-center font-hand text-xl text-ink/60">(psst, click me)</p>
      </div>
    </section>
  );
}

/** Scrolling ribbon between the hero and the rest of the page. */
export function Marquee() {
  const words = ["apps", "robots", "startups", "side quests", "bugs (oops)", "more apps"];
  const row = [...words, ...words];
  return (
    <div className="-rotate-1 overflow-hidden border-y-[2.5px] border-ink bg-pink py-3" aria-hidden="true">
      <div className="marquee flex w-max gap-8 whitespace-nowrap text-2xl font-extrabold">
        {[...row, ...row].map((w, i) => (
          <span key={i}>
            {w} <span className="ml-8">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
