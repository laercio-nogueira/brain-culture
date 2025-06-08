import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import cropReducer from "./states/crop/cropSlice";
import { CropApi } from "./states/crop/cropApi";
import harvestReducer from "./states/harvest/harvestSlice";
import { HarvestApi } from "./states/harvest/harvestApi";
import FarmReducer from "./states/farm/farmSlice";
import { FarmApi } from "./states/farm/farmApi";
import FarmerReducer from "./states/farmer/farmerSlice";
import { FarmerApi } from "./states/farmer/farmerApi";
import { DashboardApi } from "./states/dashboard/dashboardApi";
import DashboardReducer from "./states/dashboard/dashboardSlice";

export const store = configureStore({
  reducer: {
    crop: cropReducer,
    harvest: harvestReducer,
    farm: FarmReducer,
    farmer: FarmerReducer,
    dashboard: DashboardReducer,
    [CropApi.reducerPath]: CropApi.reducer,
    [HarvestApi.reducerPath]: HarvestApi.reducer,
    [FarmApi.reducerPath]: FarmApi.reducer,
    [FarmerApi.reducerPath]: FarmerApi.reducer,
    [DashboardApi.reducerPath]: DashboardApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      CropApi.middleware,
      HarvestApi.middleware,
      FarmApi.middleware,
      FarmerApi.middleware,
      DashboardApi.middleware
    ),
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
