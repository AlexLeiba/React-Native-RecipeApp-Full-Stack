import { ThemedView } from "@/components/themed-view";
import { H1, H2 } from "@/components/typography/typography";
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
import { DropDown } from "@/components/ui/dropdown";
import { Input } from "@/components/ui/input";
import SwitchComponent from "@/components/ui/switch";
import { CATEGORIES_DATA } from "@/constants/MockData";
import { newRecipeSchema } from "@/constants/schemas";
import { newRecipe } from "@/store/slices/recipeReducer";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

const initialStateForm = {
  id: 0,
  title: "",
  description: "",
  image: "",
  ingredients: "",
  timeToCook: 0,
  servings: 0,
  calories: 0,
  temperature: 0,
  link: false,
  linkName: "",
  linkUrl: "",
  category: CATEGORIES_DATA[0].name,
};

function NewRecipePage() {
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
        backPath="/my-recipe-page"
        scrollOffset={scrollY}
        title="New recipe"
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
            // enableReinitialize
            initialValues={initialStateForm}
            validationSchema={newRecipeSchema}
            onSubmit={
              (values) => {
                dispatch(
                  newRecipe({
                    ...values,
                    id: Date.now(),
                    ingredients: values.ingredients.split(","),
                    favorites: false,
                    category: CATEGORIES_DATA.find(
                      (cat) =>
                        cat.name.toLowerCase() === values.category.toLowerCase()
                    ),
                  })
                );
                router.push("/my-recipe-page");
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
                  <Input
                    label={t("newRecipePage.form.title")}
                    placeholder={t("newRecipePage.form.placeholderTypeHere")}
                    handleChange={handleChange("title")}
                    value={values?.title || ""}
                    errorMessage={errors.title}
                  />
                  <Input
                    label={t("newRecipePage.form.description")}
                    placeholder={t("newRecipePage.form.placeholderTypeHere")}
                    handleChange={handleChange("description")}
                    value={values?.description}
                    errorMessage={errors.description}
                  />
                  <Input
                    label={t("newRecipePage.form.ingredients")}
                    placeholder={t("newRecipePage.form.placeholderIngredients")}
                    handleChange={handleChange("ingredients")}
                    value={values?.ingredients as string}
                    errorMessage={errors.ingredients}
                  />
                  <DropDown
                    options={CATEGORIES_DATA}
                    label="Category *"
                    value={values.category}
                    handleChange={(categoryValue) =>
                      setFieldValue("category", categoryValue)
                    }
                  />

                  {values.link && (
                    <View>
                      <SwitchComponent
                        value={values.link}
                        handleChange={(value) => setFieldValue("link", value)}
                        label={t("newRecipePage.form.addALink")}
                      />

                      {values.link && values.linkName && values.linkUrl && (
                        <View style={styles.linkContainer}>
                          <Input
                            label={t("newRecipePage.form.linkName")}
                            placeholder={t(
                              "newRecipePage.form.placeholderTypeHere"
                            )}
                            handleChange={handleChange("linkName")}
                            value={values?.linkName}
                            errorMessage={errors.link}
                          />
                          <Input
                            label={t("newRecipePage.form.linkUrl")}
                            placeholder={t(
                              "newRecipePage.form.placeholderTypeHere"
                            )}
                            handleChange={handleChange("linkUrl")}
                            value={values?.linkUrl}
                            errorMessage={errors.link}
                          />
                        </View>
                      )}
                    </View>
                  )}

                  <View style={styles.cookingDetailsSection}>
                    <H2>{t("newRecipePage.form.cookingDetails")}</H2>

                    <View style={styles.cookingDetailsContainer}>
                      <Input
                        keyboardType="numeric"
                        label={t("newRecipePage.form.servings")}
                        placeholder={t(
                          "newRecipePage.form.placeholderTypeHere"
                        )}
                        handleChange={handleChange("servings")}
                        value={values?.servings.toString()}
                        errorMessage={errors.servings}
                      />
                      <Input
                        keyboardType="numeric"
                        label={t("newRecipePage.form.timeToCook")}
                        placeholder={t(
                          "newRecipePage.form.placeholderTypeHere"
                        )}
                        handleChange={handleChange("timeToCook")}
                        value={values?.timeToCook.toString()}
                        errorMessage={errors.timeToCook}
                      />
                      <Input
                        keyboardType="numeric"
                        label={t("newRecipePage.form.calories")}
                        placeholder={t(
                          "newRecipePage.form.placeholderTypeHere"
                        )}
                        handleChange={handleChange("calories")}
                        value={values?.calories.toString()}
                        errorMessage={errors.calories}
                      />
                      <Input
                        keyboardType="numeric"
                        label={t("newRecipePage.form.temperature")}
                        placeholder={t(
                          "newRecipePage.form.placeholderTypeHere"
                        )}
                        handleChange={handleChange("temperature")}
                        value={values?.temperature.toString()}
                        errorMessage={errors.temperature}
                      />
                    </View>
                  </View>
                  <View style={{ gap: 20, marginBottom: 40, marginTop: 10 }}>
                    <Button
                      type="secondary"
                      title={t("newRecipePage.save")}
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

export default NewRecipePage;
