import { axisText, chartColors, linear, linePath, niceTicks } from "./scale";

type ComboChartProps = {
  labels: string[];
  bars: { name: string; values: number[] };
  line: { name: string; values: number[] };
  width?: number;
  height?: number;
  ariaLabel: string;
};

/** Bars for one series with a line for another, on a shared axis */
export const ComboChart = ({ labels, bars, line, width = 200, height = 140, ariaLabel }: ComboChartProps) => {
  const pad = { top: 8, right: 6, bottom: 18, left: 28 };
  const ticks = niceTicks(0, Math.max(...bars.values, ...line.values), 4);
  const y = linear([0, ticks[ticks.length - 1]], [height - pad.bottom, pad.top]);
  const col = (width - pad.left - pad.right) / labels.length;
  const bar = col * 0.34;
  const cx = (i: number) => pad.left + col * i + col / 2;
  const pts = line.values.map((v, i) => [cx(i), y(v)] as [number, number]);

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="h-auto w-full" role="img" aria-label={ariaLabel}>
      {ticks.map((t) => (
        <g key={t}>
          <line x1={pad.left} x2={width - pad.right} y1={y(t)} y2={y(t)} stroke={chartColors.grid} />
          <text x={pad.left - 4} y={y(t)} dy="0.32em" textAnchor="end" {...axisText} fontSize={9}>
            {t}
          </text>
        </g>
      ))}
      {labels.map((l, i) => (
        <g key={l}>
          <rect
            x={cx(i) - bar / 2}
            y={y(bars.values[i])}
            width={bar}
            height={y(0) - y(bars.values[i])}
            fill={chartColors.cocoaLight}
          >
            <title>{`${l} ${bars.name}: ${bars.values[i]}`}</title>
          </rect>
          <text x={cx(i)} y={height - 4} textAnchor="middle" {...axisText} fontSize={9}>
            {l}
          </text>
        </g>
      ))}
      <path d={linePath(pts)} fill="none" stroke={chartColors.cocoa} strokeWidth={1.5} />
      {pts.map(([px, py], i) => (
        <circle key={i} cx={px} cy={py} r={2.4} fill="white" stroke={chartColors.cocoa} strokeWidth={1.2}>
          <title>{`${labels[i]} ${line.name}: ${line.values[i]}`}</title>
        </circle>
      ))}
    </svg>
  );
};
