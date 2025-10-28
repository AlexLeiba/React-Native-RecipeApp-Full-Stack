import { USERS } from "@/constants/MockData";
import { NetworkActivitiesType, UserType } from "@/constants/types";
import { axiosInstance } from "@/lib/axiosConfig";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: {
  data: UserType[];
  activities: NetworkActivitiesType;
  selectedUser: UserType | null;
} = {
  data: USERS,
  selectedUser: null,
  activities: {
    status: "idle",
    errorMessage: "",
  },
};

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (_, thunkAPI) => {
    try {
      const data = await axiosInstance.get("/todos");
      console.log("🚀 ~ Fetch users:", data);

      return USERS; // This becomes `action.payload` in fulfilled reducer
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getUser = createAsyncThunk(
  "users/getUser",
  async (userId: number, thunkAPI) => {
    console.log("🚀 ~UserId:", userId);
    try {
      const data = await axiosInstance.get("/todos");
      console.log("🚀 ~ data:", data);

      return USERS[0]; // This becomes `action.payload` in fulfilled reducer
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const editUser = createAsyncThunk(
  "users/editUser",
  async (userData: UserType, thunkAPI) => {
    console.log("🚀 ~UserData:", userData);

    try {
      const data = await axiosInstance.get("/todos");
      console.log("🚀 ~ data:", data);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (userId: number, thunkAPI) => {
    console.log("🚀 ~UserId:", userId);
    try {
      const data = await axiosInstance.get("/todos");
      console.log("🚀 ~ data:", data);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    //     getUsers: (state, action: { payload: { data: UserType[] } }) => {},
    //
    //     getUser: (state, action: { payload: { userId: string } }) => {},
    //
    //     editUser: (state, action: { payload: { data: UserType } }) => {},
    //     deleteUser: (state, action: { payload: { userId: string } }) => {},
  },
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.activities.status = "fulfilled";
        state.data = action.payload;
      })
      // Get One
      .addCase(getUser.fulfilled, (state, action) => {
        state.activities.status = "fulfilled";
        state.selectedUser = action.payload;
      })

      // Edit
      .addCase(editUser.fulfilled, (state) => {
        state.activities.status = "fulfilled";
      })
      // Delete
      .addCase(deleteUser.fulfilled, (state) => {
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
export const {} = usersSlice.actions;
export default usersSlice.reducer;
