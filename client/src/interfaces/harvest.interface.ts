import { Crop } from "./crop.interface";

export interface Harvest {
  createdAt: Date;
  crops: Crop[];
  farmId: string;
  id: string;
  name: string;
  year: number;
}

export interface HarvestState {
  harvests: Harvest[];
}

export interface HarvestCreate {
  name: string;
  year: number;
  farmId: string;
}

export interface HarvestUpdate extends HarvestCreate {
  id?: string;
}

export interface HarvestsResponse {
  data: {
    data: Harvest[];
    total: number;
    page: number;
    limit: number;
  };
}
