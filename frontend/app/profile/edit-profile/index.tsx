import { Avatar } from "@/components/Avatar/Avatar";
import Header from "@/components/Header/Header";
import { ThemedView } from "@/components/themed-view";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "expo-router";
import { Formik } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";

function EditProfile() {
  const { t } = useTranslation();
  const router = useRouter();
  function handleSave() {
    // Save settings logic here
    router.back();
  }
  return (
    <>
      <Header
        withArrowBack
        backPath="/profile"
        scrollOffset={0}
        title={t("editProfilePage.title")}
      />
      <ThemedView style={{ paddingTop: 100 }}>
        <Avatar />

        <Formik
          initialValues={{ name: "", password: "", repeatPassword: "" }}
          onSubmit={(values) => {
            console.log(values);
            handleSave();
          }}
        >
          {({ handleBlur, handleSubmit, values, handleChange }) => {
            return (
              <View style={styles.formContainer}>
                <View style={{ gap: 20 }}>
                  <Input
                    placeholder={t("editProfilePage.name")}
                    label={t("editProfilePage.name")}
                    handleChange={handleChange("name")}
                    value={values.name}
                  />
                  <Input
                    placeholder={t("editProfilePage.password")}
                    label={t("editProfilePage.password")}
                    handleChange={handleChange("password")}
                    value={values.password}
                    secureTextEntry
                  />
                  <Input
                    placeholder={t("editProfilePage.repeatPassword")}
                    label={t("editProfilePage.repeatPassword")}
                    handleChange={handleChange("repeatPassword")}
                    value={values.repeatPassword}
                    secureTextEntry
                  />
                </View>

                <Button
                  title={t("editProfilePage.save")}
                  type="secondary"
                  handlePress={handleSubmit}
                />
              </View>
            );
          }}
        </Formik>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    flexDirection: "column",

    justifyContent: "space-between",
    height: "100%",
  },
});

export default EditProfile;
