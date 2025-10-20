import { CATEGORIES_DATA } from "@/constants/MockData";
import { createSlice } from "@reduxjs/toolkit";

const categoriesSlice = createSlice({
  name: "categories",
  initialState: CATEGORIES_DATA,
  reducers: {
    selectCategory: (state, action: { payload: { categoryId: number } }) => {
      // TODO implement selectCategory
    },
  },
});

export default categoriesSlice.reducer;

export const { selectCategory } = categoriesSlice.actions;
