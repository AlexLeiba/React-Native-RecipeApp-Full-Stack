import { Card } from "@/components/Cards/Card";
import Header from "@/components/Header/Header";

import { RecipeCardSkeleton } from "@/components/skeletons/RecipeCardSkeleton";
import { ThemedView } from "@/components/themed-view";
import { globalStyles } from "@/constants/stylesheets";
import { RootState } from "@/store/config";
import { useRouter } from "expo-router";
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
import { useSelector } from "react-redux";

function UsersPage() {
  const { t } = useTranslation();
  const [scrollY, setScrollY] = useState(0);
  const router = useRouter();

  const theme = useColorScheme() ?? "light";
  const categoriesData = useSelector((state: RootState) => state.categories);

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
        type="users"
        withSearch
        scrollOffset={scrollY}
        title={t("adminPages.users")}
      />
      <ScrollView
        scrollEventThrottle={16}
        onScroll={(event) => {
          handleScroll(event);
        }}
        style={{ paddingTop: 50, paddingBottom: 60 }}
      >
        {/*USERS SECTION */}
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
                  {/* <H3 style={{ color: "#fff236cf" }}>{category?.name}</H3>
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
                  </Button> */}
                </View>
              )}
              //
              columnWrapperStyle={{ marginTop: 30 }}
              numColumns={2}
              contentContainerStyle={{ gap: 5 }}
              data={categoriesData}
              renderItem={({ item }) => {
                return (
                  <Card
                    data={item}
                    handleSelect={() => router.push(`/admin/users/${item._id}`)}
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

export default UsersPage;
