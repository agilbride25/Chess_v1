import './globals.css';
import type { Metadata } from 'next';


export const metadata: Metadata = {
title: 'AI Chess Coach',
description: 'Paste a PGN from Chess.com or Lichess, get analysis, accuracy, and coaching.',
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
return (
<html lang="en">
      <body className="min-h-screen bg-gradient-to-b from-indigo-950 via-purple-950 to-black text-violet-100 antialiased">{children}</body>
</html>
);
}
