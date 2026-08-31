'use client';
import { motion } from 'framer-motion';
import { NameCTA } from './NameCTA';

const ease = [0.16, 1, 0.3, 1] as const;
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 1.2, ease } },
};
const stagger = { show: { transition: { staggerChildren: 0.08 } } };

function Section({ id, children, className = '' }: { id: string; children: React.ReactNode; className?: string }) {
  return (
    <section id={id} className={`relative min-h-screen flex items-center px-6 md:px-20 ${className}`}>
      <div className="w-full max-w-6xl mx-auto">{children}</div>
    </section>
  );
}

function PhaseLabel({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 text-[10px] tracking-[0.4em] uppercase text-white/40">
      <span className="text-crimson">{n}</span>
      <span className="w-8 h-px bg-white/20" />
      <span>{children}</span>
    </div>
  );
}

export function CinemaContent() {
  return (
    <main id="cinema-scroll" className="relative z-10">
      {/* Scene 0 — Hero / Hook */}
      <Section id="scene-0" className="justify-center">
        <motion.div
          initial="hidden" animate="show" variants={stagger}
          className="flex flex-col items-center text-center"
        >
          {/* Reddie mascot — top center */}
          <motion.div variants={fadeUp}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/reddie.gif"
              alt="Reddie"
              className="w-[120px] md:w-[150px] drop-shadow-[0_0_30px_rgba(255,45,42,0.3)] select-none pointer-events-none"
              draggable={false}
            />
          </motion.div>

          {/* Brand label */}
          <motion.div variants={fadeUp} className="flex items-center gap-3 justify-center mt-5 mb-6">
            <span className="w-2 h-2 rounded-full bg-crimson shadow-[0_0_14px_#FF2D2A]" />
            <span className="text-[10px] tracking-[0.45em] uppercase text-white/55">Reddie's Universe × BNI Natcon 2026</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            className="font-bold text-[clamp(3rem,9vw,7.5rem)] leading-[0.95] tracking-tight"
          >
            We're{' '}
            <span className="italic text-crimson">Reddie</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-5 text-[clamp(0.7rem,1.2vw,0.9rem)] tracking-[0.28em] uppercase text-white/50"
          >
            Welcome to Reddie's Universe — by WIT Indonesia
          </motion.p>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-white/50"
        >
          <span className="text-[10px] uppercase tracking-[0.4em]">Scroll</span>
          <div className="w-px h-16 bg-gradient-to-b from-crimson to-transparent animate-pulse" />
        </motion.div>
      </Section>

      {/* Scene 2 — Stage One Instruction */}
      <Section id="scene-1">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }} variants={stagger}>
          <motion.div variants={fadeUp}><PhaseLabel n="02">Stage One — Instruction</PhaseLabel></motion.div>
          <motion.h2
            variants={fadeUp}
            className="font-display text-[clamp(2.4rem,6vw,5.2rem)] leading-[1.05] mt-8 max-w-3xl"
          >
            Every enterprise carries{' '}
            <span className="italic text-crimson">layers of connection.</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-6 text-base md:text-lg text-white/55 max-w-xl leading-relaxed"
          >
            Opportunities. Relationships. Referrals.
          </motion.p>
          <motion.ul
            variants={stagger}
            className="mt-8 space-y-3 text-base md:text-lg text-white/70 max-w-xl"
          >
            {[
              'Move through the network.',
              'Connect with other business owners.',
              'Collect as many referrals as possible.',
            ].map((line) => (
              <motion.li
                key={line}
                variants={fadeUp}
                className="flex items-baseline gap-3"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-crimson translate-y-[-2px] shrink-0" />
                <span>{line}</span>
              </motion.li>
            ))}
          </motion.ul>
          <motion.p
            variants={fadeUp}
            className="mt-10 font-bold text-lg md:text-2xl text-white max-w-xl leading-snug"
          >
            The more you give, the <span className="italic text-crimson">more you rise.</span>
          </motion.p>
        </motion.div>
      </Section>

      {/* Scene 3 — Development */}
      <Section id="scene-2" className="items-end pb-24">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }} variants={stagger} className="md:ml-auto md:max-w-xl text-right">
          <motion.div variants={fadeUp} className="flex justify-end"><PhaseLabel n="03">Development</PhaseLabel></motion.div>
          <motion.h2 variants={fadeUp} className="font-display text-[clamp(2.2rem,5.4vw,4.6rem)] leading-[1.08] mt-8">
            See the <span className="italic text-crimson">bigger picture,</span>
            <br />
            take control of the board.
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-6 text-base md:text-lg text-white/60 leading-relaxed">
            Stop struggling with messy data.
            <br />
            <span className="text-white/85">Reddie by WIT Indonesia</span> gives you clear insights for growth.
          </motion.p>
        </motion.div>
      </Section>

      {/* Scene 4 — Peak: the transformation */}
      <Section id="scene-3" className="justify-center">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }} variants={stagger} className="text-center">
          <motion.div variants={fadeUp} className="flex justify-center"><PhaseLabel n="04">The Peak</PhaseLabel></motion.div>
          <motion.h2 variants={fadeUp} className="font-display text-[clamp(2.6rem,7vw,6rem)] leading-[1] mt-8">
            Complexity becomes <span className="italic text-crimson">order.</span>
          </motion.h2>
          <motion.div variants={fadeUp} className="mt-12 grid grid-cols-3 gap-8 md:gap-16 max-w-3xl mx-auto">
            {[
              { v: '360°', l: 'Coverage' },
              { v: 'End-to-End', l: 'Solutions' },
              { v: 'Enterprise', l: 'Grade' },
            ].map((s) => (
              <div key={s.l}>
                <div className="font-display text-2xl md:text-4xl text-white">{s.v}</div>
                <div className="mt-2 text-[10px] tracking-[0.3em] uppercase text-white/45">{s.l}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </Section>

      {/* Scene 5 — Resolution: brand reveal + CTA */}
      <Section id="scene-4" className="justify-center">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.5 }} variants={stagger} className="text-center">
          <motion.div variants={fadeUp} className="flex justify-center"><PhaseLabel n="05">Resolution</PhaseLabel></motion.div>
          <motion.div variants={fadeUp} className="mt-10 flex items-center justify-center gap-4 mb-8">
            <span className="w-3 h-3 rounded-full bg-crimson shadow-[0_0_24px_#FF2D2A]" />
            <span className="font-display text-3xl md:text-5xl tracking-tight">
              <span className="text-white">Reddie's</span>{' '}
              <span className="italic text-white/80">Universe</span>
              <span className="text-white/30 mx-3">×</span>
              <span className="text-white font-semibold">BNI</span>{' '}
              <span className="italic text-crimson">Rise.</span>
            </span>
          </motion.div>
          <motion.h2 variants={fadeUp} className="font-display text-[clamp(2rem,5vw,4rem)] leading-[1.1] mt-6">
            Ready to <span className="italic text-crimson">play the game?</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-4 text-sm tracking-[0.3em] uppercase text-white/55">
            Givers Gain · The Interactive Experience
          </motion.p>
          <motion.div variants={fadeUp} className="mt-10">
            <NameCTA />
          </motion.div>
          <motion.a
            href="/leaderboard"
            variants={fadeUp}
            className="inline-block mt-10 text-xs uppercase tracking-[0.3em] text-white/50 hover:text-crimson transition-colors"
          >
            View Leaderboard →
          </motion.a>
        </motion.div>
      </Section>
    </main>
  );
}
