/**
 * Every data request the UI makes goes through here.
 * To connect the backend: set VITE_USE_MOCKS=false and make sure each
 * endpoint below returns the matching type from src/types.
 */
import { USE_MOCKS, http, mockResponse } from "@/lib/api-client";
import * as mock from "@/mocks/data";
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

const get = <T>(path: string, mockData: T): Promise<T> =>
  USE_MOCKS ? mockResponse(mockData) : http<T>(path);

// ── Auth / user ─────────────────────────────────────────────
export const login = (employeeId: string, password: string): Promise<CurrentUser> =>
  USE_MOCKS
    ? mockResponse({ ...mock.mockCurrentUser, id: employeeId || mock.mockCurrentUser.id })
    : http<CurrentUser>("/auth/login", {
        method: "POST",
        body: JSON.stringify({ employeeId, password }),
      });

export const logout = (): Promise<void> =>
  USE_MOCKS ? mockResponse(undefined) : http<void>("/auth/logout", { method: "POST" });

export const getCurrentUser = () => get<CurrentUser>("/me", mock.mockCurrentUser);
export const getFiscalYears = () => get<number[]>("/fiscal-years", mock.mockFiscalYears);

// ── Dashboard ───────────────────────────────────────────────
export const getDashboardSummary = (year: number) =>
  get<DashboardSummary>(`/dashboard/summary?year=${year}`, mock.mockDashboardSummary);
export const getSupplyChannels = () => get<SupplyChannel[]>("/supply-channels", mock.mockSupplyChannels);
export const getLowStockProducts = () =>
  get<LowStockProduct[]>("/products/low-stock", mock.mockLowStockProducts);
export const getInventoryHealth = () => get<InventoryHealth>("/inventory/health", mock.mockInventoryHealth);
export const getAverageSales = (year: number) =>
  get<AverageSales>(`/sales/average?year=${year}`, mock.mockAverageSales);
export const getInventoryUpdates = () =>
  get<InventoryUpdates>("/inventory/updates", mock.mockInventoryUpdates);

// ── Inventory ───────────────────────────────────────────────
export const getCategories = () => get<Category[]>("/categories", mock.mockCategories);
export const getProducts = () => get<Product[]>("/products", mock.mockProducts);
export const getExpiringBatches = () =>
  get<ExpiringBatch[]>("/batches/expiring", mock.mockExpiringBatches);

// ── Analytics ───────────────────────────────────────────────
export const getInventoryTurnover = (year: number) =>
  get<InventoryTurnover>(`/analytics/inventory-turnover?year=${year}`, mock.mockInventoryTurnover);
export const getGrossMargin = (year: number) =>
  get<GrossMargin>(`/analytics/gross-margin?year=${year}`, mock.mockGrossMargin);
export const getLeadTime = (year: number) =>
  get<LeadTimeTrend>(`/analytics/lead-time?year=${year}`, mock.mockLeadTime);
export const getHoldingCost = (year: number) =>
  get<HoldingCost>(`/analytics/holding-cost?year=${year}`, mock.mockHoldingCost);
export const getStockMovement = () =>
  get<StockMovement>("/analytics/stock-movement", mock.mockStockMovement);
export const getDemand = (year: number) =>
  get<DemandForecast>(`/analytics/demand?year=${year}`, mock.mockDemand);
export const getSupplierPerformance = (year: number) =>
  get<SupplierPerformance>(`/analytics/supplier-performance?year=${year}`, mock.mockSupplierPerformance);

// ── Suppliers ───────────────────────────────────────────────
export const getContracts = () => get<Contract[]>("/contracts", mock.mockContracts);
export const getSuppliers = () => get<Supplier[]>("/suppliers", mock.mockSuppliers);

// ── Landing ─────────────────────────────────────────────────
export const getStorePerformance = () =>
  get<RegionPerformance[]>("/store-performance", mock.mockStorePerformance);
export const getLandingStats = () => get<LandingStat[]>("/landing/stats", mock.mockLandingStats);
