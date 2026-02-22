

import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;
const ADMIN_API_URL = `${BASE_URL}/api/admin/`;

const adminApi = axios.create({
  baseURL: ADMIN_API_URL,
});

/* ======================
   REQUEST INTERCEPTOR
====================== */
adminApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("admin_access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/* ======================
   RESPONSE INTERCEPTOR
====================== */
adminApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // SAFETY CHECK
    if (!error.response) {
      console.error("Network / CORS error", error);
      return Promise.reject(error);
    }

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("admin_refresh_token");
        if (!refreshToken) {
          throw new Error("No refresh token");
        }

        const refreshResponse = await axios.post(
          `${BASE_URL}/api/admin/login/refresh/`,
          { refresh: refreshToken }
        );

        const newAccessToken = refreshResponse.data.access;

        localStorage.setItem("admin_access_token", newAccessToken);

        // IMPORTANT: attach token to the retried request
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return adminApi(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed", refreshError);

        localStorage.removeItem("admin_access_token");
        localStorage.removeItem("admin_refresh_token");

        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

/* ======================
   API HELPERS
====================== */
export const loginAdmin = async (username, password) => {
  const response = await adminApi.post("login/", {
    username,
    password,
  });

  if (response.data.access) {
    localStorage.setItem("admin_access_token", response.data.access);
    localStorage.setItem("admin_refresh_token", response.data.refresh);
  }

  return response.data;
};

export const logoutAdmin = () => {
  localStorage.removeItem("admin_access_token");
  localStorage.removeItem("admin_refresh_token");
};

export const getAdminAccessToken = () =>
  localStorage.getItem("admin_access_token");

export const getAdminRefreshToken = () =>
  localStorage.getItem("admin_refresh_token");

export default adminApi;
