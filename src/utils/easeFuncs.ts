function cubicBezier(
  t: number,
  initial: number,
  p1: number,
  p2: number,
  final: number
) {
  const u = 1 - t;
  const tt = t * t;
  const uu = u * u;
  const uuu = uu * u;
  const ttt = tt * t;

  const p = uuu * initial;
  const q = 3 * uu * t * p1;
  const r = 3 * u * tt * p2;
  const s = ttt * final;

  return p + q + r + s;
}

function cubicBezierEase(t: number) {
  return cubicBezier(t, 0, 0.8, 0.8, 1);
}

export { cubicBezierEase };
