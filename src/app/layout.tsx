import './globals.css';
import type { Metadata } from 'next';
import { Sora } from 'next/font/google';


export const metadata: Metadata = {
title: 'AI Chess Coach',
description: 'Paste a PGN from Chess.com or Lichess, get analysis, accuracy, and coaching.',
};

const sora = Sora({ subsets: ['latin'], variable: '--font-sora' });

export default function RootLayout({ children }: { children: React.ReactNode }) {
return (
<html lang="en">
      <body className={`min-h-screen bg-gradient-to-b from-indigo-950 via-purple-950 to-black text-violet-100 antialiased ${sora.variable} font-sans`}>{children}</body>
</html>
);
}
