import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const APIM_SUBSCRIPTION_KEY =
  import.meta.env.VITE_APIM_SUBSCRIPTION_KEY;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

apiClient.interceptors.request.use(
  (config) => {
    if (APIM_SUBSCRIPTION_KEY) {
      config.headers["Ocp-Apim-Subscription-Key"] =
        APIM_SUBSCRIPTION_KEY;
    }

    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const status = error?.response?.status;

    switch (status) {
      case 401:
        console.error("Unauthorized");
        break;
      case 403:
        console.error("Forbidden");
        break;
      case 500:
        console.error("Server error");
        break;
      default:
        console.error("API error", error);
    }

    return Promise.reject(error);
  }
);

export default apiClient;
