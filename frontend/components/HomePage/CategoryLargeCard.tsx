import { useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { ThemedView } from "../themed-view";
import { H3 } from "../typography/typography";
import { CategoryType } from "@/constants/types";

export function CategoryLargeCard({ data }: { data: CategoryType }) {
  const router = useRouter();

  function handleSelectCard(categoryId: string) {
    router.push(`/categories/${categoryId}`);
  }
  return (
    <ThemedView
      style={[
        {
          paddingHorizontal: 10,
          flex: 1,
          marginBottom: 40,
        },
        { height: 150 },
      ]}
    >
      <TouchableOpacity
        style={{ flex: 1 }}
        onPress={() => handleSelectCard(data._id)}
      >
        <ThemedView
          style={[styles.recipeCard, { height: "100%", width: "100%" }]}
        >
          <Image source={{ uri: data.image }} style={[styles.recipeImage]} />
        </ThemedView>
        <H3 numberOfLines={2}>{data.name}</H3>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  avatar: {
    height: 80,
    width: 80,
    objectFit: "cover",
  },
  helloChips: {
    width: 100,
    padding: 10,
    backgroundColor: "#cacaca",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  categoryCard: {
    height: 80,
    width: 80,
    borderRadius: "100%",
    borderWidth: 2,
    borderStyle: "solid",

    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  recipeCard: {
    height: "100%",
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
  recipeImage: {
    height: "100%",
    width: "100%",
    objectFit: "contain",
  },
});
