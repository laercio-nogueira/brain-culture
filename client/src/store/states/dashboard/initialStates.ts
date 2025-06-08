import { DashboardState } from "@interfaces/dashboard.interface";

const initialState: DashboardState = {
  dashboard: {
    totalfarms: "0",
    totalarea: "0",
    totalcultivatedarea: "0",
    totalvegetatedarea: "0",
    farmByState: [],
    cropByFarm: [],
  },
};

export default initialState;
