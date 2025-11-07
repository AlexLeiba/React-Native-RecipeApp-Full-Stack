import { decodeJWT } from "@/lib/decodeJWT";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";
import { apiFactory } from "./apiFactory";

const baseURL =
  Platform.OS === "web"
    ? process.env.BACKEND_BASE_URL || "http://localhost:4000"
    : "http://localhost:4000";

export const axiosProtectedInstance = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

// ✅ Request interceptor
axiosProtectedInstance.interceptors.request.use(async (config) => {
  // ✅ Ensure headers object always exists
  config.headers = config.headers ?? {};

  const accessToken =
    Platform.OS === "web"
      ? localStorage.getItem("recipe-token")
      : await SecureStore.getItemAsync("recipe-token");

  console.log("🚀 Token:", accessToken);

  if (accessToken) {
    const { exp } = decodeJWT(accessToken);
    const isExpired = Date.now() >= exp * 1000;

    if (isExpired) {
      try {
        const response = await apiFactory.refreshToken();

        if (response?.accessToken) {
          config.headers.Authorization = `Bearer ${response.accessToken}`;

          if (Platform.OS === "web") {
            localStorage.setItem("recipe-token", response.accessToken);
          } else {
            await SecureStore.setItemAsync(
              "recipe-token",
              response.accessToken
            );
          }
        }
      } catch (error: any) {
        console.log("ERROR refreshing token:", error.message);

        // Remove token if refresh fails
        if (Platform.OS === "web") {
          localStorage.removeItem("recipe-token");
        } else {
          await SecureStore.deleteItemAsync("recipe-token");
        }
      }
    } else {
      // ✅ Token still valid → attach it
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
  } else {
    // ✅ Explicitly remove any stale header
    delete config.headers.Authorization;
  }

  return config;
});
