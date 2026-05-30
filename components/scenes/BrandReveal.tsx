'use client';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useCinema } from '@/store/cinema';
import { localProgress } from './SceneRouter';

/**
 * Scene 5 — Resolution.
 * A single perfect glass panel center stage.
 * Volumetric crimson dot glows as the brand mark.
 */
export function BrandReveal({ sceneKey = 'cta' as const }) {
  const panel = useRef<THREE.Mesh>(null);
  const dot = useRef<THREE.Mesh>(null);
  const light = useRef<THREE.PointLight>(null);

  useFrame(() => {
    const t = localProgress(useCinema.getState().progress, sceneKey);
    if (light.current) light.current.intensity = 1.5 * t;
    if (panel.current) {
      const target = t;
      const m = panel.current.material as THREE.MeshPhysicalMaterial;
      m.opacity = 0.15 + target * 0.5;
      panel.current.position.z = -1 + target * 1.5;
    }
    if (dot.current) {
      const m = dot.current.material as THREE.MeshBasicMaterial;
      const pulse = 0.85 + Math.sin(performance.now() * 0.003) * 0.15;
      m.opacity = t * pulse;
      dot.current.scale.setScalar(0.4 + t * 0.6);
    }
  });

  return (
    <group position={[0, 0, 0]}>
      <mesh ref={panel} position={[0, 0, -1]}>
        <planeGeometry args={[3.6, 5]} />
        <meshPhysicalMaterial
          color="#11141B"
          metalness={0.4}
          roughness={0.05}
          transmission={0.8}
          ior={1.45}
          thickness={0.6}
          transparent
          opacity={0.2}
        />
      </mesh>
      <mesh ref={dot} position={[1.6, 1.6, 0.1]}>
        <sphereGeometry args={[0.18, 32, 32]} />
        <meshBasicMaterial color="#FF2D2A" toneMapped={false} transparent opacity={0} />
      </mesh>

      <pointLight ref={light} position={[0, 0, 1.5]} color="#FF2D2A" intensity={0} distance={6} />
    </group>
  );
}
