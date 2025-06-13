import harvestReducer from "@store/states/harvest/harvestSlice";

describe("harvestSlice reducer", () => {
  it("deve retornar o estado inicial quando o estado for undefined", () => {
    const state = harvestReducer(undefined, { type: "@@INIT" });
    expect(state).toEqual({ harvests: [] });
  });

  it("deve retornar o estado atual para uma action desconhecida", () => {
    const previousState: any = { harvests: [{ id: "1", name: "Colheita A" }] };
    const state = harvestReducer(previousState, { type: "acao/nao-existe" });
    expect(state).toBe(previousState);
  });
});
