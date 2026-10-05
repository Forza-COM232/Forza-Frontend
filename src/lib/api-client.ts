import axios, { AxiosError } from "axios";

// Switch: true = mock data, false = real backend
export const USE_MOCKS = import.meta.env.VITE_USE_MOCKS !== "false";
export const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000/api";

// Our own axios instance with default settings (from the axios "config defaults" docs)
export const apiClient = axios.create({
  baseURL: API_URL,          // every request starts with this URL
  timeout: 10_000,           // give up after 10 seconds
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  withCredentials: false,    // set to true if the backend uses login cookies
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

// Fake delay for mock data, so loading states still show
export const mockResponse = <T>(data: T, delayMs = 300): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(structuredClone(data)), delayMs));