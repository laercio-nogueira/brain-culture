export interface Farm {
  id: string;
  name: string;
  area: number;
  producerId: string;
}

export interface FarmState {
  farms: Farm[];
  loading: boolean;
  error: string | null;
}

export interface FarmCreate {
  name: string;
  city: string;
  state: string;
  totalArea: number | undefined;
  cultivatedArea: number | undefined;
  vegetatedArea: number | undefined;
  farmerId?: string;
}
