// The demo club's sales chart (Console home and its phone version).

// Deterministic pseudo-random series (same chart on server and client).
function rng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

export type Period = { k: string; label: string; vs: string; tot: number; d: number; n: number };

export function series(p: Period) {
  const r = rng(p.n * 31 + 7);
  const sendAgo = [3, 5, 7, 14, 21, 28, 35, 41].filter((a) => a < p.n);
  const raw = Array.from({ length: p.n }, (_, i) => {
    const ago = p.n - 1 - i;
    const dow = (6 - (ago % 7) + 7) % 7; // 6 = today is Saturday
    const weekend = dow === 5 || dow === 6 ? 1.15 : dow === 4 ? 0.55 : 0;
    const boost = sendAgo.some((a) => ago <= a && ago >= a - 2) ? 0.8 : 0;
    return 0.55 + weekend + boost + r() * 0.45;
  });
  const prevRaw = raw.map(() => 0.7 + r() * 0.9);
  const sum = raw.reduce((a, b) => a + b, 0);
  const psum = prevRaw.reduce((a, b) => a + b, 0);
  const prevTot = p.tot / (1 + p.d);
  return {
    vals: raw.map((v) => (v / sum) * p.tot),
    prev: prevRaw.map((v) => (v / psum) * prevTot),
    sends: sendAgo.map((a) => p.n - 1 - a),
  };
}
