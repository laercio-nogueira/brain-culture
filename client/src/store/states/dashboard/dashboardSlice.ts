import { createSlice } from "@reduxjs/toolkit";
import initialState from "./initialStates";

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
});

export const {} = dashboardSlice.actions;

export default dashboardSlice.reducer;
