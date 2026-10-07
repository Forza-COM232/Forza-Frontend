import { arcPath } from "./scale";

export type DonutSlice = { id: string; label: string; value: number; color: string };

type DonutChartProps = {
  slices: DonutSlice[];
  /** "full" circle or top "half" gauge */
  shape?: "full" | "half";
  /** ring thickness as a share of the radius */
  thickness?: number;
  activeId?: string | null;
  onActiveChange?: (id: string | null) => void;
  ariaLabel: string;
  formatValue?: (v: number) => string;
};

export const DonutChart = ({
  slices,
  shape = "full",
  thickness = 0.45,
  activeId,
  onActiveChange,
  ariaLabel,
  formatValue = String,
}: DonutChartProps) => {
  const size = 200;
  const half = shape === "half";
  const c = size / 2;
  const r = c - 4;
  const inner = r * (1 - thickness);
  const [start, span] = half ? [-Math.PI / 2, Math.PI] : [0, Math.PI * 2];
  const total = slices.reduce((s, x) => s + x.value, 0) || 1;
  const gap = slices.length > 1 ? 0.012 : 0;

  // start/end angle of each slice
  const angles = slices.reduce<[number, number][]>((acc, s) => {
    const a0 = acc.length ? acc[acc.length - 1][1] : start;
    return [...acc, [a0, a0 + (s.value / total) * span]];
  }, []);

  return (
    <svg
      viewBox={half ? `0 0 ${size} ${c + 2}` : `0 0 ${size} ${size}`}
      className="h-auto w-full"
      role="img"
      aria-label={ariaLabel}
      onMouseLeave={() => onActiveChange?.(null)}
    >
      {slices.map((s, i) => {
        const [a0, a1] = angles[i];
        const dim = activeId && activeId !== s.id;
        return (
          <path
            key={s.id}
            d={arcPath(c, c, r, inner, a0 + gap / 2, a1 - gap / 2)}
            fill={s.color}
            opacity={dim ? 0.35 : 1}
            className="transition-opacity duration-150"
            onMouseEnter={() => onActiveChange?.(s.id)}
          >
            <title>{`${s.label}: ${formatValue(s.value)}`}</title>
          </path>
        );
      })}
    </svg>
  );
};
