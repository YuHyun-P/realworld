import axios from "axios";

export const BASE_URL = "https://api.realworld.io/api";

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
});

export default instance;
