'use client';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useCinema } from '@/store/cinema';
import { GlassMonolith } from './GlassMonolith';
import { GlassFins } from './GlassFins';
import { HoloInterface } from './HoloInterface';
import { LightWave } from './LightWave';
import { BrandReveal } from './BrandReveal';

const RANGES = {
  intro:     [0.00, 0.18],
  network:   [0.18, 0.42],
  manifesto: [0.42, 0.62],
  steps:     [0.62, 0.82],
  cta:       [0.82, 1.00],
} as const;
type SceneKey = keyof typeof RANGES;

/** SceneRouter — fades each scene's group based on global scroll progress. */
export function SceneRouter() {
  const refs = useRef<Record<SceneKey, THREE.Group | null>>({
    intro: null, network: null, manifesto: null, steps: null, cta: null,
  });

  useFrame(() => {
    const p = useCinema.getState().progress;
    (Object.keys(RANGES) as SceneKey[]).forEach((k) => {
      const [a, b] = RANGES[k];
      // Hard cut — no overlap between scenes
      const visible = p >= a && p <= b;
      if (refs.current[k] && refs.current[k]!.visible !== visible) {
        refs.current[k]!.visible = visible;
      }
    });
  });

  return (
    <>
      <group ref={(r) => { refs.current.intro = r; }}><GlassMonolith sceneKey="intro" /></group>
      <group ref={(r) => { refs.current.network = r; }}><GlassFins sceneKey="network" /></group>
      <group ref={(r) => { refs.current.manifesto = r; }}><HoloInterface sceneKey="manifesto" /></group>
      <group ref={(r) => { refs.current.steps = r; }}><LightWave sceneKey="steps" /></group>
      <group ref={(r) => { refs.current.cta = r; }}><BrandReveal sceneKey="cta" /></group>
    </>
  );
}

/** Helper exported for scenes to compute their own local 0..1 progress. */
export function localProgress(p: number, key: SceneKey) {
  const [a, b] = RANGES[key];
  return Math.max(0, Math.min(1, (p - a) / (b - a)));
}
