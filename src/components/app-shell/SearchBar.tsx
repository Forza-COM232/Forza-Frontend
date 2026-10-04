import { useState } from "react";
import { Search } from "lucide-react";
import { icons } from "@/assets/icons";

export const SearchBar = () => {
  const [query, setQuery] = useState("");

  return (
    <div className="flex items-center justify-center gap-8">
      <label className="flex h-[38px] w-full max-w-[710px] items-center gap-3 rounded-lg bg-white px-4">
        <Search className="size-4 shrink-0 text-ink" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products, SKUs, or suppliers..."
          className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-ink"
        />
        <button
          type="button"
          aria-label="Clear search"
          onClick={() => setQuery("")}
          className="opacity-70 hover:opacity-100"
        >
          <img src={icons.clear} alt="" className="size-4" />
        </button>
      </label>
      <button type="button" className="flex shrink-0 items-center gap-2 text-sm text-cream">
        <img src={icons.filter} alt="" className="size-4" />
        Apply Filter
      </button>
    </div>
  );
};
