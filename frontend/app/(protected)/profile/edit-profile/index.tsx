import i18n from "@/app/i18n";
import Header from "@/components/Header/Header";
import { ThemedView } from "@/components/themed-view";
import { Button } from "@/components/ui/button";
import { DropDown } from "@/components/ui/dropdown";
import { Input } from "@/components/ui/input";
import SwitchComponent from "@/components/ui/switch";
import { UploadImage } from "@/components/UploadImage/UploadImage";
import { LANGUAGES } from "@/constants/MockData";
import { useRouter } from "expo-router";
import { Formik } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, StyleSheet, View } from "react-native";

function EditProfile() {
  const [selectedImage, setSelectedImage] = React.useState("");
  const { t } = useTranslation();
  const router = useRouter();
  const [language, setLanguage] = React.useState("english");
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

  function handleChangeAvatar(imageUrl: string) {
    setSelectedImage(imageUrl);
  }
  return (
    <>
      <Header
        withArrowBack
        scrollOffset={0}
        title={t("editProfilePage.title")}
      />
      <ScrollView style={{ paddingTop: 100 }}>
        <UploadImage
          handleSelectImage={handleChangeAvatar}
          selectedImage={selectedImage}
        />

        <Formik
          initialValues={{
            name: "",
            password: "",
            repeatPassword: "",
            notifications: false,
          }}
          onSubmit={(values) => {
            console.log(values);
            handleSave();
          }}
        >
          {({
            handleBlur,
            handleSubmit,
            values,
            handleChange,
            setFieldValue,
          }) => {
            return (
              <View style={styles.formContainer}>
                <View style={{ gap: 20 }}>
                  <DropDown
                    label={t("settingsPage.language")}
                    options={LANGUAGES}
                    handleChange={(categoryValue) =>
                      handleChangeLanguage(categoryValue)
                    }
                    value={language}
                  />

                  <SwitchComponent
                    value={values.notifications}
                    label={t("settingsPage.notifications")}
                    handleChange={(value) =>
                      setFieldValue("notifications", value)
                    }
                  />

                  {/* TODO: add user email here */}
                  <Input
                    aria-disabled
                    placeholder={t("editProfilePage.name")}
                    label={t("editProfilePage.email")}
                    handleChange={handleChange("name")}
                    value={values.name}
                  />

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
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    flexDirection: "column",

    justifyContent: "space-between",
    height: "80%",
  },
});

export default EditProfile;
