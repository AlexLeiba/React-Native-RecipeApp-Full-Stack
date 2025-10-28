import { GoBackButton } from "@/components/headerButtons";
import { ThemedView } from "@/components/themed-view";
import { H1 } from "@/components/typography/typography";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RootState } from "@/store/config";
import { deleteRecipe } from "@/store/slices/recipes";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useSchemas } from "@/constants/schemas";
import { UploadImage } from "@/components/UploadImage/UploadImage";
import { DropDown } from "@/components/ui/dropdown";
import { ROLES } from "@/constants/MockData";

const initialStateForm = {
  username: "",
  selectedRole: "user",
  roles: {
    user: "user",
  },
};

function EditUserPage() {
  const { newCategorySchema } = useSchemas();
  const { t } = useTranslation();
  const [recipeData, setRecipeData] = useState<{
    username: string;
    roles: { user: string };
    selectedRole: string;
  }>(initialStateForm);
  const router = useRouter();
  const dispatch = useDispatch();
  const { userId } = useLocalSearchParams();
  const [selectedImage, setSelectedImage] = React.useState("");

  const selectedRecipeData = useSelector(
    (state: RootState) => state.categories
  );

  useEffect(() => {
    const recipe = selectedRecipeData.find((recipe) => recipe._id === userId);
    if (recipe) {
      setRecipeData(recipe);
    }
  }, [userId, selectedRecipeData]);

  function handleDelete() {
    dispatch(deleteRecipe(Number(userId)));
    router.back();
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
          <H1>{t("adminPages.editUser")}</H1>
        </View>

        <Formik
          enableReinitialize
          initialValues={recipeData}
          validationSchema={newCategorySchema}
          onSubmit={
            (values) => {
              console.log("values", values);
              // dispatch(editRecipe({ ...values, id: Number(userId) }));
              // router.back();
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
                  label={t("adminPages.username")}
                  placeholder={t("adminPages.username")}
                  handleChange={handleChange("username")}
                  value={values?.username || ""}
                  errorMessage={errors.username}
                />

                <DropDown
                  label={t("adminPages.roles")}
                  handleChange={(selectedValue) =>
                    setFieldValue("selectedRole", selectedValue)
                  }
                  options={ROLES.map((role, index) => ({
                    name: role,
                    id: index,
                  }))}
                  value={values.selectedRole}
                />

                <View style={{ gap: 20, marginBottom: 40, marginTop: 10 }}>
                  <Button
                    type="secondary"
                    title={t("adminPages.save")}
                    handlePress={handleSubmit}
                  />
                  <Button
                    type="tertiary"
                    title={t("adminPages.delete")}
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

export default EditUserPage;
