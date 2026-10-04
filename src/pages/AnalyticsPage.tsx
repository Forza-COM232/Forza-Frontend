import { icons } from "@/assets/icons";
import { FeatureCard } from "@/components/common/FeatureCard";

export const AnalyticsPage = () => (
  <div className="mt-12 flex flex-col gap-6">
    <div className="grid gap-5 lg:grid-cols-[1fr_2.5fr]">
      <FeatureCard icon={icons.box} arrow title="Inventory Turnover" subtitle="Ratio" className="min-h-[333px]" />
      <FeatureCard icon={icons.box} arrow title="Gross Margin" subtitle="Graph" className="min-h-[333px]" />
    </div>

    <div className="grid gap-5 lg:grid-cols-[2.38fr_1fr]">
      <FeatureCard icon={icons.box} arrow title="Average Lead Time" subtitle="line graph" className="min-h-[208px]" />
      <FeatureCard title="Holding Cost" subtitle="Money" className="min-h-[208px]" />
    </div>

    <div className="grid gap-5 md:grid-cols-3">
      <FeatureCard title="Stock Movement" subtitle="Trends" className="min-h-[168px]" />
      <FeatureCard title="Demand" subtitle="Forecasting" className="min-h-[168px]" />
      <FeatureCard title="Supplier Performance" subtitle="Reports" className="min-h-[168px]" />
    </div>
  </div>
);
