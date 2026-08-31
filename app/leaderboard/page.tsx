import CinemaShellClient from '@/components/cinema/CinemaShellClient';
import { LeaderboardTable } from '@/components/ui/LeaderboardTable';
import { Grain } from '@/components/ui/Grain';

export default function LeaderboardPage() {
  return (
    <>
      <Grain />
      <CinemaShellClient>
        <main className="relative z-10 min-h-screen grid grid-rows-[auto_1fr_auto] p-8 md:p-16">

          {/* Header */}
          <header className="flex justify-between items-center">
            <div className="flex items-baseline gap-3">
              <span className="font-bold text-3xl md:text-5xl">Reddie's</span>
              <span className="italic text-3xl md:text-5xl text-crimson">Universe</span>
              <span className="text-white/20 text-xl mx-2">×</span>
              <span className="font-bold text-2xl md:text-4xl">BNI</span>
              <span className="italic text-2xl md:text-4xl text-crimson">Natcon 2026.</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 border border-crimson/40 rounded-full text-[10px] uppercase tracking-[0.3em] text-crimson">
              <span className="w-2 h-2 rounded-full bg-crimson animate-pulse shadow-crimson" />
              Live · Auto-refresh
            </div>
          </header>

          {/* Leaderboard */}
          <div className="self-center w-full">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="w-2 h-2 rounded-full bg-crimson shadow-[0_0_14px_#FF2D2A]" />
                <span className="text-[10px] tracking-[0.45em] uppercase text-white/50">
                  Givers Gain · Interactive Game
                </span>
              </div>
              <h1 className="font-bold text-5xl md:text-7xl">
                Top <span className="italic text-crimson">Players</span>
              </h1>
              <p className="mt-3 text-[10px] md:text-xs tracking-[0.4em] uppercase text-white/40">
                Booth WIT Indonesia · BNI Natcon 2026
              </p>
            </div>
            <LeaderboardTable />
          </div>

          {/* Footer */}
          <footer className="flex justify-between items-center pt-8 border-t border-crimson/10">
            <div>
              <p className="font-bold text-lg md:text-xl text-white">WIT Indonesia</p>
              <p className="text-xs tracking-[0.2em] uppercase text-white/40 mt-1">
                Empowering Business with Smart Digital Solutions
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="font-bold text-base text-crimson">www.wit.id</div>
                <div className="text-[10px] uppercase tracking-[0.25em] text-white/40 mt-1">
                  Scan untuk info
                </div>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=https%3A%2F%2Fwit.id&bgcolor=080102&color=FF2D2A"
                alt="WIT QR"
                className="w-20 h-20 md:w-24 md:h-24 bg-ink p-1.5 rounded border border-crimson/30"
              />
            </div>
          </footer>
        </main>
      </CinemaShellClient>
    </>
  );
}
