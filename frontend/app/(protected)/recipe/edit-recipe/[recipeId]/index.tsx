import { GoBackButton } from "@/components/headerButtons";
import { ThemedView } from "@/components/themed-view";
import { H1, H2 } from "@/components/typography/typography";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import { Button } from "@/components/ui/button";
import { DropDown } from "@/components/ui/dropdown";
import { Input } from "@/components/ui/input";
import SwitchComponent from "@/components/ui/switch";
import { CATEGORIES_DATA } from "@/constants/MockData";
import { RootState } from "@/store/config";
import { deleteRecipe, editRecipe } from "@/store/slices/recipes";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useSchemas } from "@/constants/schemas";
// import { RecipesType } from "@/constants/types";

const initialStateForm = {
  name: "",
  image: "",
  _id: "",
  userId: "",
  categoryId: "",
  categoryName: "",
  description: "",

  link: false,
  linkUrl: "",
  linkName: "",

  timeToCook: 0,
  servings: 0,
  calories: 0,
  temperature: 0,
  ingredients: "",
};

function EditRecipePage() {
  const { newRecipeSchema } = useSchemas();
  const { t } = useTranslation();
  const [recipeData, setRecipeData] = useState(initialStateForm);
  const router = useRouter();
  const dispatch = useDispatch();
  const { recipeId } = useLocalSearchParams();

  const selectedRecipeData = useSelector(
    (state: RootState) => state.recipes.items
  );

  useEffect(() => {
    const recipe = selectedRecipeData.find((recipe) => recipe._id === recipeId);
    if (recipe) {
      setRecipeData(recipe);
    }
  }, [recipeId, selectedRecipeData]);

  function handleDelete() {
    dispatch(deleteRecipe(Number(recipeId)));
    router.push("/dashboard");
  }

  return (
    <ScrollView>
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
          validationSchema={newRecipeSchema}
          onSubmit={
            (values) => {
              dispatch(editRecipe({ ...values, id: Number(recipeId) }));
              router.push("/dashboard");
            }

            // save to redux and redirect to my recipies
            // on my recipies page show the new recipe
          }
        >
          {({ values, errors, handleSubmit, handleChange, setFieldValue }) => {
            console.log("errr", errors);
            return (
              <View style={styles.formContainer}>
                <Input
                  label={t("newRecipePage.form.title")}
                  placeholder={t("newRecipePage.form.placeholderTypeHere")}
                  handleChange={handleChange("name")}
                  value={values?.name || ""}
                  errorMessage={errors.name}
                />
                <Input
                  label={t("newRecipePage.form.description")}
                  placeholder={t("newRecipePage.form.placeholderTypeHere")}
                  handleChange={handleChange("description")}
                  value={values?.description as string}
                  errorMessage={errors.description}
                />
                <Input
                  label={t("newRecipePage.form.ingredients")}
                  placeholder={t("newRecipePage.form.placeholderIngredients")}
                  handleChange={handleChange("ingredients")}
                  value={values?.ingredients as string}
                  errorMessage={errors.ingredients}
                />
                {values.name && (
                  <DropDown
                    options={CATEGORIES_DATA}
                    label={t("newRecipePage.form.calories")}
                    value={values.name}
                    handleChange={(categoryValue) =>
                      setFieldValue("category", categoryValue)
                    }
                  />
                )}

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
                      placeholder={t("newRecipePage.form.placeholderTypeHere")}
                      handleChange={handleChange("servings")}
                      value={values?.servings.toString()}
                      errorMessage={errors.servings}
                    />
                    <Input
                      keyboardType="numeric"
                      label={t("newRecipePage.form.timeToCook")}
                      placeholder={t("newRecipePage.form.placeholderTypeHere")}
                      handleChange={handleChange("timeToCook")}
                      value={values?.timeToCook.toString()}
                      errorMessage={errors.timeToCook}
                    />
                    <Input
                      keyboardType="numeric"
                      label={t("newRecipePage.form.calories")}
                      placeholder={t("newRecipePage.form.placeholderTypeHere")}
                      handleChange={handleChange("calories")}
                      value={values?.calories.toString()}
                      errorMessage={errors.calories}
                    />
                    <Input
                      keyboardType="numeric"
                      label={t("newRecipePage.form.temperature")}
                      placeholder={t("newRecipePage.form.placeholderTypeHere")}
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
                  <Button
                    type="tertiary"
                    title={t("newRecipePage.delete")}
                    handlePress={handleDelete}
                  />
                </View>
              </View>
            );
          }}
        </Formik>
      </ThemedView>
    </ScrollView>
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

export default EditRecipePage;
