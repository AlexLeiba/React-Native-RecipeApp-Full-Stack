import { createSlice } from "@reduxjs/toolkit";
import { RecipeType } from "./recipeReducer";

type FavoritesStateType = {
  favorites: RecipeType[];
};
const initialState: FavoritesStateType = {
  favorites: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    setToFavorite(state, action: { payload: RecipeType }) {
      const selectedElement = state.favorites.find(
        (recipe) => recipe.id === action.payload.id
      );

      if (selectedElement) {
        state.favorites = state.favorites.filter(
          (recipe) => recipe.id !== action.payload.id
        );
      } else {
        state.favorites.push({ ...action.payload, favorites: true });
      }
    },
  },
});

export default favoritesSlice.reducer;
export const { setToFavorite } = favoritesSlice.actions;
