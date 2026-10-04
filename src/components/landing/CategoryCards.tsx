import type { CSSProperties } from "react";
import { categories } from "./data";

export const CategoryCards = () => {
  return (
    <section className="mx-auto mt-14 flex w-full max-w-[1288px] justify-center gap-6 px-6 sm:gap-16 md:mt-20 md:gap-[118px]">
      {categories.map((category, i) => (
        <article
          key={category.label}
          // unpacked from the bag one by one, with a slight alternating tilt
          style={{ "--i": i, "--tile-tilt": `${i % 2 ? 4 : -4}deg` } as CSSProperties}
          className="landing-tile flex w-28 flex-col items-center gap-1.5 rounded-2xl bg-maroon/45 p-2 pb-3 sm:w-[168px] sm:p-2.5 sm:pb-5"
        >
          <div className="aspect-[148/104] w-full overflow-hidden rounded-xl bg-tile p-2 sm:rounded-2xl">
            <img
              src={category.image}
              alt={category.label}
              className="size-full object-contain"
            />
          </div>
          <span className="text-xs font-semibold text-cream sm:text-sm">{category.label}</span>
        </article>
      ))}
    </section>
  );
};
