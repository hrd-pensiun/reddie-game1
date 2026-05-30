import { create } from 'zustand';
import * as THREE from 'three';

export type Scene = 'intro' | 'network' | 'manifesto' | 'steps' | 'cta';
export type Tier = 'low' | 'mid' | 'high';

type CinemaState = {
  progress: number;
  scene: Scene;
  tier: Tier;
  reducedMotion: boolean;
  cameraPosition: THREE.Vector3;
  cameraTarget: THREE.Vector3;
  fogDensity: number;
  exposure: number;
  setProgress: (p: number) => void;
  setScene: (s: Scene) => void;
  setTier: (t: Tier) => void;
  setReducedMotion: (r: boolean) => void;
};

export const useCinema = create<CinemaState>((set) => ({
  progress: 0,
  scene: 'intro',
  tier: 'mid',
  reducedMotion: false,
  cameraPosition: new THREE.Vector3(0, 0, 12),
  cameraTarget: new THREE.Vector3(0, 0, 0),
  fogDensity: 0.04,
  exposure: 1.0,
  setProgress: (progress) => set({ progress }),
  setScene: (scene) => set({ scene }),
  setTier: (tier) => set({ tier }),
  setReducedMotion: (reducedMotion) => set({ reducedMotion }),
}));

export function sceneFromProgress(p: number): Scene {
  if (p < 0.18) return 'intro';
  if (p < 0.42) return 'network';
  if (p < 0.62) return 'manifesto';
  if (p < 0.82) return 'steps';
  return 'cta';
}

export const TIER_CONFIG: Record<Tier, {
  particleCount: number;
  dprMax: number;
  postprocess: boolean;
  bloom: boolean;
  dof: boolean;
  grain: boolean;
}> = {
  low:  { particleCount: 300,  dprMax: 1.0, postprocess: false, bloom: false, dof: false, grain: false },
  mid:  { particleCount: 800,  dprMax: 1.5, postprocess: true,  bloom: true,  dof: false, grain: false },
  high: { particleCount: 2000, dprMax: 2.0, postprocess: true,  bloom: true,  dof: true,  grain: true  },
};
