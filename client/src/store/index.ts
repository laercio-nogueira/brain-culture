import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import cropReducer from "./states/crop/cropSlice";
import { cropApi } from "./states/crop/cropApi";
import harvestReducer from "./states/harvest/harvestSlice";
import { HarvestApi } from "./states/harvest/harvestApi";
import FarmReducer from "./states/farm/farmSlice";
import { FarmApi } from "./states/farm/farmApi";
import FarmerReducer from "./states/farmer/farmerSlice";
import { FarmerApi } from "./states/farmer/farmerApi";

export const store = configureStore({
  reducer: {
    crop: cropReducer,
    harvest: harvestReducer,
    farm: FarmReducer,
    farmer: FarmerReducer,
    [cropApi.reducerPath]: cropApi.reducer,
    [HarvestApi.reducerPath]: HarvestApi.reducer,
    [FarmApi.reducerPath]: FarmApi.reducer,
    [FarmerApi.reducerPath]: FarmerApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      cropApi.middleware,
      HarvestApi.middleware,
      FarmApi.middleware,
      FarmerApi.middleware
    ),
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
