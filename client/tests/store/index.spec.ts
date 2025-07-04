import { store, useAppDispatch } from "@store/index";
import { useDispatch } from "react-redux";

const mockDispatch = jest.fn();

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
}));

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

  describe("useAppDispatch", () => {
    it("should return the dispatch function from react-redux", () => {
      (useDispatch as any).mockReturnValue(mockDispatch);

      const dispatch = useAppDispatch();

      expect(dispatch).toBe(mockDispatch);
    });
  });
});
