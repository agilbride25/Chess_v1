'use client';

// A tiny wrapper around the Stockfish WASM worker (npm: stockfish).
// Uses dynamic import so it works in the browser with Next/Turbopack.

export type SFScore = { type: 'cp' | 'mate'; value: number };
export type SFResult = { bestmove: string; score: SFScore };

function parseInfo(line: string): SFScore | null {
  // Examples: "info depth 14 ... score cp 32" or "score mate -2"
  const m = line.match(/score\s+(cp|mate)\s+(-?\d+)/);
  if (!m) return null;
  const [, type, val] = m;
  return { type: type as 'cp' | 'mate', value: parseInt(val, 10) };
}

export class StockfishClient {
  private workerPromise: Promise<Worker>;
  private listeners: Array<(s: string) => void> = [];

  constructor() {
    // Load Stockfish from /public to avoid Turbopack resolution issues.
    this.workerPromise = (async () => {
    // Use the "single" build so the worker fetches its own WASM parts by relative path
    const worker = new Worker('/stockfish/stockfish-17.1-single-a496a04.js', {
        type: 'classic', // stockfish is a classic (non-module) worker script
    });

    worker.onmessage = (e: MessageEvent<string>) => {
        const line = e.data;
        for (const fn of this.listeners) fn(line);
    };

    worker.postMessage('uci');
    worker.postMessage('isready');
    return worker;
    })();
  }

  private async post(cmd: string) {
    const w = await this.workerPromise;
    w.postMessage(cmd);
  }

  onLine(fn: (s: string) => void) {
    this.listeners.push(fn);
    return () => {
      this.listeners = this.listeners.filter((f) => f !== fn);
    };
  }

  async analyzeFen(fen: string, depth = 14, searchMove?: string): Promise<SFResult> {
    let lastScore: SFScore = { type: 'cp', value: 0 };

    const bestMovePromise = new Promise<string>((resolve) => {
      const off = this.onLine((line) => {
        const s = parseInfo(line);
        if (s) lastScore = s;

        const m = line.match(/bestmove\s+([a-h][1-8][a-h][1-8][qrbn]?)/);
        if (m) {
          off();
          resolve(m[1]);
        }
      });
    });

    await this.post('ucinewgame');
    await this.post(`position fen ${fen}`);
    await this.post(searchMove ? `go depth ${depth} searchmoves ${searchMove}` : `go depth ${depth}`);

    const bestmove = await bestMovePromise;
    return { bestmove, score: lastScore };
  }
}

// (Optional) also export default for flexibility
export default StockfishClient;
