import Header from "@/components/Header/Header";
import { ThemedView } from "@/components/themed-view";
import { Button } from "@/components/ui/button";
import { DropDown } from "@/components/ui/dropdown";
import SwitchComponent from "@/components/ui/switch";
import { LANGUAGES } from "@/constants/MockData";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import i18n from "../../i18n";

function SettingsPage() {
  const { t } = useTranslation();
  const currentLang = i18n.language;
  const router = useRouter();
  // const theme = useColorScheme() ?? "light";
  const [language, setLanguage] = React.useState("english");
  const [notifications, setNotifications] = React.useState(false);

  function handleSave() {
    // Save settings logic here
    router.back();
  }

  function handleChangeLanguage(language: string) {
    setLanguage(language);
    if (language === "romanian") {
      i18n.changeLanguage("ro");
    } else {
      i18n.changeLanguage("en");
    }
  }

  useEffect(() => {
    if (currentLang === "ro") {
      setLanguage("romanian");
    } else {
      setLanguage("english");
    }
  }, [currentLang]);
  return (
    <>
      <Header
        withArrowBack
        backPath="/profile"
        scrollOffset={0}
        title={t("settingsPage.title")}
      />
      <ThemedView style={{ paddingTop: 100, gap: 20, height: "100%" }}>
        <View style={styles.container}>
          <View style={{ gap: 30 }}>
            <View style={{ flexDirection: "row", gap: 8, width: "100%" }}>
              <SwitchComponent
                value={notifications}
                label={t("settingsPage.notifications")}
                handleChange={setNotifications}
              />
            </View>

            <View style={{ flexDirection: "row", gap: 8, width: "100%" }}>
              <DropDown
                label={t("settingsPage.language")}
                options={LANGUAGES}
                handleChange={(categoryValue) =>
                  handleChangeLanguage(categoryValue)
                }
                value={language}
              />
            </View>
          </View>
          <View style={styles.button}>
            <Button
              type="secondary"
              title={t("settingsPage.save")}
              handlePress={handleSave}
            />
          </View>
        </View>
      </ThemedView>
    </>
  );
}

export default SettingsPage;
const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
  },
  button: {
    marginBottom: 30,
  },
});
