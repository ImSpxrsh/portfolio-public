import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { papers, profile } from '../content.js';
import { ScrollTrigger, gsap, reducedMotion, rng } from '../lib/motion.js';
import { Arrow, ExtLink, SectionHead } from './ui.jsx';

const COLS = 34;
const LEVELS = 16;
const CELL = 10;
const GAP = 2;

function ResearchMap() {
  const [lens, setLens] = useState(56);
  const base = useMemo(() => {
    const rand = rng(21);
    return Array.from({ length: COLS }, (_, i) => {
      const systems = Math.exp(-0.5 * Math.pow((i - 7) / 4.2, 2));
      const people = 0.82 * Math.exp(-0.5 * Math.pow((i - 17) / 5.2, 2));
      const world = 0.9 * Math.exp(-0.5 * Math.pow((i - 28) / 3.8, 2));
      return { systems, people, world, noise: rand() * 0.08 };
    });
  }, []);
  const balance = lens / 100;
  const heights = base.map((v) =>
    Math.max(1, Math.round(LEVELS * Math.min(1, v.systems * (1.12 - balance * 0.35) + v.people * 0.42 + v.world * (0.55 + balance * 0.5) + v.noise))),
  );
  const width = COLS * CELL;
  const height = LEVELS * CELL;

  return (
    <figure className="tail">
      <svg
        viewBox={`-2 -26 ${width + 4} ${height + 52}`}
        role="img"
        aria-label="Illustrative map of Sparsh Roy's research across AI systems, human questions and applied domains."
      >
        {heights.map((count, i) =>
          Array.from({ length: count }, (_, j) => (
            <rect
              key={`${i}-${j}`}
              className={`tail__px ${i < 11 || i > 24 ? 'is-tail' : ''}`}
              x={i * CELL}
              y={height - (j + 1) * CELL}
              width={CELL - GAP}
              height={CELL - GAP}
              style={{ '--d': `${(i * 0.018 + j * 0.03).toFixed(3)}s` }}
            />
          )),
        )}
        <text className="tail__txt" x={0} y={height + 20}>systems</text>
        <text className="tail__txt" x={width / 2 - 18} y={height + 20}>people</text>
        <text className="tail__txt" x={width - 50} y={height + 20}>world</text>
      </svg>

      <div className="tail__readout">
        <label className="tail__slider">
          <span className="label">research lens</span>
          <input
            type="range"
            min="0"
            max="100"
            step="1"
            value={lens}
            onChange={(event) => setLens(Number(event.target.value))}
          />
        </label>
        <div className="tail__stats" aria-live="polite">
          <span><i className="label">method</i>systems</span>
          <span><i className="label">test</i>evidence</span>
          <span><i className="label">aim</i>use</span>
        </div>
      </div>
      <figcaption className="label">
        fig. 03 — move the lens. An illustrative field map, not a quantitative result.
      </figcaption>
    </figure>
  );
}

export function Research() {
  const ref = useRef(null);
  const [open, setOpen] = useState(0);

  useLayoutEffect(() => {
    if (reducedMotion()) return undefined;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.research__title .wi',
        { yPercent: 130 },
        {
          yPercent: 0,
          stagger: 0.08,
          duration: 1.1,
          ease: 'expo.out',
          scrollTrigger: { trigger: '.research__title', start: 'top 85%' },
        },
      );
      ScrollTrigger.create({
        trigger: '.tail',
        start: 'top 80%',
        once: true,
        onEnter: (self) => self.trigger.classList.add('is-in'),
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section className="research" id="research" data-theme="orange" ref={ref} aria-labelledby="research-title">
      <SectionHead title="research" meta="nº 003 — systems, health, biology & people" />

      <div className="research__top">
        <h2 className="research__title display" id="research-title">
          <span className="w"><span className="wi">published</span></span>{' '}
          <span className="w"><span className="wi">research.</span></span>
        </h2>
        <ResearchMap />
      </div>

      <div className="table" role="list">
        <div className="table__head" aria-hidden="true">
          <span>date</span>
          <span>title</span>
          <span>venue</span>
          <span>field</span>
        </div>
        {papers.map((paper, i) => {
          const isOpen = open === i;
          return (
            <div className={`paper ${isOpen ? 'is-open' : ''}`} role="listitem" key={paper.title}>
              <button
                className="paper__row"
                type="button"
                data-cursor={isOpen ? 'close' : 'read'}
                aria-expanded={isOpen}
                aria-controls={`paper-${i}`}
                onClick={() => setOpen(isOpen ? -1 : i)}
              >
                <span className="paper__date">{paper.date}</span>
                <span className="paper__title">{paper.title}</span>
                <span className="paper__venue">{paper.venue}</span>
                <span className="paper__field">{paper.field}</span>
                <span className="paper__toggle" aria-hidden="true" />
              </button>
              <div className="paper__body" id={`paper-${i}`}>
                <div className="paper__inner">
                  <p>{paper.abstract}</p>
                  <ExtLink className="label paper__link" href={paper.url}>
                    read paper <Arrow />
                  </ExtLink>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <ExtLink className="btn research__all" href={profile.links.publications}>
        all publications <Arrow />
      </ExtLink>
    </section>
  );
}
