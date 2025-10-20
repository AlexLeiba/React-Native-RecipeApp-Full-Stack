import { CATEGORIES_DATA } from "@/constants/MockData";
import { createSlice } from "@reduxjs/toolkit";

export type CategoryType = {
  name:
    | "My recipies"
    | "Favorites"
    | "Beef"
    | "Dessert"
    | "Chicken"
    | "Lamb"
    | "Seafood";
  image: any;
  id: number;
  selected: boolean;
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState: CATEGORIES_DATA,
  reducers: {
    selectCategory: (state, action: { payload: { categoryId: number } }) => {
      state.forEach((cat) => {
        return cat.id === action.payload.categoryId
          ? (cat.selected = true)
          : (cat.selected = false);
      });
    },
  },
});

export default categoriesSlice.reducer;

export const { selectCategory } = categoriesSlice.actions;
