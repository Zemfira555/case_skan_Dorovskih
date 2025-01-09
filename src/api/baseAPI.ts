import axios from "axios";

export const baseAPI = axios.create({
  baseURL: "https://gateway.scan-interfax.ru/api/v1",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  },
});

baseAPI.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
