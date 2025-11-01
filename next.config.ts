// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Turbopack-friendly: transpile stockfish so the WASM worker bundles correctly
  transpilePackages: ['stockfish'],
};

export default nextConfig;
