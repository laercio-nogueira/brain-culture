import { Farm } from "./farm.interface";

export interface Farmer {
  id: string;
  name: string;
  document: string;
  documentType: string;
  farms: Farm[];
  createdAt: Date;
}

export interface FarmerState {
  farmers: Farmer[];
}

export interface FarmerCreate {
  document: string;
  documentType: string;
  name: string;
}

export interface FarmerUpdate extends FarmerCreate {
  id?: string;
}

export interface FarmersResponse {
  data: {
    data: Farmer[];
    total: number;
    page: number;
    limit: number;
  };
}
