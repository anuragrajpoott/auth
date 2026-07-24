import axios from "axios";

const REFRESH_TOKEN_ENDPOINT = "/auth/refresh-token";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      originalRequest &&
      error.response?.status === 401 &&
      !originalRequest._retry &&
      originalRequest.url !== REFRESH_TOKEN_ENDPOINT
    ) {
      originalRequest._retry = true;

      try {
        await api.post(REFRESH_TOKEN_ENDPOINT);
        return api(originalRequest);
      } catch {
        // Refresh token is invalid or expired.
        // Let the application handle logout.
      }
    }

    const message =
      error.response?.data?.message ??
      error.message ??
      "Something went wrong.";

    return Promise.reject({
      ...error,
      message,
    });
  }
);

export default api;