'use client';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useCinema } from '@/store/cinema';

export function Fog() {
  const scene = useThree((s) => s.scene);
  if (!scene.fog) scene.fog = new THREE.FogExp2(0x0d0203, 0.05);
  scene.background = new THREE.Color(0x080102);

  useFrame(() => {
    const fog = scene.fog as THREE.FogExp2;
    if (!fog) return;
    const target = useCinema.getState().fogDensity;
    fog.density += (target - fog.density) * 0.05;
  });
  return null;
}
