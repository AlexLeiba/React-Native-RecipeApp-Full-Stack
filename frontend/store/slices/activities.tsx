import { createSlice } from "@reduxjs/toolkit";

type ActivitiesState = {
  method: "get" | "put" | "delete";
  errorMessage?: string;
  error: boolean;
  success: boolean;
  loading: boolean;
};

const initialState: ActivitiesState = {
  method: "get",
  errorMessage: "",
  error: false,
  success: false,
  loading: false,
};

const activitiesReducer = createSlice({
  name: "activities",
  initialState,
  reducers: {
    setNetworkActivity: (state, { payload }: { payload: ActivitiesState }) => ({
      ...state,
      ...payload,
    }),
  },
});

export const { setNetworkActivity } = activitiesReducer.actions;
export default activitiesReducer.reducer;
