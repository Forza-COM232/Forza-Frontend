import { Skeleton } from "@/components/common/Skeleton";
import { useLandingStats } from "@/hooks/queries";
import { formatSignedPercent } from "@/lib/format";
import { StorePerformance } from "./StorePerformance";

export const AboutSection = () => {
  const { data: stats } = useLandingStats();

  return (
    <section
      id="about"
      className="mx-auto mt-20 flex w-full max-w-[1288px] flex-col gap-12 px-6 md:mt-28 lg:flex-row lg:items-center lg:gap-[clamp(3rem,13vw,11.5rem)]"
    >
      <div className="max-w-[565px]">
        <span className="inline-block rounded-full bg-ruby px-3.5 py-1.5 text-[11px] font-bold uppercase text-white">
          Hands-free ordering
        </span>
        <h2 className="mt-4 text-4xl font-bold tracking-tight text-cherry md:text-[46px]">
          Eat well, Spend less.
        </h2>
        <p className="mt-6 text-base leading-[1.55] text-cream md:text-[19px]">
          Welcome to the heart of our retail operations. Inspired by the legacy of Robinsons
          Supermarket, this inventory management system is engineered to uphold our core
          commitment: bringing fresh, healthy, and high-quality choices to every household. Our
          system bridges the gap between our warehouse floors and the retail shelves.
        </p>

        <dl className="mt-8 flex items-stretch">
          {stats
            ? stats.map((stat, i) => (
                <div
                  key={stat.id}
                  className={i > 0 ? "border-l-2 border-[#705050] pl-5" : "pr-5"}
                >
                  <dt className="text-3xl font-bold text-ruby md:text-[34px]">
                    {formatSignedPercent(stat.percent)}
                  </dt>
                  <dd className="mt-1 text-xs text-cream">{stat.label}</dd>
                </div>
              ))
            : Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className={i > 0 ? "pl-5" : "pr-5"}>
                  <Skeleton className="h-14 w-40 bg-white/15" />
                </div>
              ))}
        </dl>
      </div>

      <StorePerformance />
    </section>
  );
};
