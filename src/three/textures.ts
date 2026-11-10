import * as THREE from "three";
import { rng } from "./story";

function canvasTexture(w: number, h: number, draw: (ctx: CanvasRenderingContext2D) => void) {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  draw(c.getContext("2d")!);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

/** Grid of lit / dark windows for building walls. */
export function windowTexture(seed: number) {
  const r = rng(seed);
  const tex = canvasTexture(128, 256, (ctx) => {
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, 128, 256);
    const warm = ["#ffd98a", "#ffc66b", "#fff1c9", "#8fd3ff", "#ff9fd0"];
    for (let y = 0; y < 16; y++) {
      for (let x = 0; x < 8; x++) {
        if (r() < 0.38) {
          ctx.fillStyle = warm[Math.floor(r() * (r() < 0.85 ? 3 : warm.length))];
          ctx.globalAlpha = 0.55 + r() * 0.45;
          ctx.fillRect(x * 16 + 3, y * 16 + 4, 10, 9);
        }
      }
    }
  });
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(1, 2);
  return tex;
}

/** Glowing neon text on a transparent sign. */
export function neonTexture(text: string, color: string) {
  const w = 512;
  const h = 160;
  return canvasTexture(w, h, (ctx) => {
    ctx.clearRect(0, 0, w, h);
    ctx.strokeStyle = color;
    ctx.lineWidth = 6;
    ctx.shadowColor = color;
    ctx.shadowBlur = 18;
    ctx.beginPath();
    ctx.roundRect(8, 8, w - 16, h - 16, 26);
    ctx.stroke();
    let size = 80;
    do {
      ctx.font = `800 ${size}px "Bricolage Grotesque", system-ui, sans-serif`;
      size -= 2;
    } while (ctx.measureText(text).width > w - 80 && size > 20);
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#fff";
    ctx.shadowBlur = 24;
    ctx.fillText(text, w / 2, h / 2 + 4);
    ctx.fillStyle = color;
    ctx.globalAlpha = 0.6;
    ctx.fillText(text, w / 2, h / 2 + 4);
  });
}

/** Soft round pool of light for the ground under street lamps. */
export function glowTexture() {
  return canvasTexture(128, 128, (ctx) => {
    const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    g.addColorStop(0, "rgba(255,210,140,0.55)");
    g.addColorStop(1, "rgba(255,210,140,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 128, 128);
  });
}
