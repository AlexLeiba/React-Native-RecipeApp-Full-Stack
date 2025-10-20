import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme.web";
import { View } from "react-native";
import { Paragraph } from "../typography/typography";

export const DetailsCard = ({
  icon,
  title,
}: {
  icon: React.ReactNode;
  title: string;
}) => {
  const theme = useColorScheme() ?? "light";
  return (
    <View
      style={{
        padding: 10,
        backgroundColor: "#757474",
        borderRadius: 20,
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {icon}

      <Paragraph style={{ color: Colors[theme].text }}>{title}</Paragraph>
    </View>
  );
};
