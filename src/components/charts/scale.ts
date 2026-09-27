/** Small helpers shared by the hand-drawn SVG charts (no chart library needed). */

/** Round tick values that cover [min, max], e.g. (-410, 220) → [-600, -400, …, 400] */
export const niceTicks = (min: number, max: number, count = 5): number[] => {
  const lo = Math.min(min, 0);
  const hi = Math.max(max, 0);
  const rough = (hi - lo || 1) / count;
  const pow = 10 ** Math.floor(Math.log10(rough));
  const step = [1, 2, 2.5, 5, 10].map((m) => m * pow).find((s) => s >= rough) ?? rough;
  const start = Math.floor(lo / step) * step;
  const end = Math.ceil(hi / step) * step;
  const ticks: number[] = [];
  for (let v = start; v <= end + step / 2; v += step) ticks.push(Math.round(v * 1e6) / 1e6);
  return ticks;
};

/** Linear map from a data domain to a pixel range */
export const linear =
  ([d0, d1]: [number, number], [r0, r1]: [number, number]) =>
  (v: number) =>
    d1 === d0 ? r0 : r0 + ((v - d0) / (d1 - d0)) * (r1 - r0);

type Point = [number, number];

/** Straight-line path through points */
export const linePath = (pts: Point[]) =>
  pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)},${y.toFixed(1)}`).join("");

/** Smooth path through points (Catmull-Rom converted to cubic Béziers) */
export const smoothPath = (pts: Point[]) => {
  if (pts.length < 3) return linePath(pts);
  let d = `M${pts[0][0]},${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const [x0, y0] = pts[i - 1] ?? pts[i];
    const [x1, y1] = pts[i];
    const [x2, y2] = pts[i + 1];
    const [x3, y3] = pts[i + 2] ?? pts[i + 1];
    const c1x = x1 + (x2 - x0) / 6;
    const c1y = y1 + (y2 - y0) / 6;
    const c2x = x2 - (x3 - x1) / 6;
    const c2y = y2 - (y3 - y1) / 6;
    d += `C${c1x.toFixed(1)},${c1y.toFixed(1)} ${c2x.toFixed(1)},${c2y.toFixed(1)} ${x2.toFixed(1)},${y2.toFixed(1)}`;
  }
  return d;
};

/** SVG arc path for a ring segment between two angles (radians, 0 = 12 o'clock, clockwise) */
export const arcPath = (cx: number, cy: number, rOuter: number, rInner: number, a0: number, a1: number) => {
  const pt = (r: number, a: number) => `${(cx + r * Math.sin(a)).toFixed(2)},${(cy - r * Math.cos(a)).toFixed(2)}`;
  const large = a1 - a0 > Math.PI ? 1 : 0;
  return [
    `M${pt(rOuter, a0)}`,
    `A${rOuter},${rOuter} 0 ${large} 1 ${pt(rOuter, a1)}`,
    `L${pt(rInner, a1)}`,
    `A${rInner},${rInner} 0 ${large} 0 ${pt(rInner, a0)}`,
    "Z",
  ].join("");
};

/** Brand chart colors */
export const chartColors = {
  cocoa: "#4a1d1a",
  cocoaLight: "#a0595a",
  green: "#2f8a3a",
  grid: "#e5e1e0",
  axis: "#6b6465",
  band: "#ebe8e8",
};

export const axisText = { fontSize: 10, fill: chartColors.axis, fontFamily: "inherit" } as const;
