/**
 * React Query hooks — components use these, never the services directly.
 * They handle caching, loading and error state for free.
 */
import { useQuery } from "@tanstack/react-query";
import * as api from "@/services";
import { useSelectedDate } from "@/lib/selected-date";

export { DEFAULT_YEAR } from "@/lib/selected-date";

/** Year picked in the navbar calendar (pass a year to a hook to override it) */
const useYear = (override?: number) => {
  const { date } = useSelectedDate();
  return override ?? date.getFullYear();
};

export const useCurrentUser = () => useQuery({ queryKey: ["me"], queryFn: api.getCurrentUser });

export const useFiscalYears = () => useQuery({ queryKey: ["fiscal-years"], queryFn: api.getFiscalYears });

export const useDashboardSummary = (yearOverride?: number) => {
  const year = useYear(yearOverride);
  return useQuery({ queryKey: ["dashboard-summary", year], queryFn: () => api.getDashboardSummary(year) });
};

export const useSupplyChannels = () =>
  useQuery({ queryKey: ["supply-channels"], queryFn: api.getSupplyChannels });

export const useLowStockProducts = () =>
  useQuery({ queryKey: ["low-stock"], queryFn: api.getLowStockProducts });

export const useInventoryHealth = () =>
  useQuery({ queryKey: ["inventory-health"], queryFn: api.getInventoryHealth });

export const useAverageSales = (yearOverride?: number) => {
  const year = useYear(yearOverride);
  return useQuery({ queryKey: ["average-sales", year], queryFn: () => api.getAverageSales(year) });
};

export const useInventoryUpdates = () =>
  useQuery({ queryKey: ["inventory-updates"], queryFn: api.getInventoryUpdates });

export const useCategories = () => useQuery({ queryKey: ["categories"], queryFn: api.getCategories });

export const useContracts = () => useQuery({ queryKey: ["contracts"], queryFn: api.getContracts });

export const useSuppliers = () => useQuery({ queryKey: ["suppliers"], queryFn: api.getSuppliers });

export const useStorePerformance = () =>
  useQuery({ queryKey: ["store-performance"], queryFn: api.getStorePerformance });

export const useLandingStats = () =>
  useQuery({ queryKey: ["landing-stats"], queryFn: api.getLandingStats });
