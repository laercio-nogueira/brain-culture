export interface Harvest {
  id: string;
  name: string;
  year: number;
}

export interface HarvestCreate {
  name: string;
  year: number;
  farmId: string;
}
