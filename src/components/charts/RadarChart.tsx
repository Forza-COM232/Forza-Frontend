import { axisText, chartColors } from "./scale";

type RadarChartProps = {
  labels: string[];
  values: number[];
  /** value at the outer ring; defaults to a round number above the max */
  max?: number;
  size?: number;
  ariaLabel: string;
  formatValue?: (v: number) => string;
};

export const RadarChart = ({ labels, values, max, size = 240, ariaLabel, formatValue = String }: RadarChartProps) => {
  const top = max ?? Math.ceil(Math.max(...values) / 10) * 10;
  const c = size / 2;
  const r = c - 30;
  const angle = (i: number) => (i / labels.length) * Math.PI * 2;
  const at = (radius: number, i: number): [number, number] => [
    c + radius * Math.sin(angle(i)),
    c - radius * Math.cos(angle(i)),
  ];
  const ring = (radius: number) => labels.map((_, i) => at(radius, i).join(",")).join(" ");

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="h-auto w-full" role="img" aria-label={ariaLabel}>
      {[0.25, 0.5, 0.75, 1].map((f, i) => (
        <polygon
          key={f}
          points={ring(r * f)}
          fill={i % 2 ? "#f6f4f4" : "#fbfafa"}
          stroke={chartColors.grid}
        />
      ))}
      {labels.map((l, i) => {
        const [lx, ly] = at(r + 16, i);
        const [ex, ey] = at(r, i);
        return (
          <g key={l}>
            <line x1={c} y1={c} x2={ex} y2={ey} stroke={chartColors.grid} />
            <text x={lx} y={ly} dy="0.32em" textAnchor="middle" {...axisText}>
              {l}
            </text>
          </g>
        );
      })}
      <polygon
        points={values.map((v, i) => at((v / top) * r, i).join(",")).join(" ")}
        fill="rgba(74,29,26,0.06)"
        stroke={chartColors.cocoa}
        strokeWidth={2}
        strokeLinejoin="round"
      />
      {values.map((v, i) => {
        const [px, py] = at((v / top) * r, i);
        return (
          <circle key={i} cx={px} cy={py} r={3} fill={chartColors.cocoa}>
            <title>{`${labels[i]}: ${formatValue(v)}`}</title>
          </circle>
        );
      })}
    </svg>
  );
};
