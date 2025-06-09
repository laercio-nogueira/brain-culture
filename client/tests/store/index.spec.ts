import { store } from "@store/index";

describe("Redux store", () => {
  test("should initialize with expected reducers", () => {
    const state = store.getState();

    expect(state).toHaveProperty("crop");
    expect(state).toHaveProperty("harvest");
    expect(state).toHaveProperty("farm");
    expect(state).toHaveProperty("farmer");
    expect(state).toHaveProperty("dashboard");

    expect(Object.keys(state)).toEqual(
      expect.arrayContaining([
        "crop",
        "harvest",
        "farm",
        "farmer",
        "dashboard",
        "CropApi",
        "HarvestApi",
        "farmApi",
        "FarmerApi",
        "dashboardApi",
      ])
    );
  });

  test("should dispatch actions", () => {
    const action = { type: "TEST_ACTION" };
    expect(() => store.dispatch(action)).not.toThrow();
  });
});
