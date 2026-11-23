import { useEffect, useLayoutEffect, useRef } from 'react';
import { fitCanvas, gsap, reducedMotion, rng, whileVisible } from '../lib/motion.js';
import { Scramble } from './ui.jsx';

const steps = [
  {
    big: <>question</>,
    kicker: 'frame what matters',
    text: 'Start with the claim, its assumptions and the evidence that could change your mind.',
  },
  {
    big: <>system</>,
    kicker: 'build the instrument',
    text: 'Turn the question into infrastructure, a controlled experiment or a product people can actually use.',
  },
  {
    big: <>evidence</>,
    kicker: 'keep what holds up',
    text: 'Trace failures, make the result legible and publish or ship only what survives inspection.',
  },
];

export function Anatomy() {
  const ref = useRef(null);
  const canvasRef = useRef(null);
  const progressRef = useRef(reducedMotion() ? 0.82 : 0);

  useLayoutEffect(() => {
    if (reducedMotion()) return undefined;
    const root = ref.current;
    const ctx = gsap.context(() => {
      const pips = root.querySelectorAll('.anatomy__pip');
      const items = gsap.utils.toArray('.anatomy__step', root);
      gsap.set(items.slice(1), { autoAlpha: 0, yPercent: 30 });
      const tl = gsap.timeline({
        defaults: { ease: 'power2.inOut', duration: 0.08 },
        scrollTrigger: {
          trigger: root,
          start: 'top top',
          end: () => `+=${window.innerHeight * 2.1}`,
          pin: true,
          scrub: 0.5,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            progressRef.current = self.progress;
            const step = self.progress < 0.34 ? 0 : self.progress < 0.68 ? 1 : 2;
            pips.forEach((pip, i) => pip.classList.toggle('is-on', i <= step));
          },
        },
      });
      tl.to(items[0], { autoAlpha: 0, yPercent: -30 }, 0.31)
        .to(items[1], { autoAlpha: 1, yPercent: 0 }, 0.34)
        .to(items[1], { autoAlpha: 0, yPercent: -30 }, 0.65)
        .to(items[2], { autoAlpha: 1, yPercent: 0 }, 0.68)
        .to({}, { duration: 0.24 });
    }, root);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const rand = rng(37);
    const nodes = Array.from({ length: 96 }, (_, i) => ({
      x: rand(),
      y: rand(),
      rank: i / 95,
      phase: i % 3,
    }));
    let dims;

    const resize = () => {
      dims = fitCanvas(canvas);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const draw = (now) => {
      const { ctx, width, height } = dims;
      const p = progressRef.current;
      ctx.clearRect(0, 0, width, height);

      const visible = Math.floor(nodes.length * Math.min(1, p * 1.35 + 0.08));
      const activePhase = p < 0.34 ? 0 : p < 0.68 ? 1 : 2;
      const shown = nodes.slice(0, visible);

      ctx.lineWidth = 1;
      for (let i = 1; i < shown.length; i++) {
        const a = shown[i - 1];
        const b = shown[i];
        if (i % 3 !== activePhase) continue;
        ctx.strokeStyle = `rgba(255,87,26,${0.08 + 0.14 * Math.sin(now * 0.002 + i)})`;
        ctx.beginPath();
        ctx.moveTo(a.x * width, a.y * height);
        ctx.lineTo(b.x * width, b.y * height);
        ctx.stroke();
      }

      shown.forEach((node, i) => {
        const pulse = 0.55 + 0.45 * Math.sin(now * 0.003 + i * 0.7);
        const active = node.phase === activePhase;
        const size = active ? 6 + pulse * 5 : 4;
        ctx.fillStyle = active ? '#ff571a' : `rgba(244,244,242,${0.13 + node.rank * 0.18})`;
        ctx.fillRect(node.x * width - size / 2, node.y * height - size / 2, size, size);
      });

      ctx.fillStyle = 'rgba(244,244,242,0.5)';
      ctx.font = '500 11px "JetBrains Mono Variable", monospace';
      ctx.fillText(['QUESTION / CONTEXT', 'SYSTEM / EXPERIMENT', 'EVIDENCE / USE'][activePhase], 0, 13);
    };

    if (reducedMotion()) {
      draw(2400);
      return () => ro.disconnect();
    }
    const stop = whileVisible(canvas, draw);
    return () => {
      ro.disconnect();
      stop();
    };
  }, []);

  return (
    <section className={`anatomy ${reducedMotion() ? 'is-static' : ''}`} ref={ref} aria-labelledby="anatomy-title">
      <div className="anatomy__copy">
        <span className="label">
          <span className="sq sq--orange" aria-hidden="true" />
          <Scramble text="nº 002.1 — inside the research loop" />
        </span>
        <h3 className="anatomy__title" id="anatomy-title">
          how I work<span className="accent">.</span>
        </h3>
        <div className="anatomy__steps">
          {steps.map((step, i) => (
            <div className="anatomy__step" key={step.kicker}>
              <span className="label label--dim">0{i + 1} / {step.kicker}</span>
              <span className="anatomy__big">{step.big}</span>
              <p>{step.text}</p>
            </div>
          ))}
        </div>
        <div className="anatomy__pips" aria-hidden="true">
          {steps.map((step, i) => (
            <span className="anatomy__pip" key={step.kicker}>
              <i />0{i + 1}
            </span>
          ))}
        </div>
      </div>
      <figure className="anatomy__viz">
        <canvas ref={canvasRef} aria-hidden="true" />
        <figcaption className="label label--dim">
          fig. 02.1 — an illustrative map of questions, systems and evidence.
        </figcaption>
      </figure>
    </section>
  );
}
