// src/features/agriculture/agricultureSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import initialState from "./initialStates";
import { Farmer } from "../../interfaces/farmer.interface";

const farmerSlice = createSlice({
  name: "farmer",
  initialState,
  reducers: {
    addFarmer(state, action: PayloadAction<Farmer>) {
      state.farmer.push(action.payload);
    },
    updateFarmer(state, action: PayloadAction<Farmer>) {
      const index = state.farmer.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.farmer[index] = action.payload;
      }
    },
    deleteFarmer(state, action: PayloadAction<string>) {
      state.farmer = state.farmer.filter((p) => p.id !== action.payload);
    },

    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const { addFarmer, updateFarmer, deleteFarmer, setLoading, setError } =
  farmerSlice.actions;

export default farmerSlice.reducer;
