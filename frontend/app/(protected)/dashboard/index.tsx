import Header from "@/components/Header/Header";
import CategoryCard from "@/components/HomePage/CategoryCard";
import { RecipeCard } from "@/components/HomePage/RecipeCard";
import { CategoryCardSkeleton } from "@/components/skeletons/CategoryCardSkeleton";
import { RecipeCardSkeleton } from "@/components/skeletons/RecipeCardSkeleton";
import { ThemedView } from "@/components/themed-view";
import { H1, H3 } from "@/components/typography/typography";
import { Button } from "@/components/ui/button";
import { globalStyles } from "@/constants/stylesheets";
import { CategoryType } from "@/constants/types";
import { RootState } from "@/store/config";
import { useRouter } from "expo-router";
import { Plus } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  useColorScheme,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

function HomePage() {
  const { t } = useTranslation();
  const [scrollY, setScrollY] = useState(0);
  const router = useRouter();

  const theme = useColorScheme() ?? "light";
  const categoriesData = useSelector((state: RootState) => state.categories);
  const recipesData = useSelector((state: RootState) => state.recipes);
  const dispatch = useDispatch();

  const [category, setCategory] = React.useState<CategoryType>({
    name: "Beef",
    image: require("../../../assets/food-categories/beef.png"),
    _id: "3",
    userId: "1111",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    //fetch data
    setLoading(true);

    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, []);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const yOffset = event.nativeEvent.contentOffset.y;

    setScrollY(yOffset);
  };

  function handleAddNewRecipe() {
    router.push("/recipe/new-recipe");
  }

  return (
    <>
      <Header withSearch scrollOffset={scrollY} title={t("homePage.title")} />
      <ScrollView
        scrollEventThrottle={16}
        onScroll={(event) => {
          handleScroll(event);
        }}
        style={{ paddingTop: 110, paddingBottom: 60 }}
      >
        <ThemedView style={{ marginBottom: 20, flexDirection: "row" }}>
          <H1 style={{ color: "#ffd036cf" }}>{t("homePage.description")}</H1>
          <H1>=</H1>
          <H1 style={{ color: "#1cb926cf" }}>{t("homePage.description2")}</H1>
        </ThemedView>

        {/* CATEGORIES SECTION */}
        <ThemedView style={globalStyles.spacer10}>
          {loading ? (
            <CategoryCardSkeleton />
          ) : (
            <FlatList
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ gap: 20 }}
              horizontal
              data={categoriesData}
              renderItem={({ item }) => {
                return <CategoryCard item={item} />;
              }}
            />
          )}
        </ThemedView>

        {/*RECIPES SECTION */}
        <ThemedView style={[globalStyles.spacer40]}>
          {loading ? (
            <RecipeCardSkeleton />
          ) : (
            <FlatList
              scrollEnabled={false}
              ListHeaderComponent={() => (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <H3 style={{ color: "#fff236cf" }}>{category?.name}</H3>
                  <Button
                    handlePress={handleAddNewRecipe}
                    type="secondary"
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 50,
                      borderColor: "#fff236cf",
                      borderWidth: 2,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Plus
                      size={20}
                      color={theme === "light" ? "black" : "white"}
                    />
                  </Button>
                </View>
              )}
              //
              columnWrapperStyle={{ marginTop: 30 }}
              numColumns={2}
              contentContainerStyle={{ gap: 5 }}
              data={recipesData.items}
              renderItem={({ item }) => {
                return <RecipeCard data={item} />;
              }}
            />
          )}
        </ThemedView>
      </ScrollView>
    </>
  );
}

export default HomePage;
