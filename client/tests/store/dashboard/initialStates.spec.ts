import dashboardReducers from "@store/states/dashboard/dashboardSlice";

describe("dashboardSlice reducer", () => {
  test("deve retornar o estado inicial quando o estado é undefined", () => {
    const state = dashboardReducers(undefined, { type: "@@INIT" });
    expect(state).toEqual({
      dashboard: {
        cropByFarm: [],
        farmByState: [],
        totalarea: "0",
        totalcultivatedarea: "0",
        totalfarms: "0",
        totalvegetatedarea: "0",
      },
    });
  });

  test("deve retornar o estado atual para uma action desconhecida", () => {
    const previousState = { crops: [{ id: "1", name: "Tomate" }] };
    const state = dashboardReducers(previousState as any, {
      type: "acao/nao-existe",
    });
    expect(state).toBe(previousState);
  });
});
