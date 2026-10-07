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
  /** short line under the name, e.g. "Leafy greens, root veggies & more" */
  description: string;
  /** number of product units in this category; also drives the Count of Products chart */
  productCount: number;
};

// ── Inventory ───────────────────────────────────────────────

export type StockStatus = "in_stock" | "low_stock" | "out_of_stock";

export type Product = {
  id: string;
  name: string;
  /** matches Category.id */
  categoryId: string;
  sku: string;
  stock: number;
  /** unit price in pesos */
  price: number;
  status: StockStatus;
};

export type ExpiringBatch = {
  id: string;
  batchCode: string;
  /** matches Category.id */
  categoryId: string;
  sku: string;
  /** ISO date, e.g. "2026-10-04" */
  expiresOn: string;
};

/** What a contract covers. The backend sends the lowercase value; the UI shows the label. */
export type ContractTerm = "payment" | "delivery" | "returns" | "pricing";

export type Contract = {
  id: string;
  name: string;
  type: SupplyChannelType;
  terms: ContractTerm;
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

// ── Analytics ───────────────────────────────────────────────

/**
 * Generic chart payload used by most analytics cards:
 * one label per x-axis point, and one or more named series with a value per label.
 */
export type ChartSeries = {
  labels: string[];
  series: { name: string; values: number[] }[];
};

/** labels = months ("2020-01"); one series. `targetRange` is the shaded band. */
export type InventoryTurnover = ChartSeries & {
  targetRange: { min: number; max: number };
};

/** labels = months; one series of gross margin percent */
export type GrossMargin = ChartSeries;

/** labels = months; series = lead time in days (e.g. this year vs last year) */
export type LeadTimeTrend = ChartSeries;

/** labels = months; one series of holding cost in thousands of pesos */
export type HoldingCost = ChartSeries;

/** labels = years; series[0] = stock in, series[1] = stock out (thousand units) */
export type StockMovement = ChartSeries;

/** labels = weekdays; series[0] = actual orders (bars), series[1] = forecast (line) */
export type DemandForecast = ChartSeries;

/** labels = supplier names; one series of each supplier's share of on-time deliveries (%) */
export type SupplierPerformance = ChartSeries;
