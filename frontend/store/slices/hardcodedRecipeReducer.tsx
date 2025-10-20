import { HARDCODED_RECIPIES } from "@/constants/MockData";
import { createSlice } from "@reduxjs/toolkit";
import { ImageSourcePropType } from "react-native";
import { RecipeType } from "./recipeReducer";

export type HardcodedRecipiesType = {
  [key: string]: {
    id: number;
    name: string;
    image: ImageSourcePropType;
    categoryId: number;
    data: {
      name: string;
      image: ImageSourcePropType;
      id: number;
      categoryId: number;
      details: RecipeType;
    }[];
  };
};

const hardcodedRecipeReducer = createSlice({
  name: "hardcodedRecipes",
  initialState: HARDCODED_RECIPIES,
  reducers: {
    setAsFavorite: (
      state,
      action: {
        payload: {
          recipeId: number;
          categoryName: "beef" | "chicken" | "lamb" | "seafood" | "dessert";
        };
      }
    ) => {
      const recipe = state[action.payload.categoryName].data.find(
        (recipe) => recipe.id === action.payload.recipeId
      );

      if (recipe) {
        recipe.details.favorites = !recipe.details.favorites;
      }
    },
  },
});

export default hardcodedRecipeReducer.reducer;

export const { setAsFavorite } = hardcodedRecipeReducer.actions;
