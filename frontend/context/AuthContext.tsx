import { UserType } from "@/constants/types";
import { createContext, useContext, useEffect, useState } from "react";

import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

type AuthContextType = {
  user: UserType | null;
  handleSignIn: (user: UserType) => void;
  handleSignOut: () => void;
};
const AuthContext = createContext<AuthContextType>({
  user: null,
  handleSignIn: () => {},
  handleSignOut: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserType | null>(null);

  // Will check at reload page if user is authenticated
  async function checkIfUserIsAuthenticated() {
    const token =
      Platform.OS === "web"
        ? localStorage.getItem("token")
        : await SecureStore.getItemAsync("token");

    //  If token exists, make a req and check if its not expired.
    //if expired make a refreshToken req.
    //if refreshtoken expired then delete token and logout

    if (token) {
      setUser({
        username: "username",
        email: "email@gmail.com",
        accessToken: token,
        avatar: "",
        roles: { user: "user" },
      });
    }
  }
  useEffect(() => {
    console.log("Reload page");
    checkIfUserIsAuthenticated();
  }, []);

  async function handleSignIn(user: UserType) {
    if (user.accessToken) {
      if (Platform.OS === "web") {
        localStorage.setItem("token", user.accessToken);
      } else {
        await SecureStore.setItemAsync("token", user.accessToken); //encrypts token
      }
    }
    const token =
      Platform.OS === "web"
        ? localStorage.getItem("token")
        : await SecureStore.getItemAsync("token");

    console.log("🚀 ~ Saved securely token:", token);
    // TODO http client login req based on user credentials

    setUser(user);
  }

  async function handleSignOut() {
    // TODO http client req to logout
    setUser(null);

    if (Platform.OS === "web") {
      localStorage.removeItem("token");
    } else {
      await SecureStore.deleteItemAsync("token"); //encrypts token
    }
  }

  // TODO dispatch if user is logged request with token
  //   Token may be stored in AsyncStorage
  //If token expires then Dispatch Refreshtoken request
  // if refresh token is expired then logout
  return (
    <AuthContext.Provider value={{ user, handleSignIn, handleSignOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const { user, handleSignIn, handleSignOut } = useContext(AuthContext);
  return { user, handleSignIn, handleSignOut };
}
