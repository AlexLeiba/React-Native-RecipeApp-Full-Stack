import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { LottieSplashScreen } from "@/components/LottieSplashScreenAnimation/LottieSplashScreen";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useEffect, useState } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "../store/config";
import { initI18n } from "./i18n";

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
    <Provider store={store}>
      <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <SafeAreaProvider>
            <SafeAreaView
              style={{
                flex: 1,
                paddingHorizontal: 20,

                backgroundColor: colorScheme === "dark" ? "black" : "white",
              }}
            >
              <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen
                  name="recipe/[recipeId]"
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="favorites"
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="my-recipe-page"
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="new-recipe"
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="edit-recipe/[recipeId]"
                  options={{ headerShown: false }}
                />
                <Stack.Screen name="profile" options={{ headerShown: false }} />
              </Stack>
              <StatusBar style="auto" />
            </SafeAreaView>
          </SafeAreaProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}
