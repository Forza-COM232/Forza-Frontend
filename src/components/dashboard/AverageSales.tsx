import { Panel } from "@/components/common/Panel";
import { Skeleton } from "@/components/common/Skeleton";
import type { AverageSales as AverageSalesData } from "@/types";

export const AverageSales = ({ data }: { data?: AverageSalesData }) => (
  <Panel title="Average Sales" menu>
    {data ? (
      <p className="mt-3 font-grotesk text-[34px] font-extrabold leading-none tracking-tight">
        {data.percent.toFixed(2)}%
      </p>
    ) : (
      <Skeleton className="mt-3 h-[34px] w-36" />
    )}
    <div className="mt-3 h-2 rounded-full bg-[#fdf6f0]">
      <div
        className="h-full rounded-full bg-cherry transition-[width] duration-500"
        style={{ width: `${data?.percent ?? 0}%` }}
      />
    </div>
  </Panel>
);
