/**
 * Shared data shapes. These are the contracts the backend should return.
 * Keep them in sync with the API — every component reads from these types.
 */

export type CurrentUser = {
  id: string;
  name: string;
  role: string;
};

export type DashboardSummary = {
  totalProducts: number;
  sales: { count: number; changePercent: number };
  revenue: { amount: number; changePercent: number };
  alerts: number;
};

export type SupplyChannelType = "manufacturer" | "wholesaler" | "distributor" | "local_producer";

export type SupplyChannel = {
  id: string;
  name: string;
  type: SupplyChannelType;
  status: string;
};

export type LowStockProduct = {
  id: string;
  name: string;
  sku: string;
  quantity: number;
  reorderLevel: number;
};

export type InventoryHealth = {
  accumulatePercent: number;
  /** share of the progress bar for each colored metric, 0–100 */
  breakdown: { turnover: number; daysSales: number };
  /** position of the grey target marker on the bar, 0–100 */
  targetPercent: number;
  turnoverRate: number;
  daysSalesOfInventory: number;
  reorderAlerts: number;
  defectRate: number;
};

export type AverageSales = {
  percent: number;
};

/** rows × columns of update counts; 0 = none, 3+ = most */
export type InventoryUpdates = number[][];

export type Category = {
  id: string;
  name: string;
  productCount: number;
};

export type Contract = {
  id: string;
  name: string;
  type: SupplyChannelType;
  terms: string;
};

export type Supplier = {
  id: string;
  name: string;
  type: SupplyChannelType;
  contactEmail: string;
};

export type RegionPerformance = {
  id: string;
  region: string;
  foodSegments: number;
};

/** Headline KPI on the landing page's About section, e.g. 84 → "84%" */
export type LandingStat = {
  id: string;
  /** percent value; negative numbers render with a minus sign */
  percent: number;
  label: string;
};
