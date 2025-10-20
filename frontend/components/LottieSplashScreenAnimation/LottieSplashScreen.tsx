import LottieView from "lottie-react-native";
import React, { useEffect } from "react";
import {
  Image,
  Platform,
  StyleSheet,
  useColorScheme,
  View,
} from "react-native";

export function LottieSplashScreen({
  onAnimationFinish,
}: {
  onAnimationFinish: () => void;
}) {
  const theme = useColorScheme() ?? "light";
  useEffect(() => {
    const timer = setTimeout(onAnimationFinish, 2500); // adjust timing
    return () => clearTimeout(timer);
  }, []);
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme === "dark" ? "#000000" : "#ffffff" },
      ]}
    >
      {Platform.OS === "web" ? (
        <Image
          source={require("../../assets/lottie/Walking-Avocado.gif")}
          style={{ width: 250, height: 250 }}
        />
      ) : (
        <LottieView
          source={require("../../assets/lottie/Walking-Avocado.json")} // your Lottie file
          autoPlay
          loop={false}
          onAnimationFinish={onAnimationFinish}
          style={{ width: 250, height: 250 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: "center",
    justifyContent: "center",
  },
});
