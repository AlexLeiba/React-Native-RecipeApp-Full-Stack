import { BACKEND_BASE_URL } from "@env";
import axios from "axios";
export const axiosInstance = axios.create({
  baseURL: BACKEND_BASE_URL,
});
