export interface FarmByState {
  state: string
  count: string
}

export interface CropByFarm {
  cropName: string
  farmCount: string
}

export interface DashboardProps {
  totalfarms: string
  totalarea: string
  totalcultivatedarea: string
  totalvegetatedarea: string
  farmByState: FarmByState[]
  cropByFarm: CropByFarm[]
}
