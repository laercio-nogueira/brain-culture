import harvestReducer from "@store/states/harvest/harvestSlice";
import initialState from "@store/states/harvest/initialStates";

describe("harvestSlice reducer", () => {
  it("deve retornar o estado inicial quando passado estado undefined", () => {
    const state = harvestReducer(undefined, { type: "@@INIT" });
    expect(state).toEqual(initialState);
  });

  it("deve retornar o estado atual para action desconhecida", () => {
    const previousState: any = { exampleKey: "exampleValue" };
    const state = harvestReducer(previousState, { type: "acao/nao-existe" });
    expect(state).toBe(previousState);
  });
});
