'use client';
import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useCinema } from '@/store/cinema';

/**
 * Scene 2 — Build-up.
 * Towering glass panels arranged in a 360° arc.
 * Low-angle tracking shot reveals scale + structural complexity.
 */
export function GlassFins({ sceneKey: _sk = 'network' as const }) {
  const tier = useCinema((s) => s.tier);
  const COUNT = tier === 'low' ? 14 : tier === 'mid' ? 22 : 32;

  const groupRef = useRef<THREE.Group>(null);
  const fins = useMemo(() => {
    const arr: { pos: [number, number, number]; rot: [number, number, number]; scale: [number, number, number] }[] = [];
    const radius = 14;
    const arc = Math.PI * 1.3;
    for (let i = 0; i < COUNT; i++) {
      const a = -arc / 2 + (arc * i) / (COUNT - 1);
      arr.push({
        pos: [Math.sin(a) * radius, 0, Math.cos(a) * radius - radius + 2],
        rot: [0, -a, 0],
        scale: [0.18, 9 + Math.random() * 4, 5],
      });
    }
    return arr;
  }, [COUNT]);

  useFrame((_, dt) => {
    if (groupRef.current) groupRef.current.rotation.y += dt * 0.015;
  });

  return (
    <group ref={groupRef} position={[0, -2, 0]}>
      {fins.map((f, i) => (
        <mesh key={i} position={f.pos} rotation={f.rot} scale={f.scale}>
          <boxGeometry args={[1, 1, 1]} />
          <meshPhysicalMaterial
            color="#0d0205"
            metalness={0.5}
            roughness={0.08}
            clearcoat={1}
            clearcoatRoughness={0.04}
            reflectivity={1}
            envMapIntensity={2}
            emissive="#1a0303"
            emissiveIntensity={0.4}
          />
        </mesh>
      ))}
      {/* Edge accent strips */}
      {fins.map((f, i) => (
        <mesh
          key={`e${i}`}
          position={[f.pos[0], f.pos[1] + f.scale[1] / 2, f.pos[2]]}
          rotation={f.rot}
        >
          <boxGeometry args={[0.22, 0.04, 5.05]} />
          <meshBasicMaterial color={i % 3 === 0 ? '#FF2D2A' : '#C8120E'} toneMapped={false} />
        </mesh>
      ))}
      {/* Floor reflection plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -4.5, 0]}>
        <planeGeometry args={[80, 80]} />
        <meshStandardMaterial color="#0a0101" metalness={0.95} roughness={0.2} emissive="#1a0202" emissiveIntensity={0.2} />
      </mesh>

    </group>
  );
}
