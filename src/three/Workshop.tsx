import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { neonTexture } from "./textures";
import { WORKSHOP_Z } from "./story";
import { colors, projects } from "../data/content";

const wall = "#2a2342";

/** The lit-up garage at the end of the street where the projects live. */
export function Workshop() {
  const sign = useMemo(() => neonTexture("SPARSH'S WORKSHOP", "#ff7ab8"), []);
  const screens = useRef<THREE.MeshBasicMaterial[]>([]);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    screens.current.forEach((m, i) => {
      if (m) m.opacity = 0.85 + Math.sin(t * 3 + i * 1.7) * 0.15;
    });
  });

  const W = 22;
  const H = 10;
  const D = 16;

  return (
    <group position={[0, 0, WORKSHOP_Z]}>
      {/* warm interior */}
      <pointLight position={[0, 7, 0]} intensity={260} distance={30} color="#ffb870" />
      <pointLight position={[0, 4, 9]} intensity={60} distance={18} color="#ff7ab8" />

      {/* floor */}
      <mesh rotation-x={-Math.PI / 2} position={[0, 0.05, 0]}>
        <planeGeometry args={[W, D]} />
        <meshStandardMaterial color="#3a3150" roughness={0.7} />
      </mesh>
      {/* back, sides, roof */}
      <mesh position={[0, H / 2, -D / 2]}>
        <boxGeometry args={[W, H, 0.4]} />
        <meshStandardMaterial color={wall} roughness={0.9} />
      </mesh>
      {[-1, 1].map((s) => (
        <mesh key={s} position={[(s * W) / 2, H / 2, 0]}>
          <boxGeometry args={[0.4, H, D]} />
          <meshStandardMaterial color={wall} roughness={0.9} />
        </mesh>
      ))}
      <mesh position={[0, H + 0.2, 0]}>
        <boxGeometry args={[W + 0.4, 0.4, D]} />
        <meshStandardMaterial color="#1c1730" roughness={0.9} />
      </mesh>
      {/* front header above the open garage door, with a rolled-up door */}
      <mesh position={[0, H - 1, D / 2]}>
        <boxGeometry args={[W + 0.4, 2, 0.4]} />
        <meshStandardMaterial color={wall} roughness={0.9} />
      </mesh>
      <mesh position={[0, H - 2.3, D / 2 - 0.4]} rotation-z={Math.PI / 2}>
        <cylinderGeometry args={[0.45, 0.45, W - 1, 16]} />
        <meshStandardMaterial color="#8d86a6" metalness={0.6} roughness={0.4} />
      </mesh>

      {/* neon sign */}
      <mesh position={[0, H + 2.2, D / 2 + 0.1]}>
        <planeGeometry args={[13, 4]} />
        <meshBasicMaterial map={sign} transparent toneMapped={false} color={[2, 2, 2]} />
      </mesh>

      {/* workbench with one glowing screen per project */}
      <mesh position={[0, 1.1, -D / 2 + 2]}>
        <boxGeometry args={[W - 4, 0.25, 2.4]} />
        <meshStandardMaterial color="#6b4a3a" roughness={0.8} />
      </mesh>
      {projects.slice(0, 4).map((p, i) => {
        const x = -6.75 + i * 4.5;
        return (
          <group key={p.name} position={[x, 0, -D / 2 + 1.8]}>
            <mesh position={[0, 0.55, 0]}>
              <boxGeometry args={[0.2, 1.1, 0.2]} />
              <meshStandardMaterial color="#4a3a32" />
            </mesh>
            <mesh position={[0, 2.6, -0.2]}>
              <boxGeometry args={[3.6, 2.3, 0.15]} />
              <meshStandardMaterial color="#14111f" />
            </mesh>
            <mesh position={[0, 2.6, -0.11]}>
              <planeGeometry args={[3.3, 2]} />
              <meshBasicMaterial
                ref={(m) => {
                  if (m) screens.current[i] = m;
                }}
                color={new THREE.Color(colors[p.color]).multiplyScalar(1.6)}
                toneMapped={false}
                transparent
              />
            </mesh>
          </group>
        );
      })}

      {/* clutter: crates and a half-built robot arm */}
      {[
        [-8.5, 0.6, 3, 1.2],
        [-7.4, 0.45, 4.3, 0.9],
        [8.2, 0.7, 2, 1.4],
        [8.6, 1.9, 2.2, 1],
      ].map(([x, y, z, s], i) => (
        <mesh key={i} position={[x, y, z]} rotation-y={i * 0.4}>
          <boxGeometry args={[s, s, s]} />
          <meshStandardMaterial color={i % 2 ? "#ffd23f" : "#4be0a0"} roughness={0.7} />
        </mesh>
      ))}
      <group position={[6, 0, -1]}>
        <mesh position={[0, 0.3, 0]}>
          <cylinderGeometry args={[0.7, 0.8, 0.6, 16]} />
          <meshStandardMaterial color="#8d86a6" metalness={0.5} roughness={0.4} />
        </mesh>
        <mesh position={[0.4, 1.5, 0]} rotation-z={-0.5}>
          <boxGeometry args={[0.35, 2.2, 0.35]} />
          <meshStandardMaterial color="#ff9548" />
        </mesh>
        <mesh position={[1.4, 2.6, 0]} rotation-z={0.9}>
          <boxGeometry args={[0.3, 1.6, 0.3]} />
          <meshStandardMaterial color="#ff9548" />
        </mesh>
      </group>

      {/* string lights across the opening */}
      {Array.from({ length: 14 }, (_, i) => {
        const x = -W / 2 + 1 + i * ((W - 2) / 13);
        const sag = Math.sin((i / 13) * Math.PI) * 0.9;
        const c = [colors.pink, colors.yellow, colors.mint, colors.sky][i % 4];
        return (
          <mesh key={i} position={[x, H - 2.6 - sag, D / 2 + 0.3]}>
            <sphereGeometry args={[0.13, 10, 8]} />
            <meshBasicMaterial color={new THREE.Color(c).multiplyScalar(3)} toneMapped={false} />
          </mesh>
        );
      })}
    </group>
  );
}
