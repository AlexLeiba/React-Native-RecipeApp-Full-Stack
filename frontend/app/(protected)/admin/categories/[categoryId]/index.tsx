import { GoBackButton } from "@/components/headerButtons";

import { RecipeDetailsPageSkeleton } from "@/components/skeletons/RecipeDetailsPageSkeleton";
import { ThemedView } from "@/components/themed-view";
import { H1, H2, Paragraph } from "@/components/typography/typography";
import { Button } from "@/components/ui/button";
import { globalStyles } from "@/constants/stylesheets";
import { Colors } from "@/constants/theme";
import { CategoryType } from "@/constants/types";
import { RootState } from "@/store/config";
import { router, useLocalSearchParams } from "expo-router";
import { Edit } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Image,
  ScrollView,
  StyleSheet,
  useColorScheme,
  View,
} from "react-native";
import { useSelector } from "react-redux";

function CategoryDetailsPage() {
  const { t } = useTranslation();
  const theme = useColorScheme() ?? "light";
  const { categoryId } = useLocalSearchParams();
  const categoryData = useSelector((state: RootState) => state.categories);
  // const recipeData = useSelector((state: RootState) => state.recipes);

  const [selectedRecipeData, setSelectedRecipeData] = useState<CategoryType>();

  useEffect(() => {
    const selectedRecipe = categoryData.find((rec) => rec._id === categoryId);
    setSelectedRecipeData(selectedRecipe);
  }, [categoryId]);

  const [loading, setLoading] = useState(false);

  // Test skeleton
  useEffect(() => {
    //fetch data
    setLoading(true);

    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, []);

  if (!selectedRecipeData) {
    return (
      <ThemedView>
        <Paragraph>{t("detailsRecipePage.recipeNotFound")}</Paragraph>
      </ThemedView>
    );
  }

  if (loading) {
    return <RecipeDetailsPageSkeleton />;
  }

  function handleEditCategory() {
    // @ts-ignore
    router.push(`/categories/edit-category/${selectedRecipeData?._id}`);
  }
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
          },
        ]}
      >
        <Image
          source={{ uri: "https://picsum.photos/800/800" }}
          style={{
            width: "100%",
            height: "100%",
            resizeMode: "cover",
            zIndex: 1,
          }}
        />

        <Button
          type="ghost"
          handlePress={handleEditCategory}
          style={[styles.editButton]}
        >
          <Edit color={"white"} />
        </Button>
      </View>

      <GoBackButton path="/dashboard" />

      <View style={[globalStyles.alignCenter, { gap: 10, marginBottom: 20 }]}>
        <H1>{selectedRecipeData?.name}</H1>
      </View>

      <View style={{ gap: 10, marginTop: 50 }}>
        <H2>Email: </H2>
        <H2>Created at: </H2>
        <H2>Updated at: </H2>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  editButton: {
    position: "absolute",
    top: 20,
    right: 20,
    zIndex: 2,
    borderRadius: "100%",
    backgroundColor: "black",
    padding: 10,
  },
});

export default CategoryDetailsPage;
