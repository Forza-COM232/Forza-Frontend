import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/common/Skeleton";
import { useStorePerformance } from "@/hooks/queries";

type BadgeTone = "cherry" | "cream";

const badgeTones: Record<BadgeTone, string> = {
  cherry: "bg-cherry text-[#8a1b1c]",
  cream: "bg-cream text-copper",
};

// design alternates badge colors row by row
const toneFor = (index: number): BadgeTone => (index % 2 === 0 ? "cherry" : "cream");

export const StorePerformance = () => {
  const { data: regions } = useStorePerformance();

  return (
    <div className="w-full max-w-[394px] rounded-2xl bg-cream p-6 md:p-7">
      <h3 className="text-lg font-bold text-[#1e1414] md:text-xl">Store Performance</h3>
      <ul className="mt-5 flex flex-col gap-3.5">
        {regions
          ? regions.map((row, i) => (
              <li
                key={row.id}
                className="flex items-center justify-between gap-3 rounded-lg bg-white px-3 py-2.5"
              >
                <span className="text-sm font-medium text-[#1e1414]">{row.region}</span>
                <span
                  className={cn(
                    "whitespace-nowrap rounded-full px-3 py-1 text-[11px] font-semibold uppercase",
                    badgeTones[toneFor(i)],
                  )}
                >
                  {row.foodSegments} Food Segments
                </span>
              </li>
            ))
          : Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-11 w-full bg-white" />)}
      </ul>
    </div>
  );
};
