import axios from "axios";
import { getToken } from "./token";

import { BASE_URL } from "@/constants";

const request = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
});

request.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

request.interceptors.response.use(
  (response) => {
    // status code: 2xx
    return response.data;
  },
  (error) => {
    // status code: non-2xx (like 4xx, 5xx)
    return Promise.reject(error);
  }
);

export default request;
