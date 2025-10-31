export function scoreToCp(score: { type: 'cp' | 'mate'; value: number }): number {
if (score.type === 'cp') return score.value;
// Map mate values to large centipawn swings keeping sign
return score.value > 0 ? 100000 : -100000;
}


export function deltaCp(a: number, b: number): number {
return Math.abs(a - b);
}


export function acplFromDeltas(d: number[]): number {
if (!d.length) return 0;
const mean = d.reduce((x, y) => x + y, 0) / d.length;
return Math.round(mean);
}


export function accuracyFromAcpl(acpl: number): number {
// Smooth, forgiving curve: 0 ACPL ~ 100, 100 ~ 80, 300 ~ 60
const acc = 100 - 0.12 * Math.pow(acpl, 0.9);
return Math.max(0, Math.min(100, Math.round(acc)));
}


export function classify(delta: number): 'ok' | 'inaccuracy' | 'mistake' | 'blunder' {
if (delta >= 300) return 'blunder';
if (delta >= 100) return 'mistake';
if (delta >= 30) return 'inaccuracy';
return 'ok';
}