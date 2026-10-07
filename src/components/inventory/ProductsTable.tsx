import { Skeleton } from "@/components/common/Skeleton";
import { formatNumber, formatPeso } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { Category, Product, StockStatus } from "@/types";

const statusLabel: Record<StockStatus, string> = {
  in_stock: "In Stock",
  low_stock: "Low Stock",
  out_of_stock: "Out of Stock",
};

const statusColor: Record<StockStatus, string> = {
  in_stock: "text-ink",
  low_stock: "text-copper",
  out_of_stock: "text-cherry",
};

type ProductsTableProps = {
  products?: Product[];
  categories?: Category[];
  /** shown when products is an empty list */
  emptyMessage: string;
  onEdit?: (product: Product) => void;
};

export const ProductsTable = ({ products, categories, emptyMessage, onEdit }: ProductsTableProps) => {
  const categoryName = (id: string) => categories?.find((c) => c.id === id)?.name ?? "—";

  return (
    <section className="rounded-[20px] bg-white p-4 text-ink shadow-[0_4px_16px_rgba(74,29,26,0.06)] md:min-h-[425px]">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] border-separate border-spacing-0 text-[13px]">
          <thead>
            <tr className="text-left text-xs font-semibold uppercase tracking-wide text-cream">
              <th className="rounded-l-lg bg-cocoa px-3 py-3">Products</th>
              <th className="bg-cocoa px-3 py-3">Category</th>
              <th className="bg-cocoa px-3 py-3">SKU</th>
              <th className="bg-cocoa px-3 py-3">Stocks</th>
              <th className="bg-cocoa px-3 py-3">Price</th>
              <th className="bg-cocoa px-3 py-3">Status</th>
              <th className="rounded-r-lg bg-cocoa px-3 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((p, i) => (
              <tr key={p.id} className={cn(i % 2 === 1 && "[&>td]:bg-[#f7f8fa]")}>
                <td className="rounded-l-lg px-3 py-2.5">{p.name}</td>
                <td className="px-3 py-2.5">{categoryName(p.categoryId)}</td>
                <td className="px-3 py-2.5">{p.sku}</td>
                <td className="px-3 py-2.5 tabular-nums">{formatNumber(p.stock)}</td>
                <td className="px-3 py-2.5 tabular-nums">{formatPeso(p.price)}</td>
                <td className={cn("px-3 py-2.5 font-medium", statusColor[p.status])}>
                  {statusLabel[p.status]}
                </td>
                <td className="rounded-r-lg px-3 py-2.5">
                  <button
                    type="button"
                    onClick={() => onEdit?.(p)}
                    className="rounded px-2 py-0.5 hover:bg-blush focus-visible:outline-2 focus-visible:outline-maroon"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
            {!products &&
              Array.from({ length: 5 }, (_, i) => (
                <tr key={i}>
                  <td colSpan={7} className="px-3 py-1.5">
                    <Skeleton className="h-6 w-full" />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {products?.length === 0 && <p className="px-3 py-10 text-sm text-slate-500">{emptyMessage}</p>}
      </div>
    </section>
  );
};
