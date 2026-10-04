import { Panel } from "@/components/common/Panel";
import { Skeleton } from "@/components/common/Skeleton";
import type { InventoryUpdates } from "@/types";

/** update count → cell color (0 = none … 3+ = most) */
const levelColors = ["bg-[#fdf4ee]", "bg-[#f3e2d2]", "bg-maroon", "bg-cherry"];
const colorFor = (count: number) => levelColors[Math.min(count, levelColors.length - 1)];

export const UpdatesHeatmap = ({ data }: { data?: InventoryUpdates }) => {
  const cols = data?.[0]?.length ?? 18;

  return (
    <Panel title="Times Inventory Updated" menu>
      {data ? (
        <div
          className="mt-4 grid w-fit gap-[5px]"
          style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 16px))` }}
        >
          {data.flatMap((row, r) =>
            row.map((count, c) => (
              <span
                key={`${r}-${c}`}
                title={`${count} update${count === 1 ? "" : "s"}`}
                className={`aspect-square rounded-[4px] ${colorFor(count)}`}
              />
            )),
          )}
        </div>
      ) : (
        <Skeleton className="mt-4 h-[80px] w-full" />
      )}
    </Panel>
  );
};
