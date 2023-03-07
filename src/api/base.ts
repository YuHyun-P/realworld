import axios from "axios";
import storage from "~/utils/storage";

export const BASE_URL = "https://api.realworld.io/api";

const unauth = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
});

const auth = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
});

auth.interceptors.request.use((config) => {
  const nextConfig = { ...config };
  const token = storage("local").getItem("token", null);
  if (token !== null) {
    nextConfig.headers.Authorization = `Token ${token}`;
  }
  return nextConfig;
});

export { unauth, auth };
