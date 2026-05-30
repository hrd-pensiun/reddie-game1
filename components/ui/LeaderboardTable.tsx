'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Entry = { ts: number; name: string; industry: string; cuan: number; stage: number };
const LB_KEY = 'givers_gain_scores';
const REFRESH_MS = 10000;

function fmtRp(n: number) {
  return 'Rp ' + Math.max(0, n).toLocaleString('id-ID');
}

export function LeaderboardTable() {
  const [scores, setScores] = useState<Entry[]>([]);
  const [hash, setHash] = useState('');

  useEffect(() => {
    const read = () => {
      try {
        const raw = JSON.parse(localStorage.getItem(LB_KEY) || '[]') as Entry[];
        const top = raw.slice(0, 10);
        const h = JSON.stringify(top.map((s) => [s.ts, s.cuan]));
        setHash((prev) => (prev === h ? prev : h));
        setScores(top);
      } catch {
        setScores([]);
      }
    };
    read();
    const iv = setInterval(read, REFRESH_MS);
    const onStorage = (e: StorageEvent) => e.key === LB_KEY && read();
    window.addEventListener('storage', onStorage);
    return () => {
      clearInterval(iv);
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  if (!scores.length) {
    return (
      <div className="text-center py-24 font-display italic text-3xl text-white/30">
        Belum ada pemain. Jadilah yang pertama!
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3" key={hash}>
      <AnimatePresence initial={true}>
        {scores.map((s, i) => {
          const accent =
            i === 0
              ? 'gold-row'
              : i === 1
              ? 'silver-row'
              : i === 2
              ? 'bronze-row'
              : '';
          const medal = i === 0 ? '🏆' : i === 1 ? '🥈' : i === 2 ? '🥉' : '';
          return (
            <motion.div
              key={s.ts}
              layout
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className={`grid grid-cols-[60px_1fr_180px_80px_220px] items-center px-6 py-5 rounded-md border backdrop-blur-md ${
                accent === 'gold-row'
                  ? 'border-crimson/40 bg-gradient-to-r from-crimson/15 to-transparent'
                  : accent === 'silver-row'
                  ? 'border-white/40 bg-gradient-to-r from-white/10 to-transparent'
                  : accent === 'bronze-row'
                  ? 'border-orange-700/50 bg-gradient-to-r from-orange-700/15 to-transparent'
                  : 'border-crimson/40/12 bg-[rgba(20,22,28,0.6)]'
              }`}
            >
              <div className="font-display font-semibold text-2xl text-white/50">
                {medal} <span className={accent ? 'text-crimson' : ''}>{i + 1}</span>
              </div>
              <div className="font-display text-2xl">{s.name}</div>
              <div className="text-xs uppercase tracking-[0.15em] text-white/55">{s.industry}</div>
              <div className="font-display text-lg text-white/60">{s.stage}/3</div>
              <div className="text-right font-display text-2xl text-crimson font-semibold">
                {fmtRp(s.cuan)}
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
