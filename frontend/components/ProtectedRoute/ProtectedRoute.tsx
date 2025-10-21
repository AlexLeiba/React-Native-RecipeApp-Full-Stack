import { Redirect, Slot } from "expo-router";
import { useAuth } from "@/context/AuthContext";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();

  if (!user) return <Redirect href="/" />;

  if (user) return <Slot />;
  return children;
}
