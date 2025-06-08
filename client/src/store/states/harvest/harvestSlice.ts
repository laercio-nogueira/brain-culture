import { createSlice } from "@reduxjs/toolkit";
import initialState from "./initialStates";

const harvestSlice = createSlice({
  name: "harvest",
  initialState,
  reducers: {},
});

export const {} = harvestSlice.actions;

export default harvestSlice.reducer;
