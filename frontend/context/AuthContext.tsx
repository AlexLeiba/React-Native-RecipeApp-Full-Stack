import { UserType } from "@/constants/types";
import { createContext, useContext, useEffect, useState } from "react";

import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";
import { axiosInstance } from "@/lib/axiosConfig";
import { decodeJWT } from "@/lib/decodeJWT";
import { apiFactory } from "@/api/apiFactory";

type AuthContextType = {
  loading: boolean;
  user: UserType | null;
  handleSignIn: (userCredentials: {
    password: string;
    email: string;
  }) => Promise<{
    message: string;
    success: boolean;
    error: boolean;
  }>;
  handleSignOut: () => Promise<{
    message: string;
    success: boolean;
    error: boolean;
  }>;
  checkUserSession(): void;
};
const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: false,
  handleSignIn: () => {
    return Promise.resolve({ message: "", success: false, error: false });
  },
  handleSignOut: () => {
    return Promise.resolve({ message: "", success: false, error: false });
  },
  checkUserSession: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(false);

  // Will check at reload page if user is authenticated
  async function checkUserSession() {
    const accessToken =
      Platform.OS === "web"
        ? localStorage.getItem("recipe-token")
        : await SecureStore.getItemAsync("recipe-token");

    if (accessToken) {
      const payload = decodeJWT(accessToken);
      console.log("🚀 payload:", payload);

      if (Date.now() >= payload.exp * 1000) {
        console.log("Expired token");
        // TODO make refreshTokenRequest INTERSEPTORS

        try {
          const response = await apiFactory.refreshToken();

          if (response?.accessToken) {
            if (Platform.OS === "web") {
              localStorage.setItem(
                "recipe-token",
                JSON.stringify(response.data.accessToken)
              ); //only for tests on website
            } else {
              await SecureStore.setItemAsync(
                "recipe-token",
                JSON.stringify(response.data.accessToken)
              ); //encrypts token on mobile platform
            }
          }
        } catch (error: any) {
          // In case the refresh token couldnt be generated then logout
          handleSignOut();
        }
      }
      setUser({ ...payload, accessToken });
    } else {
      handleSignOut();
    }
  }

  useEffect(() => {
    checkUserSession();
  }, []);

  async function handleSignIn(userCredentials: {
    password: string;
    email: string;
  }) {
    setLoading(true);
    try {
      const response = await apiFactory.login(userCredentials);

      // make request to backend to get token
      if (response?.accessToken) {
        if (Platform.OS === "web") {
          localStorage.setItem(
            "recipe-token",
            JSON.stringify(response.accessToken)
          ); //only for tests on website
        } else {
          await SecureStore.setItemAsync(
            "recipe-token",
            JSON.stringify(response.accessToken)
          ); //encrypts token on mobile platform
        }
      } else {
        throw new Error("User not found");
      }

      setUser(response);

      return { message: "Success", success: true, error: false };
    } catch (error: any) {
      console.log("🚀 ~ handleSignIn ~ error:", error);
      return {
        message: error?.response?.data?.message || error.message,
        success: false,
        error: true,
      };
    } finally {
      setLoading(false);
    }
  }

  async function handleSignOut() {
    setLoading(true);
    try {
      setUser(null);
      // TODO http client req to logout

      await apiFactory.logout();

      if (Platform.OS === "web") {
        localStorage.removeItem("recipe-token");
      } else {
        await SecureStore.deleteItemAsync("recipe-token"); //encrypts token
      }

      return { message: "Success", success: true, error: false };
    } catch (error: any) {
      return {
        message: error?.response?.data?.message || error.message,
        success: false,
        error: true,
      };
    } finally {
      setLoading(false);
    }
  }

  // TODO dispatch if user is logged request with token
  //   Token may be stored in AsyncStorage
  //If token expires then Dispatch Refreshtoken request
  // if refresh token is expired then logout
  return (
    <AuthContext.Provider
      value={{
        loading,
        user,
        handleSignIn,
        handleSignOut,
        checkUserSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const { user, loading, handleSignIn, handleSignOut, checkUserSession } =
    useContext(AuthContext);

  return { user, loading, handleSignIn, handleSignOut };
}
