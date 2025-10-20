import Header from "@/components/Header/Header";
import { RecipeCardSkeleton } from "@/components/skeletons/RecipeCardSkeleton";
import { ThemedView } from "@/components/themed-view";
import { H2, H3 } from "@/components/typography/typography";
import { Button } from "@/components/ui/button";
import { globalStyles } from "@/constants/stylesheets";
import { RootState } from "@/store/config";
import { Link, useRouter } from "expo-router";
import { Edit } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FlatList,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useSelector } from "react-redux";
function MyRecipePage() {
  const { t } = useTranslation();
  const [scrollY, setScrollY] = useState(0);
  const myRecipiesData = useSelector((state: RootState) => {
    return state.newRecipe;
  });
  console.log("🚀 ~ MyRecipePage ~ state:", myRecipiesData);
  const theme = useColorScheme() ?? "light";

  const router = useRouter();

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
      <Header
        withArrowBack
        backPath="/"
        scrollOffset={scrollY}
        title={t("myRecipesPage.title")}
      />
      <ScrollView onScroll={handleScroll}>
        <ThemedView style={{ paddingTop: 100 }}>
          <Link href="/my-recipe-page/new-recipe">
            <Button
              type="secondary"
              title={t("myRecipesPage.addNewRecipe")}
              handlePress={() => {}}
            />
          </Link>

          {/* Recipies */}
          <ThemedView style={[globalStyles.spacer40]}>
            {myRecipiesData.length === 0 && (
              <ThemedView style={[globalStyles.alignCenter]}>
                <H2>{t("myRecipesPage.noRecipies")}</H2>
              </ThemedView>
            )}

            {loading ? (
              <RecipeCardSkeleton />
            ) : (
              <FlatList
                scrollEnabled={false}
                ListHeaderComponentStyle={{ marginBottom: 10, marginTop: 10 }}
                // ListHeaderComponent={() => <H2>{t("myRecipesPage.title")}</H2>}
                //
                columnWrapperStyle={{ marginTop: hp(2) }}
                numColumns={2}
                contentContainerStyle={{ gap: 5, minHeight: hp(70) }}
                data={myRecipiesData}
                renderItem={({ item, index }) => {
                  return (
                    <ThemedView
                      style={[
                        {
                          paddingHorizontal: 10,
                          flex: 1,
                          marginBottom: 20,
                          height: 200,
                          position: "relative",
                        },
                      ]}
                    >
                      <TouchableOpacity
                        style={{ flex: 1 }}
                        onPress={() =>
                          router.push(`/my-recipe-page/view/${item.id}`)
                        }
                      >
                        <ThemedView style={[styles.recipeCard]}>
                          <Image
                            source={item.category?.image}
                            style={[styles.recipeImage]}
                          />
                        </ThemedView>
                        <H3 numberOfLines={2}>{item.title}</H3>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={{
                          position: "absolute",
                          top: 10,
                          right: 20,
                          backgroundColor: "black",
                          padding: 15,
                          borderRadius: "100%",
                        }}
                        // @ts-ignore
                        onPress={() =>
                          router.push(`/my-recipe-page/edit-recipe/${item.id}`)
                        }
                      >
                        <Edit color={"white"} />
                      </TouchableOpacity>
                    </ThemedView>
                  );
                }}
              />
            )}
          </ThemedView>
        </ThemedView>
      </ScrollView>
    </>
  );
}

export default MyRecipePage;

const styles = StyleSheet.create({
  recipeCard: {
    height: "100%",
    width: "100%",
    borderRadius: 20,
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: "#6d6c6c",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    marginBottom: 5,
  },
  recipeImage: {
    height: "100%",
    width: "100%",
    objectFit: "contain",
  },
});
