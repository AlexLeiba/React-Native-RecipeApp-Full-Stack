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

  function handleSettings() {
    router.push("/profile/settings");
  }

  function handleLogout() {
    handleSignOut();
    router.push("/");
  }
  return (
    <>
      <Header
        withArrowBack
        backPath="/"
        scrollOffset={0}
        title={t("myProfilePage.title")}
      />
      <ThemedView style={[{ paddingTop: 100 }, styles.container]}>
        <View style={{ flexDirection: "column", gap: 20 }}>
          <Button
            type="secondary"
            title={t("myProfilePage.editProfile")}
            handlePress={handleEditProfile}
          />
          <Button
            title={t("myProfilePage.settings")}
            type="secondary"
            handlePress={handleSettings}
          />
          <Button
            title={t("myProfilePage.newRecipe")}
            type="secondary"
            handlePress={handleSettings}
          />
          <Button
            title={t("myProfilePage.categorySettings")}
            type="secondary"
            handlePress={handleSettings}
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
