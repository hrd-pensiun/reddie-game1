'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function NameCTA() {
  const [name, setName] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const existing = localStorage.getItem('gg_player_name');
    if (existing) setName(existing);
  }, []);

  const start = () => {
    if (name.trim().length < 2) return;
    localStorage.setItem('gg_player_name', name.trim());
    document.body.style.transition = 'opacity 0.5s';
    document.body.style.opacity = '0';
    setTimeout(() => (window.location.href = '/game.html'), 500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center gap-8"
    >
      <input
        type="text"
        value={mounted ? name : ''}
        onChange={(e) => setName(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && start()}
        placeholder="Tuliskan namamu"
        maxLength={20}
        className="w-[min(420px,90vw)] bg-transparent border-b border-crimson text-white text-2xl font-display text-center py-4 outline-none placeholder:text-white/30 placeholder:italic focus:border-white transition-colors"
      />
      <button
        onClick={start}
        disabled={name.trim().length < 2}
        className="px-12 py-4 bg-crimson text-white font-bold tracking-[0.3em] text-sm uppercase transition-all hover:bg-crimson-deep hover:scale-105 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-[0_0_40px_rgba(255,45,42,0.35)]"
      >
        Enter Universe
      </button>
    </motion.div>
  );
}
