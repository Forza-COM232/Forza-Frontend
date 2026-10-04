/**
 * React Query hooks — components use these, never the services directly.
 * They handle caching, loading and error state for free.
 */
import { useQuery } from "@tanstack/react-query";
import * as api from "@/services";

// Temporary until there's a year picker state/store
export const DEFAULT_YEAR = 2023;

export const useCurrentUser = () => useQuery({ queryKey: ["me"], queryFn: api.getCurrentUser });

export const useDashboardSummary = (year = DEFAULT_YEAR) =>
  useQuery({ queryKey: ["dashboard-summary", year], queryFn: () => api.getDashboardSummary(year) });

export const useSupplyChannels = () =>
  useQuery({ queryKey: ["supply-channels"], queryFn: api.getSupplyChannels });

export const useLowStockProducts = () =>
  useQuery({ queryKey: ["low-stock"], queryFn: api.getLowStockProducts });

export const useInventoryHealth = () =>
  useQuery({ queryKey: ["inventory-health"], queryFn: api.getInventoryHealth });

export const useAverageSales = (year = DEFAULT_YEAR) =>
  useQuery({ queryKey: ["average-sales", year], queryFn: () => api.getAverageSales(year) });

export const useInventoryUpdates = () =>
  useQuery({ queryKey: ["inventory-updates"], queryFn: api.getInventoryUpdates });

export const useCategories = () => useQuery({ queryKey: ["categories"], queryFn: api.getCategories });

export const useContracts = () => useQuery({ queryKey: ["contracts"], queryFn: api.getContracts });

export const useSuppliers = () => useQuery({ queryKey: ["suppliers"], queryFn: api.getSuppliers });

export const useStorePerformance = () =>
  useQuery({ queryKey: ["store-performance"], queryFn: api.getStorePerformance });

export const useLandingStats = () =>
  useQuery({ queryKey: ["landing-stats"], queryFn: api.getLandingStats });
