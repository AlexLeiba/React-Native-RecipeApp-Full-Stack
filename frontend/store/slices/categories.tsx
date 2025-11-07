import { axiosProtectedInstance } from "@/api/axiosClient";
import { CATEGORIES_DATA } from "@/constants/MockData";
import {
  CategoryType,
  NetworkActivitiesType,
  RequestPrefixType,
} from "@/constants/types";
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

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (type: RequestPrefixType, thunkAPI) => {
    try {
      const {
        data: { data },
      } = await axiosProtectedInstance.get(`${type}/categories`);

      return data; // This becomes `action.payload` in fulfilled reducer
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
      const { data } = await axiosProtectedInstance.get(
        `${type}/categories/${categoryId}`
      );

      return data; // This becomes `action.payload` in fulfilled reducer
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
      await axiosProtectedInstance.post(`${type}/categories`, categoryData);
      const { data } = await axiosProtectedInstance.get(`${type}/categories`);

      return data;
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
      await axiosProtectedInstance.put(
        `${type}/categories/${categoryId}`,
        categoryData
      );

      const { data } = await axiosProtectedInstance.get(`${type}/categories`);

      return data;
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
      await axiosProtectedInstance.delete(`${type}/categories/${categoryId}`);

      const { data } = await axiosProtectedInstance.get(`${type}/categories`);

      return data;
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
