import Header from "@/components/Header/Header";
import { CategoryLargeCard } from "@/components/HomePage/CategoryLargeCard";
import { RecipeCardSkeleton } from "@/components/skeletons/RecipeCardSkeleton";
import { ThemedView } from "@/components/themed-view";
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

function CategoriesPage() {
  const { t } = useTranslation();
  const [scrollY, setScrollY] = useState(0);
  const router = useRouter();

  const theme = useColorScheme() ?? "light";
  const categoriesData = useSelector((state: RootState) => state.categories);
  console.log("🚀 ~ CategoriesPage ~ categoriesData:", categoriesData);
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

  function handleAddNewCategory() {
    router.push("/categories/new-category");
  }

  return (
    <>
      <Header
        withSearch
        scrollOffset={scrollY}
        title={t("categoriesPage.title")}
      />
      <ScrollView
        scrollEventThrottle={16}
        onScroll={(event) => {
          handleScroll(event);
        }}
        style={{ paddingTop: 110, paddingBottom: 60 }}
      >
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
                  {/* <H3 style={{ color: "#fff236cf" }}>{category?.name}</H3> */}
                  <View></View>
                  <Button
                    handlePress={handleAddNewCategory}
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
              data={categoriesData}
              renderItem={({ item }) => {
                return <CategoryLargeCard data={item} />;
              }}
            />
          )}
        </ThemedView>
      </ScrollView>
    </>
  );
}

export default CategoriesPage;
