import fetchMock from "jest-fetch-mock";
import { setupApiStore } from "../testUtils";

import { HarvestApi } from "@store/states/harvest/harvestApi";
import harvestReducer from "@store/states/harvest/harvestSlice";

beforeAll(() => {
  fetchMock.enableMocks();
});

beforeEach(() => {
  fetchMock.resetMocks();
});

describe("HarvestApi", () => {
  const storeRef: any = setupApiStore(HarvestApi, { crop: harvestReducer });

  it("should return url /harvest?page=1&limit=5 and method GET when call getHarvests with page 1", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({}));
    await storeRef.store.dispatch(HarvestApi.endpoints.getHarvests.initiate(1));

    const [request] = fetchMock.mock.calls[0];
    const { method }: any = fetchMock.mock.calls[0][0];
    const url = typeof request === "string" ? request : request?.url;

    expect(url).toBe(
      "http://mocked-backend:9999/api/v1/harvest?page=1&limit=5"
    );
    expect(method).toBe("GET");
  });

  it("should return url /harvest and method GET when call getHarvests without page", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({}));
    await storeRef.store.dispatch(
      HarvestApi.endpoints.getHarvests.initiate(undefined)
    );

    const [request] = fetchMock.mock.calls[0];
    const url = typeof request === "string" ? request : request?.url;
    const { method }: any = fetchMock.mock.calls[0][0];

    expect(url).toBe("http://mocked-backend:9999/api/v1/harvest");
    expect(method).toBe("GET");
  });

  it("should return url /harvest/id and method GET when call getHarvest with id", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({}));
    await storeRef.store.dispatch(
      HarvestApi.endpoints.getHarvest.initiate("mock-id")
    );

    const [request] = fetchMock.mock.calls[0];
    const url = typeof request === "string" ? request : request?.url;
    const { method }: any = fetchMock.mock.calls[0][0];

    expect(url).toBe("http://mocked-backend:9999/api/v1/harvest/mock-id");
    expect(method).toBe("GET");
  });

  it("should return url /harvest and method POST when call addHarvest with params", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({}));
    await storeRef.store.dispatch(
      HarvestApi.endpoints.addHarvest.initiate({
        name: "mock-name",
        year: 2025,
        farmId: "mock-farm-id",
      })
    );

    const [request] = fetchMock.mock.calls[0];
    const url = typeof request === "string" ? request : request?.url;
    const { method }: any = fetchMock.mock.calls[0][0];

    expect(url).toBe("http://mocked-backend:9999/api/v1/harvest");
    expect(method).toBe("POST");
  });

  it("should return url /harvest/id and method PUT when call updateHarvest with params", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({}));
    await storeRef.store.dispatch(
      HarvestApi.endpoints.updateHarvest.initiate({
        id: "mock-id",
        name: "mock-name",
        year: 2025,
        farmId: "mock-farm-id",
      })
    );
    const [request] = fetchMock.mock.calls[0];
    const { method }: any = fetchMock.mock.calls[0][0];
    const url = typeof request === "string" ? request : request?.url;

    expect(url).toBe("http://mocked-backend:9999/api/v1/harvest/mock-id");
    expect(method).toBe("PUT");
  });

  it("should return url /harvest/id and method DELETE when call deleteHarvest with id", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({}));
    await storeRef.store.dispatch(
      HarvestApi.endpoints.deleteHarvest.initiate("mock-id")
    );
    const [request] = fetchMock.mock.calls[0];
    const { method }: any = fetchMock.mock.calls[0][0];
    const url = typeof request === "string" ? request : request?.url;

    expect(url).toBe("http://mocked-backend:9999/api/v1/harvest/mock-id");
    expect(method).toBe("DELETE");
  });
});
