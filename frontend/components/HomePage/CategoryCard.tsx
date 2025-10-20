import { ThemedView } from "@/components/themed-view";
import { Paragraph } from "@/components/typography/typography";
import { globalStyles } from "@/constants/stylesheets";
import { CategoryType } from "@/constants/types";
import { RootState } from "@/store/config";
import { selectCategory } from "@/store/slices/categoriesReducer";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

type Props = {
  item: CategoryType;
};
function CategoryCard({ item }: Props) {
  const { t } = useTranslation();

  const theme = useColorScheme() ?? "light";
  const categoriesData = useSelector((state: RootState) => state.categories);

  const dispatch = useDispatch();

  const [category, setCategory] = useState<CategoryType>({
    name: "Beef",
    image: require("../../assets/food-categories/beef.png"),
    _id: "3",
    userId: "3",
  });
  const router = useRouter();
  function handleSelectCategory(
    category: CategoryType["name"],
    categoryId: string
  ) {}
  return (
    <TouchableOpacity onPress={() => handleSelectCategory(item.name, item._id)}>
      <ThemedView style={[globalStyles.alignCenter, {}]}>
        <ThemedView
          style={[
            styles.categoryCard,
            theme === "light"
              ? { borderColor: "black" }
              : { borderColor: "white" },
            (item.name === "My recipies" || item.name === "Favorites") && {
              borderColor: "#3ee06ccf",
              borderWidth: 5,
            },

            category?._id === item._id && {
              borderColor: "#ffb514e9",
              borderWidth: 5,
            },
          ]}
        >
          <Image source={{ uri: item.image }} style={styles.avatar} />
        </ThemedView>
        <Paragraph>{item.name}</Paragraph>
      </ThemedView>
    </TouchableOpacity>
  );
}

export default CategoryCard;
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
    overflow: "hidden",
  },
});
