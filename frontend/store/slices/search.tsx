import { CATEGORIES_DATA, RECIPES, USERS } from "@/constants/MockData";
import {
  CategoryType,
  NetworkActivitiesType,
  RecipesType,
  UserType,
} from "@/constants/types";
import { axiosInstance } from "@/lib/axiosConfig";
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

export const searchUsers = createAsyncThunk(
  "search/searchUsers",
  async (search: string, thunkAPI) => {
    try {
      const data = await axiosInstance.get("/todos");
      console.log("🚀 ~ Fetch users:", data);

      return USERS; // This becomes `action.payload` in fulfilled reducer
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const searchCategories = createAsyncThunk(
  "search/searchUsers",
  async (search: string, thunkAPI) => {
    console.log("🚀 ~ search:", search);
    try {
      const data = await axiosInstance.get("/todos");
      console.log("🚀 ~ cat data:", data);

      return CATEGORIES_DATA; // This becomes `action.payload` in fulfilled reducer
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const searchRecipes = createAsyncThunk(
  "search/searchRecipes",
  async (search: string, thunkAPI) => {
    console.log("🚀 ~ search:", search);
    try {
      const data = await axiosInstance.get("/todos");
      console.log("🚀 ~ cat data:", data);

      return RECIPES; // This becomes `action.payload` in fulfilled reducer
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
        (state) => {}
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
