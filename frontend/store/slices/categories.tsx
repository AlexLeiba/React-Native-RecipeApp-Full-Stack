import { CATEGORIES_DATA } from "@/constants/MockData";
import {
  CategoryType,
  NetworkActivitiesType,
  RequestPrefixType,
} from "@/constants/types";
import { axiosInstance } from "@/lib/axiosConfig";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

type CategoriesState = {
  data: CategoryType[];
  selectedCategory: CategoryType | null;
  activities: NetworkActivitiesType;
};
const initialState: CategoriesState = {
  data: CATEGORIES_DATA,
  selectedCategory: null,
  activities: {
    status: "idle",
    errorMessage: "",
  },
};

type FetchCategoriesParamsType = {
  type: RequestPrefixType;
};
export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async ({ type }: FetchCategoriesParamsType, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`${type}/categories`);
      console.log("🚀 ~ cat response:", response);

      return response.data; // This becomes `action.payload` in fulfilled reducer
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

type FetchCategoryParamsType = {
  type: RequestPrefixType;
  categoryId: number;
};
export const getCategory = createAsyncThunk(
  "categories/getCategory",
  async ({ categoryId, type }: FetchCategoryParamsType, thunkAPI) => {
    try {
      const response = await axiosInstance.get(
        `${type}/categories/${categoryId}`
      );
      console.log("🚀 ~ categoryId", response);

      return response.data; // This becomes `action.payload` in fulfilled reducer
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

type CreateCategoryParamsType = {
  type: RequestPrefixType;
  categoryData: CategoryType;
};
export const createNewCategory = createAsyncThunk(
  "categories/createNewCategory",
  async ({ categoryData, type }: CreateCategoryParamsType, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        `${type}/categories`,
        categoryData
      );
      const categoriesData = await axiosInstance.get(`${type}/categories`);
      console.log("🚀 ~ data:", response, categoriesData);

      return categoriesData.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

type EditCategoryParamsType = {
  type: RequestPrefixType;
  categoryData: CategoryType;
  categoryId: string;
};
export const editCategory = createAsyncThunk(
  "categories/editCategory",
  async (
    { categoryData, type, categoryId }: EditCategoryParamsType,
    thunkAPI
  ) => {
    try {
      const response = await axiosInstance.put(
        `${type}/categories/${categoryId}`,
        categoryData
      );
      console.log("🚀 ~ response:", response);

      const categoriesData = await axiosInstance.get(`${type}/categories`);
      console.log("🚀 ~ categoriesData:", categoriesData);

      return categoriesData.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

type DeleteCategoryParamsType = {
  type: RequestPrefixType;
  categoryId: string;
};
export const deleteCategory = createAsyncThunk(
  "categories/deleteCategory",
  async ({ categoryId, type }: DeleteCategoryParamsType, thunkAPI) => {
    try {
      const response = await axiosInstance.delete(
        `${type}/categories/${categoryId}`
      );

      const categoriesData = await axiosInstance.get(`${type}/categories`);
      console.log("🚀 ~ categoriesData:", categoriesData, response);

      return categoriesData.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    selectCategory: (
      state,
      action: { payload: { selectedCategory: CategoryType } }
    ) => {
      state.selectedCategory = action.payload.selectedCategory;
      // TODO implement selectCategory
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.activities.status = "fulfilled";
        state.data = action.payload;
      })
      // Get One
      .addCase(getCategory.fulfilled, (state, action) => {
        state.activities.status = "fulfilled";
        state.selectedCategory = action.payload;
      })
      // Create
      .addCase(createNewCategory.fulfilled, (state, action) => {
        state.activities.status = "fulfilled";
        state.data = action.payload;
      })
      // Edit
      .addCase(editCategory.fulfilled, (state, action) => {
        state.activities.status = "fulfilled";
        state.data = action.payload;
      })
      // Delete
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.activities.status = "fulfilled";
        state.data = action.payload;
      })

      // Will handle all pending, and rejected cases
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.activities.status = "pending";
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

export default categoriesSlice.reducer;

export const { selectCategory } = categoriesSlice.actions;
