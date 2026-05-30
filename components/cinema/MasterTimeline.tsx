'use client';
import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCinema, sceneFromProgress } from '@/store/cinema';
import * as THREE from 'three';

/**
 * Master timeline drives camera + fog + exposure based on scroll progress.
 * One single ScrollTrigger pinned to the whole experience.
 */
export function MasterTimeline({ pageHeight = '500vh' }: { pageHeight?: string }) {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const proxy = { progress: 0 };

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#cinema-scroll',
        start: 'top top',
        end: 'bottom bottom',
        scrub: reduced ? false : 0.6,
      },
    });
    tl.to(proxy, {
      progress: 1,
      ease: 'none',
      onUpdate: () => {
        const p = proxy.progress;
        const state = useCinema.getState();
        state.setProgress(p);
        const scene = sceneFromProgress(p);
        if (scene !== state.scene) state.setScene(scene);

        // Camera choreography per scene (master keyframes)
        const cp = state.cameraPosition;
        const ct = state.cameraTarget;
        if (p < 0.18) {
          // Scene 1 — Hook: macro close-up on monolith, slight pull-back as laser fires
          const t = p / 0.18;
          cp.set(lerp(0.4, 0, t), 0, lerp(2.2, 6, t));
          ct.set(0, 0, 0);
          state.fogDensity = lerp(0.16, 0.07, t);
        } else if (p < 0.42) {
          // Scene 2 — Build-up: low-angle tracking through curved glass fins
          const t = (p - 0.18) / 0.24;
          cp.set(lerp(-9, 9, t), lerp(-1.8, -1.2, t), lerp(4, 6, t));
          ct.set(lerp(-6, 6, t), 0, -2);
          state.fogDensity = lerp(0.08, 0.05, t);
        } else if (p < 0.62) {
          // Scene 3 — Development: ease into 3/4 angle, HOLD through middle, exit at end.
          const t = (p - 0.42) / 0.2;
          // Settle: 0→0.3 ease in, 0.3→0.8 hold, 0.8→1.0 drift out
          let enter = 0;
          if (t < 0.3) enter = t / 0.3;
          else if (t < 0.8) enter = 1;
          else enter = 1 - (t - 0.8) / 0.2 * 0.25; // mild drift toward exit
          // Hold framing (matches the Development screenshot)
          cp.set(
            lerp(7.5, 3.8, enter),
            lerp(-1.2, 0.4, enter),
            lerp(9.5, 7.0, enter)
          );
          ct.set(0, lerp(0, 0.9, enter), 0);
          state.fogDensity = lerp(0.05, 0.035, enter);
        } else if (p < 0.82) {
          // Scene 4 — Peak: rise into climactic wide aerial of light wave
          const t = (p - 0.62) / 0.2;
          cp.set(lerp(0, 0, t), lerp(0.4, 8, t), lerp(6, 12, t));
          ct.set(0, 0, 0);
          state.fogDensity = lerp(0.035, 0.025, t);
          state.exposure = lerp(1, 1.25, t);
        } else {
          // Scene 5 — Resolution: settle to centered end-screen
          const t = (p - 0.82) / 0.18;
          cp.set(0, lerp(2, 0, t), lerp(10, 4, t));
          ct.set(0, 0, 0);
          state.fogDensity = lerp(0.025, 0.04, t);
          state.exposure = lerp(1.25, 1.1, t);
        }
      },
    });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [pageHeight]);

  return null;
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * Math.max(0, Math.min(1, t));
}
