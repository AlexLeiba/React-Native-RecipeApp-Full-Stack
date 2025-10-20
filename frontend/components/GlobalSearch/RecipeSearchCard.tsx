import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { H3, Paragraph } from "../typography/typography";

type RecipeSearchCardProps = {
  handleSelectRecipe: () => void;
  title: string;
  category: string;
  image: any;
};
function RecipeSearchCard({
  handleSelectRecipe,
  title,
  category,
  image,
}: RecipeSearchCardProps) {
  return (
    <TouchableOpacity
      onPress={handleSelectRecipe}
      style={{
        flexDirection: "row",
        gap: 20,
        width: "100%",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        borderBottomColor: "gray",
        borderBottomWidth: 1,
        paddingBottom: 10,
      }}
    >
      <View>
        <H3 style={{ color: "white" }}>{title}</H3>
        <Paragraph style={{ color: "gray" }}>Category: {category}</Paragraph>
      </View>
      <Image source={image} style={{ height: 60, width: 60 }} />
    </TouchableOpacity>
  );
}

export default RecipeSearchCard;
