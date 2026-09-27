import { Panel } from "@/components/common/Panel";
import { Skeleton } from "@/components/common/Skeleton";
import { categoryColor } from "@/lib/category-colors";
import { cn } from "@/lib/utils";
import type { Category } from "@/types";

type CategoryListProps = {
  categories?: Category[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
};

export const CategoryList = ({ categories, selectedId, onSelect }: CategoryListProps) => (
  <Panel
    title="Category"
    subtitle={categories ? `${categories.length} Categories` : "Loading…"}
    menu
    className="lg:min-h-[730px]"
  >
    <ul className="mt-4 flex flex-col gap-2.5">
      {categories
        ? categories.map((c, i) => {
            const selected = selectedId === c.id;
            return (
              <li key={c.id}>
                <button
                  type="button"
                  aria-pressed={selected}
                  onClick={() => onSelect(selected ? null : c.id)}
                  style={{ background: categoryColor(i).tile }}
                  className={cn(
                    "block w-full rounded-xl px-4 py-2.5 text-left outline-offset-2 transition-shadow",
                    "focus-visible:outline-2 focus-visible:outline-maroon",
                    selected && "ring-2 ring-maroon",
                  )}
                >
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold text-ink">{c.name}</span>
                    <span className="block truncate text-xs text-slate-500">{c.description}</span>
                  </span>
                </button>
              </li>
            );
          })
        : Array.from({ length: 9 }, (_, i) => (
            <li key={i}>
              <Skeleton className="h-[54px] w-full rounded-xl" />
            </li>
          ))}
    </ul>
  </Panel>
);
