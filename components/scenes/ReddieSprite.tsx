'use client';
import { useEffect, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

let cached: THREE.Texture | null = null;
let cachedPromise: Promise<THREE.Texture | null> | null = null;

function loadReddie(): Promise<THREE.Texture | null> {
  if (cached) return Promise.resolve(cached);
  if (cachedPromise) return cachedPromise;
  const tryPath = (path: string) =>
    new Promise<THREE.Texture | null>((resolve) => {
      new THREE.TextureLoader().load(
        path,
        (tex) => {
          tex.colorSpace = THREE.SRGBColorSpace;
          tex.anisotropy = 8;
          resolve(tex);
        },
        undefined,
        () => resolve(null)
      );
    });
  // Try PNG first, fall back to GIF (three only renders first frame either way)
  cachedPromise = tryPath('/assets/reddie.png').then((tex) =>
    tex ?? tryPath('/assets/reddie.gif')
  ).then((tex) => {
    if (tex) cached = tex;
    return tex;
  });
  return cachedPromise;
}

type Props = {
  position?: [number, number, number];
  scale?: number;
  bob?: boolean;
  glow?: number; // 0..1 — drives emissive halo
  faceCamera?: boolean;
};

/**
 * Reddie mascot — drawn as a billboard plane.
 * Loads /assets/reddie.png lazily; renders nothing until file resolves.
 */
export function ReddieSprite({
  position = [0, 0, 0],
  scale = 2,
  bob = true,
  glow = 0,
  faceCamera = true,
}: Props) {
  const [tex, setTex] = useState<THREE.Texture | null>(cached);
  const ref = useRef<THREE.Mesh>(null);
  const haloRef = useRef<THREE.Mesh>(null);

  useEffect(() => {
    let mounted = true;
    if (!cached) loadReddie().then((t) => { if (mounted) setTex(t); });
    return () => { mounted = false; };
  }, []);

  useFrame((s, dt) => {
    if (!ref.current) return;
    if (bob) ref.current.position.y = position[1] + Math.sin(s.clock.elapsedTime * 1.4) * 0.08;
    if (faceCamera) ref.current.lookAt(s.camera.position);
    if (haloRef.current) {
      haloRef.current.position.copy(ref.current.position);
      if (faceCamera) haloRef.current.lookAt(s.camera.position);
      const m = haloRef.current.material as THREE.MeshBasicMaterial;
      const pulse = 0.7 + Math.sin(s.clock.elapsedTime * 2) * 0.3;
      m.opacity = glow * 0.3 * pulse;
    }
  });

  if (!tex) return null;

  // image aspect ratio assumed ~3:4 (portrait robot)
  const aspect = (tex.image && tex.image.width && tex.image.height)
    ? tex.image.width / tex.image.height
    : 0.75;

  return (
    <group>
      {glow > 0 && (
        <mesh ref={haloRef} position={position}>
          <circleGeometry args={[scale * 0.45, 32]} />
          <meshBasicMaterial color="#FF2D2A" transparent opacity={0} toneMapped={false} blending={THREE.AdditiveBlending} depthWrite={false} />
        </mesh>
      )}
      <mesh ref={ref} position={position}>
        <planeGeometry args={[scale * aspect, scale]} />
        <meshBasicMaterial map={tex} transparent alphaTest={0.05} toneMapped={false} />
      </mesh>
    </group>
  );
}
