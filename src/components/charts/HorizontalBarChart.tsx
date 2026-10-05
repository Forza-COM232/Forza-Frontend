import { axisText, chartColors, linear, niceTicks } from "./scale";

type HorizontalBarChartProps = {
  labels: string[];
  values: number[];
  width?: number;
  height?: number;
  ariaLabel: string;
  formatValue?: (v: number) => string;
};

export const HorizontalBarChart = ({
  labels,
  values,
  width = 200,
  height = 150,
  ariaLabel,
  formatValue = String,
}: HorizontalBarChartProps) => {
  const pad = { top: 4, right: 8, bottom: 20, left: 30 };
  const ticks = niceTicks(0, Math.max(...values), 4);
  const x = linear([0, ticks[ticks.length - 1]], [pad.left, width - pad.right]);
  const row = (height - pad.top - pad.bottom) / labels.length;
  const bar = row * 0.62;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="h-auto w-full" role="img" aria-label={ariaLabel}>
      {ticks.map((t) => (
        <g key={t}>
          <line x1={x(t)} x2={x(t)} y1={pad.top} y2={height - pad.bottom} stroke={chartColors.grid} />
          <text x={x(t)} y={height - 5} textAnchor="middle" {...axisText} fontSize={10}>
            {t}
          </text>
        </g>
      ))}
      {labels.map((l, i) => {
        const cy = pad.top + row * i + row / 2;
        return (
          <g key={l}>
            <text x={pad.left - 5} y={cy} dy="0.32em" textAnchor="end" {...axisText} fontSize={10}>
              {l}
            </text>
            <rect
              x={pad.left}
              y={cy - bar / 2}
              width={Math.max(0, x(values[i]) - pad.left)}
              height={bar}
              rx={bar / 2}
              fill={chartColors.cocoa}
            >
              <title>{`${l}: ${formatValue(values[i])}`}</title>
            </rect>
          </g>
        );
      })}
    </svg>
  );
};
