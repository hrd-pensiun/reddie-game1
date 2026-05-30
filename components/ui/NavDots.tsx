'use client';
import { useCinema, sceneFromProgress, type Scene } from '@/store/cinema';
import { motion } from 'framer-motion';

const SCENES: { id: Scene; label: string }[] = [
  { id: 'intro', label: 'Hook' },
  { id: 'network', label: 'Build-up' },
  { id: 'manifesto', label: 'Development' },
  { id: 'steps', label: 'The Peak' },
  { id: 'cta', label: 'Resolution' },
];

export function NavDots() {
  const progress = useCinema((s) => s.progress);
  const active = sceneFromProgress(progress);
  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2 }}
      className="fixed right-6 md:right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4"
    >
      {SCENES.map((s, i) => (
        <a
          key={s.id}
          href={`#scene-${i}`}
          aria-label={s.label}
          className="group relative flex items-center gap-3"
        >
          <span className="hidden md:block text-[10px] uppercase tracking-[0.3em] text-white/40 group-hover:text-crimson transition-colors">
            {s.label}
          </span>
          <span
            className={`block rounded-full border transition-all duration-300 ${
              active === s.id
                ? 'w-3 h-3 bg-crimson border-crimson scale-125'
                : 'w-2 h-2 bg-transparent border-white/30'
            }`}
          />
        </a>
      ))}
    </motion.nav>
  );
}
