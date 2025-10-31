// import { BACKEND_BASE_URL } from "@env";
import { Platform } from "react-native";
import axios from "axios";

const baseURL =
  Platform.OS === "web"
    ? process.env.BACKEND_BASE_URL
    : "http://localhost:3000";
export const axiosInstance = axios.create({
  baseURL: baseURL,
});
