import { SearchBar } from "@/components/app-shell/SearchBar";
import { Panel } from "@/components/common/Panel";
import { useCategories } from "@/hooks/queries";

export const InventoryPage = () => {
  const { data: categories } = useCategories();

  return (
    <>
      <SearchBar />

      <div className="mt-9 grid gap-7 lg:grid-cols-[1fr_2.1fr]">
        <Panel
          title="Category"
          subtitle={categories ? `${categories.length} Categories` : "Loading…"}
          menu
          className="min-h-[730px]"
        />

        <div className="grid gap-7 md:grid-cols-2 md:grid-rows-[268px_1fr]">
          <Panel className="min-h-[268px]" />
          <Panel variant="maroon" className="min-h-[268px]" />
          <Panel className="min-h-[425px] md:col-span-2" />
        </div>
      </div>
    </>
  );
};
