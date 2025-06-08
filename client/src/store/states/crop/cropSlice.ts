import { createSlice } from "@reduxjs/toolkit";
import initialState from "./initialStates";

const cropSlice = createSlice({
  name: "crop",
  initialState,
  reducers: {},
});

export const {} = cropSlice.actions;

export default cropSlice.reducer;
