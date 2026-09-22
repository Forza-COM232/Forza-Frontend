/**
 * Mock data used while the backend isn't ready.
 * Values match the Figma design. Edit freely — the UI reads everything from here
 * (through src/services), so nothing else needs to change.
 */
import type {
  AverageSales,
  Category,
  Contract,
  CurrentUser,
  DashboardSummary,
  InventoryHealth,
  InventoryUpdates,
  LandingStat,
  LowStockProduct,
  RegionPerformance,
  Supplier,
  SupplyChannel,
} from "@/types";

export const mockCurrentUser: CurrentUser = {
  id: "EMP-94822",
  name: "Juan Tamad",
  role: "Product Lister",
};

export const mockFiscalYears: number[] = [2023, 2024, 2025, 2026];

export const mockDashboardSummary: DashboardSummary = {
  totalProducts: 310,
  sales: { count: 500_000, changePercent: -0.5 },
  revenue: { amount: 37_953_458, changePercent: -1.7 },
  alerts: 4,
};

export const mockSupplyChannels: SupplyChannel[] = [
  { id: "sc-1", name: "Manufacturer", type: "manufacturer", status: "On-Site" },
  { id: "sc-2", name: "Wholesalers", type: "wholesaler", status: "On-Site" },
  { id: "sc-3", name: "Distributors", type: "distributor", status: "On-Site" },
  { id: "sc-4", name: "Local Producers", type: "local_producer", status: "On-Site" },
];

export const mockLowStockProducts: LowStockProduct[] = [
  { id: "p-1", name: "Ribeye Steak 500g", sku: "MEAT-0142", quantity: 6, reorderLevel: 20 },
  { id: "p-2", name: "Salted Butter 113g", sku: "DAIRY-0088", quantity: 12, reorderLevel: 40 },
  { id: "p-3", name: "Cola Can 330ml", sku: "BEV-0310", quantity: 18, reorderLevel: 60 },
  { id: "p-4", name: "Extra Virgin Olive Oil 1L", sku: "PANTRY-0217", quantity: 4, reorderLevel: 15 },
  { id: "p-5", name: "Organic Rice Pilaf", sku: "PANTRY-0233", quantity: 9, reorderLevel: 25 },
];

export const mockInventoryHealth: InventoryHealth = {
  accumulatePercent: 78,
  breakdown: { turnover: 39, daysSales: 22 },
  targetPercent: 85,
  turnoverRate: 555,
  daysSalesOfInventory: 9,
  reorderAlerts: 1548,
  defectRate: 88,
};

export const mockAverageSales: AverageSales = { percent: 77.77 };

// 4 rows × 18 columns — reproduces the heatmap from the design
const HEAT_SEQUENCE = [3, 0, 0, 2, 0, 3, 2, 1, 0, 2, 3, 0, 2, 0, 1, 3, 0, 0, 2, 0, 3];
export const mockInventoryUpdates: InventoryUpdates = Array.from({ length: 4 }, (_, row) =>
  HEAT_SEQUENCE.slice(row, row + 18),
);

export const mockCategories: Category[] = [
  { id: "c-1", name: "Meat & Poultry", productCount: 42 },
  { id: "c-2", name: "Dairy", productCount: 35 },
  { id: "c-3", name: "Beverages", productCount: 51 },
  { id: "c-4", name: "Fresh Produce", productCount: 64 },
  { id: "c-5", name: "Pantry Staples", productCount: 38 },
  { id: "c-6", name: "Bakery", productCount: 17 },
  { id: "c-7", name: "Frozen Goods", productCount: 22 },
  { id: "c-8", name: "Snacks", productCount: 19 },
  { id: "c-9", name: "Household", productCount: 12 },
  { id: "c-10", name: "Personal Care", productCount: 10 },
];

export const mockContracts: Contract[] = [
  { id: "ct-1", name: "Contract 1", type: "manufacturer", terms: "payment" },
  { id: "ct-2", name: "Contract 2", type: "wholesaler", terms: "payment" },
  { id: "ct-3", name: "Contract 3", type: "distributor", terms: "payment" },
  { id: "ct-4", name: "Contract 4", type: "local_producer", terms: "payment" },
];

export const mockSuppliers: Supplier[] = [
  { id: "s-1", name: "Luzon Meat Packers", type: "manufacturer", contactEmail: "orders@luzonmeat.ph" },
  { id: "s-2", name: "Metro Dairy Wholesale", type: "wholesaler", contactEmail: "sales@metrodairy.ph" },
  { id: "s-3", name: "Visayas Beverage Distributors", type: "distributor", contactEmail: "supply@vbd.ph" },
];

export const mockStorePerformance: RegionPerformance[] = [
  { id: "r-1", region: "Metro Manila Core", foodSegments: 410 },
  { id: "r-2", region: "Luzon Provinces", foodSegments: 308 },
  { id: "r-3", region: "Visayas & Mindanao", foodSegments: 81 },
];

export const mockLandingStats: LandingStat[] = [
  { id: "ls-1", percent: 84, label: "Reduction in manual PO drafting time" },
  { id: "ls-2", percent: -30, label: "Lower warehouse carrying costs" },
];
