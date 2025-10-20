import { View } from "react-native";
import { Paragraph } from "../typography/typography";

export const IngredientsCard = ({ title }: { title: string }) => {
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
      }}
    >
      <View
        style={{
          height: 30,
          width: 30,
          backgroundColor: "#ffffff",
          borderRadius: "100%",
        }}
      />
      <Paragraph>{title}</Paragraph>
    </View>
  );
};
