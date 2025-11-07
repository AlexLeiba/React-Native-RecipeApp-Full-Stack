import { axiosProtectedInstance } from "@/api/axiosClient";
import { RECIPES } from "@/constants/MockData";
import {
  NetworkActivitiesType,
  RecipesType,
  RequestPrefixType,
} from "@/constants/types";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const recipeInitialState: {
  data: RecipesType[];
  activities: NetworkActivitiesType;
  selectedRecipe: RecipesType | null;
} = {
  activities: {
    status: "idle",
    errorMessage: "",
  },
  data: RECIPES,
  selectedRecipe: null,
};

// 1️⃣ Define async thunk
export const fetchRecipes = createAsyncThunk(
  "recipes/fetchRecipes",
  async (type: RequestPrefixType, thunkAPI) => {
    // Fetches all recipes and adds into the store

    try {
      const {
        data: { data },
      } = await axiosProtectedInstance.get(`${type}/recipes`);

      return data; // This becomes `action.payload` in fulfilled reducer
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

type GetRecipeParamsType = {
  recipeId: string;
  type: RequestPrefixType;
};
export const getRecipe = createAsyncThunk(
  "recipes/getRecipe",
  async ({ recipeId, type }: GetRecipeParamsType, thunkAPI) => {
    // Fetches all recipes and adds into the store
    console.log("recipeId", recipeId);
    try {
      const {
        data: { data },
      } = await axiosProtectedInstance.get(`${type}/recipes/${recipeId}`);

      return data[0]; // This becomes `action.payload` in fulfilled reducer
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

type FilterRecipesParamsType = {
  query: "categoryId" | "personal" | "favorites";
  id: string;
  type: RequestPrefixType;
};
export const filterRecipes = createAsyncThunk(
  "recipes/filterRecipes",
  async ({ query, type }: FilterRecipesParamsType, thunkAPI) => {
    // TODO filter based on category ID or own categories
    //Return filtered recipes
    try {
      const { data } = await axiosProtectedInstance.get(
        `${type}/recipes?${query}=${query}`
      );

      return data; // This becomes `action.payload` in fulfilled reducer
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

type CreateRecipesParamsType = {
  recipeData: RecipesType;
  type: RequestPrefixType;
};
export const createNewRecipe = createAsyncThunk(
  "recipes/createNewRecipe",
  async ({ recipeData, type }: CreateRecipesParamsType, thunkAPI) => {
    // Pass new recipe data to backend
    try {
      axiosProtectedInstance.post(`${type}/recipes`, recipeData);
      const { data } = await axiosProtectedInstance.get(`${type}/recipes`); //return new data

      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

type EditRecipesParamsType = {
  recipeData: RecipesType;
  type: RequestPrefixType;
  recipeId: string;
};
export const editRecipe = createAsyncThunk(
  "recipes/editRecipe",
  async ({ recipeData, type, recipeId }: EditRecipesParamsType, thunkAPI) => {
    // TODO pass to backend Recipe edit data
    try {
      await axiosProtectedInstance.put(
        `${type}/recipes/${recipeId}`,
        recipeData
      );
      const { data } = await axiosProtectedInstance.get(`${type}/recipes`);

      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

type DeteleRecipesParamsType = {
  recipeId: string;
  type: RequestPrefixType;
};
export const deleteRecipe = createAsyncThunk(
  "recipes/deleteRecipe",
  async ({ recipeId, type }: DeteleRecipesParamsType, thunkAPI) => {
    try {
      await axiosProtectedInstance.delete(`${type}/recipes/${recipeId}`);

      const { data } = await axiosProtectedInstance.get(`${type}/recipes`);

      return data; //return new data and update store
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const newRecipeSlice = createSlice({
  name: "recipes",
  initialState: recipeInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.activities.status = "fulfilled";
        state.data = action.payload; //save data to store if fulfilled
      })
      // Get One
      .addCase(getRecipe.fulfilled, (state, action) => {
        state.activities.status = "fulfilled";
        state.selectedRecipe = action.payload; //save data to store if fulfilled
      })
      // Filter
      .addCase(filterRecipes.fulfilled, (state, action) => {
        state.activities.status = "fulfilled";
        state.data = action.payload;
      })
      // Create
      .addCase(createNewRecipe.fulfilled, (state, action) => {
        state.activities.status = "fulfilled";
        state.data = action.payload; //update store data with new recipe
      })
      // Edit
      .addCase(editRecipe.fulfilled, (state, action) => {
        state.activities.status = "fulfilled";
        state.data = action.payload; //update store data with new recipe
      })
      // Delete
      .addCase(deleteRecipe.fulfilled, (state, action) => {
        state.activities.status = "fulfilled";
        state.data = action.payload;
      })

      // Will handle all pending, and rejected cases
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.activities.status = "pending";
          state.activities.errorMessage = "";
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.activities.status = "rejected";
          state.activities.errorMessage = action.type as string;
        }
      );
  },
});

export default newRecipeSlice.reducer;
export const {} = newRecipeSlice.actions;
