import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import initialState from "./initialStates";
import { Harvest } from "../../interfaces/harvest.interface";

const harvestSlice = createSlice({
  name: "harvest",
  initialState,
  reducers: {
    addHarvest(state, action: PayloadAction<Harvest>) {
      state.harvests.push(action.payload);
    },
    updateHarvest(state, action: PayloadAction<Harvest>) {
      const harvest = action.payload;
      const harvestIndex = state.harvests.findIndex(
        (h: any) => h.id === harvest.id
      );
      if (harvestIndex !== -1) {
        state.harvests[harvestIndex] = harvest;
      }

      // Atualiza em todos os produtores
      state.producers.forEach((producer: any) => {
        const producerHarvestIndex = producer.harvests.findIndex(
          (h: any) => h.id === harvest.id
        );
        if (producerHarvestIndex !== -1) {
          producer.harvests[producerHarvestIndex] = harvest;
        }
      });
    },
    deleteHarvest(state, action: PayloadAction<string>) {
      const harvestId = action.payload;
      state.harvests = state.harvests.filter((h: any) => h.id !== harvestId);

      // Remove de todos os produtores
      state.producers.forEach((producer: any) => {
        producer.harvests = producer.harvests.filter(
          (h: any) => h.id !== harvestId
        );
      });
    },

    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const {
  addHarvest,
  updateHarvest,
  deleteHarvest,
  setLoading,
  setError,
} = harvestSlice.actions;

export default harvestSlice.reducer;
