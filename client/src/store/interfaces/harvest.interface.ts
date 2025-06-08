export interface Harvest {
  id: string;
  name: string;
  year: number;
  farmId: string;
}

export interface HarvestCreate {
  name: string;
  year: number;
  farmId: string;
}

export interface HarvestUpdate {
  id: string;
  name: string;
  year: number;
  farmId: string;
}
