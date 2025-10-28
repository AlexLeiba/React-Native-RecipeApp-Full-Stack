import { BACKEND_BASE_URL } from "@env";
import { Platform } from "react-native";
import axios from "axios";

const baseURL =
  Platform.OS === "web" ? process.env.BACKEND_BASE_URL : BACKEND_BASE_URL;
export const axiosInstance = axios.create({
  baseURL: baseURL,
});
