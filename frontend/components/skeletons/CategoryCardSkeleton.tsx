import { ThemedView } from "@/components/themed-view";
import { globalStyles } from "@/constants/stylesheets";

import { StyleSheet, View } from "react-native";

const CATEGORY_SKELETON = Array.from({ length: 8 });
export function CategoryCardSkeleton() {
  return (
    <ThemedView
      style={[globalStyles.alignCenter, { flexDirection: "row", gap: 20 }]}
    >
      {CATEGORY_SKELETON.map((_, index) => (
        <View key={index} style={{ gap: 5 }}>
          <ThemedView style={styles.categoryCard} />

          <View style={{ height: 10, width: 80, backgroundColor: "gray" }} />
        </View>
      ))}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  avatar: {
    height: 80,
    width: 80,
    objectFit: "cover",
  },

  categoryCard: {
    height: 80,
    width: 80,
    borderRadius: "100%",
    borderWidth: 2,
    borderStyle: "solid",

    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "gray",
  },
});
