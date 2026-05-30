'use client';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, Environment } from '@react-three/drei';
import { Suspense } from 'react';
import { usePerfTier } from '@/hooks/usePerfTier';
import { useCinema, TIER_CONFIG } from '@/store/cinema';
import { VirtualCamera } from './VirtualCamera';
import { MasterTimeline } from './MasterTimeline';
import { Postprocess } from './Postprocess';
import { Fog } from './Fog';
import { SceneRouter } from '@/components/scenes/SceneRouter';
import { AmbientAtmosphere } from '@/components/scenes/AmbientAtmosphere';

export function CinemaShell({ children }: { children: React.ReactNode }) {
  usePerfTier();
  const tier = useCinema((s) => s.tier);
  const dprMax = TIER_CONFIG[tier].dprMax;

  return (
    <>
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Canvas
          dpr={[1, dprMax]}
          gl={{ antialias: tier !== 'low', powerPreference: 'high-performance', alpha: false }}
          camera={{ position: [0, 0, 14], fov: 50, near: 0.1, far: 200 }}
        >
          <Suspense fallback={null}>
            <PerspectiveCamera makeDefault position={[0, 0, 14]} fov={50} near={0.1} far={200} />
            <color attach="background" args={['#05060A']} />
            <Fog />
            <ambientLight intensity={0.08} color="#200505" />
            <directionalLight position={[6, 8, 4]} intensity={0.3} color="#F5F2EC" />
            <pointLight position={[-6, 2, 6]} intensity={1.2} color="#FF2D2A" distance={50} />
            <pointLight position={[6, -2, 8]} intensity={0.8} color="#C8120E" distance={40} />
            <pointLight position={[0, 6, -10]} intensity={0.5} color="#FF2D2A" distance={35} />
            {tier === 'high' && <Environment preset="night" />}
            <AmbientAtmosphere />
            <SceneRouter />
            <VirtualCamera />
            <Postprocess />
          </Suspense>
        </Canvas>
      </div>
      <MasterTimeline />
      {children}
    </>
  );
}
