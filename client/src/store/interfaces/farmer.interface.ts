import { Crop } from "./crop.interface";
import { Farm } from "./farm.interface";
import { Harvest } from "./harvest.interface";

export interface Farmer {
  id: string;
  document: string;
  name: string;
  farms: Farm[];
  harvests: Harvest[];
  crops: Crop[];
}

export interface FarmerState {
  farmer: Farmer[];
  loading: boolean;
  error: string | null;
}
