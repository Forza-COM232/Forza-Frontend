import { useMemo, useState } from "react";
import { SearchBar } from "@/components/app-shell/SearchBar";
import { CategoryList } from "@/components/inventory/CategoryList";
import { ExpirationTracking } from "@/components/inventory/ExpirationTracking";
import { ProductCount } from "@/components/inventory/ProductCount";
import { ProductsTable } from "@/components/inventory/ProductsTable";
import { useCategories, useExpiringBatches, useProducts } from "@/hooks/queries";

export const InventoryPage = () => {
  const { data: categories } = useCategories();
  const { data: products } = useProducts();
  const { data: batches } = useExpiringBatches();

  const [query, setQuery] = useState("");
  const [categoryId, setCategoryId] = useState<string | null>(null);

  // Filtering happens in the browser for now. When the product list gets large,
  // move this to the backend (e.g. GET /products?q=…&categoryId=…).
  const visibleProducts = useMemo(() => {
    if (!products) return undefined;
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      if (categoryId && p.categoryId !== categoryId) return false;
      if (!q) return true;
      const category = categories?.find((c) => c.id === p.categoryId)?.name ?? "";
      return [p.name, p.sku, category].some((field) => field.toLowerCase().includes(q));
    });
  }, [products, categories, query, categoryId]);

  const selectedName = categories?.find((c) => c.id === categoryId)?.name;
  const emptyMessage = query
    ? `No products match "${query}"${selectedName ? ` in ${selectedName}` : ""}. Try another search.`
    : `No products in ${selectedName ?? "this category"} yet.`;

  return (
    <>
      <SearchBar value={query} onChange={setQuery} />

      <div className="mt-9 grid gap-7 lg:grid-cols-[1fr_2.1fr]">
        <CategoryList categories={categories} selectedId={categoryId} onSelect={setCategoryId} />

        <div className="grid content-start gap-7 md:grid-cols-2">
          <ProductCount categories={categories} />
          <ExpirationTracking batches={batches} categories={categories} />

          <div className="md:col-span-2">
            {selectedName && (
              <p className="mb-3 flex items-center gap-2 text-sm text-slate-600">
                Showing {selectedName}
                <button
                  type="button"
                  onClick={() => setCategoryId(null)}
                  className="rounded-full bg-white px-2.5 py-0.5 text-xs font-medium text-maroon shadow-sm hover:bg-blush"
                >
                  Show all categories
                </button>
              </p>
            )}
            <ProductsTable products={visibleProducts} categories={categories} emptyMessage={emptyMessage} />
          </div>
        </div>
      </div>
    </>
  );
};
