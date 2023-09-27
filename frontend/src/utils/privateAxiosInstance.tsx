import axios from "axios";
import { axiosInstance } from "./axiosInstance";

export const privateAxiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
  timeout: 1000,
  headers: { Accept: "application/json", "Content-Type": "application/json" },
});

privateAxiosInstance.interceptors.request.use(
  (config) => {
    const token = JSON.parse(localStorage.getItem("user") || "null");
    if (token) {
      config.headers.Authorization = `Bearer ${token.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

privateAxiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If the error status is 401 and there is no originalRequest._retry flag,
    // it means the token has expired and we need to refresh it
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = JSON.parse(localStorage.getItem("user") || 'null');
        console.log(refreshToken.token)
        const response = await axiosInstance.post("/auth/refresh", {
          headers: {
            Authorization: `Bearer ${refreshToken.token}`,
          },
        });
        console.log('Reached')
        const { token } = response.data;

        localStorage.setItem("token", token);

        // Retry the original request with the new token
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return axios(originalRequest);
      } catch (error) {
        console.log(error)
        // Handle refresh token error or redirect to login
      }
    }

    return Promise.reject(error);
  }
);
