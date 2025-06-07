import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import initialState from "./initialStates";
import { Farm } from "../../interfaces/farm.interface";

const farmSlice = createSlice({
  name: "farm",
  initialState,
  reducers: {
    addFarm(
      state: any,
      action: PayloadAction<{ producerId: string; farm: Farm }>
    ) {
      const { producerId, farm } = action.payload;
      const producer = state.producers.find((p: any) => p.id === producerId);
      if (producer) {
        producer.farms.push(farm);
        state.farms.push(farm);
      }
    },
    updateFarm(state: any, action: PayloadAction<Farm>) {
      const farm = action.payload;
      const farmIndex = state.farms.findIndex((f: any) => f.id === farm.id);
      if (farmIndex !== -1) {
        state.farms[farmIndex] = farm;
      }

      state.producers.forEach((producer: any) => {
        const producerFarmIndex = producer.farms.findIndex(
          (f: any) => f.id === farm.id
        );
        if (producerFarmIndex !== -1) {
          producer.farms[producerFarmIndex] = farm;
        }
      });
    },
    deleteFarm(state: any, action: PayloadAction<string>) {
      const farmId = action.payload;
      state.farms = state.farms.filter((f: any) => f.id !== farmId);

      state.producers.forEach((producer: any) => {
        producer.farms = producer.farms.filter((f: any) => f.id !== farmId);
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

export const { addFarm, updateFarm, deleteFarm, setLoading, setError } =
  farmSlice.actions;

export default farmSlice.reducer;
