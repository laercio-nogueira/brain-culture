export interface Crop {
  createdAt: Date;
  harvestId: string;
  id: string;
  name: string;
}

export interface CropState {
  crops: Crop[];
}

export interface CropCreate {
  name: string;
  harvestId: string;
}

export interface CropUpdate extends CropCreate {
  id?: string;
}

export interface CropsResponse {
  data: {
    data: Crop[];
    total: number;
    page: number;
    limit: number;
  };
}
