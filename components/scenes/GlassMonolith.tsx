'use client';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { MeshTransmissionMaterial } from '@react-three/drei';
import { useCinema } from '@/store/cinema';
import { localProgress } from './SceneRouter';
import { ReddieSprite } from './ReddieSprite';

/**
 * Scene 1 — The Viral Hook.
 * Monolithic dark glass pillar with a crimson laser cutting through the center.
 */
export function GlassMonolith({ sceneKey = 'intro' as const }) {
  const tier = useCinema((s) => s.tier);

  const monolith = useRef<THREE.Mesh>(null);
  const laser = useRef<THREE.Mesh>(null);
  const flare = useRef<THREE.Mesh>(null);
  const reddieGroup = useRef<THREE.Group>(null);

  useFrame((_, dt) => {
    const t = localProgress(useCinema.getState().progress, sceneKey);
    if (monolith.current) monolith.current.rotation.y += dt * 0.06;
    const tail = t > 0.85 ? Math.max(0, 1 - (t - 0.85) / 0.15) : 1;
    if (laser.current) {
      const beam = Math.min(1, Math.max(0, (t - 0.1) * 3)) * tail;
      laser.current.scale.y = beam * 12;
      (laser.current.material as THREE.MeshBasicMaterial).opacity = beam;
    }
    if (flare.current) {
      (flare.current.material as THREE.MeshBasicMaterial).opacity = Math.min(0.5, t * 1.2) * tail;
    }
    if (monolith.current) {
      const m = monolith.current.material as THREE.Material & { opacity: number; transparent: boolean };
      m.transparent = true;
      m.opacity = tail;
    }
    // Reddie — appears once camera has pulled back, fades out before scene end
    if (reddieGroup.current) {
      let reveal = 0;
      if (t > 0.35 && t < 0.55) reveal = (t - 0.35) / 0.2;
      else if (t >= 0.55 && t <= 0.85) reveal = 1;
      else if (t > 0.85 && t < 1) reveal = Math.max(0, 1 - (t - 0.85) / 0.15);
      reddieGroup.current.scale.setScalar(reveal * 1.6);
    }
  });

  return (
    <group>
      <mesh ref={monolith} position={[0, 0, 0]}>
        <boxGeometry args={[6, 8, 1.6]} />
        {tier === 'high' ? (
          <MeshTransmissionMaterial
            color="#0B0D12"
            thickness={1.2}
            roughness={0.05}
            transmission={0.6}
            ior={1.5}
            chromaticAberration={0.06}
            backside
          />
        ) : (
          <meshStandardMaterial color="#0d0305" metalness={0.9} roughness={0.1} envMapIntensity={1.5} emissive="#1a0202" emissiveIntensity={0.3} />
        )}
      </mesh>

      <mesh ref={laser} position={[0, 0, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 1, 8]} />
        <meshBasicMaterial color="#FF2D2A" transparent opacity={0} toneMapped={false} />
      </mesh>

      <mesh ref={flare} position={[0, 0, 0]}>
        <planeGeometry args={[14, 0.12]} />
        <meshBasicMaterial color="#FF2D2A" transparent opacity={0} toneMapped={false} blending={THREE.AdditiveBlending} />
      </mesh>

      {/* Reddie — side cameo, proportional */}
      <group ref={reddieGroup} position={[3.2, -1.5, 2]} scale={0}>
        <ReddieSprite position={[0, 0, 0]} scale={1} bob glow={0} />
      </group>
    </group>
  );
}
