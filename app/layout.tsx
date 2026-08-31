import type { Metadata } from 'next';
import { DM_Sans } from 'next/font/google';
import { LenisProvider } from '@/components/providers/LenisProvider';
import './globals.css';

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  style: ['normal', 'italic'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Reddie's Universe × BNI Natcon 2026 — 360° Digital Transformation",
  description: 'End-to-end digital solutions for forward-thinking enterprises. Powered by WIT.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={dmSans.variable}>
      <body>
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
