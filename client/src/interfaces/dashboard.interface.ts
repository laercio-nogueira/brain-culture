interface FarmByState {
  state: string;
  count: string;
}

interface CropByFarm {
  cropName: string;
  farmCount: string;
}

export interface Dashboard {
  totalfarms: string;
  totalarea: string;
  totalcultivatedarea: string;
  totalvegetatedarea: string;
  farmByState: FarmByState[];
  cropByFarm: CropByFarm[];
}

export interface DashboardState {
  dashboard: Dashboard;
}
