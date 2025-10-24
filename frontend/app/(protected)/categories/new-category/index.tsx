import { ThemedView } from "@/components/themed-view";
import { H1 } from "@/components/typography/typography";
import { Formik } from "formik";
import React, { useState } from "react";
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import Header from "@/components/Header/Header";
import { GoBackButton } from "@/components/headerButtons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useSchemas } from "@/constants/schemas";
import { UploadImage } from "@/components/UploadImage/UploadImage";

const initialStateForm = {
  _id: "",
  name: "",
  image: "",
  userId: "",
};

function NewCategoryPage() {
  const { newCategorySchema } = useSchemas();
  const { t } = useTranslation();
  const [scrollY, setScrollY] = useState(0);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const yOffset = event.nativeEvent.contentOffset.y;

    setScrollY(yOffset);
  };

  return (
    <>
      <Header
        withArrowBack
        scrollOffset={scrollY}
        title={t("newCategoryPage.title")}
      />
      <ScrollView onScroll={handleScroll}>
        <ThemedView>
          <GoBackButton />

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 30,
              marginBottom: 60,
            }}
          >
            <H1>{t("newRecipePage.editTitle")}</H1>
          </View>

          <Formik
            enableReinitialize
            initialValues={initialStateForm}
            validationSchema={newCategorySchema}
            onSubmit={
              (values) => {
                //  dispatch(editRecipe({ ...values, id: Number(categoryId) }));
                // router.push("/dashboard");
                // TODO: only on save, first: save image to cloudinary, get url, and if its success then make request to backend with new cat.
                console.log("values", values);
              }

              // save to redux and redirect to my recipies
              // on my recipies page show the new recipe
            }
          >
            {({
              values,
              errors,
              handleSubmit,
              handleChange,
              setFieldValue,
            }) => {
              console.log("errr", errors);
              return (
                <View style={styles.formContainer}>
                  <UploadImage
                    handleSelectImage={handleChange("image")}
                    selectedImage={values.image || ""}
                  />
                  <Input
                    label={t("newCategoryPage.form.name")}
                    placeholder={t(
                      "newCategoryPage.form.placeholderCategoryName"
                    )}
                    handleChange={handleChange("name")}
                    value={values?.name || ""}
                    errorMessage={errors.name}
                  />

                  <View style={{ gap: 20, marginBottom: 40, marginTop: 10 }}>
                    <Button
                      type="secondary"
                      title={t("newCategoryPage.save")}
                      handlePress={handleSubmit}
                    />
                  </View>
                </View>
              );
            }}
          </Formik>
        </ThemedView>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    flexDirection: "column",
    gap: 20,
  },
  cookingDetailsSection: {
    flexDirection: "column",
    gap: 20,
    marginTop: 30,
  },
  cookingDetailsContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 10,
    flexWrap: "wrap",
  },
  linkContainer: {
    flexDirection: "column",
    gap: 10,
  },
});

export default NewCategoryPage;
