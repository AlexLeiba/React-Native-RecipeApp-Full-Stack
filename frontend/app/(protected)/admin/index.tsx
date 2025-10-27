import Header from "@/components/Header/Header";
import { ThemedView } from "@/components/themed-view";
import { Button } from "@/components/ui/button";
import { useRouter } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";

function AdminPage() {
  const { t } = useTranslation();
  const router = useRouter();

  function handleCategories() {
    router.push("/admin/categories");
  }

  function handleRecipes() {
    // @ts-ignore
    router.push("/admin/recipe");
  }

  function handleGoToUsers() {
    router.push("/admin/users");
  }

  return (
    <>
      <Header withArrowBack scrollOffset={0} title={t("adminPages.title")} />
      <ThemedView style={[{ paddingTop: 100 }, styles.container]}>
        <View style={{ flexDirection: "column", gap: 20 }}>
          <Button
            title={t("adminPages.users")}
            type="secondary"
            handlePress={handleGoToUsers}
          />
          <Button
            title={t("adminPages.recipes")}
            type="secondary"
            handlePress={handleRecipes}
          />
          <Button
            title={t("adminPages.categories")}
            type="secondary"
            handlePress={handleCategories}
          />
        </View>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
  },
});

export default AdminPage;
