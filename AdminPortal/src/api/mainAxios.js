import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

const mainApi = axios.create({
  baseURL: `${BASE_URL}/api/`,
});

mainApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("admin_access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default mainApi;