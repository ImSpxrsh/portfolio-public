import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { sample, story } from "./story";

const shell = "#ece8f6";
const trim = "#2a2540";

/** Sparsh's little robot. Walks down the street as you scroll. */
export function Robot() {
  const root = useRef<THREE.Group>(null);
  const body = useRef<THREE.Group>(null);
  const head = useRef<THREE.Group>(null);
  const armL = useRef<THREE.Group>(null);
  const armR = useRef<THREE.Group>(null);
  const legL = useRef<THREE.Group>(null);
  const legR = useRef<THREE.Group>(null);
  const tip = useRef<THREE.MeshBasicMaterial>(null);
  const state = useRef({ z: 0, phase: 0, speed: 0 });

  useFrame(({ clock }, dt) => {
    const s = state.current;
    const target = sample(story.t).robotZ;
    const prev = s.z;
    s.z = THREE.MathUtils.damp(s.z, target, 3, dt);
    const v = Math.abs(s.z - prev) / Math.max(dt, 1e-3);
    s.speed = THREE.MathUtils.damp(s.speed, Math.min(v / 8, 1), 8, dt);
    s.phase += dt * (4 + s.speed * 8);

    const t = clock.elapsedTime;
    const swing = Math.sin(s.phase) * 0.7 * s.speed;
    const idle = 1 - s.speed;

    root.current!.position.z = s.z;
    body.current!.position.y = 1.55 + Math.abs(Math.sin(s.phase)) * 0.12 * s.speed + Math.sin(t * 2) * 0.03 * idle;
    legL.current!.rotation.x = swing;
    legR.current!.rotation.x = -swing;
    armL.current!.rotation.x = -swing;

    // wave hello when standing still near the start
    const waving = idle > 0.8 && story.t > 0.6 && story.t < 1.6;
    armR.current!.rotation.x = waving ? -2.6 : swing;
    armR.current!.rotation.z = waving ? Math.sin(t * 9) * 0.45 : 0;

    // look around when idle
    // turn around to face the camera while waving, then back to walking
    root.current!.rotation.y = THREE.MathUtils.damp(root.current!.rotation.y, waving ? Math.PI : 0, 5, dt);

    head.current!.rotation.y = Math.sin(t * 0.8) * 0.5 * idle;
    head.current!.rotation.z = Math.sin(t * 1.3) * 0.08 * idle;

    tip.current!.color.setRGB(Math.sin(t * 4) > 0 ? 6 : 1.2, 0.6, 2.2);
  });

  return (
    <group ref={root}>
      {/* warm light that travels with him so he's always visible */}
      <pointLight position={[1.5, 4, 2.5]} intensity={40} distance={14} color="#ffd8b0" />
      {/* shadow blob */}
      <mesh rotation-x={-Math.PI / 2} position={[0, 0.03, 0]}>
        <circleGeometry args={[0.9, 24]} />
        <meshBasicMaterial color="#000" transparent opacity={0.45} />
      </mesh>

      <group ref={body} position={[0, 1.55, 0]}>
        {/* torso */}
        <mesh>
          <boxGeometry args={[1.2, 1.3, 0.85]} />
          <meshStandardMaterial color={shell} roughness={0.35} metalness={0.2} />
        </mesh>
        {/* chest light */}
        <mesh position={[0, 0.1, -0.43]}>
          <circleGeometry args={[0.16, 20]} />
          <meshBasicMaterial color={[0.6, 4, 2.4]} toneMapped={false} side={THREE.DoubleSide} />
        </mesh>

        {/* head */}
        <group ref={head} position={[0, 1.15, 0]}>
          <mesh>
            <boxGeometry args={[1.05, 0.8, 0.85]} />
            <meshStandardMaterial color={shell} roughness={0.35} metalness={0.2} />
          </mesh>
          <mesh position={[0, 0, -0.43]}>
            <planeGeometry args={[0.85, 0.5]} />
            <meshStandardMaterial color="#0d0b18" roughness={0.2} side={THREE.DoubleSide} />
          </mesh>
          {[-0.2, 0.2].map((x) => (
            <mesh key={x} position={[x, 0.03, -0.44]}>
              <sphereGeometry args={[0.08, 12, 8]} />
              <meshBasicMaterial color={[0.6, 5, 3]} toneMapped={false} />
            </mesh>
          ))}
          <mesh position={[0, 0.6, 0]}>
            <cylinderGeometry args={[0.03, 0.03, 0.4, 6]} />
            <meshStandardMaterial color={trim} />
          </mesh>
          <mesh position={[0, 0.84, 0]}>
            <sphereGeometry args={[0.09, 12, 8]} />
            <meshBasicMaterial ref={tip} color={[6, 0.6, 2.2]} toneMapped={false} />
          </mesh>
        </group>

        {/* arms (pivot at the shoulder) */}
        {[
          { ref: armL, x: -0.75 },
          { ref: armR, x: 0.75 },
        ].map(({ ref, x }) => (
          <group key={x} ref={ref} position={[x, 0.45, 0]}>
            <mesh position={[0, -0.45, 0]}>
              <boxGeometry args={[0.26, 0.9, 0.3]} />
              <meshStandardMaterial color={trim} roughness={0.5} />
            </mesh>
          </group>
        ))}

        {/* legs (pivot at the hip) */}
        {[
          { ref: legL, x: -0.3 },
          { ref: legR, x: 0.3 },
        ].map(({ ref, x }) => (
          <group key={x} ref={ref} position={[x, -0.6, 0]}>
            <mesh position={[0, -0.42, 0]}>
              <boxGeometry args={[0.3, 0.84, 0.34]} />
              <meshStandardMaterial color={trim} roughness={0.5} />
            </mesh>
            <mesh position={[0, -0.86, -0.08]}>
              <boxGeometry args={[0.36, 0.14, 0.5]} />
              <meshStandardMaterial color={shell} roughness={0.4} />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
}
