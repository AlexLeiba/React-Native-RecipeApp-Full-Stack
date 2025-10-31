import { ThemedView } from "@/components/themed-view";
import { Paragraph } from "@/components/typography/typography";
import { globalStyles } from "@/constants/stylesheets";
import { CategoryType } from "@/constants/types";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { RootState } from "@/store/config";
import { selectCategory } from "@/store/slices/categories";
import { filterRecipes } from "@/store/slices/recipes";

import {
  Image,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from "react-native";

type Props = {
  item: CategoryType;
};
function CategoryCard({ item }: Props) {
  const theme = useColorScheme() ?? "light";

  // Redux
  const dispatch = useAppDispatch();
  const selectedCategory = useAppSelector(
    (state: RootState) => state.categories.selectedCategory
  );

  function handleSelectCategory(categoryId: string) {
    // Filter by category
    dispatch(filterRecipes({ type: "categoryId", id: categoryId }));
    dispatch(selectCategory({ selectedCategory: item }));
  }
  return (
    <TouchableOpacity onPress={() => handleSelectCategory(item._id)}>
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

            selectedCategory?._id === item._id && {
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
