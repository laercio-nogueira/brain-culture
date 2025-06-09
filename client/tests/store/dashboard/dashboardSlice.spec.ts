import dashboardReducer from "@store/states/dashboard/dashboardSlice";
import initialState from "@store/states/dashboard/initialStates";

describe("dashboardSlice reducer", () => {
  test("deve retornar o estado inicial quando estado for undefined", () => {
    const state = dashboardReducer(undefined, { type: "@@INIT" });
    expect(state).toEqual(initialState);
  });

  test("deve retornar o estado atual para uma action desconhecida", () => {
    const previousState: any = { someKey: "anyValue" };
    const state = dashboardReducer(previousState, {
      type: "acao/desconhecida",
    });
    expect(state).toBe(previousState);
  });
});
