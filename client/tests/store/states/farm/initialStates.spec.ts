import FarmReducer from "@store/states/farm/farmSlice";

describe("farmSlice reducer", () => {
  test("deve retornar o estado inicial quando o estado é undefined", () => {
    const state = FarmReducer(undefined, { type: "@@INIT" });
    expect(state).toEqual({ farms: [] });
  });

  test("deve retornar o estado atual para uma action desconhecida", () => {
    const previousState = { crops: [{ id: "1", name: "Tomate" }] };
    const state = FarmReducer(previousState as any, {
      type: "acao/nao-existe",
    });
    expect(state).toBe(previousState);
  });
});
