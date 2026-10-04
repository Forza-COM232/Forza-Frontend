import { Panel } from "@/components/common/Panel";
import { Skeleton } from "@/components/common/Skeleton";
import { cn } from "@/lib/utils";
import type { InventoryHealth as InventoryHealthData } from "@/types";

export const InventoryHealth = ({ data }: { data?: InventoryHealthData }) => {
  const metrics = data
    ? [
        { label: "Inventory Turnover Rate", value: data.turnoverRate, dot: "bg-maroon" },
        { label: "Days Sales of Inventory", value: data.daysSalesOfInventory, dot: "bg-cherry" },
        { label: "Reorder Alert", value: data.reorderAlerts },
        { label: "Defect Rate", value: data.defectRate },
      ]
    : [];

  return (
    <Panel title="Inventory Health & Movement" menu className="min-h-[311px]">
      <div className="mt-4 flex items-center justify-between">
        <span className="text-sm text-slate-600">Accumulate percent</span>
        {data ? (
          <span className="font-grotesk text-2xl font-extrabold">{data.accumulatePercent}</span>
        ) : (
          <Skeleton className="h-6 w-10" />
        )}
      </div>

      {/* segmented progress bar */}
      <div className="relative mt-3 h-2">
        {data && (
          <>
            <span
              className="absolute inset-y-0 left-0 rounded-l-full bg-maroon"
              style={{ width: `${data.breakdown.turnover}%` }}
            />
            <span
              className="absolute inset-y-0 bg-cherry"
              style={{ left: `${data.breakdown.turnover + 0.5}%`, width: `${data.breakdown.daysSales}%` }}
            />
            <span
              className="absolute inset-y-0 w-[8%] bg-slate-200"
              style={{ left: `${data.targetPercent}%` }}
            />
          </>
        )}
      </div>

      <ul className="mt-5 flex flex-col gap-4">
        {data
          ? metrics.map((m) => (
              <li key={m.label} className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2.5">
                  <span className={cn("size-2 rounded-full", m.dot ?? "bg-transparent")} />
                  {m.label}
                </span>
                <span className="font-medium">{m.value}</span>
              </li>
            ))
          : Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-4 w-full" />)}
      </ul>
    </Panel>
  );
};
