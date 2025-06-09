import { Dashboard, DashboardState } from "@interfaces/dashboard.interface";

describe("Dashboard interfaces structure", () => {
  test("should correctly represent a full Dashboard object", () => {
    const dashboard: Dashboard = {
      totalfarms: "50",
      totalarea: "10000",
      totalcultivatedarea: "6000",
      totalvegetatedarea: "3000",
      farmByState: [
        { state: "MT", count: "20" },
        { state: "SP", count: "30" },
      ],
      cropByFarm: [
        { cropName: "Soja", farmCount: "15" },
        { cropName: "Milho", farmCount: "10" },
      ],
    };

    expect(dashboard.totalfarms).toBe("50");
    expect(dashboard.farmByState).toHaveLength(2);
    expect(dashboard.cropByFarm[0].cropName).toBe("Soja");
  });

  test("DashboardState should contain a dashboard", () => {
    const dashboardState: DashboardState = {
      dashboard: {
        totalfarms: "100",
        totalarea: "20000",
        totalcultivatedarea: "12000",
        totalvegetatedarea: "6000",
        farmByState: [],
        cropByFarm: [],
      },
    };

    expect(dashboardState.dashboard.totalarea).toBe("20000");
    expect(dashboardState.dashboard.farmByState).toEqual([]);
  });
});
