import type { ReactNode } from "react";
import { ComboChart } from "@/components/charts/ComboChart";
import { DonutChart } from "@/components/charts/DonutChart";
import { HorizontalBarChart } from "@/components/charts/HorizontalBarChart";
import { Legend } from "@/components/charts/Legend";
import { LineChart } from "@/components/charts/LineChart";
import { RadarChart } from "@/components/charts/RadarChart";
import { StackedBarChart } from "@/components/charts/StackedBarChart";
import { chartColors } from "@/components/charts/scale";
import { FeatureCard } from "@/components/common/FeatureCard";
import { Skeleton } from "@/components/common/Skeleton";
import {
  useDemand,
  useGrossMargin,
  useHoldingCost,
  useInventoryTurnover,
  useLeadTime,
  useStockMovement,
  useSupplierPerformance,
} from "@/hooks/queries";

const supplierColors = ["#2f7d32", "#b8403a", "#1f5460", "#d98a2b", "#d9529a"];
const MONTH_SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "2020-01" → "2020" for January, "Apr"/"Jul"/"Oct" for quarter starts, "" otherwise */
const quarterLabel = (period: string) => {
  const [year, month] = period.split("-").map(Number);
  if (month === 1) return String(year);
  return month % 3 === 1 ? MONTH_SHORT[month - 1] : "";
};

/** Shows the chart once data arrives, a grey block until then */
const ChartSlot = ({ ready, className, children }: { ready: boolean; className: string; children: ReactNode }) =>
  ready ? <div className={className}>{children}</div> : <Skeleton className={`${className} h-32 rounded-xl`} />;

export const AnalyticsPage = () => {
  const { data: turnover } = useInventoryTurnover();
  const { data: margin } = useGrossMargin();
  const { data: leadTime } = useLeadTime();
  const { data: holding } = useHoldingCost();
  const { data: movement } = useStockMovement();
  const { data: demand } = useDemand();
  const { data: suppliers } = useSupplierPerformance();

  const leadColors = [chartColors.green, chartColors.cocoa];
  const movementColors = [chartColors.cocoa, chartColors.cocoaLight];

  return (
    <div className="mt-12 flex flex-col gap-6">
      <div className="grid gap-5 lg:grid-cols-[1fr_2.5fr]">
        <FeatureCard
          arrow
          title="Inventory Turnover"
          subtitle="Inventory Performance"
          className="min-h-[333px]"
        >
          <ChartSlot ready={!!turnover} className="mt-4 w-full">
            {turnover && (
              <LineChart
                ariaLabel="Inventory turnover by month"
                labels={turnover.labels}
                series={[{ ...turnover.series[0], color: chartColors.cocoa }]}
                band={turnover.targetRange}
                formatLabel={quarterLabel}
                width={320}
                height={150}
              />
            )}
          </ChartSlot>
        </FeatureCard>

        <FeatureCard
          arrow
          title="Gross Margin"
          subtitle="Sales & Profitability"
          layout="split"
          className="min-h-[333px] sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]"
        >
          <ChartSlot ready={!!margin} className="mx-auto w-full max-w-[280px]">
            {margin && (
              <RadarChart
                ariaLabel="Gross margin percent by month"
                labels={margin.labels}
                values={margin.series[0].values}
                formatValue={(v) => `${v}%`}
              />
            )}
          </ChartSlot>
        </FeatureCard>
      </div>

      <div className="grid gap-5 lg:grid-cols-[2.38fr_1fr]">
        <FeatureCard
          arrow
          title="Average Lead Time"
          subtitle="Suppliers Performance"
          layout="split"
          className="min-h-[208px] sm:grid-cols-[minmax(0,0.8fr)_minmax(0,1.4fr)]"
        >
          <ChartSlot ready={!!leadTime} className="w-full">
            {leadTime && (
              <>
                <LineChart
                  ariaLabel="Average supplier lead time in days by month"
                  labels={leadTime.labels}
                  series={leadTime.series.map((s, i) => ({ ...s, color: leadColors[i % leadColors.length] }))}
                  smooth
                  width={420}
                  height={150}
                />
                <Legend
                  items={leadTime.series.map((s, i) => ({
                    label: `${s.name} (days)`,
                    color: leadColors[i % leadColors.length],
                  }))}
                />
              </>
            )}
          </ChartSlot>
        </FeatureCard>

        <FeatureCard title="Holding Cost" subtitle="Stock Movement" layout="split" className="min-h-[208px] sm:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
          <ChartSlot ready={!!holding} className="mx-auto w-full max-w-[320px]">
            {holding && (
              <HorizontalBarChart
                ariaLabel="Holding cost by month, in thousands of pesos"
                labels={holding.labels}
                values={holding.series[0].values}
                formatValue={(v) => `₱${v}k`}
              />
            )}
          </ChartSlot>
        </FeatureCard>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        <FeatureCard title="Stock Movement" subtitle="Stock In vs Stock Out" layout="split" className="min-h-[168px] sm:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)]">
          <ChartSlot ready={!!movement} className="mx-auto w-full max-w-[320px]">
            {movement && (
              <>
                <StackedBarChart
                  ariaLabel="Stock in and stock out by year, in thousand units"
                  labels={movement.labels}
                  series={movement.series.map((s, i) => ({ ...s, color: movementColors[i % 2] }))}
                />
                <Legend
                  items={movement.series.map((s, i) => ({ label: s.name, color: movementColors[i % 2] }))}
                />
              </>
            )}
          </ChartSlot>
        </FeatureCard>

        <FeatureCard title="Demand" subtitle="Demand Analysis" layout="split" className="min-h-[168px] sm:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)]">
          <ChartSlot ready={!!demand} className="mx-auto w-full max-w-[320px]">
            {demand && (
              <>
                <ComboChart
                  ariaLabel="Actual orders and forecast by weekday"
                  labels={demand.labels}
                  bars={demand.series[0]}
                  line={demand.series[1]}
                />
                <Legend
                  items={[
                    { label: demand.series[0].name, color: chartColors.cocoaLight },
                    { label: demand.series[1].name, color: chartColors.cocoa },
                  ]}
                />
              </>
            )}
          </ChartSlot>
        </FeatureCard>

        <FeatureCard title="Supplier Performance" subtitle="Reports" className="min-h-[168px]">
          <ChartSlot ready={!!suppliers} className="mx-auto mt-3 w-full max-w-[240px]">
            {suppliers && (
              <>
                <DonutChart
                  shape="half"
                  thickness={0.5}
                  ariaLabel="Share of on-time deliveries by supplier"
                  slices={suppliers.labels.map((name, i) => ({
                    id: name,
                    label: name,
                    value: suppliers.series[0].values[i],
                    color: supplierColors[i % supplierColors.length],
                  }))}
                  formatValue={(v) => `${v}%`}
                />
                <Legend
                  items={suppliers.labels.map((name, i) => ({
                    label: name,
                    color: supplierColors[i % supplierColors.length],
                  }))}
                />
              </>
            )}
          </ChartSlot>
        </FeatureCard>
      </div>
    </div>
  );
};
