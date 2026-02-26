import axios from "axios";
import * as SecureStore from "expo-secure-store";
type RefreshAccessTokenFn = () => Promise<string | null>;
type LogoutFn = () => Promise<void> | void;

let refreshAccessTokenFn: RefreshAccessTokenFn | null = null;
let logoutFn: LogoutFn | null = null;

export const setAuthCallbacks = (
  refreshFn: RefreshAccessTokenFn,
  onLogout: LogoutFn
) => {
  refreshAccessTokenFn = refreshFn;
  logoutFn = onLogout;
};

//old url
// const API_URL = "https://sram-thi7.onrender.com/api";
//new url
const API_URL = process.env.EXPO_PUBLIC_API_URL;


const apiClient = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const isRefreshRequest =
      typeof originalRequest?.url === "string" &&
      originalRequest.url.includes("/token/refresh/");
    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      !isRefreshRequest &&
      refreshAccessTokenFn
    ) {
      originalRequest._retry = true;
      const newAccess = await refreshAccessTokenFn();
      if (newAccess) {
        await SecureStore.setItemAsync("accessToken", newAccess);
        originalRequest.headers.Authorization = `Bearer ${newAccess}`;
        return apiClient(originalRequest);
      }
      if (logoutFn) await logoutFn();
    }
    return Promise.reject(error);
  }
);

apiClient.interceptors.request.use(
  async (config) => {
    if (typeof config.url === "string" && config.url.startsWith("/")) {
      config.url = config.url.slice(1);
    }
    const token = await SecureStore.getItemAsync("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default apiClient;
