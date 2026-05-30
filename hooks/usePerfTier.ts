'use client';
import { useEffect } from 'react';
import { useCinema, type Tier } from '@/store/cinema';

function detectTier(): Tier {
  if (typeof window === 'undefined') return 'mid';
  const ua = navigator.userAgent;
  const isMobile = /Mobi|Android|iPhone|iPad/i.test(ua);
  const cores = navigator.hardwareConcurrency ?? 4;
  const dpr = window.devicePixelRatio || 1;

  let gpuTier: Tier = 'mid';
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') as WebGLRenderingContext | null;
    if (gl) {
      const dbg = gl.getExtension('WEBGL_debug_renderer_info');
      const renderer = dbg ? (gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL) as string) : '';
      if (/Apple|RTX|Radeon Pro|M1|M2|M3|M4/i.test(renderer)) gpuTier = 'high';
      else if (/Adreno|Mali|PowerVR|Intel/i.test(renderer)) gpuTier = isMobile ? 'low' : 'mid';
    }
  } catch {}

  if (isMobile) return gpuTier === 'high' ? 'mid' : 'low';
  if (cores >= 8 && dpr >= 2) return gpuTier === 'low' ? 'mid' : 'high';
  if (cores <= 4) return 'low';
  return gpuTier;
}

export function usePerfTier() {
  const setTier = useCinema((s) => s.setTier);
  const setReducedMotion = useCinema((s) => s.setReducedMotion);
  useEffect(() => {
    setTier(detectTier());
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const h = () => setReducedMotion(mq.matches);
    mq.addEventListener('change', h);
    return () => mq.removeEventListener('change', h);
  }, [setTier, setReducedMotion]);
}
