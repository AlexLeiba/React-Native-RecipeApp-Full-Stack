import { Stack } from "expo-router";
import "react-native-reanimated";

import { LottieSplashScreen } from "@/components/LottieSplashScreenAnimation/LottieSplashScreen";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useEffect, useState } from "react";

import { initI18n } from "../i18n";
import { ProtectedRoute } from "@/components/ProtectedRoute/ProtectedRoute";

export default function RootLayout() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    (async () => {
      await initI18n(); // initialize i18n safely
      setReady(true);
    })();
  }, []);

  const [isPlashVisible, setIsPlashVisible] = useState(true);
  const colorScheme = useColorScheme();

  useEffect(() => {
    // simulate loading or initialization
    const timer = setTimeout(() => setIsPlashVisible(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (isPlashVisible || !ready) {
    return (
      <LottieSplashScreen onAnimationFinish={() => setIsPlashVisible(false)} />
    );
  }

  return (
    <ProtectedRoute>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="dashboard" options={{ headerShown: false }} />
        <Stack.Screen name="favorites" options={{ headerShown: false }} />
        <Stack.Screen name="profile" options={{ headerShown: false }} />
        <Stack.Screen name="recipe" options={{ headerShown: false }} />
      </Stack>
    </ProtectedRoute>
  );
}
