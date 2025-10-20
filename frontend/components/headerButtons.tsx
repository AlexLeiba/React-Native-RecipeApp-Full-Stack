import { RecipesType } from "@/constants/types";
import { RootState } from "@/store/config";
import { useRouter } from "expo-router";
import { ArrowLeft, Edit, Heart } from "lucide-react-native";
import React from "react";
import { StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "./ui/button";

type GoBackProps = {
  path?: "/dashboard" | "/favorites" | "/profile";
};
export const GoBackButton = ({ path }: GoBackProps) => {
  const router = useRouter();

  function handlePath() {
    // if (path) {
    //   // @ts-ignore
    //   return router.push(`${path}`);
    // }
    router.back();
  }
  return (
    <Button handlePress={handlePath} style={styles.backbutton}>
      <ArrowLeft color={"white"} />
    </Button>
  );
};

type FavoriteButtonProps = {
  recipeData: RecipesType;
};
export const FavoriteAndEditButton = ({ recipeData }: FavoriteButtonProps) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const favoriteElement = useSelector((state: RootState) =>
    state.favorites.favorites.find((recipe) => recipe._id === recipeData._id)
  );

  function handleAddToFavorites() {
    // dispatch(
    //         setToFavorite({
    //           ...recipeData,
    //           categoryName: recipeCategoryName,
    //           categoryId: recipeCategoryId,
    //         })
    //       )
  }

  function handleNavigateToEdit() {
    router.push(`/recipe/edit-recipe/${recipeData._id}`);
  }

  return (
    <>
      <Button
        type="ghost"
        handlePress={handleAddToFavorites}
        style={styles.favoriteButton}
      >
        <Heart color={favoriteElement ? "red" : "white"} />
      </Button>

      <Button
        type="ghost"
        handlePress={handleNavigateToEdit}
        style={[styles.favoriteButton, { top: 80 }]}
      >
        <Edit color={"white"} />
      </Button>
    </>
  );
};

const styles = StyleSheet.create({
  backbutton: {
    position: "absolute",
    top: 20,
    left: 20,
    zIndex: 2,
    borderRadius: "100%",
    backgroundColor: "black",
    padding: 10,
  },
  favoriteButton: {
    position: "absolute",
    top: 20,
    right: 20,
    zIndex: 2,
    borderRadius: "100%",
    backgroundColor: "black",
    padding: 10,
  },
});
