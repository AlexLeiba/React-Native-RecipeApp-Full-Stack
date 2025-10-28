import { RECIPES } from "@/constants/MockData";
import { NetworkActivitiesType, RecipesType } from "@/constants/types";
import { axiosInstance } from "@/lib/axiosConfig";
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
  async (params, thunkAPI) => {
    // Fetches all recipes and adds into the store
    console.log("params", params);
    try {
      const data = await axiosInstance.get("/todos");
      console.log("🚀 ~ data:", data);

      return RECIPES; // This becomes `action.payload` in fulfilled reducer
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const getRecipe = createAsyncThunk(
  "recipes/getRecipe",
  async (recipeId: number, thunkAPI) => {
    // Fetches all recipes and adds into the store
    console.log("recipeId", recipeId);
    try {
      const data = await axiosInstance.get("/todos");
      console.log("🚀 ~ data:", data);

      return RECIPES[0]; // This becomes `action.payload` in fulfilled reducer
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const filterRecipes = createAsyncThunk(
  "recipes/filterRecipes",
  async (
    { type, id }: { type: "categoryId" | "own" | "favorites"; id: string },
    thunkAPI
  ) => {
    console.log("params id", id, type);
    // TODO filter based on category ID or own categories
    //Return filtered recipes
    try {
      const data = await axiosInstance.get("/todos");
      console.log("🚀 ~ data:", data);

      return RECIPES; // This becomes `action.payload` in fulfilled reducer
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const createNewRecipe = createAsyncThunk(
  "recipes/createNewRecipe",
  async (recipeData: RecipesType, thunkAPI) => {
    console.log("🚀 ~ recipeData:", recipeData);
    // Pass new recipe data to backend
    try {
      const data = await axiosInstance.get("/todos");
      console.log("🚀 ~ data:", data);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const editRecipe = createAsyncThunk(
  "recipes/editRecipe",
  async (recipeData: RecipesType, thunkAPI) => {
    console.log("🚀 ~ recipeData to edit:", recipeData);
    // TODO pass to backend Recipe edit data
    try {
      const data = await axiosInstance.get("/todos");
      console.log("🚀 ~ data:", data);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const deleteRecipe = createAsyncThunk(
  "recipes/deleteRecipe",
  async (recipeId: string, thunkAPI) => {
    console.log("🚀 ~ recipeId:", recipeId);
    // TODO pass to backend which to delete
    try {
      const data = await axiosInstance.get("/todos");
      console.log("🚀 ~ data:", data);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const newRecipeSlice = createSlice({
  name: "recipes",
  initialState: recipeInitialState,
  reducers: {
    // newRecipe: (state, action) => {},
    // editRecipe: (state, action) => {},
    // deleteRecipe: (state, action) => {},
    // addToFavorites: (state, action) => {},
    // filterByCategoryType: (state, action) => {},
    // filterOwnCategories: (state, action) => {},
  },
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
      })
      // Edit
      .addCase(editRecipe.fulfilled, (state, action) => {
        state.activities.status = "fulfilled";
      })
      // Delete
      .addCase(deleteRecipe.fulfilled, (state, action) => {
        state.activities.status = "fulfilled";
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

    // Fetch all recipes
    // .addCase(fetchRecipes.pending, (state) => {
    //   state.activities.status = "pending";
    //   state.activities.errorMessage = "";
    // })
    // .addCase(fetchRecipes.fulfilled, (state, action) => {
    //   state.activities.status = "fulfilled";
    //   state.data = action.payload;
    // })
    // .addCase(fetchRecipes.rejected, (state, action) => {
    //   state.activities.status = "rejected";
    //   state.activities.errorMessage = action.payload as string;
    // })
    // // Create Recipe
    // .addCase(createNewRecipe.pending, (state) => {
    //   state.activities.status = "pending";
    //   state.activities.errorMessage = "";
    // })
    // .addCase(createNewRecipe.fulfilled, (state, action) => {
    //   state.activities.status = "fulfilled";
    // })
    // .addCase(createNewRecipe.rejected, (state, action) => {
    //   state.activities.status = "rejected";
    //   state.activities.errorMessage = action.payload as string;
    // })
    // //Filter Recipes
    // .addCase(filterRecipes.pending, (state) => {
    //   state.activities.status = "pending";
    //   state.activities.errorMessage = "";
    // })
    // .addCase(filterRecipes.fulfilled, (state, action) => {
    //   state.activities.status = "fulfilled";
    // })
    // .addCase(filterRecipes.rejected, (state, action) => {
    //   state.activities.status = "rejected";
    //   state.activities.errorMessage = action.payload as string;
    // });

    // Filter Recipes
  },
});

export default newRecipeSlice.reducer;
export const {
  // newRecipe,
  // editRecipe,
  // deleteRecipe,
  // addToFavorites,
  // filterByCategoryType,
  // filterOwnCategories,
} = newRecipeSlice.actions;
