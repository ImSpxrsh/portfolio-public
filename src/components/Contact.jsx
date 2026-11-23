import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { profile } from '../content.js';
import { gsap, reducedMotion, scrollToTarget, whileVisible } from '../lib/motion.js';
import { useLocalTime } from '../lib/time.js';
import { Arrow, ExtLink, Roll, SectionHead } from './ui.jsx';

const WORD = profile.brand.split('');

// The condensed wordmark breathes like an accordion; letters near the pointer stretch out.
function Wordmark() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    const letters = [...el.querySelectorAll('span')];
    const fit = () => {
      letters.forEach((l) => (l.style.fontVariationSettings = '"wdth" 94, "wght" 860'));
      el.style.fontSize = '100px';
      const natural = el.getBoundingClientRect().width;
      el.style.fontSize = `${(100 * el.parentElement.clientWidth * 0.94) / natural}px`;
    };
    fit();
    document.fonts?.ready.then(fit);
    const ro = new ResizeObserver(fit);
    ro.observe(el.parentElement);
    if (reducedMotion()) return () => ro.disconnect();

    let pointer = null;
    const onMove = (e) => (pointer = e.clientX);
    const onLeave = () => (pointer = null);
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    const widths = letters.map(() => 94);
    const stop = whileVisible(el, (t) => {
      // Read every position before writing any styles to avoid layout thrashing.
      const centers =
        pointer === null ? null : letters.map((l) => {
          const r = l.getBoundingClientRect();
          return r.left + r.width / 2;
        });
      const span = el.clientWidth;
      letters.forEach((l, i) => {
        let target = 94 + 18 * Math.sin(t * 0.0021 - i * 0.95);
        if (centers) target = Math.max(62, 125 - (Math.abs(pointer - centers[i]) / span) * 260);
        widths[i] += (target - widths[i]) * 0.12;
        l.style.fontVariationSettings = `"wdth" ${widths[i].toFixed(1)}, "wght" 860`;
      });
    });
    return () => {
      ro.disconnect();
      stop();
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return (
    <div className="wordmark-wrap">
      <p className="wordmark" ref={ref} aria-label={profile.brand}>
        {WORD.map((ch, i) => (
          <span key={i} aria-hidden="true">
            {ch}
          </span>
        ))}
      </p>
    </div>
  );
}

function SignatureLockup() {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const root = ref.current;
    const stroke = root.querySelector('.signature__stroke');
    const length = stroke.getTotalLength();
    stroke.style.strokeDasharray = length;
    stroke.style.strokeDashoffset = length;

    if (reducedMotion()) {
      stroke.style.strokeDashoffset = 0;
      return undefined;
    }

    const ctx = gsap.context(() => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: root,
            start: 'top 78%',
            once: true,
          },
        })
        .fromTo(
          '.signature__script',
          { clipPath: 'inset(0 100% 0 0)', xPercent: -5, rotate: -7 },
          { clipPath: 'inset(0 0% 0 0)', xPercent: 0, rotate: -4, duration: 1.45, ease: 'expo.inOut' },
        )
        .to(stroke, { strokeDashoffset: 0, duration: 1.15, ease: 'power2.inOut' }, 0.58)
        .fromTo(
          '.signature__seal, .signature__meta',
          { autoAlpha: 0, y: 12 },
          { autoAlpha: 1, y: 0, stagger: 0.1, duration: 0.65, ease: 'power3.out' },
          1.05,
        );
    }, root);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (reducedMotion() || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return undefined;
    const root = ref.current;
    const ink = root.querySelector('.signature__ink');
    const x = gsap.quickTo(ink, 'x', { duration: 0.8, ease: 'power3.out' });
    const y = gsap.quickTo(ink, 'y', { duration: 0.8, ease: 'power3.out' });
    const move = (event) => {
      const bounds = root.getBoundingClientRect();
      const nx = (event.clientX - bounds.left) / bounds.width - 0.5;
      const ny = (event.clientY - bounds.top) / bounds.height - 0.5;
      x(nx * 20);
      y(ny * 12);
    };
    const leave = () => {
      x(0);
      y(0);
    };
    root.addEventListener('pointermove', move);
    root.addEventListener('pointerleave', leave);
    return () => {
      root.removeEventListener('pointermove', move);
      root.removeEventListener('pointerleave', leave);
    };
  }, []);

  return (
    <div className="signature" ref={ref}>
      <Wordmark />
      <div className="signature__ink" aria-hidden="true">
        <span className="signature__script">Sparsh Roy</span>
        <svg className="signature__flourish" viewBox="0 0 720 74" focusable="false">
          <path
            className="signature__stroke"
            d="M12 48C82 9 146 64 220 43C297 21 355 16 430 32C514 50 603 52 708 17"
          />
        </svg>
      </div>
      <span className="signature__seal" aria-hidden="true">SR</span>
      <span className="signature__meta label">personal mark · new jersey · 2026</span>
    </div>
  );
}

export function Contact() {
  const ref = useRef(null);
  const time = useLocalTime();
  const [copied, setCopied] = useState(false);

  useLayoutEffect(() => {
    if (reducedMotion()) return undefined;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.contact__title .wi',
        { yPercent: 130 },
        {
          yPercent: 0,
          stagger: 0.08,
          duration: 1.2,
          ease: 'expo.out',
          scrollTrigger: { trigger: '.contact__title', start: 'top 85%' },
        },
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <footer className="contact" id="contact" data-theme="ink" ref={ref} aria-labelledby="contact-title">
      <SectionHead title="contact" meta="nº 007 — research, products & collaboration" accent />

      <h2 className="contact__title" id="contact-title">
        <span className="w"><span className="wi">let’s</span></span>{' '}
        <span className="w"><span className="wi">talk</span></span>
        <span className="w"><span className="wi contact__dot">.</span></span>
      </h2>

      <div className="contact__mail">
        <a className="contact__email" href={`mailto:${profile.email}`} data-cursor="write">
          <Roll text={profile.email} />
        </a>
        <button type="button" className="btn btn--ghost btn--sm" data-magnetic onClick={copy}>
          {copied ? 'copied' : 'copy email'}
        </button>
      </div>

      <div className="contact__cols">
        <div>
          <span className="label label--dim">elsewhere</span>
          <ExtLink href={profile.links.linkedin}>linkedin <Arrow /></ExtLink>
          <ExtLink href={profile.links.instagram}>instagram <Arrow /></ExtLink>
          <ExtLink href={profile.links.github}>github <Arrow /></ExtLink>
          <ExtLink href={profile.links.research}>research site <Arrow /></ExtLink>
        </div>
        <div>
          <span className="label label--dim">work</span>
          <ExtLink href={profile.links.publications}>publications <Arrow /></ExtLink>
          <ExtLink href={profile.links.aidsense}>aidsense <Arrow /></ExtLink>
        </div>
        <div>
          <span className="label label--dim">local time</span>
          <span className="contact__time">{time}</span>
          <span className="label label--dim">eastern time</span>
        </div>
        <div>
          <span className="label label--dim">based in</span>
          <span>{profile.location.toLowerCase()}</span>
          <span className="label label--dim">{profile.coordinates.toLowerCase()}</span>
        </div>
      </div>

      <SignatureLockup />

      <div className="contact__bar">
        <span className="label label--dim">© 2026 {profile.name.toLowerCase()}</span>
        <span className="label label--dim contact__pace">question · build · test · learn · repeat</span>
        <a
          className="label"
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            scrollToTarget('#top');
          }}
        >
          back to top <Arrow dir="n" />
        </a>
      </div>
    </footer>
  );
}
