'use client';
import { EffectComposer, Bloom, Vignette, Noise, DepthOfField } from '@react-three/postprocessing';
import { useCinema, TIER_CONFIG } from '@/store/cinema';

export function Postprocess() {
  const tier = useCinema((s) => s.tier);
  const cfg = TIER_CONFIG[tier];
  if (!cfg.postprocess) return null;
  return (
    <EffectComposer multisampling={0} disableNormalPass>
      {cfg.bloom ? <Bloom intensity={0.8} luminanceThreshold={0.4} luminanceSmoothing={0.6} mipmapBlur /> : <></>}
      {cfg.dof ? <DepthOfField focusDistance={0.02} focalLength={0.05} bokehScale={2.2} /> : <></>}
      {cfg.grain ? <Noise opacity={0.06} premultiply /> : <></>}
      <Vignette eskil={false} offset={0.25} darkness={0.85} />
    </EffectComposer>
  );
}
