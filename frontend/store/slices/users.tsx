import { USERS } from "@/constants/MockData";
import {
  NetworkActivitiesType,
  RequestPrefixType,
  UserType,
} from "@/constants/types";
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
  async ({ type }: RequestPrefixType, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`${type}/users`);
      console.log("🚀 ~ Fetch users:", response);

      return response.data; // This becomes `action.payload` in fulfilled reducer
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

type GetUserParamsType = {
  userId: number;
  type: RequestPrefixType;
};

export const getUser = createAsyncThunk(
  "users/getUser",
  async ({ userId, type }: GetUserParamsType, thunkAPI) => {
    console.log("🚀 ~UserId:", userId);
    try {
      const response = await axiosInstance.get(`${type}/users/${userId}`);
      console.log("🚀 ~ response:", response);

      return response.data; // This becomes `action.payload` in fulfilled reducer
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

type EditUserParamsType = {
  userData: UserType;
  type: RequestPrefixType;
  userId: number;
};

export const editUser = createAsyncThunk(
  "users/editUser",
  async ({ userData, type, userId }: EditUserParamsType, thunkAPI) => {
    try {
      const response = await axiosInstance.put(
        `${type}/users/${userId}`,
        userData
      );
      console.log("🚀 ~ data:", response);
      const usersData = await axiosInstance.get(`${type}/users`);
      console.log("🚀 ~ data:", usersData);

      return usersData.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

type DeleteUserParamsType = {
  type: RequestPrefixType;
  userId: string;
};

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async ({ userId, type }: DeleteUserParamsType, thunkAPI) => {
    console.log("🚀 ~UserId:", userId);
    try {
      const response = await axiosInstance.delete(`${type}/users/${userId}`);
      console.log("🚀 ~ response:", response);

      const usersData = await axiosInstance.get(`${type}/users`);
      console.log("🚀 ~ data:", usersData);

      return usersData.data; // This becomes `action.payload` in fulfilled reducer
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
      .addCase(editUser.fulfilled, (state, action) => {
        state.activities.status = "fulfilled";
        state.data = action.payload;
      })
      // Delete
      .addCase(deleteUser.fulfilled, (state, action) => {
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
export const {} = usersSlice.actions;
export default usersSlice.reducer;
