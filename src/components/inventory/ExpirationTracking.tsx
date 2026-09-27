import { Skeleton } from "@/components/common/Skeleton";
import type { Category, ExpiringBatch } from "@/types";

const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString("en-PH", { month: "short", day: "numeric", year: "numeric" });

type ExpirationTrackingProps = {
  batches?: ExpiringBatch[];
  categories?: Category[];
  /** how many batches to show, soonest first (the design shows 1) */
  limit?: number;
};

export const ExpirationTracking = ({ batches, categories, limit = 1 }: ExpirationTrackingProps) => {
  const categoryName = (id: string) => categories?.find((c) => c.id === id)?.name ?? "—";
  const sorted = batches && [...batches].sort((a, b) => a.expiresOn.localeCompare(b.expiresOn)).slice(0, limit);

  return (
    <section className="flex flex-col rounded-[20px] border border-cream/50 bg-cocoa p-6 text-cream shadow-[0_4px_16px_rgba(74,29,26,0.12)]">
      <h2 className="font-grotesk text-[26px] font-extrabold leading-tight tracking-tight">Expiration Tracking</h2>
      <p className="mt-1 text-[13px] text-cream/80">Batch Expiration Date</p>

      <ul className="mt-4 flex max-h-[170px] flex-col gap-2 overflow-y-auto pr-1">
        {sorted
          ? sorted.map((b) => (
              <li
                key={b.id}
                className="grid grid-cols-[1fr_1.6fr_1fr_1.3fr] items-center gap-2 rounded-md bg-[#a37f7d] px-3 py-2 text-xs font-medium text-ink"
              >
                <span>{b.batchCode}</span>
                <span className="truncate">{categoryName(b.categoryId)}</span>
                <span>{b.sku}</span>
                <time dateTime={b.expiresOn}>
                  {formatDate(b.expiresOn)}
                </time>
              </li>
            ))
          : Array.from({ length: limit }, (_, i) => (
              <li key={i}>
                <Skeleton className="h-8 w-full bg-white/15" />
              </li>
            ))}
        {sorted?.length === 0 && <li className="text-sm text-cream/80">No batches expiring soon.</li>}
      </ul>
    </section>
  );
};
