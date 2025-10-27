import {
  FavoriteAndEditButton,
  GoBackButton,
} from "@/components/headerButtons";
import { DetailsCard } from "@/components/RecipeDetailsPage/DetailsCard";
import { IngredientsCard } from "@/components/RecipeDetailsPage/IngredientsCard";
import { RecipeDetailsPageSkeleton } from "@/components/skeletons/RecipeDetailsPageSkeleton";
import { ThemedView } from "@/components/themed-view";
import { H1, H2, Paragraph } from "@/components/typography/typography";
import { Button } from "@/components/ui/button";
import { globalStyles } from "@/constants/stylesheets";
import { Colors } from "@/constants/theme";
import { RecipesType } from "@/constants/types";
import { RootState } from "@/store/config";
import { useLocalSearchParams } from "expo-router";
import { Clock, Flame, FlameKindling, User2 } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FlatList,
  Image,
  Linking,
  ScrollView,
  useColorScheme,
  View,
} from "react-native";
import { useSelector } from "react-redux";

function RecipeDetailsPage() {
  const { t } = useTranslation();
  const theme = useColorScheme() ?? "light";
  const { recipeId } = useLocalSearchParams();
  const recipes = useSelector((state: RootState) => state.recipes);

  const [selectedRecipeData, setSelectedRecipeData] = useState<RecipesType>();

  useEffect(() => {
    const selectedRecipe = recipes.items.find((rec) => rec._id === recipeId);
    setSelectedRecipeData(selectedRecipe);
  }, [recipeId]);

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

  const recipeCookDetails = [
    {
      icon: <Clock color={Colors[theme].text} size={20} />,
      title: `${
        selectedRecipeData.details?.timeToCook +
        " " +
        t("detailsRecipePage.min")
      }`,
    },
    {
      icon: <Flame color={Colors[theme].text} size={20} />,
      title: selectedRecipeData.details?.calories
        ? `${selectedRecipeData.details?.calories + " kcal"}`
        : "",
    },
    {
      icon: <FlameKindling color={Colors[theme].text} size={20} />,
      title: selectedRecipeData.details?.temperature
        ? `${selectedRecipeData.details?.temperature + "°C"} `
        : "",
    },
    {
      icon: <User2 color={Colors[theme].text} size={20} />,
      title: `${selectedRecipeData.details?.servings} ${t(
        "detailsRecipePage.people"
      )}`,
    },
  ];

  if (loading) {
    return <RecipeDetailsPageSkeleton />;
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
          source={{ uri: selectedRecipeData?.image || "" }}
          style={{
            width: "100%",
            height: "100%",
            resizeMode: "cover",
            zIndex: 1,
          }}
        />
      </View>

      <GoBackButton path="/dashboard" />

      <FavoriteAndEditButton recipeData={selectedRecipeData} />

      <View style={[globalStyles.alignCenter, { gap: 10, marginBottom: 20 }]}>
        <H1>{selectedRecipeData?.name}</H1>

        {selectedRecipeData.description && (
          <View style={[{}, { gap: 10, marginBottom: 20 }]}>
            <Paragraph style={{ color: Colors[theme].text }}>
              {selectedRecipeData.description}
            </Paragraph>
          </View>
        )}
      </View>

      {selectedRecipeData.link &&
        selectedRecipeData.link.linkName &&
        selectedRecipeData.link.linkUrl && (
          <View
            style={[
              globalStyles.alignCenter,
              { gap: 10, marginBottom: 20, marginHorizontal: 20 },
            ]}
          >
            <Button
              type="link"
              title={selectedRecipeData.link.linkName}
              handlePress={() => {
                if (selectedRecipeData.link?.linkUrl) {
                  Linking.openURL(selectedRecipeData.link.linkUrl);
                }
              }}
            />
          </View>
        )}

      <View
        style={{
          flexDirection: "row",
          gap: 10,
          marginBottom: 60,
          marginHorizontal: 20,
        }}
      >
        {recipeCookDetails.map((item, index) => {
          if (!item.title) return;
          return (
            <DetailsCard key={index} icon={item.icon} title={item.title} />
          );
        })}
      </View>

      <FlatList
        contentContainerStyle={{ gap: 10, marginBottom: 20 }}
        ListHeaderComponentStyle={{ marginBottom: 20 }}
        ListHeaderComponent={() => (
          <H2>{t("detailsRecipePage.ingredients")}</H2>
        )}
        data={selectedRecipeData?.details.ingredients}
        renderItem={({ item }) => <IngredientsCard title={item} />}
      />
    </ScrollView>
  );
}

export default RecipeDetailsPage;
