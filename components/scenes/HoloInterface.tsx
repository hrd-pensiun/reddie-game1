'use client';
import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useCinema } from '@/store/cinema';
import { localProgress } from './SceneRouter';

/**
 * Scene 3 — Development.
 * Boardroom interpretation: a giant seamless transparent glass display
 * showing optimized business data (animated chart bars).
 * Human figures are intentionally abstracted to silhouette planes
 * (no GLB models per current scope).
 */
export function HoloInterface({ sceneKey = 'manifesto' as const }) {
  const barsRef = useRef<THREE.Group>(null);
  const linesRef = useRef<THREE.Line>(null);
  const lineMatRef = useRef<THREE.LineBasicMaterial>(null);

  const bars = useMemo(() => Array.from({ length: 9 }, (_, i) => ({ x: -3.2 + i * 0.8, target: 0.5 + Math.random() * 2.5 })), []);

  // Animated line graph
  const lineGeometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const pts: number[] = [];
    for (let i = 0; i < 40; i++) {
      pts.push(-3 + (i / 39) * 6, 0, 0);
    }
    g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(pts), 3));
    return g;
  }, []);

  useFrame((s) => {
    const time = s.clock.getElapsedTime();
    const t = localProgress(useCinema.getState().progress, sceneKey);
    if (barsRef.current) {
      barsRef.current.children.forEach((c, i) => {
        const target = bars[i].target * t;
        const cur = (c as THREE.Mesh).scale.y;
        (c as THREE.Mesh).scale.y = cur + (target - cur) * 0.05;
        (c as THREE.Mesh).position.y = (c as THREE.Mesh).scale.y / 2 - 0.5;
      });
    }
    if (lineMatRef.current) lineMatRef.current.opacity = Math.min(1, t * 1.3);
    if (linesRef.current) {
      const arr = (linesRef.current.geometry.attributes.position as THREE.BufferAttribute).array as Float32Array;
      for (let i = 0; i < 40; i++) {
        arr[i * 3 + 1] = Math.sin(time * 1.3 + i * 0.5) * 0.4 + 1.5;
      }
      (linesRef.current.geometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;
    }
  });

  return (
    <group position={[-2.5, 0, 0]}>
      {/* Floor — boardroom suggestion */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.5, 0]}>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial color="#05060A" metalness={0.85} roughness={0.4} />
      </mesh>

      {/* Holographic glass panel frame */}
      <mesh position={[0, 1.2, 0]}>
        <boxGeometry args={[8.4, 4.6, 0.08]} />
        <meshPhysicalMaterial
          color="#0B0D12"
          metalness={0.2}
          roughness={0.05}
          transmission={0.85}
          ior={1.4}
          thickness={0.3}
          transparent
          opacity={0.4}
        />
      </mesh>

      {/* Glowing chart bars on panel */}
      <group ref={barsRef} position={[0, 0.4, 0.06]}>
        {bars.map((b, i) => (
          <mesh key={i} position={[b.x, 0, 0]} scale={[1, 0.01, 1]}>
            <boxGeometry args={[0.5, 1, 0.05]} />
            <meshBasicMaterial
              color={i % 3 === 0 ? '#FF2D2A' : i % 3 === 1 ? '#C8120E' : '#F5F2EC'}
              transparent
              opacity={0.85}
              toneMapped={false}
            />
          </mesh>
        ))}
      </group>

      {/* Trend line — animated */}
      <line ref={linesRef as React.Ref<THREE.Line>} position={[0, 1.6, 0.07]} geometry={lineGeometry}>
        <lineBasicMaterial ref={lineMatRef} color="#FF2D2A" linewidth={2} transparent opacity={0} toneMapped={false} />
      </line>

      {/* Two silhouette presence (abstract — slim vertical planes facing camera) */}
      {[[-2.6, -1.4], [2.6, -1.4]].map(([x, y], i) => (
        <mesh key={i} position={[x, y, 1.6]}>
          <planeGeometry args={[0.9, 2.2]} />
          <meshBasicMaterial color="#000" transparent opacity={0.92} />
        </mesh>
      ))}

      {/* Soft uplight */}
      <pointLight position={[0, 1.5, 1]} color="#FF2D2A" intensity={1.2} distance={10} />
      <pointLight position={[0, 4, 4]} color="#FF2D2A" intensity={0.8} distance={20} />
    </group>
  );
}
