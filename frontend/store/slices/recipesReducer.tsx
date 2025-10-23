import { RECIPES } from "@/constants/MockData";
import { NetworkActivitiesType, RecipesType } from "@/constants/types";
import { axiosInstance } from "@/lib/axiosConfig";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const recipeInitialState: {
  items: RecipesType[];
  activities: NetworkActivitiesType;
} = {
  activities: {
    status: "idle",
    errorMessage: "",
    error: false,
    success: false,
    loading: false,
  },
  items: RECIPES,
};

// 1️⃣ Define async thunk
export const fetchRecipes = createAsyncThunk(
  "recipes/fetchRecipes",
  async (_, thunkAPI) => {
    try {
      const data = await axiosInstance.get("/todos");
      console.log("🚀 ~ data:", data);

      return RECIPES; // This becomes `action.payload` in fulfilled reducer
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const newRecipeSlice = createSlice({
  name: "recipes",
  initialState: recipeInitialState,
  reducers: {
    newRecipe: (state, action) => {},
    editRecipe: (state, action) => {},
    deleteRecipe: (state, action) => {},
    addToFavorites: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.activities.status = "pending";
        state.activities.loading = true;
        state.activities.error = false;
        state.activities.errorMessage = "";
        state.activities.success = false;
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.activities.status = "fulfilled";
        state.activities.success = true;
        state.activities.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.activities.status = "rejected";
        state.activities.loading = false;
        state.activities.success = false;
        state.activities.error = true;
        state.activities.errorMessage = action.payload as string;
      });
  },
});

export default newRecipeSlice.reducer;
export const { newRecipe, editRecipe, deleteRecipe, addToFavorites } =
  newRecipeSlice.actions;
