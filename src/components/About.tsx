import { useState } from "react";
import { motion } from "framer-motion";
import { Pop, SectionTitle } from "./primitives";
import { aboutText, colors, funFacts, toolbox } from "../data/content";

export function AboutSection() {
  return (
    <section id="about" className="mx-auto max-w-4xl px-5 py-24">
      <SectionTitle kicker="the short version">about me</SectionTitle>

      <Pop>
        <div className="sticker rotate-[-0.6deg] bg-white p-6 text-lg leading-relaxed sm:p-10 sm:text-xl">
          {aboutText}
        </div>
      </Pop>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {funFacts.map((f, i) => (
          <Pop key={f.text} delay={i * 0.06}>
            <div
              className="sticker sticker-hover flex h-full flex-col gap-2 p-4"
              style={{ backgroundColor: colors[f.color], rotate: `${i % 2 ? 1.5 : -1.5}deg` }}
            >
              <span className="text-3xl">{f.emoji}</span>
              <span className="font-semibold leading-snug">{f.text}</span>
            </div>
          </Pop>
        ))}
      </div>
    </section>
  );
}

export function ToolboxSection() {
  const [active, setActive] = useState(toolbox[0].id);
  const skill = toolbox.find((s) => s.id === active) ?? toolbox[0];

  return (
    <section id="toolbox" className="mx-auto max-w-4xl px-5 py-24">
      <SectionTitle kicker="what I play with">the toolbox</SectionTitle>

      <Pop className="flex flex-wrap justify-center gap-3">
        {toolbox.map((s) => {
          const on = s.id === active;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => setActive(s.id)}
              aria-pressed={on}
              className="btn text-lg"
              style={{ backgroundColor: on ? colors[s.color] : "#fff" }}
            >
              <span>{s.emoji}</span> {s.name}
            </button>
          );
        })}
      </Pop>

      <motion.div
        key={skill.id}
        initial={{ opacity: 0, rotate: -2, y: 10 }}
        animate={{ opacity: 1, rotate: 0, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="sticker mx-auto mt-8 max-w-2xl p-6 text-center sm:p-8"
        style={{ backgroundColor: colors[skill.color] }}
      >
        <div className="text-6xl">{skill.emoji}</div>
        <p className="mt-3 text-xl font-semibold">{skill.blurb}</p>
        <div className="mt-5 flex flex-wrap justify-center gap-2">
          {skill.tools.map((t) => (
            <span key={t} className="rounded-full border-2 border-ink bg-white px-3 py-1 text-sm font-bold">
              {t}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
