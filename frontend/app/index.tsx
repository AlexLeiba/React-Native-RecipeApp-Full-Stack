import Header from "@/components/Header/Header";
import CategoryCard from "@/components/HomePage/CategoryCard";
import { RecipeCard } from "@/components/HomePage/RecipeCard";
import { CategoryCardSkeleton } from "@/components/skeletons/CategoryCardSkeleton";
import { RecipeCardSkeleton } from "@/components/skeletons/RecipeCardSkeleton";
import { ThemedView } from "@/components/themed-view";
import { H1, H3 } from "@/components/typography/typography";
import { globalStyles } from "@/constants/stylesheets";
import { RootState } from "@/store/config";
import { CategoryType } from "@/store/slices/categoriesReducer";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  useColorScheme,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

function HomePage() {
  const { t } = useTranslation();
  const [scrollY, setScrollY] = useState(0);

  const theme = useColorScheme() ?? "light";
  const categoriesData = useSelector((state: RootState) => state.categories);
  const hardcodedRecipeData = useSelector(
    (state: RootState) => state.hardcodedRecipes
  );
  const dispatch = useDispatch();

  const [category, setCategory] = React.useState<CategoryType>({
    name: "Beef",
    image: require("../assets/food-categories/beef.png"),
    id: 3,
    selected: true,
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
        <ThemedView style={{ marginBottom: 20 }}>
          <H1>
            {t("homePage.description")}
            <H1 style={{ color: "#1cb926cf" }}>{t("homePage.description2")}</H1>
            {t("homePage.description3")}
            <H1 style={{ color: "#ffd036cf" }}>{t("homePage.description4")}</H1>
          </H1>
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
                <H3 style={{ color: "#fff236cf" }}>{category?.name}</H3>
              )}
              //
              columnWrapperStyle={{ marginTop: 30 }}
              numColumns={2}
              contentContainerStyle={{ gap: 5 }}
              data={
                category && category.name
                  ? hardcodedRecipeData[category.name.toLowerCase()].data
                  : hardcodedRecipeData["beef"].data //initial state data
              }
              renderItem={({ item }) => {
                return (
                  <RecipeCard
                    id={item.details.id}
                    categoryName={category?.name.toLowerCase()}
                    image={item.image}
                    title={item.details.title}
                    name={item.details.title}
                    detailsTitle={item.details.title}
                  />
                );
              }}
            />
          )}
        </ThemedView>
      </ScrollView>
    </>
  );
}

export default HomePage;
