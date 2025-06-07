import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import initialState from "./initialStates";
import { Crop } from "../../interfaces/crop.interface";

const cropSlice = createSlice({
  name: "crop",
  initialState,
  reducers: {
    addCrop(
      state: any,
      action: PayloadAction<{ harvestId: string; crop: Crop }>
    ) {
      const { harvestId, crop } = action.payload;
      const harvest = state.harvests.find((h: any) => h.id === harvestId);
      if (harvest) {
        state.crops.push(crop);
      }
    },
    updateCrop(state, action: PayloadAction<Crop>) {
      const crop = action.payload;
      const cropIndex = state.crops.findIndex((c) => c.id === crop.id);
      if (cropIndex !== -1) {
        state.crops[cropIndex] = crop;
      }
    },
    deleteCrop(state, action: PayloadAction<string>) {
      const cropId = action.payload;
      state.crops = state.crops.filter((c) => c.id !== cropId);
    },

    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const { addCrop, updateCrop, deleteCrop, setLoading, setError } =
  cropSlice.actions;

export default cropSlice.reducer;
