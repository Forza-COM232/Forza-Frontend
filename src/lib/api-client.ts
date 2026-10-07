import axios, { AxiosError } from "axios";

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
  timeout: 10_000, // give up after 10 seconds
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Turn errors into readable messages (uses the backend's { message } if it sends one)
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: string }>) => {
    const status = error.response?.status;
    const message =
      error.response?.data?.message ??
      (status ? `Request failed (${status})` : "Can't reach the server. Is the backend running?");
    return Promise.reject(Object.assign(new Error(message), { status }));
  },
);

// Helpers the services use
export const apiGet = async <T>(path: string, params?: Record<string, string | number>) =>
  (await apiClient.get<T>(path, { params })).data;

export const apiPost = async <T>(path: string, body?: unknown) =>
  (await apiClient.post<T>(path, body)).data;

/** Resolve mock data after a short delay so loading states behave like a real request */
export const mockResponse = <T>(data: T, delayMs = 300): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(structuredClone(data)), delayMs));

/**
 * Axios HTTP client wrapper for the real backend.
 * Seamlessly interfaces with existing service functions in src/services.
 */
export async function http<T>(path: string, init?: RequestInit): Promise<T> {
  const method = (init?.method || "GET").toLowerCase();
  let data: unknown = undefined;

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
    headers: init?.headers as Record<string, string> | undefined,
  });

  return response.data;
}