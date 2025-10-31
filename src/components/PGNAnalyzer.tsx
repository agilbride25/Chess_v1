'use client';

import { useMemo, useRef, useState } from 'react';
import { Chess } from 'chess.js';
import { Send } from 'lucide-react';

import { StockfishClient } from '@/components/EngineWorker';
import {
  acplFromDeltas,
  accuracyFromAcpl,
  classify,
  deltaCp,
  scoreToCp,
} from '@/lib/accuracy';

type PlyEval = {
  ply: number;
  fen: string;
  san: string;
  uci: string;
  best: string;
  cpPlayed: number;
  cpBest: number;
  delta: number;
  tag: ReturnType<typeof classify>;
};

export default function PGNAnalyzer() {
  const [pgn, setPgn] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [evals, setEvals] = useState<PlyEval[]>([]);
  const [acpl, setAcpl] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [summary, setSummary] = useState('');

  const sfRef = useRef<StockfishClient | null>(null);
  if (typeof window !== 'undefined' && !sfRef.current) {
    sfRef.current = new StockfishClient();
  }

  const analyze = async () => {
    setBusy(true);
    setError(null);
    setEvals([]);

    try {
      const chess = new Chess();

      // Load without the deprecated 'sloppy' option
      chess.loadPgn(pgn);

      // Validate that a game actually loaded
      if (chess.history().length === 0) {
        throw new Error('Invalid PGN. Paste a full game from Chess.com or Lichess.');
      }

      const sans = chess.history(); // SAN strings
      const walker = new Chess();
      walker.reset();

      const rows: PlyEval[] = [];

      for (let i = 0; i < sans.length; i++) {
        const fen = walker.fen();
        const san = sans[i];

        // map SAN to UCI
        const move = walker.moves({ verbose: true }).find((m) => m.san === san);
        if (!move) throw new Error(`Could not translate SAN on ply ${i + 1}`);
        const uci = `${move.from}${move.to}${move.promotion ?? ''}`;

        const sf = sfRef.current!;
        const bestRes = await sf.analyzeFen(fen, 14);
        const playedRes = await sf.analyzeFen(fen, 14, uci);

        const cpBest = scoreToCp(bestRes.score);
        const cpPlayed = scoreToCp(playedRes.score);
        const d = deltaCp(cpBest, cpPlayed);

        rows.push({
          ply: i + 1,
          fen,
          san,
          uci,
          best: bestRes.bestmove,
          cpPlayed,
          cpBest,
          delta: d,
          tag: classify(d),
        });

        walker.move(san);
      }

      const deltas = rows.map((r) => r.delta);
      const mean = acplFromDeltas(deltas);
      const acc = accuracyFromAcpl(mean);

      setEvals(rows);
      setAcpl(mean);
      setAccuracy(acc);

      const blunders = rows.filter((r) => r.tag === 'blunder').slice(0, 3);
      const mistakes = rows.filter((r) => r.tag === 'mistake').slice(0, 3);
      const opening = rows.slice(0, 10).reduce((a, r) => a + r.delta, 0);
      const endgame = rows.slice(-10).reduce((a, r) => a + r.delta, 0);

      const s = `Accuracy: ${acc}% (ACPL ${mean}). Biggest swings on moves ${
        [...blunders, ...mistakes].map((r) => r.ply).join(', ') || '—'
      }.
Opening turbulence: ${opening} cp; Endgame: ${endgame} cp. Keep going—you’ve got this!`;
      setSummary(s);
    } catch (e: any) {
      setError(e.message || 'Failed to analyze.');
    } finally {
      setBusy(false);
    }
  };

  const keyMoments = useMemo(
    () => evals.slice().sort((a, b) => b.delta - a.delta).slice(0, 5),
    [evals]
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-4">
        <div className="bg-white p-4 rounded-2xl shadow border">
          <h1 className="text-2xl font-semibold mb-2">AI Chess Coach</h1>
          <p className="text-sm text-gray-600 mb-3">
            Paste a PGN from Chess.com or Lichess and click Analyze. All engine work runs in your
            browser using Stockfish WASM.
          </p>
          <textarea
            className="w-full min-h-[180px] border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Paste PGN here…"
            value={pgn}
            onChange={(e) => setPgn(e.target.value)}
          />
          <div className="flex items-center gap-3 mt-3">
            <button
              onClick={analyze}
              disabled={busy}
              className="px-4 py-2 rounded-xl bg-indigo-600 text-white disabled:opacity-60"
            >
              {busy ? 'Analyzing…' : 'Analyze'}
            </button>
            {error && <span className="text-red-600 text-sm">{error}</span>}
          </div>
        </div>

        {evals.length > 0 && (
          <div className="bg-white p-4 rounded-2xl shadow border">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
              <div className="p-3 rounded-xl bg-gray-50 border">
                <div className="text-gray-500">Accuracy</div>
                <div className="text-xl font-semibold">{accuracy}%</div>
              </div>
              <div className="p-3 rounded-xl bg-gray-50 border">
                <div className="text-gray-500">ACPL</div>
                <div className="text-xl font-semibold">{acpl}</div>
              </div>
              <div className="p-3 rounded-xl bg-gray-50 border">
                <div className="text-gray-500">Moves</div>
                <div className="text-xl font-semibold">{evals.length}</div>
              </div>
              <div className="p-3 rounded-xl bg-gray-50 border">
                <div className="text-gray-500">Key swings</div>
                <div className="text-xl font-semibold">{keyMoments.length}</div>
              </div>
            </div>

            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left border-b">
                    <th className="py-2 pr-2">Ply</th>
                    <th className="py-2 pr-2">SAN</th>
                    <th className="py-2 pr-2">Best (UCI)</th>
                    <th className="py-2 pr-2">Δ cp</th>
                    <th className="py-2 pr-2">Tag</th>
                  </tr>
                </thead>
                <tbody>
                  {evals.map((r) => (
                    <tr key={r.ply} className="border-b last:border-0">
                      <td className="py-2 pr-2">{r.ply}</td>
                      <td className="py-2 pr-2">{r.san}</td>
                      <td className="py-2 pr-2 font-mono">{r.best}</td>
                      <td className="py-2 pr-2">{r.delta}</td>
                      <td className="py-2 pr-2">
                        <span
                          className={`px-2 py-0.5 rounded-lg text-xs border ${
                            r.tag === 'ok' ? '' : 'bg-orange-50'
                          }`}
                        >
                          {r.tag}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4">
              <h3 className="font-medium mb-2">Biggest swings</h3>
              <ul className="list-disc list-inside text-sm text-gray-700">
                {keyMoments.map((r) => (
                  <li key={r.ply}>
                    Move {r.ply}: played {r.san} vs best {r.best} — Δ {r.delta} cp
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-4">
        <ChatCoach summary={summary} />
      </div>
    </div>
  );
}

function ChatCoach({ summary }: { summary: string }) {
  const [q, setQ] = useState(
    'Why was my biggest swing bad, and what pattern should I watch for?'
  );
  const [a, setA] = useState<string>('');
  const [busy, setBusy] = useState(false);

  const ask = async () => {
    setBusy(true);
    setA('');
    try {
      const res = await fetch('/api/coach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: q, summary }),
      });
      const data = await res.json();
      setA(data.answer || '');
    } catch {
      setA('Sorry — I could not answer right now.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded-2xl shadow border">
      <h2 className="text-lg font-semibold mb-2">Ask the Coach</h2>
      <p className="text-xs text-gray-600 mb-2">
        Grounded on your current game summary. Add your move number or SAN for a focused answer.
      </p>
      <div className="flex gap-2">
        <input
          className="flex-1 border rounded-xl px-3 py-2"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <button
          onClick={ask}
          disabled={busy}
          className="px-3 py-2 rounded-xl bg-indigo-600 text-white flex items-center gap-1 disabled:opacity-60"
        >
          <Send size={16} />
          Ask
        </button>
      </div>
      {a && <div className="mt-3 text-sm whitespace-pre-line">{a}</div>}
    </div>
  );
}
