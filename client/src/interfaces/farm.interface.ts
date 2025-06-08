import { Harvest } from "./harvest.interface";

export interface Farm {
  city: string;
  createdAt: string;
  cultivatedArea: 8;
  farmerId: string;
  harvests: Harvest[];
  id: string;
  name: string;
  state: string;
  totalArea: number;
  vegetatedArea: number;
}

export interface FarmState {
  farms: Farm[];
}

export interface FarmCreate {
  name: string;
  city: string;
  state: string;
  totalArea: number;
  cultivatedArea: number;
  vegetatedArea: number;
  farmerId?: string;
}

export interface FarmUpdate extends FarmCreate {
  id?: string;
}
