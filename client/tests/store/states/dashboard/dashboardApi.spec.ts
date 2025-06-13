import fetchMock from "jest-fetch-mock";

import { DashboardApi } from "@store/states/dashboard/dashboardApi";
import DashboardReducer from "@store/states/dashboard/dashboardSlice";
import { setupApiStore } from "../testUtils";

beforeAll(() => {
  fetchMock.enableMocks();
});

beforeEach(() => {
  fetchMock.resetMocks();
});

describe("DashboardApi", () => {
  const storeRef: any = setupApiStore(DashboardApi, {
    dashboard: DashboardReducer,
  });

  it("deve disparar a query getCrops com a URL correta", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({}));
    await storeRef.store.dispatch(
      DashboardApi.endpoints.getDashboard.initiate()
    );
    const [request] = fetchMock.mock.calls[0];
    const url = typeof request === "string" ? request : request?.url;
    expect(url).toBe("http://mocked-backend:9999/api/v1/dashboard");
  });
});
