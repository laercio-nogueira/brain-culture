import { Crop } from "./crop.interface";
import { Farm } from "./farm.interface";
import { Harvest } from "./harvest.interface";

export interface Farmer {
  id: string;
  document: string;
  documentType: string;
  name: string;
  farms: Farm[];
  harvests: Harvest[];
  crops: Crop[];
}

export interface FarmerState {
  farmer: Farmer[];
  loading: boolean;
  error: string | null;
  isError: boolean;
}

export interface FarmerCreate {
  document: string;
  documentType: string;
  name: string;
}
