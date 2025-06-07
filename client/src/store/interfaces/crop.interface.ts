export interface Crop {
  id: string;
  name: string;
  harvests: string[];
}

export interface CropState {
  crops: Crop[];
  loading: boolean;
  error: string | null;
}

export interface CropCreate {
  name: string;
  harvestId: string;
}
