import cropReducer from "@store/states/crop/cropSlice";
import initialState from "@store/states/crop/initialStates";

describe("cropSlice reducer", () => {
  test("deve retornar o estado inicial quando passado um estado undefined", () => {
    const state = cropReducer(undefined, { type: "@@INIT" });
    expect(state).toEqual(initialState);
  });

  test("deve retornar o estado atual para uma action desconhecida", () => {
    const previousState = { someKey: "someValue" };
    const state = cropReducer(previousState as any, {
      type: "alguma/actionInexistente",
    });
    expect(state).toBe(previousState);
  });
});
