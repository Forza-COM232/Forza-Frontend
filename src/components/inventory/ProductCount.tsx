import { useState } from "react";
import { DonutChart } from "@/components/charts/DonutChart";
import { Skeleton } from "@/components/common/Skeleton";
import { categoryColor } from "@/lib/category-colors";
import { formatNumber } from "@/lib/format";
import type { Category } from "@/types";

/** Donut of product units per category, built from the categories endpoint */
export const ProductCount = ({ categories }: { categories?: Category[] }) => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const total = categories?.reduce((sum, c) => sum + c.productCount, 0) ?? 0;
  const active = categories?.find((c) => c.id === activeId);

  return (
    <section className="rounded-[20px] bg-white p-6 text-ink shadow-[0_4px_16px_rgba(74,29,26,0.06)]">
      <h2 className="font-grotesk text-[26px] font-extrabold leading-tight tracking-tight">Count of Products</h2>
      {categories ? (
        <p className="mt-1 text-[13px] text-slate-600">{formatNumber(total)} products</p>
      ) : (
        <Skeleton className="mt-1 h-4 w-32" />
      )}

      <div className="relative mx-auto mt-3 w-[150px]">
        {categories ? (
          <DonutChart
            ariaLabel={`Product count by category, ${formatNumber(total)} total`}
            slices={categories.map((c, i) => ({
              id: c.id,
              label: c.name,
              value: c.productCount,
              color: categoryColor(i).chart,
            }))}
            activeId={activeId}
            onActiveChange={setActiveId}
            formatValue={formatNumber}
          />
        ) : (
          <Skeleton className="aspect-square w-full rounded-full" />
        )}
        {active && (
          <div className="pointer-events-none absolute inset-0 grid place-items-center text-center">
            <span>
              <span className="block text-sm font-bold">{formatNumber(active.productCount)}</span>
              <span className="block max-w-[70px] text-[10px] leading-tight text-slate-500">{active.name}</span>
            </span>
          </div>
        )}
      </div>
    </section>
  );
};
