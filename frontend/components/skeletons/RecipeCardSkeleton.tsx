import { ThemedView } from "@/components/themed-view";

import { FlatList, StyleSheet, View } from "react-native";
const RECIPE_SKELETON = Array.from({ length: 4 });
export function RecipeCardSkeleton() {
  return (
    <>
      <FlatList
        scrollEnabled={false}
        ListHeaderComponent={() => (
          <View
            style={{ height: 15, width: 100, backgroundColor: "transparent" }}
          />
        )}
        columnWrapperStyle={{ marginTop: 30 }}
        numColumns={2}
        contentContainerStyle={{ gap: 5 }}
        data={RECIPE_SKELETON}
        renderItem={() => {
          return (
            <ThemedView style={styles.container}>
              <ThemedView style={[styles.recipeCard]} />
              <View
                style={{
                  height: 10,
                  width: 150,
                  backgroundColor: "gray",
                }}
              />
            </ThemedView>
          );
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    flex: 1,
    marginBottom: 40,
    height: 250,
  },
  recipeCard: {
    height: 250,
    width: "100%",
    borderRadius: 20,
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: "#6d6c6c",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    marginBottom: 5,
  },
});
