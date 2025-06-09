import farmReducer from "@store/states/farm/farmSlice";

describe("farmSlice reducer", () => {
  test("deve retornar o estado inicial quando o estado é undefined", () => {
    const state = farmReducer(undefined, { type: "@@INIT" });
    expect(state).toEqual({ farms: [] });
  });

  test("deve retornar o estado atual para uma action desconhecida", () => {
    const previousState = { crops: [{ id: "1", name: "Joao" }] };
    const state = farmReducer(previousState as any, {
      type: "acao/nao-existe",
    });
    expect(state).toBe(previousState);
  });
});
