import { useLayoutEffect, useRef } from 'react';
import { profile } from '../content.js';
import { gsap, reducedMotion } from '../lib/motion.js';
import { ExtLink, SectionHead } from './ui.jsx';

const photos = [
  {
    src: '/photos/presentation.webp',
    alt: 'Sparsh and teammates presenting beside a workshop podium.',
    caption: 'at the board',
    meta: 'show the work',
    url: 'https://www.instagram.com/p/Dd7hhNnDYZv/',
    shape: 'wide',
  },
  {
    src: '/photos/hoboken-sunset.webp',
    alt: 'Sparsh looking toward the Manhattan skyline at sunset from Hoboken.',
    caption: 'between cities',
    meta: 'hoboken · sep 2026',
    url: 'https://www.instagram.com/p/Ddxn8LhDelr/',
    shape: 'portrait',
  },
  {
    src: '/photos/blue-stage.webp',
    alt: 'Sparsh standing at a podium on a blue-lit stage.',
    caption: 'blue hour',
    meta: 'on stage',
    url: 'https://www.instagram.com/p/DYVVRpRFVJ1/',
    shape: 'portrait',
  },
  {
    src: '/photos/robotics-team.webp',
    alt: 'Sparsh walking through a robotics venue with teammates.',
    caption: 'pit to field',
    meta: 'robotics crew',
    url: 'https://www.instagram.com/p/DXs07RkjfoX/',
    shape: 'portrait',
  },
  {
    src: '/photos/conference-friends.webp',
    alt: 'Sparsh and friends posing together at a conference.',
    caption: 'the people part',
    meta: 'conference floor',
    url: 'https://www.instagram.com/p/DXgyXCejkS2/',
    shape: 'wide',
  },
  {
    src: '/photos/field-installation.webp',
    alt: 'Sparsh beside a large floral arch framing an open field.',
    caption: 'outside the lab',
    meta: 'spring 2026',
    url: 'https://www.instagram.com/p/DXUyNC_lCxj/',
    shape: 'portrait',
  },
];

export function FieldNotes() {
  const ref = useRef(null);

  useLayoutEffect(() => {
    if (reducedMotion()) return undefined;
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.field__figure').forEach((figure) => {
        const frame = figure.querySelector('.field__frame');
        const image = figure.querySelector('img');
        const caption = figure.querySelector('.field__caption');
        gsap
          .timeline({
            scrollTrigger: {
              trigger: figure,
              start: 'top 88%',
              once: true,
            },
          })
          .fromTo(
            frame,
            { clipPath: 'inset(100% 0 0 0)' },
            { clipPath: 'inset(0% 0 0 0)', duration: 1.05, ease: 'expo.inOut' },
          )
          .fromTo(image, { scale: 1.16 }, { scale: 1, duration: 1.4, ease: 'power3.out' }, 0.12)
          .fromTo(caption, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.55 }, 0.62);
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section className="field" id="field-notes" data-theme="orange" ref={ref} aria-labelledby="field-title">
      <SectionHead title="field notes" meta="nº 005 — outside the abstract" />

      <div className="field__intro">
        <h2 className="display" id="field-title">
          proof of<br />life<span className="field__dot">.</span>
        </h2>
        <div className="field__copy">
          <p data-lines>
            The papers are only one layer. The rest is teams, rooms, long days, strange lighting,
            and the people who make the work worth doing.
          </p>
          <ExtLink href={profile.links.instagram} className="field__instagram">
            more on instagram <span aria-hidden="true">@sparshwyd</span>
          </ExtLink>
        </div>
      </div>

      <div className="field__grid">
        {photos.map((photo) => (
          <figure className={`field__figure field__figure--${photo.shape}`} key={photo.src}>
            <a href={photo.url} target="_blank" rel="noreferrer" data-cursor="open" aria-label={`${photo.caption} on Instagram`}>
              <span className="field__frame">
                <img src={photo.src} alt={photo.alt} loading="lazy" decoding="async" />
                <span className="field__wash" aria-hidden="true" />
              </span>
              <figcaption className="field__caption">
                <span>{photo.caption}</span>
                <span>{photo.meta}</span>
              </figcaption>
            </a>
          </figure>
        ))}
      </div>
    </section>
  );
}
