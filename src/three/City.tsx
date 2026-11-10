import { useLayoutEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { neonTexture, glowTexture, windowTexture } from "./textures";
import { rng, WORKSHOP_Z } from "./story";

const STREET_HALF = 8;
const Z_NEAR = 60;
const Z_FAR = -320;

/* ------------------------------- Buildings -------------------------------- */

type Box = { x: number; z: number; w: number; d: number; h: number; tint: number };

function useBuildings() {
  return useMemo(() => {
    const r = rng(42);
    const boxes: Box[] = [];
    for (let z = Z_NEAR; z > Z_FAR; z -= 11) {
      for (let x = -110; x <= 110; x += 11) {
        const cx = x + (r() - 0.5) * 2;
        const cz = z + (r() - 0.5) * 2;
        const w = 6 + r() * 3.5;
        const d = 6 + r() * 3.5;
        // keep the street clear
        if (Math.abs(cx) - w / 2 < STREET_HALF + 0.6) continue;
        // keep the plaza around the workshop clear
        if (cz < WORKSHOP_Z + 22 && cz > WORKSHOP_Z - 26 && Math.abs(cx) < 26) continue;
        const dist = Math.abs(cx);
        const base = dist < 20 ? 7 + r() * 16 : 12 + r() * 30;
        const tower = r() < 0.08 ? 25 + r() * 35 : 0;
        boxes.push({ x: cx, z: cz, w, d, h: base + tower, tint: r() });
      }
    }
    return boxes;
  }, []);
}

function Buildings() {
  const boxes = useBuildings();
  const ref = useRef<THREE.InstancedMesh>(null);

  const materials = useMemo(() => {
    const wall = new THREE.MeshStandardMaterial({
      color: "#1a1630",
      roughness: 0.85,
      emissive: new THREE.Color("#ffffff"),
      emissiveMap: windowTexture(3),
      emissiveIntensity: 1.6,
    });
    const roof = new THREE.MeshStandardMaterial({ color: "#100d1e", roughness: 1 });
    // BoxGeometry face order: +x, -x, +y, -y, +z, -z
    return [wall, wall, roof, roof, wall, wall];
  }, []);

  useLayoutEffect(() => {
    const mesh = ref.current!;
    const m = new THREE.Matrix4();
    const c = new THREE.Color();
    boxes.forEach((b, i) => {
      m.compose(
        new THREE.Vector3(b.x, b.h / 2, b.z),
        new THREE.Quaternion(),
        new THREE.Vector3(b.w, b.h, b.d),
      );
      mesh.setMatrixAt(i, m);
      c.setHSL(0.7 + b.tint * 0.1, 0.25, 0.5 + b.tint * 0.3);
      mesh.setColorAt(i, c);
    });
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  }, [boxes]);

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, boxes.length]} material={materials}>
      <boxGeometry args={[1, 1, 1]} />
    </instancedMesh>
  );
}

/* --------------------------------- Street --------------------------------- */

