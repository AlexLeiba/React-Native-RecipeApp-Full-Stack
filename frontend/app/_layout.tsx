import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { LottieSplashScreen } from "@/components/LottieSplashScreenAnimation/LottieSplashScreen";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "../store/config";
import { initI18n } from "./i18n";
import { AuthProvider } from "@/context/AuthContext";
import "react-native-reanimated";
import ToastManager from "toastify-react-native";

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
    <AuthProvider>
      <Provider store={store}>
        <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
          <ThemeProvider
            value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
          >
            <SafeAreaView
              style={{
                flex: 1,
                paddingHorizontal: 20,
                backgroundColor: colorScheme === "dark" ? "black" : "white",
              }}
            >
              <ToastManager position="top" toastOptions={{ duration: 6000 }} />
              <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name="sign-up" options={{ headerShown: false }} />
                <Stack.Screen
                  name="forgot-password"
                  options={{ headerShown: false }}
                />
              </Stack>
              <StatusBar style="auto" />
            </SafeAreaView>
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </AuthProvider>
  );
}
