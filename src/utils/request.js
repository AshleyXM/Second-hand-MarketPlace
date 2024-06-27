import axios from "axios";

const request = axios.create({
  baseURL: "https://mock.apipark.cn/m1/4734263-4386891-default",
  timeout: 5000,
});

request.interceptors.request.use(
  (config) => {
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
