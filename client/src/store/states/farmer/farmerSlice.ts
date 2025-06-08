import { createSlice } from "@reduxjs/toolkit";
import initialState from "./initialStates";

const farmerSlice = createSlice({
  name: "farmer",
  initialState,
  reducers: {},
});

export const {} = farmerSlice.actions;

export default farmerSlice.reducer;
