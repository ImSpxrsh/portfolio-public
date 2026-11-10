import * as THREE from "three";

/**
 * Story time `t` runs from 0 to (stops.length - 1). Each integer is one
 * overlay section ([data-scene]) centred in the viewport; values in between
 * are the scroll position between two sections.
 */
export type Stop = {
  robotZ: number;
  cam: [number, number, number];
  look: [number, number, number];
};

export const stops: Stop[] = [
  // 0 hero: high over the skyline
  { robotZ: 0, cam: [0, 55, 50], look: [0, 6, -70] },
  // 1 "this is my robot": down at street level, beside him
  { robotZ: 0, cam: [4.5, 3.2, 8], look: [0, 2, 0] },
  // 2 about: walking with him
  { robotZ: -45, cam: [-5, 4, -35], look: [0, 2.2, -48] },
  // 3 toolbox: swing to face the neon signs
  { robotZ: -98, cam: [4, 3.4, -82], look: [-8, 5.2, -98] },
  // 4 timeline: behind him, heading on
  { robotZ: -140, cam: [0, 5.5, -126], look: [0, 2, -146] },
  // 5 projects: arriving at the workshop
  { robotZ: -204, cam: [0, 6.5, -180], look: [0, 0.5, -222] },
  // 6 contact: tilt up to the moon over the workshop
  { robotZ: -206, cam: [0, 9, -182], look: [12, 26, -240] },
];

export const WORKSHOP_Z = -222;

/** Mutable, read every frame by the scene. Written by the scroll tracker. */
export const story = { t: 0 };

const smooth = (x: number) => x * x * (3 - 2 * x);
const tmpA = new THREE.Vector3();
const tmpB = new THREE.Vector3();

export function sample(t: number) {
  const max = stops.length - 1;
  const clamped = Math.min(Math.max(t, 0), max);
  const i = Math.min(Math.floor(clamped), max - 1);
  const f = smooth(clamped - i);
  const a = stops[i];
  const b = stops[i + 1];
  return {
    robotZ: THREE.MathUtils.lerp(a.robotZ, b.robotZ, f),
    cam: tmpA.set(...a.cam).lerp(tmpB.set(...b.cam), f).clone(),
    look: tmpA.set(...a.look).lerp(tmpB.set(...b.look), f).clone(),
  };
}

/** Tracks scroll → story.t using the [data-scene] sections. */
export function startScrollTracking() {
  let tops: number[] = [];
  const measure = () => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-scene]"));
    tops = els.map((el) => el.getBoundingClientRect().top + window.scrollY + el.offsetHeight / 2);
  };
  const update = () => {
    if (tops.length < 2) return;
    const y = window.scrollY + window.innerHeight / 2;
    let t = 0;
    if (y <= tops[0]) t = 0;
    else if (y >= tops[tops.length - 1]) t = tops.length - 1;
    else {
      for (let i = 0; i < tops.length - 1; i++) {
        if (y < tops[i + 1]) {
          t = i + (y - tops[i]) / (tops[i + 1] - tops[i]);
          break;
        }
      }
    }
    story.t = t;
  };
  const onResize = () => {
    measure();
    update();
  };
  measure();
  update();
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", onResize);
  // fonts/images can shift layout after first paint
  const ro = new ResizeObserver(onResize);
  ro.observe(document.body);
  return () => {
    window.removeEventListener("scroll", update);
    window.removeEventListener("resize", onResize);
    ro.disconnect();
  };
}

/** Small seeded RNG so the city looks the same on every visit. */
export function rng(seed = 7) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}
