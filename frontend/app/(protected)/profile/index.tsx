import Header from "@/components/Header/Header";
import { ThemedView } from "@/components/themed-view";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";

function ProfilePage() {
  const { t } = useTranslation();
  const router = useRouter();

  const { handleSignOut } = useAuth();

  function handleEditProfile() {
    router.push("/profile/edit-profile");
  }

  function handleNewRecipe() {
    router.push("/recipe/new-recipe");
  }

  function categoriesSettings() {
    // @ts-ignore
    router.push("/categories");
  }

  function handleAdmin() {
    // @ts-ignore
    router.push("/admin");
  }

  function handleGoToDashboard() {
    router.push("/dashboard");
  }

  function handleLogout() {
    handleSignOut();
    router.push("/");
  }
  return (
    <>
      <Header withArrowBack scrollOffset={0} title={t("myProfilePage.title")} />
      <ThemedView style={[{ paddingTop: 100 }, styles.container]}>
        <View style={{ flexDirection: "column", gap: 20 }}>
          <Button
            title={t("myProfilePage.dashboard")}
            type="secondary"
            handlePress={handleGoToDashboard}
          />
          <Button
            title={t("myProfilePage.settings")}
            type="secondary"
            handlePress={handleEditProfile}
          />
          <Button
            title={t("myProfilePage.newRecipe")}
            type="secondary"
            handlePress={handleNewRecipe}
          />
          <Button
            title={t("myProfilePage.categorySettings")}
            type="secondary"
            handlePress={categoriesSettings}
          />
          <Button
            title={t("myProfilePage.admin")}
            type="tertiary"
            handlePress={handleAdmin}
          />
        </View>

        <View style={{ marginBottom: 50 }}>
          <Button
            title={t("myProfilePage.logout")}
            handlePress={handleLogout}
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

export default ProfilePage;
