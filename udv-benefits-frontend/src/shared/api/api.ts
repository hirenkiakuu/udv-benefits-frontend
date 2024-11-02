import axios from "axios";

export const BASE_URL = "";

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");

        const {
          access_token: newAccessToken,
          refresh_token: newRefreshToken,
        }: { access_token: string; refresh_token: string } = await api.post(
          `/api/auth/token/refresh?refresh_token=${refreshToken}`
        );

        localStorage.setItem("accessToken", newAccessToken);
        localStorage.setItem("refreshToken", newRefreshToken);

        api.defaults.headers.common["Authorization"] =
          `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (err) {
        console.error("Token refresh failed", err);
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
