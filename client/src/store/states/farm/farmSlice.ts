import { createSlice } from "@reduxjs/toolkit";
import initialState from "./initialStates";

const farmSlice = createSlice({
  name: "farm",
  initialState,
  reducers: {},
});

export const {} = farmSlice.actions;

export default farmSlice.reducer;
