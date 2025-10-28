import { GoBackButton } from "@/components/headerButtons";
import { ThemedView } from "@/components/themed-view";
import { H1 } from "@/components/typography/typography";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RootState } from "@/store/config";
import { deleteRecipe, editRecipe } from "@/store/slices/recipes";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useSchemas } from "@/constants/schemas";
import { CategoryType } from "@/constants/types";
import { UploadImage } from "@/components/UploadImage/UploadImage";

const initialStateForm = {
  _id: "",
  name: "",
  image: "",
  userId: "",
};

function EditRecipePage() {
  const { newCategorySchema } = useSchemas();
  const { t } = useTranslation();
  const [recipeData, setRecipeData] = useState<CategoryType>(initialStateForm);
  const router = useRouter();
  const dispatch = useDispatch();
  const { categoryId } = useLocalSearchParams();
  const [selectedImage, setSelectedImage] = React.useState("");

  const selectedRecipeData = useSelector(
    (state: RootState) => state.categories
  );

  useEffect(() => {
    const recipe = selectedRecipeData.find(
      (recipe) => recipe._id === categoryId
    );
    if (recipe) {
      setRecipeData(recipe);
    }
  }, [categoryId, selectedRecipeData]);

  function handleDelete() {
    dispatch(deleteRecipe(Number(categoryId)));
    router.push("/dashboard");
  }

  function handleChangeAvatar(imageUrl: string) {
    setSelectedImage(imageUrl);
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
          <H1>{t("newCategoryPage.editTitle")}</H1>
        </View>

        <Formik
          enableReinitialize
          initialValues={recipeData}
          validationSchema={newCategorySchema}
          onSubmit={
            (values) => {
              dispatch(editRecipe({ ...values, id: Number(categoryId) }));
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
                <UploadImage
                  readOnly
                  handleSelectImage={handleChangeAvatar}
                  selectedImage={selectedImage}
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
                  <Button
                    type="tertiary"
                    title={t("newCategoryPage.delete")}
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
