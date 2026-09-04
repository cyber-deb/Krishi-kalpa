export function computeClientSoilScore(ph: number, ec: number, n: number, p: number, k: number): number {
  let score = 100;
  if (ph < 6.0) score -= (6.0 - ph) * 15;
  if (ph > 7.8) score -= (ph - 7.8) * 15;
  if (ec > 1.2) score -= (ec - 1.2) * 20;
  if (n < 40) score -= 8;
  if (n > 90) score -= 12;
  if (p < 30) score -= 6;
  if (k < 40) score -= 6;
  return Math.max(15, Math.min(98, Math.round(score)));
}
