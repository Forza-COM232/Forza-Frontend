import { SquareArrowOutUpRight } from "lucide-react";
import { icons } from "@/assets/icons";
import { SearchBar } from "@/components/app-shell/SearchBar";
import { Panel } from "@/components/common/Panel";
import { ContactList } from "@/components/common/ContactList";
import { StatCard, type StatCardProps } from "@/components/dashboard/StatCard";
import { InventoryHealth } from "@/components/dashboard/InventoryHealth";
import { UpdatesHeatmap } from "@/components/dashboard/UpdatesHeatmap";
import { AverageSales } from "@/components/dashboard/AverageSales";
import {
  useAverageSales,
  useDashboardSummary,
  useInventoryHealth,
  useInventoryUpdates,
  useLowStockProducts,
  useSupplyChannels,
} from "@/hooks/queries";
import { channelIcons } from "@/lib/channel-icons";
import { formatNumber, formatPeso } from "@/lib/format";

export const DashboardPage = () => {
  const { data: summary } = useDashboardSummary();
  const { data: channels = [] } = useSupplyChannels();
  const { data: lowStock } = useLowStockProducts();
  const { data: health } = useInventoryHealth();
  const { data: averageSales } = useAverageSales();
  const { data: updates } = useInventoryUpdates();

  const stats: StatCardProps[] = [
    { icon: icons.box, label: "Total Products", value: summary && formatNumber(summary.totalProducts) },
    {
      icon: icons.salesTag,
      label: "Number of Sales",
      value: summary && formatNumber(summary.sales.count),
      changePercent: summary?.sales.changePercent,
    },
    {
      icon: icons.revenue,
      label: "Estimated Revenue",
      value: summary && formatPeso(summary.revenue.amount),
      changePercent: summary?.revenue.changePercent,
    },
    { icon: icons.alert, label: "Alerts", value: summary && formatNumber(summary.alerts) },
  ];

  return (
    <>
      <SearchBar />

      <div className="mt-8 grid gap-7 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      <div className="mt-9 grid gap-7 lg:grid-cols-3">
        <div className="flex flex-col gap-7">
          <Panel
            variant="maroon"
            title="Supply - Last Week"
            subtitle="7 days"
            className="relative min-h-[339px]"
          >
            <SquareArrowOutUpRight className="absolute right-6 top-7 size-5 text-white" />
            <ContactList
              items={channels.map((c) => ({
                label: c.name,
                caption: c.status,
                icon: channelIcons[c.type],
              }))}
            />
          </Panel>
          <AverageSales data={averageSales} />
        </div>

        <Panel
          title="List of Low Products"
          subtitle={lowStock ? `${lowStock.length} Products` : "Loading…"}
          menu
          className="min-h-[450px]"
        />

        <div className="flex flex-col gap-7">
          <InventoryHealth data={health} />
          <UpdatesHeatmap data={updates} />
        </div>
      </div>
    </>
  );
};
