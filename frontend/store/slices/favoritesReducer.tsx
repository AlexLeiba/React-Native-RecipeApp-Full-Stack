import { createSlice } from "@reduxjs/toolkit";
import { FavoritesType, RecipesType } from "@/constants/types";
import { FAVORITES, RECIPES } from "@/constants/MockData";

type FavoritesStateType = {
  favorites: FavoritesType[];
};
const initialState: FavoritesStateType = {
  favorites: FAVORITES,
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    setToFavorite(state, action: { payload: RecipesType }) {
      //  TODO based on the selected id
      // Make a req to backend to add recipe to favorites
      // and to fronted change the icon to favoritres if the req was successful
    },
  },
});

export default favoritesSlice.reducer;
export const { setToFavorite } = favoritesSlice.actions;