function Street() {
  const glow = useMemo(() => glowTexture(), []);
  const lampZs = useMemo(() => {
    const zs: number[] = [];
    for (let z = 40; z > WORKSHOP_Z + 14; z -= 18) zs.push(z);
    return zs;
  }, []);
  const dashZs = useMemo(() => {
    const zs: number[] = [];
    for (let z = Z_NEAR; z > WORKSHOP_Z + 12; z -= 6) zs.push(z);
    return zs;
  }, []);

  return (
    <group>
      {/* ground */}
      <mesh rotation-x={-Math.PI / 2} position={[0, 0, -130]}>
        <planeGeometry args={[400, 500]} />
        <meshStandardMaterial color="#0e0b1c" roughness={1} />
      </mesh>
      {/* road */}
      <mesh rotation-x={-Math.PI / 2} position={[0, 0.01, -80]}>
        <planeGeometry args={[11, 300]} />
        <meshStandardMaterial color="#141126" roughness={0.6} metalness={0.2} />
      </mesh>
      {/* sidewalks */}
      {[-1, 1].map((s) => (
        <mesh key={s} position={[s * 7, 0.08, -80]}>
          <boxGeometry args={[3, 0.16, 300]} />
          <meshStandardMaterial color="#231e3a" roughness={0.9} />
        </mesh>
      ))}
      {/* lane dashes */}
      {dashZs.map((z) => (
        <mesh key={z} rotation-x={-Math.PI / 2} position={[0, 0.02, z]}>
          <planeGeometry args={[0.18, 2.6]} />
          <meshBasicMaterial color="#c9a54a" />
        </mesh>
      ))}
      {/* lamps */}
      {lampZs.map((z, i) => {
        const s = i % 2 ? 1 : -1;
        return (
          <group key={z} position={[s * 6.4, 0, z]}>
            <mesh position={[0, 2.6, 0]}>
              <cylinderGeometry args={[0.07, 0.09, 5.2, 6]} />
              <meshStandardMaterial color="#2c2840" />
            </mesh>
            <mesh position={[-s * 0.6, 5.2, 0]}>
              <boxGeometry args={[1.3, 0.12, 0.25]} />
              <meshStandardMaterial color="#2c2840" />
            </mesh>
            <mesh position={[-s * 1.1, 5.08, 0]}>
              <sphereGeometry args={[0.22, 12, 8]} />
              <meshBasicMaterial color={[4, 3.2, 2]} toneMapped={false} />
            </mesh>
            <mesh rotation-x={-Math.PI / 2} position={[-s * 1.1, 0.2, 0]}>
              <planeGeometry args={[7, 7]} />
              <meshBasicMaterial map={glow} transparent depthWrite={false} blending={THREE.AdditiveBlending} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

/* ------------------------------- Neon signs ------------------------------- */

const SIGNS: { text: string; color: string; z: number; side: 1 | -1; y: number }[] = [
  { text: "OPEN 24/7", color: "#ff7ab8", z: 18, side: 1, y: 6 },
  { text: "PIZZA", color: "#ffd23f", z: -8, side: -1, y: 5 },
  { text: "BUGS 50% OFF", color: "#4be0a0", z: -30, side: 1, y: 7 },
  { text: "APPS", color: "#7ccbff", z: -88, side: -1, y: 5 },
  { text: "ROBOTS", color: "#ff9548", z: -96, side: -1, y: 9 },
  { text: "ZIP TIES", color: "#b9a2ff", z: -104, side: -1, y: 5.5 },
  { text: "BACKEND", color: "#ffd23f", z: -112, side: -1, y: 8.5 },
  { text: "NO SLEEP", color: "#ff7ab8", z: -150, side: 1, y: 6 },
  { text: "SIDE QUESTS", color: "#4be0a0", z: -172, side: -1, y: 7 },
];

function Signs() {
  const textures = useMemo(() => SIGNS.map((s) => neonTexture(s.text, s.color)), []);
  const mats = useRef<THREE.MeshBasicMaterial[]>([]);

  // a little flicker, like real neon
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    mats.current.forEach((m, i) => {
      if (!m) return;
      const flick = Math.sin(t * 13 + i * 7) > 0.97 ? 0.4 : 1;
      m.color.setScalar(1.8 * flick);
    });
  });

  return (
    <group>
      {SIGNS.map((s, i) => (
        <mesh
          key={s.text}
          position={[s.side * (STREET_HALF + 0.3), s.y, s.z]}
          rotation-y={(-s.side * Math.PI) / 2}
        >
          <planeGeometry args={[5, 1.56]} />
          <meshBasicMaterial
            ref={(m) => {
              if (m) mats.current[i] = m;
            }}
            map={textures[i]}
            transparent
            toneMapped={false}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}

/* ---------------------------------- Cars ---------------------------------- */

function Cars() {
  const cars = useMemo(() => {
    const r = rng(9);
    return Array.from({ length: 7 }, (_, i) => ({
      lane: i % 2 ? 3.6 : -3.6,
      offset: r() * 280,
      speed: 9 + r() * 7,
      color: ["#ff7ab8", "#7ccbff", "#ffd23f", "#e8e4f0", "#4be0a0"][i % 5],
    }));
  }, []);
  const refs = useRef<THREE.Group[]>([]);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    cars.forEach((c, i) => {
      const g = refs.current[i];
      if (!g) return;
      const dir = c.lane > 0 ? 1 : -1; // right lane drives toward the camera
      const span = 260;
      const p = (c.offset + t * c.speed) % span;
      g.position.set(c.lane, 0, dir > 0 ? WORKSHOP_Z + 20 + p : 50 - p);
      g.rotation.y = dir > 0 ? 0 : Math.PI;
    });
  });

  return (
    <group>
      {cars.map((c, i) => (
        <group
          key={i}
          ref={(g) => {
            if (g) refs.current[i] = g;
          }}
        >
          <mesh position={[0, 0.55, 0]}>
            <boxGeometry args={[1.8, 0.7, 3.8]} />
            <meshStandardMaterial color={c.color} roughness={0.4} metalness={0.4} />
          </mesh>
          <mesh position={[0, 1.1, -0.2]}>
            <boxGeometry args={[1.5, 0.5, 2]} />
            <meshStandardMaterial color="#1b1830" roughness={0.2} metalness={0.6} />
          </mesh>
          {[-0.6, 0.6].map((x) => (
            <group key={x}>
              <mesh position={[x, 0.6, 1.92]}>
                <boxGeometry args={[0.35, 0.18, 0.05]} />
                <meshBasicMaterial color={[5, 5, 4]} toneMapped={false} />
              </mesh>
              <mesh position={[x, 0.6, -1.92]}>
                <boxGeometry args={[0.35, 0.15, 0.05]} />
                <meshBasicMaterial color={[5, 0.3, 0.4]} toneMapped={false} />
              </mesh>
            </group>
          ))}
        </group>
      ))}
    </group>
  );
}

/* ---------------------------------- Sky ----------------------------------- */

function Moon() {
  return (
    <group position={[70, 95, -330]}>
      <mesh>
        <sphereGeometry args={[9, 32, 16]} />
        <meshBasicMaterial color={[2.2, 2.1, 1.9]} toneMapped={false} fog={false} />
      </mesh>
    </group>
  );
}

export function City() {
  return (
    <group>
      <Buildings />
      <Street />
      <Signs />
      <Cars />
      <Moon />
    </group>
  );
}
