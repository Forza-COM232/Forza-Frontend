import axios from "axios";

/**
 * Single switch between mock data and the real backend.
 *
 *   VITE_USE_MOCKS=true   → services return data from src/mocks
 *   VITE_USE_MOCKS=false  → services call VITE_API_URL
 */
export const USE_MOCKS = import.meta.env.VITE_USE_MOCKS !== "false";
export const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000/api";

/**
 * Axios instance configured with baseURL and default headers
 * Matches the Axios setup specified by the team lead.
 */
export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

/** Resolve mock data after a short delay so loading states behave like a real request */
export const mockResponse = <T>(data: T, delayMs = 300): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(structuredClone(data)), delayMs));

/**
 * Axios HTTP client wrapper for the real backend.
 * Seamlessly interfaces with existing service functions in src/services.
 */
export async function http<T>(path: string, init?: RequestInit): Promise<T> {
  const method = (init?.method || "GET").toLowerCase();
  let data: any = undefined;

  if (init?.body) {
    try {
      data = typeof init.body === "string" ? JSON.parse(init.body) : init.body;
    } catch {
      data = init.body;
    }
  }

  const response = await apiClient.request<T>({
    url: path,
    method,
    data,
    headers: init?.headers as any,
  });

  return response.data;
}
