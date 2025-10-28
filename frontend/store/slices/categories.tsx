import { CATEGORIES_DATA } from "@/constants/MockData";
import { CategoryType, NetworkActivitiesType } from "@/constants/types";
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

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (_, thunkAPI) => {
    try {
      const data = await axiosInstance.get("/todos");
      console.log("🚀 ~ cat data:", data);

      return CATEGORIES_DATA; // This becomes `action.payload` in fulfilled reducer
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const getCategory = createAsyncThunk(
  "categories/getCategory",
  async (categoryId: number, thunkAPI) => {
    try {
      const data = await axiosInstance.get("/todos");
      console.log("🚀 ~ categoryId", categoryId);

      return CATEGORIES_DATA[0]; // This becomes `action.payload` in fulfilled reducer
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const createNewCategory = createAsyncThunk(
  "categories/createNewCategory",
  async (categoryData: CategoryType, thunkAPI) => {
    try {
      console.log("🚀 ~ categoryData:", categoryData);

      const data = await axiosInstance.get("/todos");
      console.log("🚀 ~ data:", data);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const editCategory = createAsyncThunk(
  "categories/editCategory",
  async (categoryData: CategoryType, thunkAPI) => {
    console.log("🚀 ~ categoryData:", categoryData);

    try {
      const data = await axiosInstance.get("/todos");
      console.log("🚀 ~ data:", data);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "categories/deleteCategory",
  async (categoryId: number, thunkAPI) => {
    console.log("🚀 ~ categoryId:", categoryId);
    try {
      const data = await axiosInstance.get("/todos");
      console.log("🚀 ~ data:", data);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    // // getCategories: (state, action: { payload: { data: CategoryType[] } }) => {},
    // selectCategory: (
    //   state,
    //   action: { payload: { selectedCategory: CategoryType } }
    // ) => {
    //   state.selectedCategory = action.payload.selectedCategory;
    //   // TODO implement selectCategory
    // },
    // editCategory: (state, action: { payload: { categoryId: number } }) => {
    //   // TODO implement editCategory
    // },
    // deleteCategory: (state, action: { payload: { categoryId: number } }) => {
    //   // TODO implement deleteCategory
    // },
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
      .addCase(createNewCategory.fulfilled, (state) => {
        state.activities.status = "fulfilled";
      })
      // Edit
      .addCase(editCategory.fulfilled, (state) => {
        state.activities.status = "fulfilled";
      })
      // Delete
      .addCase(deleteCategory.fulfilled, (state) => {
        state.activities.status = "fulfilled";
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

export default categoriesSlice.reducer;

export const {} = categoriesSlice.actions;
