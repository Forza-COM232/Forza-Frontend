import { SquareArrowOutUpRight } from "lucide-react";
import { icons } from "@/assets/icons";
import { Panel } from "@/components/common/Panel";
import { FeatureCard } from "@/components/common/FeatureCard";
import { ContactList } from "@/components/common/ContactList";
import { useContracts, useSuppliers } from "@/hooks/queries";
import { channelIcons } from "@/lib/channel-icons";

export const SuppliersPage = () => {
  const { data: contracts = [] } = useContracts();
  const { data: suppliers } = useSuppliers();

  return (
    <div className="mt-12 grid gap-10 lg:grid-cols-[2.65fr_1fr]">
      <div className="flex flex-col gap-6">
        <FeatureCard
          icon={icons.box}
          arrow
          title="Purchase Order"
          subtitle="Tracker"
          className="min-h-[175px]"
        />

        <div className="grid gap-10 md:grid-cols-[1.83fr_1fr]">
          <Panel variant="maroon" title="Documents & Terms" className="relative min-h-[565px]">
            <SquareArrowOutUpRight className="absolute right-6 top-6 size-5 text-white" />
            <ContactList
              items={contracts.map((c) => ({
                label: c.name,
                caption: c.terms,
                icon: channelIcons[c.type],
              }))}
            />
          </Panel>
          <Panel title="History" menu className="min-h-[565px]" />
        </div>
      </div>

      <Panel title="Suppliers Directory" menu>
        <div className="mt-4 flex flex-col gap-5">
          {(suppliers ?? Array.from({ length: 3 }, (_, i) => ({ id: `loading-${i}` }))).map((s) => (
            // card content is blank in the design — supplier data is available as `s` when needed
            <div
              key={s.id}
              className={
                suppliers
                  ? "h-[188px] rounded-[20px] bg-maroon shadow-md"
                  : "h-[188px] animate-pulse rounded-[20px] bg-maroon/40"
              }
            />
          ))}
        </div>
      </Panel>
    </div>
  );
};
