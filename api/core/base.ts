import axios from "axios";
import * as SecureStore from "expo-secure-store";

const isTesting = process.env.EXPO_PUBLIC_TESTING === "true";

const baseURL = isTesting
  ? process.env.EXPO_PUBLIC_API_TEST_URL
  : process.env.EXPO_PUBLIC_API_URL;

if (__DEV__) {
  console.log(
    `[API] Using ${isTesting ? "TEST" : "PROD"} base URL: ${baseURL}`,
  );
}

const apiClient = axios.create({
  baseURL,
  headers: { Accept: "application/json" },
});

apiClient.interceptors.request.use(
  async (config) => {
    const token = await SecureStore.getItemAsync("userToken");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    config.headers["Content-Type"] =
      config.data instanceof FormData
        ? "multipart/form-data"
        : "application/json";
    return config;
  },
  (error) => Promise.reject(error),
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const method = error.config?.method?.toUpperCase() ?? "UNKNOWN";
    const url = error.config?.url ?? "UNKNOWN";
    const status = error.response?.status ?? "NO_STATUS";

    console.error(
      `[API ERROR] ${method} ${url} | Status: ${status}`,
      "\nResponse:",
      error.response?.data,
    );

    if (status === 401) await SecureStore.deleteItemAsync("userToken");

    return Promise.reject(error);
  },
);

export default apiClient;
