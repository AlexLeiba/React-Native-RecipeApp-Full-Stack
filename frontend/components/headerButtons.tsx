import { RootState } from "@/store/config";
import { setToFavorite } from "@/store/slices/favoritesReducer";
import { RecipeType } from "@/store/slices/recipeReducer";
import { useRouter } from "expo-router";
import { ArrowLeft, Heart } from "lucide-react-native";
import React from "react";
import { StyleSheet, TouchableHighlight } from "react-native";
import { useDispatch, useSelector } from "react-redux";

type GoBackProps = {
  path?: "/my-food" | "/favorites" | "/my-food-page" | "/" | "/my-recipe-page";
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
    <TouchableHighlight onPress={handlePath} style={styles.backbutton}>
      <ArrowLeft color={"white"} />
    </TouchableHighlight>
  );
};

type FavoriteButtonProps = {
  recipeData: RecipeType;
  recipeCategoryName: string;
  recipeCategoryId: number;
};
export const FavoriteButton = ({
  recipeData,
  recipeCategoryName,
  recipeCategoryId,
}: FavoriteButtonProps) => {
  const dispatch = useDispatch();

  const favoriteElement = useSelector((state: RootState) =>
    state.favorites.favorites.find((recipe) => recipe.id === recipeData.id)
  );

  return (
    <TouchableHighlight
      onPress={() =>
        dispatch(
          setToFavorite({
            ...recipeData,
            categoryName: recipeCategoryName,
            categoryId: recipeCategoryId,
          })
        )
      }
      style={styles.favoriteButton}
    >
      <Heart color={favoriteElement?.favorites ? "red" : "white"} />
    </TouchableHighlight>
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
