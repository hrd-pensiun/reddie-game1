'use client';
import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useCinema, TIER_CONFIG } from '@/store/cinema';

/**
 * Global atmospheric layer — soft drifting motes + faint volumetric haze.
 * Always-on across scenes to give a sense of depth and air.
 */
export function AmbientAtmosphere() {
  const tier = useCinema((s) => s.tier);
  const N = Math.floor(TIER_CONFIG[tier].particleCount * 0.6);

  const positions = useMemo(() => {
    const arr = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 60;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 35;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 30 - 5;
    }
    return arr;
  }, [N]);

  const secondaryPos = useMemo(() => {
    const M = Math.floor(N * 0.3);
    const arr = new Float32Array(M * 3);
    for (let i = 0; i < M; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 80;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 45;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 40 - 8;
    }
    return arr;
  }, [N]);

  const pointsRef = useRef<THREE.Points>(null);

  useFrame((_, dt) => {
    const pts = pointsRef.current;
    if (!pts) return;
    const arr = (pts.geometry.attributes.position as THREE.BufferAttribute).array as Float32Array;
    for (let i = 0; i < N; i++) {
      arr[i * 3 + 1] += dt * 0.18;
      arr[i * 3] += Math.sin(i + arr[i * 3 + 1] * 0.05) * dt * 0.04;
      if (arr[i * 3 + 1] > 18) arr[i * 3 + 1] = -18;
    }
    (pts.geometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;
  });

  return (
    <>
      {/* Drifting motes — crimson tinted */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} count={N} />
        </bufferGeometry>
        <pointsMaterial
          color="#FF2D2A"
          size={0.025}
          sizeAttenuation
          transparent
          opacity={0.55}
          depthWrite={false}
          toneMapped={false}
        />
      </points>

      {/* Secondary dim white motes for depth variation */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[secondaryPos, 3]}
            count={Math.floor(N * 0.3)}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#FF6B6B"
          size={0.012}
          sizeAttenuation
          transparent
          opacity={0.3}
          depthWrite={false}
          toneMapped={false}
        />
      </points>

      {/* Deep red backdrop glow */}
      <mesh position={[0, 0, -22]}>
        <planeGeometry args={[140, 80]} />
        <meshBasicMaterial color="#050205" depthWrite={false} />
      </mesh>
      <mesh position={[0, -4, -18]}>
        <planeGeometry args={[90, 55]} />
        <meshBasicMaterial color="#1a0505" transparent opacity={0.7} depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>
      {/* Subtle wide red floor bloom */}
      <mesh position={[0, -8, -10]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[100, 60]} />
        <meshBasicMaterial color="#3d0a0a" transparent opacity={0.4} depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>
    </>
  );
}
