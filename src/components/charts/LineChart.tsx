import { axisText, chartColors, linear, linePath, niceTicks, smoothPath } from "./scale";

type LineChartProps = {
  labels: string[];
  series: { name: string; values: number[]; color: string }[];
  /** shaded horizontal band, e.g. a target range */
  band?: { min: number; max: number };
  /** format an x label; return "" to hide that label */
  formatLabel?: (label: string, index: number) => string;
  smooth?: boolean;
  width?: number;
  height?: number;
  ariaLabel: string;
};

export const LineChart = ({
  labels,
  series,
  band,
  formatLabel = (l) => l,
  smooth,
  width = 480,
  height = 190,
  ariaLabel,
}: LineChartProps) => {
  const pad = { top: 8, right: 8, bottom: 22, left: 34 };
  const all = series.flatMap((s) => s.values).concat(band ? [band.min, band.max] : []);
  const ticks = niceTicks(Math.min(...all), Math.max(...all));
  const x = linear([0, labels.length - 1], [pad.left, width - pad.right]);
  const y = linear([ticks[0], ticks[ticks.length - 1]], [height - pad.bottom, pad.top]);

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="h-auto w-full" role="img" aria-label={ariaLabel}>
      {band && (
        <rect
          x={pad.left}
          width={width - pad.left - pad.right}
          y={y(band.max)}
          height={y(band.min) - y(band.max)}
          fill={chartColors.band}
        />
      )}
      {ticks.map((t) => (
        <g key={t}>
          <line x1={pad.left} x2={width - pad.right} y1={y(t)} y2={y(t)} stroke={chartColors.grid} />
          <text x={pad.left - 6} y={y(t)} dy="0.32em" textAnchor="end" {...axisText}>
            {t}
          </text>
        </g>
      ))}
      {labels.map((l, i) => {
        const text = formatLabel(l, i);
        return text ? (
          <text key={l} x={x(i)} y={height - 6} textAnchor="middle" {...axisText}>
            {text}
          </text>
        ) : null;
      })}
      {series.map((s) => {
        const pts = s.values.map((v, i) => [x(i), y(v)] as [number, number]);
        return (
          <g key={s.name}>
            <path
              d={smooth ? smoothPath(pts) : linePath(pts)}
              fill="none"
              stroke={s.color}
              strokeWidth={smooth ? 3 : 1.75}
              strokeLinejoin="round"
              strokeLinecap="round"
            />
            {pts.map(([px, py], i) => (
              <circle key={i} cx={px} cy={py} r={6} fill="transparent">
                <title>{`${s.name}, ${labels[i]}: ${s.values[i]}`}</title>
              </circle>
            ))}
          </g>
        );
      })}
    </svg>
  );
};
