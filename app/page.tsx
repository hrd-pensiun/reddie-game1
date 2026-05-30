import CinemaShellClient from '@/components/cinema/CinemaShellClient';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { NavDots } from '@/components/ui/NavDots';
import { Grain } from '@/components/ui/Grain';
import { CinemaContent } from '@/components/ui/CinemaContent';

export default function HomePage() {
  return (
    <>
      <ProgressBar />
      <NavDots />
      <Grain />
      <CinemaShellClient>
        <CinemaContent />
      </CinemaShellClient>
    </>
  );
}
