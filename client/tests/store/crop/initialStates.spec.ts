import cropReducer from "@store/states/crop/cropSlice";

describe("cropSlice reducer", () => {
  test("deve retornar o estado inicial quando o estado é undefined", () => {
    const state = cropReducer(undefined, { type: "@@INIT" });
    expect(state).toEqual({ crops: [] });
  });

  test("deve retornar o estado atual para uma action desconhecida", () => {
    const previousState = { crops: [{ id: "1", name: "Tomate" }] };
    const state = cropReducer(previousState as any, {
      type: "acao/nao-existe",
    });
    expect(state).toBe(previousState);
  });
});
