import './globals.css';
import type { Metadata } from 'next';


export const metadata: Metadata = {
title: 'AI Chess Coach',
description: 'Paste a PGN from Chess.com or Lichess, get analysis, accuracy, and coaching.',
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
return (
<html lang="en">
<body className="min-h-screen bg-gray-50 text-gray-900">{children}</body>
</html>
);
}
