import { UserType } from "@/constants/types";
import { createContext, useContext, useState } from "react";

import * as SecureStore from "expo-secure-store";

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

  async function handleSignIn(user: UserType) {
    await SecureStore.setItemAsync("token", "token"); //encrypts token
    const token = await SecureStore.getItemAsync("token");
    // TODO http client login req based on user credentials
    // If res is successful then we will send back user token , and will save it to AsyncStorage
    setUser(user);
  }

  function handleSignOut() {
    // TODO http client req to logout
    setUser(null);
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
