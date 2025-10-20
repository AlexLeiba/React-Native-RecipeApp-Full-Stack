import { FavoriteButton, GoBackButton } from "@/components/headerButtons";
import { RecipeDetailsPageSkeleton } from "@/components/skeletons/RecipeDetailsPageSkeleton";
import { ThemedView } from "@/components/themed-view";
import { H1, H2, Paragraph } from "@/components/typography/typography";
import { globalStyles } from "@/constants/stylesheets";
import { Colors } from "@/constants/theme";
import { RootState } from "@/store/config";
import { RecipeType } from "@/store/slices/recipeReducer";
import { useLocalSearchParams } from "expo-router";
import { Clock, Flame, FlameKindling, User2 } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FlatList,
  Image,
  ImageSourcePropType,
  ScrollView,
  useColorScheme,
  View,
} from "react-native";
import { useSelector } from "react-redux";

function RecipeDetailsPage() {
  const { t } = useTranslation();
  const { recipeId } = useLocalSearchParams();

  const theme = useColorScheme() ?? "light";
  const recipeData = useSelector((state: RootState) => state.newRecipe); //TODO get the hardcoded data here, add in store other key which will keep all hardcoded data

  const [selectedRecipeData, setSelectedRecipeData] = useState<RecipeType>();

  const hardcodedRecipeData = useSelector(
    (state: RootState) => state.hardcodedRecipes
  );

  const [selectedCategory, setSelectedCategory] = useState<{
    id: number;
    name: string;
  }>({
    id: 0,
    name: "",
  });

  useEffect(() => {
    if (typeof recipeId === "string") {
      const recipeCategoryData = recipeId.split("-")[1];
      const recipeIdData = Number(recipeId.split("-")[0]);

      if (isNaN(recipeIdData) || !recipeCategoryData) {
        return;
      }

      setSelectedCategory({
        id: Number(recipeCategoryData),
        name: recipeCategoryData,
      });
      const selectedRecipeCategory =
        hardcodedRecipeData[recipeCategoryData].data;

      const selectedRecipeData = selectedRecipeCategory.find(
        (data) => data.id === recipeIdData
      )?.details;

      if (selectedRecipeData) {
        setSelectedRecipeData(selectedRecipeData);
      }
    }
  }, [recipeId, recipeData, setSelectedCategory]);

  const [loading, setLoading] = useState(false);
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
          source={selectedRecipeData.image as ImageSourcePropType}
          style={{
            width: "100%",
            height: "100%",
            resizeMode: "cover",
            zIndex: 1,
          }}
        />
      </View>

      <GoBackButton path="/" />

      <FavoriteButton
        recipeData={selectedRecipeData}
        recipeCategoryId={selectedCategory.id}
        recipeCategoryName={selectedCategory.name}
      />

      <View style={[globalStyles.alignCenter, { gap: 10, marginBottom: 20 }]}>
        <H1>{selectedRecipeData?.title}</H1>
      </View>

      <View
        style={{
          flexDirection: "row",
          gap: 10,
          marginBottom: 60,
          marginHorizontal: 20,
        }}
      >
        <DetailsCard
          icon={
            <Clock
              color={theme === "light" ? Colors.dark.icon : Colors.light.icon}
            />
          }
          title={
            selectedRecipeData?.timeToCook.toString() +
            +" " +
            t("detailsRecipePage.min")
          }
        />
        <DetailsCard
          icon={
            <User2
              color={theme === "light" ? Colors.dark.icon : Colors.light.icon}
            />
          }
          title={
            selectedRecipeData?.servings.toString() +
            " " +
            t("detailsRecipePage.people")
          }
        />
        <DetailsCard
          icon={
            <Flame
              color={theme === "light" ? Colors.dark.icon : Colors.light.icon}
            />
          }
          title={selectedRecipeData?.calories.toString() + " kcal"}
        />
        <DetailsCard
          icon={
            <FlameKindling
              color={theme === "light" ? Colors.dark.icon : Colors.light.icon}
            />
          }
          title={selectedRecipeData?.temperature.toString() + " °C"}
        />
      </View>

      <FlatList
        contentContainerStyle={{ gap: 10, marginBottom: 20 }}
        ListHeaderComponentStyle={{ marginBottom: 20 }}
        ListHeaderComponent={() => (
          <H2>{t("detailsRecipePage.ingredients")}</H2>
        )}
        data={selectedRecipeData?.ingredients}
        renderItem={({ item }) => <IngredientsCard title={item} />}
      />
    </ScrollView>
  );
}

const IngredientsCard = ({ title }: { title: string }) => {
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

const DetailsCard = ({
  icon,
  title,
}: {
  icon: React.ReactNode;
  title: string;
}) => {
  return (
    <View
      style={{
        padding: 10,
        backgroundColor: "#bebebe",
        borderRadius: 20,
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {icon}

      <Paragraph style={{ color: "black" }}>{title}</Paragraph>
    </View>
  );
};

export default RecipeDetailsPage;
