'use client';
import dynamic from 'next/dynamic';
import type { ReactNode } from 'react';

const CinemaShell = dynamic(
  () => import('./CinemaShell').then((m) => m.CinemaShell),
  { ssr: false }
);

export default function CinemaShellClient({ children }: { children: ReactNode }) {
  return <CinemaShell>{children}</CinemaShell>;
}
