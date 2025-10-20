import { FavoriteButton, GoBackButton } from "@/components/headerButtons";
import { RecipeDetailsPageSkeleton } from "@/components/skeletons/RecipeDetailsPageSkeleton";
import { ThemedView } from "@/components/themed-view";
import { H1, H2, Paragraph } from "@/components/typography/typography";
import { Button } from "@/components/ui/button";
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
  Linking,
  ScrollView,
  useColorScheme,
  View,
} from "react-native";
import { useSelector } from "react-redux";

function RecipeDetailsPage() {
  const { t } = useTranslation();
  const { recipeId } = useLocalSearchParams();
  const theme = useColorScheme() ?? "light";
  const recipeData = useSelector((state: RootState) => state.newRecipe);
  const [selectedRecipeId, setSelectedRecipeId] = useState<number>(0);

  const [selectedRecipeData, setSelectedRecipeData] = useState<RecipeType>();

  useEffect(() => {
    if (typeof recipeId === "string") {
      const recipeIdData = Number(recipeId);
      if (isNaN(recipeIdData)) return;

      setSelectedRecipeId(recipeIdData);
      const selectedRecipe = recipeData.find(
        (data) => data.id === Number(recipeId)
      );

      if (selectedRecipe) {
        setSelectedRecipeData({
          ...selectedRecipe,
          ingredients: selectedRecipe.ingredients,
        });
      }
    }
  }, [recipeId, recipeData]);

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

  const recipeCookDetails = [
    {
      icon: <Clock color={Colors[theme].text} size={20} />,
      title: `${
        selectedRecipeData?.timeToCook + " " + t("detailsRecipePage.min")
      }`,
    },
    {
      icon: <Flame color={Colors[theme].text} size={20} />,
      title: selectedRecipeData?.calories
        ? `${selectedRecipeData?.calories + " kcal"}`
        : "",
    },
    {
      icon: <FlameKindling color={Colors[theme].text} size={20} />,
      title: selectedRecipeData?.temperature
        ? `${selectedRecipeData?.temperature + "°C"} `
        : "",
    },
    {
      icon: <User2 color={Colors[theme].text} size={20} />,
      title: `${selectedRecipeData?.servings} ${t("detailsRecipePage.people")}`,
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
          source={selectedRecipeData?.category?.image}
          style={{
            width: "100%",
            height: "100%",
            resizeMode: "cover",
            zIndex: 1,
          }}
        />
      </View>

      <GoBackButton path="/my-recipe-page" />

      <FavoriteButton
        recipeData={selectedRecipeData}
        recipeCategoryName={"my-recipe-page"}
        recipeCategoryId={selectedRecipeId}
      />

      <View style={[globalStyles.alignCenter, { gap: 10, marginBottom: 20 }]}>
        <H1>{selectedRecipeData?.title}</H1>

        {selectedRecipeData.description && (
          <View style={[{}, { gap: 10, marginBottom: 20 }]}>
            <Paragraph style={{ color: Colors[theme].text }}>
              {selectedRecipeData.description}
            </Paragraph>
          </View>
        )}
      </View>

      {selectedRecipeData.link &&
        selectedRecipeData.linkUrl &&
        selectedRecipeData.linkName && (
          <View
            style={[
              globalStyles.alignCenter,
              { gap: 10, marginBottom: 20, marginHorizontal: 20 },
            ]}
          >
            <Button
              type="link"
              title={selectedRecipeData.linkName}
              handlePress={() => {
                selectedRecipeData.linkUrl &&
                  Linking.openURL(selectedRecipeData.linkUrl);
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

export default RecipeDetailsPage;
