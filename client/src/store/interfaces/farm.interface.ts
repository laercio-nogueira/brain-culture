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
