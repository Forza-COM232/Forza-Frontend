/**
 * Single switch between mock data and the real backend.
 *
 *   VITE_USE_MOCKS=true   → services return data from src/mocks (default)
 *   VITE_USE_MOCKS=false  → services call VITE_API_URL
 */
export const USE_MOCKS = import.meta.env.VITE_USE_MOCKS !== "false";
export const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000/api";

/** Resolve mock data after a short delay so loading states behave like a real request */
export const mockResponse = <T>(data: T, delayMs = 300): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(structuredClone(data)), delayMs));

/** Minimal JSON fetch wrapper for the real backend */
export async function http<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { "Content-Type": "application/json", ...init?.headers },
    ...init,
  });
  if (!res.ok) throw new Error(`Request failed: ${res.status} ${res.statusText}`);
  return res.json() as Promise<T>;
}
