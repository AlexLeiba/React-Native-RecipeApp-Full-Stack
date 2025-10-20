import { globalStyles } from "@/constants/stylesheets";
import React from "react";
import { FlatList, ScrollView, View } from "react-native";
const RECIPE_SKELETON = Array.from({ length: 4 });
export function RecipeDetailsPageSkeleton() {
  return (
    <ScrollView>
      <View
        style={[
          {
            width: "100%",
            height: 500,
            borderRadius: 20,
            overflow: "hidden",
            marginBottom: 40,
            position: "relative",
            backgroundColor: "gray",
          },
        ]}
      />

      <View style={[globalStyles.alignCenter]}>
        <View
          style={{
            gap: 10,
            marginBottom: 20,
            height: 20,
            width: 300,
            backgroundColor: "gray",
          }}
        />
      </View>

      <View
        style={{
          flexDirection: "row",
          gap: 10,
          marginBottom: 60,
          marginHorizontal: 20,
        }}
      >
        {RECIPE_SKELETON.map((_, index) => (
          <DetailsCard key={index} />
        ))}
      </View>

      <FlatList
        contentContainerStyle={{ gap: 10, marginBottom: 20 }}
        ListHeaderComponentStyle={{ marginBottom: 20 }}
        ListHeaderComponent={() => (
          <View style={{ height: 24, width: 100, backgroundColor: "gray" }} />
        )}
        data={RECIPE_SKELETON}
        renderItem={() => <IngredientsCard />}
      />
    </ScrollView>
  );
}

const IngredientsCard = () => {
  return (
    <View
      style={{
        padding: 10,
        backgroundColor: "#979711",
        borderRadius: 20,
        marginHorizontal: 15,
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
        height: 30,
      }}
    />
  );
};

const DetailsCard = () => {
  return (
    <View
      style={{
        padding: 10,
        backgroundColor: "#bebebe",
        borderRadius: 20,
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        height: 60,
      }}
    />
  );
};
