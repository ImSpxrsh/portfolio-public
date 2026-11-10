import { Component, type ReactNode, Suspense, useEffect, useMemo, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { AdaptiveDpr, Stars } from "@react-three/drei";
import { Bloom, EffectComposer, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";
import { City } from "./City";
import { Robot } from "./Robot";
import { Workshop } from "./Workshop";
import { sample, startScrollTracking, story } from "./story";

function CameraRig() {
  const { camera, pointer } = useThree();
  const look = useMemo(() => new THREE.Vector3(...sample(0).look), []);

  useFrame((_, dt) => {
    const s = sample(story.t);
    // a touch of mouse parallax so the scene feels alive even when not scrolling
    s.cam.x += pointer.x * 1.2;
    s.cam.y += pointer.y * 0.6;
    camera.position.x = THREE.MathUtils.damp(camera.position.x, s.cam.x, 4, dt);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, s.cam.y, 4, dt);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, s.cam.z, 4, dt);
    look.x = THREE.MathUtils.damp(look.x, s.look.x, 4, dt);
    look.y = THREE.MathUtils.damp(look.y, s.look.y, 4, dt);
    look.z = THREE.MathUtils.damp(look.z, s.look.z, 4, dt);
    camera.lookAt(look);
  });
  return null;
}

function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return Boolean(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? <Fallback /> : this.props.children;
  }
}

function Fallback() {
  return (
    <div
      className="h-full w-full"
      style={{ background: "radial-gradient(120% 80% at 70% 10%, #3a2a6b 0%, #120c2a 55%, #07050f 100%)" }}
    />
  );
}

export function Scene() {
  const [ok] = useState(hasWebGL);
  useEffect(() => startScrollTracking(), []);

  return (
    <div className="fixed inset-0 -z-10" aria-hidden="true">
      {ok ? (
        <SceneBoundary>
          <Canvas
            dpr={[1, 1.5]}
            camera={{ position: sample(0).cam.toArray(), fov: 55, near: 0.1, far: 700 }}
            gl={{ antialias: false, powerPreference: "high-performance" }}
          >
            <color attach="background" args={["#0b0820"]} />
            <fog attach="fog" args={["#140d2e", 35, 230]} />
            <hemisphereLight args={["#6d5bd0", "#0b0820", 0.7]} />
            <directionalLight position={[60, 90, -200]} intensity={0.6} color="#9fb4ff" />
            <Suspense fallback={null}>
              <Stars radius={260} depth={80} count={2500} factor={5} saturation={0.4} fade speed={0.6} />
              <City />
              <Robot />
              <Workshop />
            </Suspense>
            <CameraRig />
            <EffectComposer multisampling={0}>
              <Bloom mipmapBlur intensity={1.1} luminanceThreshold={0.85} luminanceSmoothing={0.2} />
              <Vignette offset={0.25} darkness={0.75} />
            </EffectComposer>
            <AdaptiveDpr pixelated={false} />
          </Canvas>
        </SceneBoundary>
      ) : (
        <Fallback />
      )}
    </div>
  );
}
