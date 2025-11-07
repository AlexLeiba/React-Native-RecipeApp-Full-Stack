import { axiosInstance } from "@/lib/axiosConfig";
import { axiosProtectedInstance } from "./axiosClient";
import { RequestPrefixType } from "@/constants/types";

export const apiFactory = {
  login: async (userCredentials: { email: string; password: string }) => {
    const response = await axiosInstance.post("/api/login", userCredentials);

    return response.data;
  },
  register: async (userCredentials: {
    email: string;
    password: string;
    username: string;
  }) => {
    const response = await axiosInstance.post("/api/register", userCredentials);

    return response.data;
  },
  forgotPassword: async (userCredentials: { email: string }) => {
    const response = await axiosInstance.post(
      "/api/forgot-password",
      userCredentials
    );

    return response.data;
  },
  checkOtpCode: async (userCredentials: { otp: string; email: string }) => {
    const response = await axiosInstance.post(
      "/api/check-otp",
      userCredentials
    );

    return response.data;
  },
  createNewPassword: async (userCredentials: {
    email: string;
    newPassword: string;
  }) => {
    const response = await axiosInstance.post(
      "/api/new-password",
      userCredentials
    );

    return response.data;
  },

  refreshToken: async () => {
    const response = await axiosInstance.get("/api/refresh-token");
    return response.data;
  },
  logout: async () => {
    await axiosInstance.get("api/logout");
  },
};
