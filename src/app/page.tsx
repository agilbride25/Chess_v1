// app/page.tsx
// Landing page for "AI Chess Coach" inspired by noctie.ai
// Drop this file into src/app/page.tsx (App Router). Tailwind is assumed to be configured.

import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-indigo-950 via-purple-950 to-black text-violet-100">
      {/* Nav */}
      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-black/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-white/5 grid place-items-center ring-1 ring-white/10">
                <span className="text-lg">♟️</span>
              </div>
              <span className="font-semibold tracking-tight">AI Chess Coach</span>
            </div>
            <nav className="hidden md:flex items-center gap-6 text-sm text-violet-200/80">
              <a href="#features" className="hover:text-white">Features</a>
              <a href="#how" className="hover:text-white">How it works</a>
              <a href="#integrations" className="hover:text-white">Integrations</a>
              <a href="#faq" className="hover:text-white">FAQ</a>
            </nav>
            <div className="flex items-center gap-3">
              <Link href="/app" className="rounded-2xl bg-zinc-800/60 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-black/30 border border-white/10 hover:bg-zinc-700/60">Open App</Link>
              <a href="#cta" className="rounded-2xl bg-zinc-800/60 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-black/30 border border-white/10 hover:bg-zinc-700/60">Start free</a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 opacity-50 [mask-image:radial-gradient(60%_60%_at_50%_0%,black,transparent)]">
          <div className="mx-auto mt-[-6rem] h-[28rem] w-[28rem] rounded-full bg-fuchsia-500/20 blur-3xl" />
        </div>
        <div className="mx-auto max-w-7xl px-4 py-20 sm:py-28">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div className="mx-auto max-w-2xl text-center md:text-left">
            <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-violet-200/80">
              <span className="inline-block h-2 w-2 rounded-full bg-fuchsia-400" /> Personal chess trainer
            </p>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Train like a human, guided by AI.
            </h1>
            <p className="mt-5 text-lg text-violet-200/80">
              Play, reflect, and improve with an AI coach that understands your thought process—then serves targeted puzzles to fix blind spots.
            </p>
            <div className="mt-8 flex flex-col items-center justify-start gap-3 sm:flex-row md:justify-start">
              <a href="#cta" className="rounded-2xl bg-zinc-800/60 px-6 py-3 font-medium text-white shadow-lg shadow-black/30 border border-white/10 hover:bg-zinc-700/60">Take a rating test</a>
              <Link href="/app" className="rounded-2xl bg-zinc-800/60 px-6 py-3 font-medium text-white shadow-lg shadow-black/30 border border-white/10 hover:bg-zinc-700/60">Try a demo</Link>
            </div>
            <p className="mt-6 text-sm text-violet-300/60">Join players learning smarter—no engine rage, just real progress.</p>
            </div>
            {/* Hero image dropzone */}
            <div>
              <div className="aspect-[16/10] w-full rounded-2xl border-2 border-dashed border-white/15 bg-white/5 p-4">
                <div className="h-full w-full rounded-xl border border-white/10 bg-gradient-to-br from-indigo-500/5 to-fuchsia-500/5 grid place-items-center text-violet-300/70 text-sm">
                  Hero image placeholder
                </div>
              </div>
            </div>
          </div>

          {/* Board preview placeholder */}
          <div className="mx-auto mt-14 grid max-w-5xl grid-cols-2 gap-6 sm:grid-cols-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="aspect-[4/3] rounded-xl border border-white/10 bg-white/5 p-3">
                <div className="h-full w-full rounded-md border border-white/10 bg-gradient-to-br from-violet-500/5 to-fuchsia-500/5" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social proof / value */}
      <section className="border-y border-white/10 bg-black/30">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:py-14">
          <div className="mb-6">
            <div className="aspect-[16/9] w-full rounded-2xl border-2 border-dashed border-white/15 bg-white/5 grid place-items-center text-violet-300/70 text-sm">Section image placeholder</div>
          </div>
          <div className="grid grid-cols-1 gap-6 text-center sm:grid-cols-3">
            <div>
              <p className="text-3xl font-semibold">Human‑style play</p>
              <p className="mt-1 text-sm text-violet-300/60">Natural mistakes, timing, and openings at your level.</p>
            </div>
            <div>
              <p className="text-3xl font-semibold">Guided reflection</p>
              <p className="mt-1 text-sm text-violet-300/60">Explain ideas aloud and get coaching like a real lesson.</p>
            </div>
            <div>
              <p className="text-3xl font-semibold">Personal puzzles</p>
              <p className="mt-1 text-sm text-violet-300/60">Auto‑generated decks from your most instructive mistakes.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-7xl px-4 py-20 border-t border-white/10">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Everything you need to improve</h2>
          <p className="mt-3 text-violet-200/80">From first move to insights after the game.</p>
        </div>
        <div className="mt-8">
          <div className="aspect-[16/9] w-full rounded-2xl border-2 border-dashed border-white/15 bg-white/5 grid place-items-center text-violet-300/70 text-sm">Features section image placeholder</div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Play at your level",
              desc: "Adaptive sparring partner that mirrors human play from beginner to master.",
            },
            {
              title: "Opening drills",
              desc: "Pick an opening and get the most common human responses—learn by playing full games.",
            },
            {
              title: "Thought‑process chat",
              desc: "Talk through candidate moves. The coach asks questions, not just gives evals.",
            },
            {
              title: "Missed‑tactics decks",
              desc: "We turn your mistakes into targeted puzzles with spaced repetition.",
            },
            {
              title: "Game insights",
              desc: "Color‑coded feedback, retry positions, and one‑click explanations.",
            },
            {
              title: "Chess.com sync",
              desc: "Connect your account to import games, track rating, and personalize drills.",
            },
          ].map((f) => (
            <div key={f.title} className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="mb-4 h-28 rounded-xl border-2 border-dashed border-white/15 bg-black/10 grid place-items-center text-xs text-violet-300/70">Card image</div>
              <div className="mb-3 text-xl font-semibold">{f.title}</div>
              <p className="text-sm text-violet-200/80">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="mx-auto max-w-7xl px-4 pb-20 border-t border-white/10">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">How it works</h2>
          <p className="mt-3 text-violet-200/80">Simple flow from play → reflect → practice.</p>
        </div>
        <div className="mt-8">
          <div className="aspect-[16/9] w-full rounded-2xl border-2 border-dashed border-white/15 bg-white/5 grid place-items-center text-violet-300/70 text-sm">How it works section image placeholder</div>
        </div>
        <ol className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
          {[
            {
              step: "1",
              title: "Play a game",
              desc: "Face the AI at your level with realistic time usage and opening choices.",
            },
            {
              step: "2",
              title: "Explain your ideas",
              desc: "Chatbot prompts you to verbalize plans and alternatives—then gives targeted feedback.",
            },
            {
              step: "3",
              title: "Fix the leaks",
              desc: "We auto‑generate puzzles from your misses and build daily decks to review.",
            },
          ].map((s) => (
            <li key={s.step} className="relative rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="mb-4 h-24 rounded-xl border-2 border-dashed border-white/15 bg-black/10 grid place-items-center text-xs text-violet-300/70">Step image</div>
              <span className="absolute -top-3 left-6 inline-flex h-8 w-8 items-center justify-center rounded-full bg-fuchsia-500 font-bold text-violet-950">
                {s.step}
              </span>
              <div className="mt-2 text-lg font-semibold">{s.title}</div>
              <p className="mt-1 text-sm text-violet-200/80">{s.desc}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Integrations */}
      <section id="integrations" className="mx-auto max-w-7xl px-4 pb-20 border-t border-white/10">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
          <h3 className="text-2xl font-semibold">Connect your chess.com</h3>
          <p className="mt-2 text-violet-200/80">
              Import recent games, follow your rating trend, and let the coach tailor drills to your real weaknesses.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <button className="rounded-2xl bg-zinc-800/60 px-4 py-2 font-medium text-white shadow-lg shadow-black/30 border border-white/10 hover:bg-zinc-700/60">Sign in with chess.com</button>
              <span className="text-xs text-violet-300/60">Coming soon</span>
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="h-56 rounded-lg border border-white/10 bg-gradient-to-br from-indigo-500/5 to-fuchsia-500/5" />
            <p className="mt-3 text-center text-xs text-violet-300/60">Dashboard mockup placeholder</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-5xl px-4 pb-24 border-t border-white/10">
        <h3 className="text-2xl font-semibold">FAQ</h3>
        <div className="mt-6 divide-y divide-white/10 rounded-2xl border border-white/10 bg-white/5">
          {[
            {
              q: "Is this just a stockfish wrapper?",
              a: "No. The long‑term goal is a coach that plays human‑like moves at your level and asks questions to teach, not just evaluate.",
            },
            { q: "Can I use it free?", a: "Yes—rating test, a demo game, and basic puzzle decks will be free." },
            { q: "What data do you store?", a: "We only store what’s needed to personalize training. You can delete your data anytime." },
          ].map((item) => (
            <details key={item.q} className="p-6 hover:bg-white/5">
              <summary className="cursor-pointer list-none text-base font-medium">{item.q}</summary>
              <p className="mt-2 text-sm text-violet-200/80">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="border-t border-white/10 bg-gradient-to-b from-indigo-950 to-black">
        <div className="mx-auto max-w-7xl px-4 py-16 text-center">
          <h3 className="text-3xl font-bold">Ready to train smarter?</h3>
          <p className="mx-auto mt-2 max-w-2xl text-violet-200/80">
            Start with a quick rating test and a guided game review. We’ll build your first tactic deck from real mistakes.
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <a href="/app" className="rounded-2xl bg-zinc-800/60 px-6 py-3 font-medium text-white shadow-lg shadow-black/30 border border-white/10 hover:bg-zinc-700/60">Open the demo</a>
            <a href="#features" className="rounded-2xl bg-zinc-800/60 px-6 py-3 font-medium text-white shadow-lg shadow-black/30 border border-white/10 hover:bg-zinc-700/60">Explore features</a>
          </div>
          <p className="mt-4 text-xs text-violet-300/60">No account needed for the demo.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-8 text-sm text-violet-300/70">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p>© {new Date().getFullYear()} AI Chess Coach. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <a className="hover:text-white" href="/privacy">Privacy</a>
              <a className="hover:text-white" href="/terms">Terms</a>
              <a className="hover:text-white" href="https://github.com/agilbride25/Chess_v1" target="_blank" rel="noreferrer">GitHub</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
