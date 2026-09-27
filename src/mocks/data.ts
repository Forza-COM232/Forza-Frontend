/**
 * Mock data used while the backend isn't ready.
 * Values match the Figma design. Edit freely — the UI reads everything from here
 * (through src/services), so nothing else needs to change.
 */
import type {
  AverageSales,
  Category,
  Contract,
  DemandForecast,
  ExpiringBatch,
  GrossMargin,
  HoldingCost,
  InventoryTurnover,
  LeadTimeTrend,
  Product,
  StockMovement,
  SupplierPerformance,
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
  { id: "c-1", name: "Fresh Vegetables", description: "Leafy greens, root veggies & more", productCount: 248310 },
  { id: "c-2", name: "Fruits", description: "Seasonal & exotic fruits", productCount: 196420 },
  { id: "c-3", name: "Meat & Poultry", description: "Fresh cuts & frozen options", productCount: 172905 },
  
];

export const mockProducts: Product[] = [
  { id: "p-1", name: "Fresh Milk 1L", categoryId: "c-5", sku: "D001", stock: 160, price: 127, status: "low_stock" },
  
];

export const mockExpiringBatches: ExpiringBatch[] = [
  { id: "b-1", batchCode: "BT0352", categoryId: "c-6", sku: "B001", expiresOn: "2026-10-02" },
  { id: "b-2", batchCode: "BT0334", categoryId: "c-3", sku: "M001", expiresOn: "2026-10-04" },
  { id: "b-3", batchCode: "BT0341", categoryId: "c-5", sku: "D001", expiresOn: "2026-10-06" },
  { id: "b-4", batchCode: "BT0360", categoryId: "c-4", sku: "S001", expiresOn: "2026-10-11" },
  { id: "b-5", batchCode: "BT0371", categoryId: "c-8", sku: "J001", expiresOn: "2026-11-20" },
  { id: "b-6", batchCode: "BT0388", categoryId: "c-9", sku: "Z001", expiresOn: "2027-03-15" },
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

// ── Analytics ───────────────────────────────────────────────

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export const mockInventoryTurnover: InventoryTurnover = {
  labels: [2020, 2021].flatMap((y) => MONTHS.map((_, m) => `${y}-${String(m + 1).padStart(2, "0")}`)),
  series: [
    {
      name: "Turnover",
      values: [
        110, 60, 150, 180, 220, 160, 190, 120, 80, 40, 10, 0,
        -60, -40, -120, -90, -170, -150, -230, -210, -300, -350, -410, -380,
      ],
    },
  ],
  targetRange: { min: -200, max: 0 },
};

export const mockGrossMargin: GrossMargin = {
  labels: MONTHS.slice(0, 6),
  series: [{ name: "Gross margin %", values: [34, 30, 17, 21, 28, 40] }],
};

export const mockLeadTime: LeadTimeTrend = {
  labels: MONTHS,
  series: [
    { name: "2023", values: [1, 2, 8, 14, 20, 24, 27, 26, 21, 15, 9, 3] },
    { name: "2022", values: [5, 6, 9, 13, 17, 20, 20, 19, 15, 10, 7, 6] },
  ],
};

export const mockHoldingCost: HoldingCost = {
  labels: MONTHS.slice(0, 7),
  series: [{ name: "Holding cost (₱k)", values: [55, 195, 100, 150, 110, 60, 95] }],
};

export const mockStockMovement: StockMovement = {
  labels: ["2017", "2018", "2019", "2020", "2021", "2022", "2023"],
  series: [
    { name: "Stock in", values: [95, 100, 135, 105, 100, 95, 110] },
    { name: "Stock out", values: [40, 55, 65, 40, 55, 60, 65] },
  ],
};

export const mockDemand: DemandForecast = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  series: [
    { name: "Actual orders", values: [40, 45, 52, 70, 88, 120, 160] },
    { name: "Forecast", values: [42, 48, 50, 75, 95, 130, 185] },
  ],
};

export const mockSupplierPerformance: SupplierPerformance = {
  labels: [
    "Luzon Meat Packers",
    "Metro Dairy Wholesale",
    "Visayas Beverage Distributors",
    "Mindanao Fresh Produce",
    "Bulacan Bakery Supply",
  ],
  series: [{ name: "On-time deliveries %", values: [35, 22, 18, 15, 10] }],
};
