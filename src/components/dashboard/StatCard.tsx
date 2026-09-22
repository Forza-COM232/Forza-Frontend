import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatPercent } from "@/lib/format";
import { IconBadge } from "@/components/common/IconBadge";
import { Skeleton } from "@/components/common/Skeleton";

export type StatCardProps = {
  icon: string;
  label: string;
  /** formatted value; undefined while loading */
  value?: string;
  /** percent change vs previous period, e.g. -0.5 */
  changePercent?: number;
};

const toneFor = (change: number) =>
  change >= 0
    ? "bg-emerald-100 text-emerald-600"
    : change > -1
      ? "bg-amber-100 text-amber-600"
      : "bg-red-100 text-red-600";

export const StatCard = ({ icon, value, label, changePercent }: StatCardProps) => (
  <article className="flex h-[153px] flex-col justify-between rounded-[20px] bg-white p-5 text-ink shadow-[0_4px_16px_rgba(74,29,26,0.08)]">
    <div className="flex items-center justify-between">
      <IconBadge icon={icon} />
      <ChevronRight className="size-4 text-slate-600" />
    </div>
    <div>
      <div className="flex items-center gap-3">
        {value === undefined ? (
          <Skeleton className="h-[30px] w-32" />
        ) : (
          <span className="font-grotesk text-[30px] font-extrabold leading-none tracking-tight">
            {value}
          </span>
        )}
        {changePercent !== undefined && (
          <span className={cn("rounded px-1.5 py-0.5 text-[11px] font-semibold", toneFor(changePercent))}>
            {changePercent >= 0 ? "▲" : "▼"} {formatPercent(changePercent)}
          </span>
        )}
      </div>
      <p className="mt-2 text-[13px] text-slate-600">{label}</p>
    </div>
  </article>
);
