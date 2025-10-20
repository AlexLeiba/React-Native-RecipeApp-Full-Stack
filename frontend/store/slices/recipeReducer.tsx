import { RECIPES } from "@/constants/MockData";
import { RecipesType } from "@/constants/types";
import { createSlice } from "@reduxjs/toolkit";

export const recipeInitialState: RecipesType[] = RECIPES;

const newRecipeSlice = createSlice({
  name: "recipes",
  initialState: recipeInitialState,
  reducers: {
    newRecipe: (state, action) => {
      state.push(action.payload);
      return state;
    },
    editRecipe: (state, action) => {},
    deleteRecipe: (state, action) => {},
    addToFavorites: (state, action) => {},
  },
});

export default newRecipeSlice.reducer;
export const { newRecipe, editRecipe, deleteRecipe, addToFavorites } =
  newRecipeSlice.actions;
