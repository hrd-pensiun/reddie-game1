'use client';
import { useCinema } from '@/store/cinema';

export function ProgressBar() {
  const p = useCinema((s) => s.progress);
  return (
    <div className="fixed top-0 left-0 right-0 h-[2px] z-50 bg-transparent">
      <div
        className="h-full bg-crimson origin-left"
        style={{ transform: `scaleX(${p})`, transition: 'transform 0.1s linear' }}
      />
    </div>
  );
}
