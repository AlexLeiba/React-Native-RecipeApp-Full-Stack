import { axiosProtectedInstance } from "@/api/axiosClient";
import {
  CategoryType,
  NetworkActivitiesType,
  RecipesType,
  RequestPrefixType,
  UserType,
} from "@/constants/types";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState: {
  search: string;
  activities: NetworkActivitiesType;
  users: UserType[];
  recipes: RecipesType[];
  categories: CategoryType[];
} = {
  search: "",
  activities: {
    status: "idle",
    errorMessage: "",
  },
  users: [],
  recipes: [],
  categories: [],
};

type SearchType = {
  type: RequestPrefixType;
  search: string;
};
export const searchUsers = createAsyncThunk(
  "search/searchUsers",
  async ({ type, search }: SearchType, thunkAPI) => {
    try {
      const { data } = await axiosProtectedInstance.get(
        `${type}/users/search/${search}`
      );

      return data; // This becomes `action.payload` in fulfilled reducer
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const searchCategories = createAsyncThunk(
  "search/searchUsers",
  async ({ search, type }: SearchType, thunkAPI) => {
    console.log("🚀 ~ search:", search);
    try {
      const { data } = await axiosProtectedInstance.get(
        `${type}/categories/search/${search}`
      );

      return data; // This becomes `action.payload` in fulfilled reducer
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const searchRecipes = createAsyncThunk(
  "search/searchRecipes",
  async ({ search, type }: SearchType, thunkAPI) => {
    console.log("🚀 ~ search:", search);
    try {
      const { data } = await axiosProtectedInstance.get(
        `${type}/recipes/search/${search}`
      );

      return data; // This becomes `action.payload` in fulfilled reducer
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const searchSlice = createSlice({
  name: "search",
  initialState: initialState,
  reducers: {
    // setSearch: (state, action) => {
    //   state.search = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchUsers.fulfilled, (state, action) => {
        state.activities.status = "fulfilled";
        state.users = action.payload;
      })
      .addCase(searchCategories.fulfilled, (state, action) => {
        state.activities.status = "fulfilled";
        state.categories = action.payload;
      })
      .addCase(searchRecipes.fulfilled, (state, action) => {
        state.activities.status = "fulfilled";
        state.recipes = action.payload;
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
          state.activities.errorMessage = action.type;
        }
      );
  },
});
