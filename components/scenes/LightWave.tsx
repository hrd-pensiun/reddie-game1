'use client';
import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useCinema } from '@/store/cinema';
import { localProgress } from './SceneRouter';

/**
 * Scene 4 — The Peak.
 * 360° wave of white + crimson light sweeps across an abstract glass grid,
 * turning complexity into geometric order.
 */
export function LightWave({ sceneKey = 'steps' as const }) {
  const tier = useCinema((s) => s.tier);
  const GRID = tier === 'low' ? 8 : tier === 'mid' ? 12 : 16;

  const groupRef = useRef<THREE.Group>(null);

  const cells = useMemo(() => {
    const arr: { pos: [number, number, number]; phase: number }[] = [];
    for (let x = 0; x < GRID; x++) {
      for (let z = 0; z < GRID; z++) {
        arr.push({
          pos: [(x - GRID / 2) * 1.4, 0, (z - GRID / 2) * 1.4],
          phase: (x + z) / (GRID * 2),
        });
      }
    }
    return arr;
  }, [GRID]);

  useFrame((s) => {
    const time = s.clock.getElapsedTime();
    const t = localProgress(useCinema.getState().progress, sceneKey);
    if (!groupRef.current) return;
    groupRef.current.children.forEach((mesh, i) => {
      const c = cells[i];
      if (!c) return;
      const wave = Math.sin(time * 1.4 - c.phase * 6) * 0.5 + 0.5;
      const order = t; // 0 chaotic → 1 ordered
      const baseY = (1 - order) * (Math.sin(c.phase * 30) * 1.5) + order * (wave * 0.6);
      (mesh as THREE.Mesh).position.y = baseY;
      (mesh as THREE.Mesh).rotation.y = (1 - order) * (c.phase * Math.PI * 2);
      const m = (mesh as THREE.Mesh).material as THREE.MeshBasicMaterial;
      const sweep = (Math.sin(time * 0.8 - c.phase * 4) + 1) / 2;
      // Crimson dominant: R stays high, G/B minimal
      m.color.setRGB(0.6 + sweep * 0.4, sweep * 0.05, sweep * 0.05);
      m.opacity = 0.35 + sweep * 0.6;
    });
  });

  return (
    <group ref={groupRef} position={[0, -0.5, 0]}>
      {cells.map((c, i) => (
        <mesh key={i} position={c.pos}>
          <boxGeometry args={[0.6, 0.6, 0.6]} />
          <meshBasicMaterial color="#F5F2EC" transparent opacity={0.5} toneMapped={false} />
        </mesh>
      ))}
    </group>
  );
}
