import Header from "@/components/Header/Header";
import { RecipeCardSkeleton } from "@/components/skeletons/RecipeCardSkeleton";
import { ThemedView } from "@/components/themed-view";
import { H2, H3 } from "@/components/typography/typography";
import { globalStyles } from "@/constants/stylesheets";
import { RootState } from "@/store/config";
import { setToFavorite } from "@/store/slices/favoritesReducer";
import { useRouter } from "expo-router";
import { X } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  ImageSourcePropType,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useDispatch, useSelector } from "react-redux";

function FavoritesPage() {
  const [scrollY, setScrollY] = useState(0);
  const dispatch = useDispatch();
  const favoritesData = useSelector((state: RootState) => {
    return state.favorites.favorites;
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

  const theme = useColorScheme() ?? "light";

  const router = useRouter();

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
        title="Favorites"
      />
      <ScrollView onScroll={handleScroll}>
        <ThemedView style={{ paddingTop: 50 }}>
          {/* Recipies */}
          <ThemedView style={[globalStyles.spacer40]}>
            {favoritesData.length === 0 && (
              <ThemedView style={[globalStyles.alignCenter]}>
                <H2>No favorites added yet</H2>
              </ThemedView>
            )}

            {loading ? (
              <RecipeCardSkeleton />
            ) : (
              <FlatList
                scrollEnabled={false}
                ListHeaderComponentStyle={{ marginTop: 20 }}
                ListHeaderComponent={() => (
                  <H3 style={{ color: "#fff236cf" }}>
                    Favorites {favoritesData.length}
                  </H3>
                )}
                //
                columnWrapperStyle={{ marginTop: hp(2) }}
                numColumns={2}
                contentContainerStyle={{ gap: 10, minHeight: hp(70) }}
                data={favoritesData}
                renderItem={({ item }) => {
                  return (
                    <ThemedView style={styles.cardContainer}>
                      <TouchableOpacity
                        style={{ flex: 1 }}
                        onPress={() => {
                          const idLength = item.id.toString().length;
                          if (idLength < 4) {
                            router.push(
                              `/recipe/${item.id}-${item.categoryName}`
                            );
                          } else {
                            router.push(`/my-recipe-page/view/${item.id}`);
                          }
                        }}
                      >
                        <ThemedView style={[styles.imageContainer]}>
                          <Image
                            source={
                              (item.image as ImageSourcePropType) ||
                              item.category?.image
                            }
                            style={[styles.recipeImage]}
                          />
                        </ThemedView>
                        <H3 numberOfLines={2}>{item.title}</H3>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={styles.buttonDelete}
                        // @ts-ignore
                        onPress={() => dispatch(setToFavorite(item))}
                      >
                        <X color={"white"} />
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

export default FavoritesPage;

const styles = StyleSheet.create({
  cardContainer: {
    paddingHorizontal: 10,
    flex: 1,
    marginBottom: 20,
    height: 250,
    position: "relative",
  },
  imageContainer: {
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
  buttonDelete: {
    position: "absolute",
    top: 10,
    right: 20,
    backgroundColor: "black",
    padding: 15,
    borderRadius: "100%",
  },
});
