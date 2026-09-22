import { icons } from "@/assets/icons";
import type { SupplyChannelType } from "@/types";

/** Backend sends a type string; the UI decides which icon to show */
export const channelIcons: Record<SupplyChannelType, string> = {
  manufacturer: icons.manufacturer,
  wholesaler: icons.star,
  distributor: icons.distributor,
  local_producer: icons.wheat,
};
