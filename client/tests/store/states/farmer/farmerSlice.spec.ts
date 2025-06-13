import farmReducer from "@store/states/farm/farmSlice";
import initialState from "@store/states/farm/initialStates";

describe("farmSlice reducer", () => {
  test("deve retornar o estado inicial quando passado um estado undefined", () => {
    const state = farmReducer(undefined, { type: "@@INIT" });
    expect(state).toEqual(initialState);
  });

  test("deve retornar o estado atual para uma action desconhecida", () => {
    const previousState = { someKey: "someValue" };
    const state = farmReducer(previousState as any, {
      type: "alguma/actionInexistente",
    });
    expect(state).toBe(previousState);
  });
});
