import { axisText, chartColors, linear, niceTicks } from "./scale";

type StackedBarChartProps = {
  labels: string[];
  /** stacked bottom → top */
  series: { name: string; values: number[]; color: string }[];
  width?: number;
  height?: number;
  ariaLabel: string;
};

export const StackedBarChart = ({ labels, series, width = 200, height = 140, ariaLabel }: StackedBarChartProps) => {
  const pad = { top: 6, right: 4, bottom: 18, left: 28 };
  const totals = labels.map((_, i) => series.reduce((sum, s) => sum + s.values[i], 0));
  const ticks = niceTicks(0, Math.max(...totals), 4);
  const y = linear([0, ticks[ticks.length - 1]], [height - pad.bottom, pad.top]);
  const col = (width - pad.left - pad.right) / labels.length;
  const bar = col * 0.62;

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
      {labels.map((l, i) => {
        const bx = pad.left + col * i + (col - bar) / 2;
        let base = 0;
        return (
          <g key={l}>
            {series.map((s, si) => {
              const v = s.values[i];
              const top = y(base + v);
              const h = y(base) - top;
              base += v;
              const isTop = si === series.length - 1;
              return (
                <path
                  key={s.name}
                  d={
                    isTop
                      ? `M${bx},${top + h}V${top + 2}q0,-2 2,-2h${bar - 4}q2,0 2,2V${top + h}Z`
                      : `M${bx},${top}h${bar}v${h}h${-bar}Z`
                  }
                  fill={s.color}
                >
                  <title>{`${l} ${s.name}: ${v}`}</title>
                </path>
              );
            })}
            <text x={bx + bar / 2} y={height - 4} textAnchor="middle" {...axisText} fontSize={9}>
              {l}
            </text>
          </g>
        );
      })}
    </svg>
  );
};
